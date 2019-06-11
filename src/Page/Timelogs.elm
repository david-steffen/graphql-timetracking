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
    , filterDate = Date.fromPosix utc (millisToPosix 0)
    , donutChartData = DonutChart.init
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
  | SetDate String
  | PreviousWeek
  | NextWeek
  | PreviousMonth
  | NextMonth
  | DonutChartMsg DonutChart.Msg
  | ReceiveDate Date.Date

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({timelogModel, projectModel} as model) =
  case msg of
    ReceiveDate today ->
      let
        newTimelogModel = 
          { timelogModel
          | filterDate = today 
          }
      in
        ( { model | today = today, timelogModel = newTimelogModel }
        , if projectModel.readyProjects then
            sendTimeLogsQuery model.flags.csrftoken today timelogModel.filterView
          else
            sendTimeLogsWithProjectsQuery model.flags.csrftoken today timelogModel.filterView
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
        curriedMerged = mergeProjectWithTimelog (Array.toList projectModel.projects)
        timelogswithProjects = Array.map curriedMerged newTimelogs
        totalTimeDelta = Array.foldl 
          (\(duration, hours) ->
            TimeDelta.customDaysAdd hours duration
          ) 
          (TimeDelta 0 0 0 0) 
          <| Array.map (\x -> (x.duration, (getWorkDayHours model.profileModel.user x.project))) timelogswithProjects
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
        curriedMerged = mergeProjectWithTimelog (Array.toList projectModel.projects)
        timelogswithProjects = Array.map curriedMerged newTimelogs
        totalTimeDelta = Array.foldl 
          (\(duration, hours) ->
            TimeDelta.customDaysAdd hours duration
          ) 
          (TimeDelta 0 0 0 0) 
          <| Array.map (\x -> (x.duration, (getWorkDayHours model.profileModel.user x.project))) timelogswithProjects
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
          if filterViewString == "week" then 
              WeekView
            else 
              MonthView
      in
        ( passToModel
          { timelogModel
          | filterView = filterView 
          }
          model
        , sendTimeLogsQuery model.flags.csrftoken timelogModel.filterDate filterView
        )
    SetDate dateString ->
      let
        date = Date.fromIsoString dateString |> Result.toMaybe
        newDate =
          case date of 
            Just val ->
              val
            Nothing ->
              timelogModel.filterDate
      in
        ( passToModel 
          { timelogModel 
          | filterDate = newDate
          }
          model
        , sendTimeLogsQuery model.flags.csrftoken newDate timelogModel.filterView
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
    date = Date.add unit value timelogModel.filterDate
  in
    ( passToModel 
      { timelogModel 
      | filterDate = date
      }
      model
    , sendTimeLogsQuery model.flags.csrftoken date timelogModel.filterView
  )

passToModel : TimelogModel -> Model -> Model
passToModel timelogModel model =
  { model | timelogModel = timelogModel }
   

sendTimeLogsQuery : String -> Date.Date -> FilterView -> Cmd Msg
sendTimeLogsQuery csrf date filterView =
  let
    (start, end) = rangeFromDate date filterView
  in
    sendQueryRequest csrf (timelogsRangeQuery start end)
      |> Task.attempt ReceiveTimelogQueryResponse

sendTimeLogsWithProjectsQuery : String -> Date.Date -> FilterView -> Cmd Msg
sendTimeLogsWithProjectsQuery csrf date filterView =
  let
    (start, end) = rangeFromDate date filterView
  in
    sendQueryRequest csrf (timelogsRangeWithProjectsQuery start end)
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
        [ Html.div 
          [ Attributes.class "column is-one-third-desktop is-one-fifth-mobile" ]
          [ dateNavButton Left timelogModel.filterView ]
        , rangeTitle timelogModel.filterDate timelogModel.filterView
        , Html.div 
          [ Attributes.class "column is-one-third-desktop is-one-fifth-mobile" ]
          [ dateNavButton Right timelogModel.filterView ]
        ]
      ]
    , timeLogList model 
    ]

filterLevel : Model -> Html Msg
filterLevel ({timelogModel}) =
  Html.div
    [ Attributes.class "level" ]
    [ Html.div
      [ Attributes.class "level-left" ]
      [ Html.div
        [ Attributes.class "level-item" ]
        [ DonutChart.view timelogModel.donutChartData
          |> Html.map DonutChartMsg
        ]
      ]
    , Html.div
      [ Attributes.class "level-right" ]
      [ Html.div
        [ Attributes.class "level-item" ]
        [ Html.div 
          [ Attributes.class "field" 
          ] 
          [ Html.div 
            [ Attributes.class "control has-icons-left" 
            ]
            [ Html.input
              [ Attributes.class "input is-small"
              , Attributes.type_ "date"
              , Events.onInput SetDate
              , Attributes.value (Date.toIsoString timelogModel.filterDate)
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
      , Html.div
        [ Attributes.class "level-item" ]
        [ Html.div 
          [ Attributes.class "field" 
          ] 
          [ Html.div 
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

dateNavButton : Direction -> FilterView -> Html Msg
dateNavButton direction filterView =
  let
    msgTuple = 
      case filterView of
        WeekView ->
          (PreviousWeek, NextWeek)
        MonthView ->
          (PreviousMonth, NextMonth)
    msg =
      case direction of 
        Left ->
          Tuple.first msgTuple
        Right ->
          Tuple.second msgTuple
    class = 
      case direction of 
        Left ->
          "fas fa-chevron-left"
        Right ->
          "fas fa-chevron-right"
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
  

rangeTitle : Date -> FilterView -> Html Msg
rangeTitle filterDate filterView =
  case filterView of
    WeekView ->
      let
        (start, end) = rangeFromDate filterDate filterView
      in
          Html.div 
            [ Attributes.class "column is-one-third-desktop is-three-fifth-mobile title is-size-6 has-text-centered" ]
            [ Html.span 
              [] 
              [ Html.text <| formatDate start ]
            , Html.span [] [ Html.text " - " ]
            , Html.span 
              [] 
              [ Html.text <| formatDate end ]
            ]
    MonthView ->
      Html.div 
        [ Attributes.class "column is-one-third-desktop is-three-fifth-mobile title is-size-6 has-text-centered" ]
        [ Html.text <| Date.format "MMMM y" filterDate
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

groupByDayView : Date -> List Project -> (String, List Timelog) -> Html Msg
groupByDayView today projects timeLogGroup =
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
            [ Html.text <|  Date.format "E ddd" day ]
          ]
        ]
      , Html.div 
          [ Attributes.class "column" ]
          (List.map (\x -> timeLogView projects x) (Tuple.second timeLogGroup))
      ]

formatDate : Date -> String
formatDate date =
  Date.format "E dd/MM/y" date

timeLogList : Model -> Html Msg
timeLogList ({ timelogModel, projectModel } as model) =
  if not timelogModel.readyTimes then
    timelogHero "Loading"
  else if Array.length timelogModel.timelogs > 0 && not timelogModel.isPending then
    let
      groupedList = groupByDay (Array.toList timelogModel.timelogs)
    in
    Html.div
      [] 
      (List.map (groupByDayView model.today (Array.toList projectModel.projects)) groupedList)
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

