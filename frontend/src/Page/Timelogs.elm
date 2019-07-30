module Page.Timelogs exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Types exposing (Model, Flags)
import Url
import Types.Timelog exposing 
  ( Timelog
  , TimelogWithProject
  , TimelogModel
  , TimelogsRequest
  , TimelogsWithProjectsRequest
  , CreateTimelogInput
  , UpdateTimelogInput
  , CreateTimelogForm
  , UpdateTimelogForm
  , TimelogMutationResult
  , FilterView(..)
  )
import Types.Project exposing (Project)
import Types.User exposing (User)
import Date exposing (Unit(..), Interval(..), Date)
import Set exposing (Set)
import Tuple exposing (..)
import Uuid exposing (Uuid)
import GraphQL.Client.Http as GraphQLClient
import Api exposing (sendQueryRequest, sendMutationRequest)
import Api.Timelog exposing 
  ( processCreateTimelogInput
  , processUpdateTimelogInput
  , createTimelogMutation
  , updateTimelogMutation
  , timelogsRangeQuery
  , timelogsRangeWithProjectsQuery
  )
import Task
import Utils.TimeDelta as TimeDelta exposing (TimeDelta, add, toString)
import Page exposing (Direction(..), formInput, formSelect, onClickPreventDefault, onChange, rangeFromDate)
import Date exposing (Date)
import Array exposing (..)
import Browser.Navigation as Nav
import Route exposing (..)
import Time exposing (millisToPosix, utc)
import DonutChart exposing (Msg(..), Point, Segment)

init : Flags -> Url.Url -> Nav.Key -> ( TimelogModel, Cmd Msg )
init flags url key =
  let 
    route = Route.fromUrl url
  in
  ( { readyTimes = False
    , timelogs = Array.empty
    , errResult = Nothing
    , isPending = False
    , filterView = WeekView
    , filterStartDate = Date.fromPosix utc (millisToPosix 0)
    , filterEndDate = Date.fromPosix utc (millisToPosix 0)
    , donutChartData = DonutChart.init
    , currentProjects = []
    , filterProjects = []
    }
  , case route of
      TimelogsR ->
        Date.today |> Task.perform ReceiveDate
      _ ->
        Cmd.none
  )

type Msg
  = ReceiveTimelogQueryResponse (Result GraphQLClient.Error TimelogsRequest)
  | ReceiveTimelogsWithProjectsResponse (Result GraphQLClient.Error TimelogsWithProjectsRequest)
  | ChangeView String
  | SetStartDate String
  | SetEndDate String
  | PreviousWeek
  | NextWeek
  | PreviousMonth
  | NextMonth
  | Noop
  | DonutChartMsg DonutChart.Msg
  | ReceiveDate Date.Date
  | FilterByProject Project

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({timelogModel, projectModel} as model) =
  case msg of
    Noop ->
      ( model
      , Cmd.none
      )
    ReceiveDate today ->
      let
        (startDate, endDate) = rangeFromDate today timelogModel.filterView
        newTimelogModel = 
          { timelogModel
          | filterStartDate = startDate
          , filterEndDate = endDate
          }
      in
        ( { model | today = today, timelogModel = newTimelogModel }
        , if projectModel.readyProjects then
            sendTimeLogsQuery model.flags.csrftoken startDate endDate timelogModel.filterView
          else
            sendTimeLogsWithProjectsQuery model.flags.csrftoken startDate endDate timelogModel.filterView
        )
    ReceiveTimelogQueryResponse (Err err) ->
      let
        newModel = 
          { model
          | errorMsg = Just err
          }
        newTimelogModel = 
          { timelogModel 
          | isPending = False
          }  
      in
        ( passToModel newTimelogModel newModel
        , Cmd.none
        )
    ReceiveTimelogQueryResponse (Ok response) ->
      let
        newTimelogs = Array.fromList response.allTimelogs
        donutChartList = donutChartPoints model.profileModel.user newTimelogs projectModel.projects
        donutChartData = timelogModel.donutChartData
        partialMerged = mergeProjectWithTimelog (Array.toList projectModel.projects)
        timelogsWithProjects = Array.map partialMerged newTimelogs
        currentProjects = getCurrentProjects (Array.toList timelogsWithProjects) (Array.toList projectModel.projects)
        totalTimeDelta = Array.foldl 
          (\(duration, hours) ->
            TimeDelta.customDaysAdd hours duration
          ) 
          (TimeDelta 0 0 0 0) 
          <| Array.map (\x -> (x.duration, (getWorkDayHours model.profileModel.user x.project))) timelogsWithProjects
        newDonutChartModel = 
          { donutChartData
          | points = donutChartList
          , displayTotal = totalTimeDelta
          }
        newTimelogModel = 
          { timelogModel 
          | timelogs = newTimelogs
          , isPending = False
          , readyTimes = True
          , donutChartData = newDonutChartModel
          , currentProjects = currentProjects
          }
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveTimelogsWithProjectsResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveTimelogsWithProjectsResponse (Ok response) ->
      let
        newTimelogs = Array.fromList response.allTimelogs
        newProjects = Array.fromList response.allProjects

        donutChartList = donutChartPoints model.profileModel.user newTimelogs newProjects
        donutChartData = timelogModel.donutChartData
        partialMerged = mergeProjectWithTimelog (Array.toList projectModel.projects)
        timelogsWithProjects = Array.map partialMerged newTimelogs
        currentProjects = getCurrentProjects (Array.toList timelogsWithProjects) response.allProjects
        totalTimeDelta = Array.foldl 
          (\(duration, hours) ->
            TimeDelta.customDaysAdd hours duration
          ) 
          (TimeDelta 0 0 0 0) 
          <| Array.map (\x -> (x.duration, (getWorkDayHours model.profileModel.user x.project))) timelogsWithProjects
        newDonutChartModel = 
          { donutChartData
          | points = donutChartList
          , displayTotal = totalTimeDelta
          }
        newTimelogModel = 
          { timelogModel 
          | timelogs = newTimelogs
          , isPending = False
          , readyTimes = True
          , donutChartData = newDonutChartModel
          , currentProjects = currentProjects
          }
        newProjectModel = 
          { projectModel |  projects = newProjects, readyProjects = True }
      in
        ( { model
          | timelogModel = newTimelogModel
          , projectModel = newProjectModel
          }
        , Cmd.none 
        )
    ChangeView filterViewString ->
      let
        filterView = 
          case filterViewString of
            "week" ->
              WeekView
            "month" ->
              MonthView
            "range" ->
              RangeView
            _ ->
              MonthView
        (startDate, endDate) = 
          case filterView of
            RangeView ->
              (timelogModel.filterStartDate, timelogModel.filterEndDate)
            _ -> 
              rangeFromDate timelogModel.filterStartDate filterView
      in
        ( passToModel
          { timelogModel
          | filterView = filterView
          , filterStartDate = startDate
          , filterEndDate = endDate
          }
          model
        , case filterView of
          RangeView ->
            Cmd.none
          _ ->
            sendTimeLogsQuery model.flags.csrftoken startDate endDate filterView
        )
    SetStartDate dateString ->
      let
        date = Date.fromIsoString dateString |> Result.toMaybe |> Maybe.withDefault timelogModel.filterStartDate
        (startDate, endDate) = 
          case timelogModel.filterView of
            RangeView ->
              (date, timelogModel.filterEndDate)
            _ ->
              rangeFromDate date timelogModel.filterView
      in
        ( passToModel 
          { timelogModel 
          | filterStartDate = startDate
          , filterEndDate = endDate
          }
          model
        , sendTimeLogsQuery model.flags.csrftoken startDate endDate timelogModel.filterView
      )
    SetEndDate dateString ->
      let
        date = Date.fromIsoString dateString |> Result.toMaybe |> Maybe.withDefault timelogModel.filterEndDate
      in
        ( passToModel 
          { timelogModel 
          | filterEndDate = date
          }
          model
        , sendTimeLogsQuery model.flags.csrftoken timelogModel.filterStartDate date timelogModel.filterView
      )
    PreviousWeek ->
      updateDate Days (-7) model 
    
    NextWeek ->
      updateDate Days 7 model
    
    PreviousMonth ->
      updateDate Months (-1) model 
    
    NextMonth ->
      updateDate Months 1 model

    DonutChartMsg donutChartMsg ->
      DonutChart.update donutChartMsg timelogModel.donutChartData
        |> (\( data, cmd ) ->
            let
              newTimelogModel = { timelogModel | donutChartData = data }
            in
            
            ( { model | timelogModel = newTimelogModel }
            , Cmd.map DonutChartMsg cmd
            )
          )
    FilterByProject project ->
      let
        filterProjects =
          if List.member project.id timelogModel.filterProjects then
            List.filter (\project_ -> not <| project.id == project_) timelogModel.filterProjects
          else
            project.id :: timelogModel.filterProjects
      in
        ( passToModel
          { timelogModel 
            | filterProjects = 
                if List.length filterProjects == List.length timelogModel.currentProjects then
                  []
                else
                  filterProjects
            }
            model
        , Cmd.none
        )

type alias PointData =
  { value : Float
  , color : String
  , key : String
  , timeDelta : TimeDelta
  , workDayHours : Int
  }

projectTotals : List PointData -> List (String, String) -> List Point -> List Point
projectTotals pointsList_ projectSet_ list =
  let
    (key, color) = Maybe.withDefault ("unknown", "#333") <| List.head projectSet_
    filtered = List.filter (\point -> point.key == key) pointsList_
    times = List.map (\point -> point.value) filtered
    total = List.sum times
    filteredHead = List.head filtered 
      |> Maybe.withDefault 
        { value = 0
        , color = "#333"
        , key = "unknown"
        , timeDelta = TimeDelta 0 0 0 0
        , workDayHours = 0
        }
    timeTimeDeltas = List.map (\point -> point.timeDelta) filtered
    totalTimeDelta = List.foldl (TimeDelta.customDaysAdd filteredHead.workDayHours) (TimeDelta 0 0 0 0) timeTimeDeltas 
    newList =
      if List.length projectSet_ == 0 then
        list
      else
        { value = total
        , color = color
        , key = key
        , display = totalTimeDelta
        } :: list
  in
    if List.length projectSet_ == 0 then
      newList
    else
      projectTotals pointsList_ (List.drop 1 projectSet_) newList

getWorkDayHours : Maybe User -> Project -> Int
getWorkDayHours user project = 
  if project.workDayHours == 0 then
    case user of
      Just val ->
        val.account.globalWorkDayHours
      Nothing ->
        24
  else
    project.workDayHours

getCurrentProjects : List TimelogWithProject -> List Project -> List Project
getCurrentProjects timelogs projects = 
  let
    allTimelogProjects = List.map (\timelog -> timelog.project) timelogs
  in
    List.filter (\project -> List.member project allTimelogProjects) projects

donutChartPoints : Maybe User -> Array Timelog -> Array Project -> List Point
donutChartPoints user timelogs projects = 
  let
    pointsList =
      Array.toList <| Array.map 
        (\timelog -> 
          let
            projectFiltered = List.filter (\x -> x.id == timelog.project.id) (Array.toList projects)
            project =
              List.head projectFiltered
                |> Maybe.withDefault (Project timelog.project.id "" "" "" "" 0)
            workDayHours = getWorkDayHours user project
          in
            { value = TimeDelta.toCustomDayFloat workDayHours timelog.duration
            , color = project.colour
            , key = project.name
            , timeDelta = timelog.duration
            , workDayHours = workDayHours
            }
        ) 
        timelogs
    projectSet = Set.toList <| Set.fromList <| List.map (\point -> (point.key, point.color)) pointsList
  in
    projectTotals pointsList projectSet []

updateDate : Unit -> Int -> Model -> ( Model, Cmd Msg )
updateDate unit value ({timelogModel} as model) = 
  let
    startDate = Date.add unit value timelogModel.filterStartDate
    endDate = Date.add unit value timelogModel.filterEndDate
  in
    ( passToModel 
      { timelogModel 
      | filterStartDate = startDate
      , filterEndDate = endDate
      }
      model
    , sendTimeLogsQuery model.flags.csrftoken startDate endDate timelogModel.filterView
  )

passToModel : TimelogModel -> Model -> Model
passToModel timelogModel model =
  { model | timelogModel = timelogModel }
   

sendTimeLogsQuery : String -> Date.Date -> Date.Date -> FilterView -> Cmd Msg
sendTimeLogsQuery csrf startDate endDate filterView =
  sendQueryRequest csrf (timelogsRangeQuery startDate endDate)
    |> Task.attempt ReceiveTimelogQueryResponse

sendTimeLogsWithProjectsQuery : String -> Date.Date -> Date.Date -> FilterView -> Cmd Msg
sendTimeLogsWithProjectsQuery csrf startDate endDate filterView =
  sendQueryRequest csrf (timelogsRangeWithProjectsQuery startDate endDate)
    |> Task.attempt ReceiveTimelogsWithProjectsResponse

mergeProjectWithTimelog : List Project -> Timelog -> TimelogWithProject
mergeProjectWithTimelog projects timelog = 
  let
    projectFiltered = List.filter (\x -> x.id == timelog.project.id) projects
    project =
      List.head projectFiltered
        |> Maybe.withDefault (Project timelog.project.id "" "" "" "" 0)
  in
    { id = timelog.id
    , description = timelog.description
    , date = timelog.date
    , duration = timelog.duration
    , project = project
    }

view : Model -> Html Msg
view ({timelogModel} as model) =
  Html.div 
    []
    [ Html.div
      [ Attributes.class "level is-mobile" ]
      [ Html.div
        [ Attributes.class "level-left" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ Html.h1
            [ Attributes.class "title" ]
            [ Html.text "Times" 
            ]
          ]
        ]
      , Html.div
        [ Attributes.class "level-right" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ Html.a
            [ Attributes.class "button is-success" 
            , Attributes.href "/times/add"
            ]
            [ Html.span
              [ Attributes.class "icon is-small" ]
              [ Html.span
                [ Attributes.class "fas fa-plus-circle" ]
                []
              ]
            , Html.span
              []
              [ Html.text "New" ]
            ]
          ]
        ]
      ]
    , filterLevel model
    , Html.div 
      []
      [ Html.div 
        [ Attributes.class "columns is-mobile" ]
        [ case timelogModel.filterView of
            RangeView ->
              Html.div [] []
            _ ->
              Html.div 
                [ Attributes.class "column is-one-third-desktop is-one-fifth-mobile" ]
                [ dateNavButton Left timelogModel.filterView ]
        , rangeTitle timelogModel.filterStartDate timelogModel.filterEndDate timelogModel.filterView
        , case timelogModel.filterView of
            RangeView ->
              Html.div [] []
            _ ->
              Html.div 
                [ Attributes.class "column is-one-third-desktop is-one-fifth-mobile" ]
                [ dateNavButton Right timelogModel.filterView ]
        ]
      ]
    , timeLogListView model 
    ]

filterLevel : Model -> Html Msg
filterLevel ({timelogModel, projectModel}) =
  Html.div
    [ Attributes.class "level" ]
    [ Html.div
      [ Attributes.class "level-left" ]
      [ Html.div
        [ Attributes.class "level-item" ]
        [ DonutChart.view timelogModel.donutChartData
          |> Html.map DonutChartMsg
        ]
      , Html.div
        [ Attributes.class "level-item filter-projects" ]
        [ projectFilter timelogModel.currentProjects timelogModel.filterProjects ]
      ]
    , Html.div
      [ Attributes.class "level-right" ]
      [ Html.div
        [ Attributes.class "level-item" ]
        [ Html.div 
          [ Attributes.class "field" 
          ] 
          [ Html.label 
              [ Attributes.class "label has-text-centered-mobile" ]
              [ case timelogModel.filterView of
                  RangeView ->
                    Html.text "Start"
                  _ ->
                    Html.text "Date"
              ]
          , Html.div 
            [ Attributes.class "control has-icons-left" 
            ]
            [ Html.input
              [ Attributes.class "input is-small"
              , Attributes.type_ "date"
              , Events.onInput SetStartDate
              , Attributes.value (Date.toIsoString timelogModel.filterStartDate)
              ]
              []
            , Html.span
              [ Attributes.class "icon is-small is-left" ]
              [ Html.span
                [ Attributes.class "fas fa-calendar" ]
                []
              ]
            ]
          ]
        ]
      , case timelogModel.filterView of 
          RangeView ->
            Html.div
            [ Attributes.class "level-item" ]
            [ Html.div 
              [ Attributes.class "field" 
              ] 
              [ Html.label 
                [ Attributes.class "label has-text-centered-mobile" ]
                [ Html.text "End" ]
              , Html.div 
                [ Attributes.class "control has-icons-left" 
                ]
                [ Html.input
                  [ Attributes.class "input is-small"
                  , Attributes.type_ "date"
                  , Events.onInput SetEndDate
                  , Attributes.value (Date.toIsoString timelogModel.filterEndDate)
                  ]
                  []
                , Html.span
                  [ Attributes.class "icon is-small is-left" ]
                  [ Html.span
                    [ Attributes.class "fas fa-calendar" ]
                    []
                  ]
                ]
              ]
            ]
          _ ->
            Html.div [] []
      , Html.div
        [ Attributes.class "level-item" ]
        [ Html.div 
          [ Attributes.class "field" 
          ] 
          [ Html.label 
              [ Attributes.class "label has-text-centered-mobile" ]
              [ Html.text "Filter view" ]
          , Html.div 
            [ Attributes.class "control has-icons-left" 
            ] 
            [ Html.div 
              [ Attributes.class "select is-small"
              ]
              [ Html.select
                [ onChange ChangeView ]
                [ Html.option
                  [ Attributes.value "week" 
                  , Attributes.selected (timelogModel.filterView == WeekView)
                  ]
                  [ Html.text "Weekly" ]
                , Html.option
                  [ Attributes.value "month" 
                  , Attributes.selected (timelogModel.filterView == MonthView)
                  ]
                  [ Html.text "Monthly" ]
                , Html.option
                  [ Attributes.value "range" 
                  , Attributes.selected (timelogModel.filterView == RangeView)
                  ]
                  [ Html.text "Range" ]
                ]
              ]
            , Html.span
              [ Attributes.class "icon is-small is-left" ]
              [ Html.span
                [ Attributes.class "fas fa-filter" ]
                []
              ]
            ]
          ]
        ]
      ]
    ]

projectFilter: List Project -> List Uuid -> Html Msg
projectFilter projects filterProjects =
  Html.div
    [ Attributes.class "field is-grouped is-grouped-multiline" ]
    (List.map (\project ->
      Html.div 
        [ Attributes.class "control"]
        [ if List.member project.id filterProjects then
            Html.span
            [ Attributes.class "tags has-addons"
            , Events.onClick (FilterByProject project)
            ]
            [ Html.span
              [ Attributes.class "tag is-white" ]
              [ Html.div
                [ Attributes.class "project-color"
                , Attributes.style "background-color" project.colour        
                ]
                []
              ]
            , Html.span
              [ Attributes.class "tag is-dark" ]
              [ Html.text project.abbreviation ]
            , Html.div
              [ Attributes.class "tag is-delete" 
              , Attributes.attribute "role" "button"
              ]
              []
            ]
          else
            Html.span
            [ Attributes.class "tags has-addons"
            , Events.onClick (FilterByProject project)
            ]
            [ Html.span
              [ Attributes.class "tag is-white" ]
              [ Html.div
                [ Attributes.class "project-color"
                , Attributes.style "background-color" project.colour        
                ]
                []
              ]
            , Html.span
              [ Attributes.class "tag is-dark" ]
              [ Html.text project.abbreviation ]
            ]
        ]) 
      projects
    )


dateNavButton : Direction -> FilterView -> Html Msg
dateNavButton direction filterView =
  let
    (prevMsg, nextMsg) = 
      case filterView of
        WeekView ->
          (PreviousWeek, NextWeek)
        MonthView ->
          (PreviousMonth, NextMonth)
        RangeView ->
          (Noop, Noop)
    (msg, class) =
      case direction of 
        Left ->
          (prevMsg, "fas fa-chevron-left")
        Right ->
          (nextMsg, "fas fa-chevron-right")
  in
    Html.span
      [ Attributes.class "is-clearfix" ]
      [ Html.button
        [ Events.onClick msg
        , case direction of
          Left ->
            Attributes.class "button is-small is-pulled-right"
          Right ->
            Attributes.class "button is-small"
        ]
        [ Html.span
          [ Attributes.class "icon is-small" ]
          [ Html.i
            [ Attributes.class class ]
            []
          ]
        ]
      ]
  

rangeTitle : Date -> Date -> FilterView -> Html Msg
rangeTitle startDate endDate filterView =
  case filterView of
    MonthView ->
      Html.div 
        [ Attributes.class "column is-one-third-desktop is-three-fifth-mobile title is-size-6 has-text-centered" ]
        [ Html.text <| Date.format "MMMM y" startDate
        ]
    _ ->
      Html.div 
        [ Attributes.class "column is-one-third-desktop is-three-fifth-mobile title is-size-6 has-text-centered" ]
        [ Html.span 
          [] 
          [ Html.text <| formatDate startDate ]
        , Html.span [] [ Html.text " - " ]
        , Html.span 
          [] 
          [ Html.text <| formatDate endDate ]
        ]

dateFilter : List Timelog -> String -> List Timelog
dateFilter timelogs key =
  List.filter
    (\x ->
        Date.toIsoString x.date == key
    )
    timelogs

groupByDay : List Timelog -> List (String, List Timelog)
groupByDay timeLogs =
  let
    groupedList = Set.fromList <| List.map (\x -> Date.toIsoString x.date) timeLogs
    nested = List.map (\x -> (x, dateFilter timeLogs x)) (Set.toList groupedList)
  in
    nested   

groupByDayView : Date -> List Project -> FilterView -> (String, List Timelog) -> Html Msg
groupByDayView today projects filterView timeLogGroup =
  let
    day = Date.fromIsoString (Tuple.first timeLogGroup)
      |> Result.toMaybe |> Maybe.withDefault today
  in
    Html.div 
      [ Attributes.class "columns groups" ]
      [ Html.div
        [ Attributes.class "date-column column is-narrow" ]
        [ Html.div
          [ Attributes.class "date-text has-text-weight-bold is-size-6"]
          [ Html.div
            []
            [ case filterView of
                RangeView ->
                  Html.text <|  Date.format "dd/MM/y" day
                _ -> 
                  Html.text <|  Date.format "E ddd" day
            ]
          ]
        ]
      , Html.div 
          [ Attributes.class "column" ]
          (List.map (\x -> timeLogView projects x) (Tuple.second timeLogGroup))
      ]

formatDate : Date -> String
formatDate date =
  Date.format "E dd/MM/y" date

timeLogListView : Model -> Html Msg
timeLogListView ({ timelogModel, projectModel } as model) =
  if not timelogModel.readyTimes then
    timelogHero "Loading"
  else if Array.length timelogModel.timelogs > 0 && not timelogModel.isPending then
    let
      groupedList = 
        if List.isEmpty timelogModel.filterProjects then
          groupByDay (Array.toList timelogModel.timelogs)
        else
          groupByDay <| List.filter (\timelog -> List.member timelog.project.id timelogModel.filterProjects) (Array.toList timelogModel.timelogs)
    in
    Html.div
      [] 
      (List.map 
        (groupByDayView model.today 
          (Array.toList projectModel.projects) 
          timelogModel.filterView)
        groupedList)
  else 
    timelogHero "Nothing to show"

timelogHero : String -> Html Msg
timelogHero message =
  Html.div 
      [ Attributes.class "hero is-large" ]
      [ Html.div
        [ Attributes.class "hero-body" ]
        [ Html.div
          [ Attributes.class "container" ]
          [ Html.h1 
            [ Attributes.class "title has-text-centered has-text-grey-lighter" ]
            [ Html.text message ]
          ]
        ]
      ]

timeLogView : List Project -> Timelog -> Html Msg
timeLogView projects timelog =
  let
    newTimelog = mergeProjectWithTimelog projects timelog
  in
    Html.div
      []
      [ Html.div
        [ Attributes.class "columns is-vcentered is-mobile" ]
        [ Html.div
          [ Attributes.class "column is-narrow" ]
          [ Html.div
            [ Attributes.class "project-color"
            , Attributes.style "background-color" newTimelog.project.colour
            ]
            []
          ]
        , Html.div 
          [ Attributes.class "column has-text-weight-bold is-size-5" ]
          [ Html.text newTimelog.project.name ]
        , Html.div
          [ Attributes.class "column is-narrow" ]
          [ actions newTimelog.id ]
        ]
      , Html.div
        [ Attributes.class "columns" ]
        [ Html.div
          [ Attributes.class "column is-narrow has-text-weight-bold" ]
          [ Html.div
            []
            [ Html.text (TimeDelta.toString newTimelog.duration)
            ]
          ]
        , Html.div
          [ Attributes.class "column" ]
          [ Html.text newTimelog.description ]
        ]
      
        
      ]

actions : Uuid -> Html Msg
actions id =
  Html.div
    [ Attributes.class "buttons" ]
    [ Html.a
      [ Attributes.class "button"
      , Attributes.href <| "/times/edit/" ++ (Uuid.toString id)
      , Attributes.title "Edit"
      ]
      [ Html.span
        [ Attributes.class "fas fa-pen"
        ]
        []
      ]
    -- , Html.span
    --   [ Attributes.class "delete"
    --   , Events.onClick <| DeleteTimelog id
    --   ]
    --   []
    ]

