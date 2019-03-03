module Page.Timelogs exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Types exposing (Model)
import Types.Timelog exposing 
  ( Timelog
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
import Time exposing (millisToPosix, utc)
import DonutChart exposing (Msg(..))

init : TimelogModel
init =
  { readyTimes = False
  , timelogs = Array.empty
  , errResult = Nothing
  , isPending = False
  , filterView = WeekView
  , filterDate = Date.fromPosix utc (millisToPosix 0)
  , donutChartData = DonutChart.init
  }


type Msg
  = ReceiveTimelogQueryResponse (Result GraphQLClient.Error TimelogsRequest)
  | ChangeView String
  | SetDate String
  | PreviousWeek
  | NextWeek
  | PreviousMonth
  | NextMonth
  | DonutChartMsg DonutChart.Msg

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({timelogModel, projectModel} as model) =
  case msg of
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
        donutChartList = Array.toList <| Array.map 
          (\timelog -> 
            let
              projectFiltered = List.filter (\x -> x.id == timelog.project.id) (Array.toList projectModel.projects)
              project =
                List.head projectFiltered
                  |> Maybe.withDefault (Project timelog.project.id "" "" "" "")
            in
              { time = TimeDelta.toFloat timelog.duration
              , color = project.colour
              }
          ) 
          newTimelogs

        donutChartData = timelogModel.donutChartData
    
        newDonutChartModel = 
          { donutChartData
          | points = donutChartList
          }
        newTimelogModel = 
          { timelogModel 
          | timelogs = newTimelogs
          , isPending = False
          , donutChartData = newDonutChartModel
          }
      in
        ( passToModel newTimelogModel model
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
        , sendTimeLogsQuery model.csrf timelogModel.filterDate filterView ReceiveTimelogQueryResponse
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
        , sendTimeLogsQuery model.csrf newDate timelogModel.filterView ReceiveTimelogQueryResponse
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
    , sendTimeLogsQuery model.csrf date timelogModel.filterView ReceiveTimelogQueryResponse
  )

passToModel : TimelogModel -> Model -> Model
passToModel timelogModel model =
  { model | timelogModel = timelogModel }
   

sendTimeLogsQuery : String -> Date.Date -> FilterView -> (Result GraphQLClient.Error TimelogsRequest -> msg) -> Cmd msg
sendTimeLogsQuery csrf date filterView msg =
  let
    (start, end) = rangeFromDate date filterView
  in
    sendQueryRequest csrf (timelogsRangeQuery start end)
      |> Task.attempt msg

sendTimeLogsWithProjectsQuery : String -> Date.Date -> FilterView -> (Result GraphQLClient.Error TimelogsWithProjectsRequest -> msg) -> Cmd msg
sendTimeLogsWithProjectsQuery csrf date filterView msg =
  let
    (start, end) = rangeFromDate date filterView
  in
    sendQueryRequest csrf (timelogsRangeWithProjectsQuery start end)
      |> Task.attempt msg

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
    , DonutChart.view model.timelogModel.donutChartData
      |> Html.map DonutChartMsg
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
  let
    timeDeltaList = Array.toList <| Array.map (\timeDelta -> timeDelta.duration) timelogModel.timelogs
    totalTime =  List.foldl (TimeDelta.customDaysAdd 7) (TimeDelta 0 0 0 0) timeDeltaList
    totalTimeFloat =  TimeDelta.toFloat totalTime

  in
    Html.div
      [ Attributes.class "level" ]
      [ Html.div
        [ Attributes.class "level-left" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ Html.span
            []
            [ Html.text "Total time:" ]
          , Html.span
            []
            [ Html.text <| TimeDelta.toString totalTime 
            , Html.text <| String.fromFloat totalTimeFloat
            ]
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
    

formatDate : Date -> String
formatDate date =
  Date.format "E dd/MM/y" date

timeLogList : Model -> Html Msg
timeLogList ({ timelogModel, projectModel } as model) =
  if not timelogModel.readyTimes then
    timelogHero "Loading"
  else if Array.length timelogModel.timelogs > 0 && not timelogModel.isPending then
    Html.div
      [] 
      (List.map (\x -> timeLogView (Array.toList projectModel.projects) timelogModel.filterView x) (Array.toList timelogModel.timelogs))
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

timeLogView : List Project -> FilterView -> Timelog -> Html Msg
timeLogView projects filterView timelog =
  let
    projectFiltered = List.filter (\x -> x.id == timelog.project.id) projects
    project =
      List.head projectFiltered
        |> Maybe.withDefault (Project timelog.project.id "" "" "" "")
  in
    Html.div
      [ Attributes.class "custom-columns" ]
      [ Html.div
        [ Attributes.class "custom-column column-1" ]
        [ Html.div
          [ Attributes.class "project-circle"
          , Attributes.style "border-color" project.colour
          ]
          []
        , Html.div
          [ Attributes.class "project-details" ]
          [ Html.div
            [ Attributes.class "has-text-weight-bold is-size-5"]
            [ Html.text (TimeDelta.toString timelog.duration)
            ]
          , Html.div
            []
            [ Html.text <| 
              case filterView of
                WeekView ->
                  Date.format "dd/MM/y" timelog.date 
                MonthView ->
                  Date.format "E ddd" timelog.date 
            ]
          ]
        ]
      , Html.div
        [ Attributes.class "custom-column column-2" ]
        [ Html.div 
          [ Attributes.class "has-text-weight-bold is-size-5" ]
          [ Html.text project.name ]
        , Html.div
          []
          [ Html.text timelog.description ]
        ]
      , Html.div
        [ Attributes.class "custom-column column-3" ]
        [ actions timelog.id ]
        
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

