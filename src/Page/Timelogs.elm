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
import Utils.TimeDelta as TimeDelta exposing (TimeDelta)
import Page exposing (InputLength(..), formInput, formSelect, onClickPreventDefault, onChange, rangeFromDate)
import Date exposing (Date)
import Array exposing (..)
import Time exposing (millisToPosix, utc)

init : TimelogModel
init =
  { readyTimes = False
  , timelogs = Array.empty
  , errResult = Nothing
  , isPending = False
  , filterView = WeekView
  , filterDate = Date.fromPosix utc (millisToPosix 0)
  }


type Msg
  = ReceiveTimelogQueryResponse (Result GraphQLClient.Error TimelogsRequest)
  | ChangeView String
  | SetDate String

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({timelogModel, projectModel} as model) =
  case msg of
    ReceiveTimelogQueryResponse (Err err) ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPending = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveTimelogQueryResponse (Ok response) ->
      let
        newTimelogModel = 
          { timelogModel 
          | timelogs = Array.fromList response.allTimelogs
          , isPending = False
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
      [ Attributes.class "level" ]
      [ Html.div
        [ Attributes.class "level-left" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ Html.h2 
            [ Attributes.class "title" 
            ] 
            [ Html.text "Times"]
          ]
        , Html.div
          [ Attributes.class "level-item" ]
          [ Html.div 
            [ Attributes.class "field" 
            ] 
            [ Html.div 
              [ Attributes.class "control" 
              ]
              [ Html.input
                [ Attributes.class "input is-small"
                , Attributes.type_ "date"
                , Events.onInput SetDate
                , Attributes.value (Date.toIsoString model.timelogModel.filterDate)
                ]
                []
              ]
            ]
          ]
        , Html.div
          [ Attributes.class "level-item" ]
          [ Html.div 
            [ Attributes.class "field" 
            ] 
            [ Html.div 
              [ Attributes.class "control" 
              ] 
              [ Html.div 
                [ Attributes.class "select is-small"
                ]
                [ Html.select
                  [ onChange ChangeView ]
                  [ Html.option
                    [ Attributes.value "week" 
                    , Attributes.selected (model.timelogModel.filterView == WeekView)
                    ]
                    [ Html.text "Weekly" ]
                  , Html.option
                    [ Attributes.value "month" 
                    , Attributes.selected (model.timelogModel.filterView == MonthView)
                    ]
                    [ Html.text "Monthly" ]
                  ]
                ]
              ]
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
    , Html.div 
      []
      [ rangeTitle timelogModel.filterDate timelogModel.filterView
      , timeLogList model 
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
            [ Attributes.class "title is-5 has-text-centered range-title" ]
            [ Html.span 
              [] 
              [ Html.text <| formatDate start ]
            , Html.span 
              [] 
              [ Html.text <| formatDate end ]
            ]
    MonthView ->
      Html.div 
        [ Attributes.class "title is-5 has-text-centered" ]
        [ Html.text <| Date.format "MMMM y" filterDate
        ]
    

formatDate : Date -> String
formatDate date =
  Date.format "E dd/MM/y" date

timeLogList : Model -> Html Msg
timeLogList ({ timelogModel, projectModel } as model) =
  Html.div
    [] 
    (List.map (\x -> timeLogView (Array.toList projectModel.projects) timelogModel.filterView x) (Array.toList timelogModel.timelogs))

timeLogView: List Project -> FilterView -> Timelog -> Html Msg
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

