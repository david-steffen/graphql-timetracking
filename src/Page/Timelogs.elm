module Page.Timelogs exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Types exposing (Model)
import Types.Timelog exposing 
  ( Timelog
  , TimelogModel
  , TimelogsWithProjectsRequest
  , CreateTimelogInput
  )
import Types.Project exposing (Project)
import Utils.TimeDelta exposing (..)
import Date exposing (Unit(..), Interval(..), Date)
import Set exposing (Set)
import Tuple exposing (..)
import Utils.TupleExtra exposing (first, second, third)
import Uuid exposing (Uuid)
import GraphQL.Client.Http as GraphQLClient
import Api exposing (sendQueryRequest, sendMutationRequest)
import Api.Timelog exposing 
  ( processCreateTimelogInput
  , timelogMutation
  , timelogsQuery
  , mergeWithProjects
  )
import Task
import Utils.TimeDelta as TimeDelta exposing (TimeDelta)
import Page exposing (formInput, formSelect)
import Date exposing (Date)
import Debug

init : TimelogModel
init =
  { readyTimes = False
  , timelogs = []
  , errResult = Nothing
  , formTimelog = Nothing
  , isPendingTimelog = False
  }


type Msg
  = CreateTimelog
  | ReceiveTimelogMutationResponse (Result GraphQLClient.Error Timelog)
  | InputTaskDescription String
  | InputTaskDate String
  | InputTaskDuration String
  | InputTaskProject String

--

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({timelogModel, projectModel} as model) =
  case msg of
    CreateTimelog ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPendingTimelog = True
          }  
      in
        ( passToModel newTimelogModel model
        , sendTimelogMutation model
        )
    ReceiveTimelogMutationResponse (Err err) ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPendingTimelog = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveTimelogMutationResponse (Ok response) ->
      let
        reversed = List.reverse timelogModel.timelogs
        timelogs = response :: reversed
        newTimelogModel = 
          { timelogModel 
          | timelogs = List.reverse timelogs 
          , formTimelog = Nothing
          , isPendingTimelog = False
          }
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    InputTaskDescription string ->
      let
        timelog = createTimelogForm timelogModel.formTimelog
        newTimelog =
          { timelog
              | description = string
          }
      in
        ( passToModel 
          { timelogModel | formTimelog = Just newTimelog }
          model
        , Cmd.none
        )
    InputTaskDate string ->
      let
        timelog = createTimelogForm timelogModel.formTimelog
        newTimelog =
          { timelog
              | date = Date.fromIsoString string |> Result.toMaybe
          }
      in
        ( passToModel 
          { timelogModel | formTimelog = Just newTimelog }
          model
        , Cmd.none
        )
    InputTaskDuration string ->
      let
        timelog = createTimelogForm timelogModel.formTimelog
        newTimelog =
            { timelog
                | duration = TimeDelta.fromString string |> Result.toMaybe
            }
      in
        ( passToModel 
          { timelogModel | formTimelog = Just newTimelog }
          model
        , Cmd.none
        )
    InputTaskProject string ->
      let
        timelog = createTimelogForm timelogModel.formTimelog
        newTimelog =
          { timelog
          | project = string
          }
      in
        ( passToModel 
          { timelogModel | formTimelog = Just newTimelog }
          model
        , Cmd.none
        )

createTimelogForm : Maybe CreateTimelogInput -> CreateTimelogInput
createTimelogForm timelog =
  case timelog of 
    Just value ->
      value
    Nothing ->
      CreateTimelogInput "" Nothing Nothing ""

passToModel : TimelogModel -> Model -> Model
passToModel timelogModel model =
  { model | timelogModel = timelogModel }

sendTimelogMutation : Model -> Cmd Msg
sendTimelogMutation  ({timelogModel} as model) =
  case timelogModel.formTimelog of 
    Just formTimelog ->
      sendMutationRequest model.csrf (timelogMutation <| processCreateTimelogInput formTimelog)
        |> Task.attempt ReceiveTimelogMutationResponse
    Nothing ->
      Cmd.none
  
    
view : Model -> Html Msg
view model =
  H.div 
    []
    [ H.h2 
      [ A.class "title" 
      ] 
      [ H.text "Times" 
      ]
    , H.div 
      []
      [ timeLogSide model 
      ]
    , H.div 
      []
      [ timeLogList model 
      ]
    ]

startOfWeek : Date -> (Int, Int, Int)
startOfWeek date =
  createDateTuple <| Date.floor Monday date

createDateTuple : Date -> (Int, Int, Int)
createDateTuple date =
  (Date.year date, Date.monthNumber date, Date.day date)

dateFilter timeLogs key =
  List.filter
      (\x ->
          startOfWeek x.date == key
      )
      timeLogs

groupByWeek : List Timelog -> List ((Int, Int, Int), List Timelog)
groupByWeek timeLogs =
  let
    startOfWeekList = Set.fromList <| List.map (\x -> startOfWeek x.date) timeLogs
    nested = List.map (\x -> (x, dateFilter timeLogs x)) (Set.toList startOfWeekList)
  in
    List.reverse nested

formatDate : Date -> String
formatDate date =
  Date.format "d/M/y" date

timeLogList : Model -> Html Msg
timeLogList { timelogModel } =
  let
    groupedLogs = groupByWeek timelogModel.timelogs
  in
    H.div
      []
      (List.map groupByTimeLogDate groupedLogs)

groupSeparator : (Int, Int, Int) -> Html Msg
groupSeparator dateTuple =
  let
    date = Date.fromCalendarDate (first dateTuple) (Date.numberToMonth (second dateTuple)) (third dateTuple)
    newDate = Date.add Days 6 date
  in
    H.div 
      [ A.class "subtitle has-text-centered group-separator" ]
      [ H.span 
        [] 
        [ H.text <| formatDate date ]
      , H.span 
        [] 
        [ H.text <| formatDate newDate ]
      ]

groupByTimeLogDate : ((Int, Int, Int),List Timelog) -> Html Msg
groupByTimeLogDate timeLogGroup =
  H.div []
    [ groupSeparator (Tuple.first timeLogGroup)
    , H.div 
      [ A.class "row-group" ] 
      (List.map (\x -> timeLogView x) (Tuple.second timeLogGroup))
    ]

timeLogView: Timelog -> Html Msg
timeLogView timelog =
  H.div
    [ A.class "custom-box"
    ]
    [ H.div
      [ A.class "media" ]
      [ H.div
        [ A.class "media-left" ]
        [ H.div
          [ A.class "project-circle title is-6 has-text-centered"
          , A.style "border-color" timelog.project.colour
          ]
          [ H.text (totalTime timelog.duration)
          ]
        ]
      , H.div
        [ A.class "media-content" ]
        [ H.div
          [ A.class "content" ]
          [ H.p
            [ A.class "has-text-weight-bold" ]
            [ H.text <| Date.format "d/M/y" timelog.date
            , H.br [] []
            , H.text timelog.project.name
            ]
          ]
        ]
      ]
    , H.p
      [ A.class "is-size-7" ]
      [ H.text timelog.description
      ]
    ]

timeLogForm : Model -> Html Msg
timeLogForm ( {timelogModel, projectModel} as model) =
  let
    button = 
      case timelogModel.isPendingTimelog of
        True ->
          H.button
            [ A.class "button is-primary is-loading"
            , A.attribute "disabled" "disabled"
            ]
            [ H.text "Submit" ]
        False ->
          H.button
            [ A.class "button is-primary"
            , E.onClick CreateTimelog
            ]
            [ H.text "Submit" ]
  in
    H.div 
      [ A.class "column is-half" ]
      [ formInput "text" "Description" InputTaskDescription Nothing
      , formInput "date" "Date" InputTaskDate Nothing
      , formSelect (List.map (\project -> {value = Uuid.toString project.id, title = project.name}) projectModel.projects) InputTaskProject Nothing
      , formInput "time" "Duration" InputTaskDuration Nothing
      , H.div [ A.class "field" ]
        [ H.div [ A.class "control" ]
          [ button
          ]
        ]
      ]

timeLogSide : Model -> Html Msg
timeLogSide model =
  H.div
    [ A.class "columns" ]
    [ H.div 
      [ A.class "column" ]
      []
    , timeLogForm model
    , H.div 
      [ A.class "column" ]
      []
    ]