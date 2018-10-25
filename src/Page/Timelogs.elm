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
  , UpdateTimelogInput
  , CreateTimelogForm
  , UpdateTimelogForm
  , TimelogFormAction(..)
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
  , processUpdateTimelogInput
  , createTimelogMutation
  , updateTimelogMutation
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
  , createForm = Nothing
  , updateForm = Nothing
  , formAction = Create
  , isPendingTimelog = False
  }


type Msg
  = CreateTimelog
  | ReceiveCreateTimelogMutationResponse (Result GraphQLClient.Error Timelog)
  | ReceiveUpdateTimelogMutationResponse (Result GraphQLClient.Error Timelog)
  | InputCreateTimelogDescription String
  | InputCreateTimelogDate String
  | InputCreateTimelogDuration String
  | InputCreateTimelogProject String
  | EditTimelog String
  | InputUpdateTimelogDescription String
  | InputUpdateTimelogDate String
  | InputUpdateTimelogDuration String
  | InputUpdateTimelogProject String
  | DeleteTimelog String

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
        , sendCreateTimelogMutation model
        )
    ReceiveCreateTimelogMutationResponse (Err err) ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPendingTimelog = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveCreateTimelogMutationResponse (Ok response) ->
      let
        reversed = List.reverse timelogModel.timelogs
        timelogs = response :: reversed
        newTimelogModel = 
          { timelogModel 
          | timelogs = List.reverse timelogs 
          , createForm = Nothing
          , isPendingTimelog = False
          }
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveUpdateTimelogMutationResponse (Err err) ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPendingTimelog = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveUpdateTimelogMutationResponse (Ok response) ->
      let
        reversed = List.reverse timelogModel.timelogs
        timelogs = response :: reversed
        newTimelogModel = 
          { timelogModel 
          | timelogs = List.reverse timelogs 
          , createForm = Nothing
          , isPendingTimelog = False
          }
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    InputCreateTimelogDescription string ->
      let
        timelog = hasCreateTimelogForm timelogModel.createForm
        newTimelog =
          { timelog
              | description = string
          }
      in
        ( passToModel 
          { timelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    InputCreateTimelogDate string ->
      let
        timelog = hasCreateTimelogForm timelogModel.createForm
        newTimelog =
          { timelog
              | date = Date.fromIsoString string |> Result.toMaybe
          }
      in
        ( passToModel 
          { timelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    InputCreateTimelogDuration string ->
      let
        timelog = hasCreateTimelogForm timelogModel.createForm
        newTimelog =
            { timelog
                | duration = TimeDelta.fromString string |> Result.toMaybe
            }
      in
        ( passToModel 
          { timelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    InputCreateTimelogProject string ->
      let
        timelog = hasCreateTimelogForm timelogModel.createForm
        newTimelog =
          { timelog
          | project = string
          }
      in
        ( passToModel 
          { timelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    EditTimelog id ->
      ( model, Cmd.none )
    InputUpdateTimelogDescription string ->
      case timelogModel.updateForm of 
        Just updateForm ->
          let
            newTimelog =
              { updateForm
                | description = string
              }
          in
            ( passToModel 
              { timelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateTimelogDate string ->
      case timelogModel.updateForm of 
        Just updateForm ->
          let
            newTimelog =
              { updateForm
                | date = Date.fromIsoString string |> Result.toMaybe
              }
          in
            ( passToModel 
              { timelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateTimelogDuration string ->
      case timelogModel.updateForm of 
        Just updateForm ->
          let
            newTimelog =
              { updateForm
                | duration = TimeDelta.fromString string |> Result.toMaybe
              }
          in
            ( passToModel 
              { timelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateTimelogProject string ->
      case timelogModel.updateForm of 
        Just updateForm ->
          let
            newTimelog =
              { updateForm
                | project = string
              }
          in
            ( passToModel 
              { timelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    DeleteTimelog id ->
      ( model, Cmd.none )
    

hasCreateTimelogForm : Maybe CreateTimelogForm -> CreateTimelogForm
hasCreateTimelogForm timelog =
  case timelog of 
    Just value ->
      value
    Nothing ->
      CreateTimelogForm "" Nothing Nothing ""

passToModel : TimelogModel -> Model -> Model
passToModel timelogModel model =
  { model | timelogModel = timelogModel }

sendCreateTimelogMutation : Model -> Cmd Msg
sendCreateTimelogMutation  ({timelogModel} as model) =
  case timelogModel.createForm of 
    Just createForm ->
      sendMutationRequest model.csrf (createTimelogMutation <| processCreateTimelogInput createForm)
        |> Task.attempt ReceiveCreateTimelogMutationResponse
    Nothing ->
      Cmd.none

sendUpdateTimelogMutation : Model -> Cmd Msg
sendUpdateTimelogMutation  ({timelogModel} as model) =
  case timelogModel.updateForm of 
    Just updateForm ->
      sendMutationRequest model.csrf (updateTimelogMutation <| processUpdateTimelogInput updateForm)
        |> Task.attempt ReceiveUpdateTimelogMutationResponse
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

dateFilter : List Timelog -> (Int, Int, Int) -> List Timelog
dateFilter timelogs key =
  List.filter
      (\x ->
          startOfWeek x.date == key
      )
      timelogs

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
    , actions timelog.id
    ]

actions : Uuid -> Html Msg
actions id =
  H.div
    []
    [ H.span
      [ A.class "fas fa-pen"
      , E.onClick <| EditTimelog id
      ]
      []
    , H.span
      [ A.class "far fa-times-circle"
      , E.onClick <| DeleteTimelog id
      ]
      [] 
    ]

createTimelogForm : Model -> Html Msg
createTimelogForm ( {timelogModel, projectModel} as model) =
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
      [ formInput "text" "Description" InputCreateTimelogDescription Nothing
      , formInput "date" "Date" InputCreateTimelogDate Nothing
      , formSelect (List.map (\project -> {value = Uuid.toString project.id, title = project.name}) projectModel.projects) InputCreateTimelogProject Nothing
      , formInput "time" "Duration" InputCreateTimelogDuration Nothing
      , H.div [ A.class "field" ]
        [ H.div [ A.class "control" ]
          [ button
          ]
        ]
      ]

updateTimelogForm : UpdateTimelogForm -> List Project -> Bool -> Html Msg
updateTimelogForm timelog projects isPending =
  let
    button = 
      case isPending of
        True ->
          H.button
            [ A.class "button is-primary is-loading"
            , A.attribute "disabled" "disabled"
            ]
            [ H.text "Submit" ]
        False ->
          H.button
            [ A.class "button is-primary"
            , E.onClick <| EditTimelog timelog.id
            ]
            [ H.text "Submit" ]
  in
    H.div 
      [ A.class "column is-half" ]
      [ formInput "text" "Description" InputUpdateTimelogDescription (Just timelog.description )
      , formInput "date" "Date" InputUpdateTimelogDate (Just (Date.toIsoString timelog.date))
      , formSelect (List.map (\project -> {value = Uuid.toString project.id, title = project.name}) projects) InputCreateTimelogProject ( Just timelog.project)
      , formInput "time" "Duration" InputUpdateTimelogDuration (Just (TimeDelta.toString timelog.duration))
      , H.div [ A.class "field" ]
        [ H.div [ A.class "control" ]
          [ button
          ]
        ]
      ]

timelogForm : Model -> Html Msg
timelogForm ( {timelogModel, projectModel} as model) = 
  case timelogModel.formAction of 
    Create ->
      createTimelogForm model
    Update ->
      case timelogModel.updateForm of
        Just form ->
          updateTimelogForm form projectModel.projects timelogModel.isPendingTimelog
        Nothing ->
          createTimelogForm model

timeLogSide : Model -> Html Msg
timeLogSide model =
  H.div
    [ A.class "columns" ]
    [ H.div 
      [ A.class "column" ]
      []
    , timelogForm model
    , H.div 
      [ A.class "column" ]
      []
    ]