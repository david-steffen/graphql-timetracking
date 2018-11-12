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
  , TimelogMutationResult
  , TimelogDeleteMutationResult
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
  , processDeleteTimelogInput
  , createTimelogMutation
  , updateTimelogMutation
  , deleteTimelogMutation
  , timelogsQuery
  )
import Task
import Utils.TimeDelta as TimeDelta exposing (TimeDelta)
import Page exposing (InputLength(..), formInput, formSelect)
import Date exposing (Date)
import Array exposing (..)

init : TimelogModel
init =
  { readyTimes = False
  , timelogs = Array.empty
  , errResult = Nothing
  , createForm = Nothing
  , updateForm = Nothing
  , formAction = Noop
  , isPending = False
  , deleteId = Nothing
  }


type Msg
  = CreateTimelog
  | SubmitCreateTimelog
  | ReceiveCreateTimelogMutationResponse (Result GraphQLClient.Error TimelogMutationResult)
  | ReceiveUpdateTimelogMutationResponse (Result GraphQLClient.Error TimelogMutationResult)
  | ReceiveDeleteTimelogMutationResponse (Result GraphQLClient.Error TimelogDeleteMutationResult)
  | InputCreateTimelogDescription String
  | InputCreateTimelogDate String
  | InputCreateTimelogDuration String
  | InputCreateTimelogProject String
  | EditTimelog Uuid
  | SubmitEditTimelog
  | InputUpdateTimelogDescription String
  | InputUpdateTimelogDate String
  | InputUpdateTimelogDuration String
  | InputUpdateTimelogProject String
  | DeleteTimelog Uuid
  | SubmitDeleteTimelog
  | CloseFormModal

--

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({timelogModel, projectModel} as model) =
  case msg of
    CreateTimelog ->
      let
        newTimelogModel = 
          { timelogModel 
          | formAction = Create
          }  
      in
        ( passToModel newTimelogModel model
        , sendCreateTimelogMutation model
        )
    SubmitCreateTimelog ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPending = True
          }  
      in
        ( passToModel newTimelogModel model
        , sendCreateTimelogMutation model
        )
    ReceiveCreateTimelogMutationResponse (Err err) ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPending = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveCreateTimelogMutationResponse (Ok response) ->
      let
        timelogs = Array.push response.timelog timelogModel.timelogs
        newTimelogModel = 
          { timelogModel 
          | timelogs = timelogs 
          , createForm = Nothing
          , formAction = Noop
          , isPending = False
          }
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveUpdateTimelogMutationResponse (Err err) ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPending = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveUpdateTimelogMutationResponse (Ok response) ->
      let
        timelogPositions = 
          Array.indexedMap (\i x ->
              (i, x.id)
            )
            timelogModel.timelogs 
        timelogPosition = Array.filter (\x -> (Tuple.second x) == response.timelog.id) timelogPositions
        timelogIndex = 
          case Array.get 0 timelogPosition of 
            Just val ->
              Tuple.first val
            Nothing ->
              0
        timelogs = Array.set timelogIndex response.timelog timelogModel.timelogs
        newTimelogModel = 
          { timelogModel 
          | timelogs = timelogs
          , updateForm = Nothing
          , formAction = Noop
          , isPending = False
          }
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveDeleteTimelogMutationResponse (Err err) ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPending = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveDeleteTimelogMutationResponse (Ok response) ->
      let
        timelogs = Array.filter (\x -> response.timelogId /= x.id) timelogModel.timelogs
        newTimelogModel = 
          { timelogModel 
          | timelogs = timelogs
          , isPending = False
          , formAction = Noop 
          , deleteId = Nothing
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
      let
        filtered = Array.filter (\x ->
            x.id == id
          ) 
          timelogModel.timelogs
        timelog = 
          case Array.get 0 filtered of 
            Just value ->
              Just (UpdateTimelogForm value.id value.description value.duration value.date value.project.id)
            Nothing ->
              Nothing
      in
        ( passToModel 
          { timelogModel 
          | updateForm = timelog
          , formAction = Update
          }
          model
        , Cmd.none
        )
    SubmitEditTimelog ->
      let
        newTimelogModel = 
          { timelogModel 
          | isPending = True
          }  
      in
        ( passToModel newTimelogModel model
        , sendUpdateTimelogMutation model
        )
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
            date = Date.fromIsoString string |> Result.toMaybe
            newTimelog =
              case date of 
                Just val ->
                  { updateForm
                    | date = val
                  }
                Nothing ->
                  updateForm
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
            timeDelta = TimeDelta.fromString string |> Result.toMaybe
            newTimelog =
              case timeDelta of 
                Just val ->
                  { updateForm
                    | duration = val
                  }
                Nothing ->
                  updateForm
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
            projectId = Uuid.fromString string
            newTimelog =
              case projectId of 
                Just val ->
                  { updateForm
                    | project = val
                  }
                Nothing ->
                  updateForm
          in
            ( passToModel 
              { timelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    DeleteTimelog id ->
      ( passToModel 
        { timelogModel 
        | deleteId = Just id
        , formAction = Delete
        }
        model
      , Cmd.none
      )
    SubmitDeleteTimelog->
      ( passToModel 
        { timelogModel 
        | isPending = True
        }
        model
      , sendDeleteTimelogMutation model
      )
    CloseFormModal ->
      ( passToModel 
        { timelogModel 
        | formAction = Noop 
        , updateForm = Nothing
        , createForm = Nothing
        , deleteId = Nothing
        }
        model
      , Cmd.none
      )
    

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

sendDeleteTimelogMutation : Model -> Cmd Msg
sendDeleteTimelogMutation ({timelogModel} as model) =
  case timelogModel.deleteId of 
    Just id ->
      sendMutationRequest model.csrf (deleteTimelogMutation <| processDeleteTimelogInput id)
        |> Task.attempt ReceiveDeleteTimelogMutationResponse
    Nothing ->
      Cmd.none
    
view : Model -> Html Msg
view model =
  H.div 
    []
    [ H.div
      [ A.class "level" ]
      [ H.div
        [ A.class "level-left" ]
        [ H.h2 
          [ A.class "title" 
          ] 
          [ H.text "Times"]
        ]
      , H.div
        [ A.class "level-right" ]
        [ H.button
          [ A.class "button is-success" 
          , E.onClick CreateTimelog
          ]
          [ H.span
            [ A.class "icon is-small" ]
            [ H.span
              [ A.class "fas fa-plus-circle" ]
              []
            ]
          , H.span
            []
            [ H.text "New" ]
          ]
        ]
      ]
    , H.div 
      []
      [ timeLogList model 
      ]
    , formModal model 
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
timeLogList ({ timelogModel, projectModel } as model) =
  let
    groupedLogs = groupByWeek <| Array.toList timelogModel.timelogs
    curriedGroupByDate = groupByDate (Array.toList projectModel.projects)
  in
    H.div
      []
      (List.map curriedGroupByDate groupedLogs)

groupSeparator : (Int, Int, Int) -> Html Msg
groupSeparator dateTuple =
  let
    date = Date.fromCalendarDate (first dateTuple) (Date.numberToMonth (second dateTuple)) (third dateTuple)
    newDate = Date.add Days 6 date
  in
    H.div 
      [ A.class "title is-6 has-text-centered group-separator" ]
      [ H.span 
        [] 
        [ H.text <| formatDate date ]
      , H.span 
        [] 
        [ H.text <| formatDate newDate ]
      ]

groupByDate : List Project -> ((Int, Int, Int), List Timelog) -> Html Msg
groupByDate projects timeLogGroup =
  H.div []
    [ groupSeparator (Tuple.first timeLogGroup)
    , H.div 
      [ A.class "row-group" ] 
      (List.map (\x -> timeLogView projects x) (Tuple.second timeLogGroup))
    ]

timeLogView: List Project -> Timelog -> Html Msg
timeLogView projects timelog =
  let
    projectFiltered = List.filter (\x -> x.id == timelog.project.id) projects
    project =
      List.head projectFiltered
        |> Maybe.withDefault (Project timelog.project.id "" "" "" "")
  in
    H.div
      [ A.class "custom-box"
      ]
      [ H.div
        [ A.class "media" ]
        [ H.div
          [ A.class "media-left" ]
          [ H.div
            [ A.class "project-circle title is-6 has-text-centered"
            , A.style "border-color" project.colour
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
              , H.text project.name
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
      [ A.class "icon" ]
      [ H.span
        [ A.class "fas fa-pen"
        , E.onClick <| EditTimelog id
        ]
        []
      ]
    , H.span
      [ A.class "delete"
      , E.onClick <| DeleteTimelog id
      ]
      [] 
    ]

createTimelogForm : Model -> Html Msg
createTimelogForm ( {timelogModel, projectModel} as model) =
  let
    button = 
      case timelogModel.isPending of
        True ->
          H.button
            [ A.class "button is-primary is-loading"
            , A.attribute "disabled" "disabled"
            ]
            [ H.text "Submit" ]
        False ->
          H.button
            [ A.class "button is-primary"
            , E.onClick SubmitCreateTimelog
            ]
            [ H.text "Submit" ]
  in
    H.div 
      []
      [ H.h3
        [ A.class "title" ]
        [ H.text "Add" ]
      , formInput "text" "Description" InputCreateTimelogDescription Nothing Full
      , formInput "date" "Date" InputCreateTimelogDate Nothing Full
      , formSelect (List.map (\project -> {value = Uuid.toString project.id, title = project.name}) (Array.toList projectModel.projects)) InputCreateTimelogProject Nothing Full
      , formInput "time" "Duration" InputCreateTimelogDuration Nothing Short
      , H.div [ A.class "field" ]
        [ H.div 
          [ A.class "control" ]
          [ H.div
            [ A.class "buttons" ]
            [ button
            , H.button
              [ A.class "button is-text"
              , E.onClick CloseFormModal
              ]
              [ H.text "Cancel" ]
            ]
          ]
        ]
      ]

updateTimelogForm : UpdateTimelogForm -> Array Project -> Bool -> Html Msg
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
            , E.onClick <| SubmitEditTimelog
            ]
            [ H.text "Submit" ]
  in
    H.div 
      []
      [ H.h3
        [ A.class "title" ]
        [ H.text "Update" ]
      , formInput "text" "Description" InputUpdateTimelogDescription (Just timelog.description) Full
      , formInput "date" "Date" InputUpdateTimelogDate (Just (Date.toIsoString timelog.date)) Full
      , formSelect (List.map (\project -> {value = Uuid.toString project.id, title = project.name}) (Array.toList projects)) InputUpdateTimelogProject ( Just (Uuid.toString timelog.project)) Full
      , formInput "time" "Duration" InputUpdateTimelogDuration (Just (TimeDelta.toString timelog.duration)) Short
      , H.div 
        [ A.class "field" ]
        [ H.div 
          [ A.class "control" ]
          [ H.div
            [ A.class "buttons" ]
            [ button
            , H.button
              [ A.class "button is-text"
              , E.onClick CloseFormModal
              ]
              [ H.text "Cancel" ]
            ]
          ]
        ]
      ]

deleteTimelogForm : Model -> Html Msg
deleteTimelogForm ( {timelogModel, projectModel} as model) =
  let
    button = 
      case timelogModel.isPending of
        True ->
          H.button
            [ A.class "button is-primary is-loading"
            , A.attribute "disabled" "disabled"
            ]
            [ H.text "Submit" ]
        False ->
          H.button
            [ A.class "button is-primary"
            , E.onClick <| SubmitDeleteTimelog
            ]
            [ H.text "Submit" ]
  in
    H.div 
      []
      [ H.h3
        [ A.class "title" ]
        [ H.text "Delete" ]
      , H.p
        [ A.class "field" ]
        [ H.text "Are you sure you want to delete this log?" ]
      , H.div 
        [ A.class "field" ]
        [ H.div 
          [ A.class "control" ]
          [ H.div
            [ A.class "buttons" ]
            [ button
            , H.button
              [ A.class "button is-text"
              , E.onClick CloseFormModal
              ]
              [ H.text "Cancel" ]
            ]
          ]
        ]
      ]

timelogForm : Model -> Html Msg
timelogForm ({timelogModel, projectModel} as model) = 
  case timelogModel.formAction of 
    Noop ->
      H.div [] []
    Create ->
      createTimelogForm model
    Update ->
      case timelogModel.updateForm of
        Just form ->
          updateTimelogForm form projectModel.projects timelogModel.isPending
        Nothing ->
          createTimelogForm model
    Delete ->
      deleteTimelogForm model

formModal : Model -> Html Msg
formModal model =
  let
    showModal =
      case model.timelogModel.formAction of 
        Noop ->
          False
        _ ->
          True
  in
    H.div 
      [ A.classList [("modal", True), ("is-active", showModal) ] ]
      [ H.div
        [ A.class "modal-background" ]
        []
      , H.div 
        [ A.class "modal-content" ]
        [ H.div
          [ A.class "box" ]
          [ timelogForm model ]
        ]
      , H.button
        [ A.class "modal-close is-large"
        , A.attribute "aria-label" "close"
        , E.onClick CloseFormModal
        ]
        []
      ]


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