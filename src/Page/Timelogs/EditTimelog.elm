module Page.Timelogs.EditTimelog exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Types exposing (Model)
import Types.Timelog exposing 
  ( Timelog
  , TimelogModel
  , EditTimelogRequest
  , EditTimelogModel
  , TimelogsWithProjectsRequest
  , UpdateTimelogInput
  , UpdateTimelogForm
  , TimelogMutationResult
  , TimelogDeleteMutationResult
  )
import Types.Project exposing (Project)
import Date exposing (Unit(..), Interval(..), Date)
import Set exposing (Set)
import Tuple exposing (..)
import Uuid exposing (Uuid)
import GraphQL.Client.Http as GraphQLClient
import Api exposing (sendQueryRequest, sendMutationRequest)
import Api.Timelog exposing 
  ( processUpdateTimelogInput
  , processDeleteTimelogInput
  , editTimelogQuery
  , updateTimelogMutation
  , deleteTimelogMutation
  )
import Task
import Utils.TimeDelta as TimeDelta exposing (TimeDelta)
import Page exposing (InputLength(..), formInput, formSelect, formTextArea, modal)
import Date exposing (Date)
import Array exposing (..)
import Browser.Navigation as Nav

init : EditTimelogModel
init =
  { errResult = Nothing
  , updateForm = Nothing
  , isPending = False
  , showModal = False
  }

type Msg  
  = SubmitEditTimelog
  | ReceiveUpdateTimelogMutationResponse (Result GraphQLClient.Error TimelogMutationResult)
  | InputUpdateTimelogDescription String
  | InputUpdateTimelogDate String
  | InputUpdateTimelogDuration String
  | InputUpdateTimelogProject String
  | ReceiveDeleteTimelogMutationResponse (Result GraphQLClient.Error TimelogDeleteMutationResult)
  | DeleteTimelog
  | SubmitDeleteTimelog
  | CancelEdit
  | CloseFormModal

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({editTimelogModel, timelogModel, projectModel} as model) =
  case msg of
    ReceiveUpdateTimelogMutationResponse (Err err) ->
      let
        newModel = 
          { model
          | errorMsg = Just err
          }
        newTimelogModel = 
          { editTimelogModel 
          | isPending = False
          }  
      in
        ( passToModel newTimelogModel newModel
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
          }
        newEditTimelogModel = 
          { editTimelogModel 
          | updateForm = Nothing
          , isPending = False
          }
      in
        ( { model
          | timelogModel = newTimelogModel
          , editTimelogModel = newEditTimelogModel
          }
        , redirectToTimelogsPage model
        )
    SubmitEditTimelog ->
      let
        newTimelogModel = 
          { editTimelogModel 
          | isPending = True
          }  
      in
        ( passToModel newTimelogModel model
        , sendUpdateTimelogMutation model
        )
    InputUpdateTimelogDescription string ->
      case editTimelogModel.updateForm of 
        Just updateForm ->
          let
            newTimelog =
              { updateForm
                | description = string
              }
          in
            ( passToModel 
              { editTimelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateTimelogDate string ->
      case editTimelogModel.updateForm of 
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
              { editTimelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateTimelogDuration string ->
      case editTimelogModel.updateForm of 
        Just updateForm ->
          let
            timeDelta = TimeDelta.parse string |> Result.toMaybe
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
              { editTimelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateTimelogProject string ->
      case editTimelogModel.updateForm of 
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
              { editTimelogModel | updateForm = Just newTimelog }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    ReceiveDeleteTimelogMutationResponse (Err err) ->
      let
        newModel = 
          { model
          | errorMsg = Just err
          }
        newEditTimelogModel = 
          { editTimelogModel 
          | isPending = False
          }  
      in
        ( passToModel newEditTimelogModel newModel
        , Cmd.none
        )
    ReceiveDeleteTimelogMutationResponse (Ok response) ->
      let
        timelogs = Array.filter (\x -> response.timelogId /= x.id) timelogModel.timelogs
        newTimelogModel = 
          { timelogModel 
          | timelogs = timelogs
          }
        newEditTimelogModel = 
          { editTimelogModel
          | isPending = False
          , showModal = False
          }
      in
        ( { model 
          | timelogModel = newTimelogModel
          , editTimelogModel = newEditTimelogModel
          }
        , redirectToTimelogsPage model
        )
    DeleteTimelog ->
      ( passToModel 
        { editTimelogModel 
        | showModal = True
        }
        model
      , Cmd.none
      )
    SubmitDeleteTimelog->
      ( passToModel 
        { editTimelogModel 
        | isPending = True
        }
        model
      , sendDeleteTimelogMutation model
      )
    CancelEdit ->
      let
        newEditTimelogModel = 
          { editTimelogModel
          | updateForm = Nothing
          }
      in
        ( { model 
          | editTimelogModel = newEditTimelogModel 
          }
        , redirectToTimelogsPage model
        )
    CloseFormModal ->
      ( passToModel 
        { editTimelogModel 
        | showModal = False
        }
        model
      , Cmd.none
      )


redirectToTimelogsPage : Model -> Cmd Msg
redirectToTimelogsPage model =
  Nav.back model.key 1


passToModel : EditTimelogModel -> Model -> Model
passToModel timelogModel model =
  { model | editTimelogModel = timelogModel }


sendEditTimelogQuery : String -> Uuid -> (Result GraphQLClient.Error EditTimelogRequest -> msg) -> Cmd msg
sendEditTimelogQuery csrf uuid msg =
  sendQueryRequest csrf (editTimelogQuery uuid)
    |> Task.attempt msg

sendUpdateTimelogMutation : Model -> Cmd Msg
sendUpdateTimelogMutation  ({editTimelogModel} as model) =
  case editTimelogModel.updateForm of 
    Just updateForm ->
      sendMutationRequest model.csrf (updateTimelogMutation <| processUpdateTimelogInput updateForm)
        |> Task.attempt ReceiveUpdateTimelogMutationResponse
    Nothing ->
      Cmd.none

sendDeleteTimelogMutation : Model -> Cmd Msg
sendDeleteTimelogMutation ({editTimelogModel} as model) =
  case editTimelogModel.updateForm of 
    Just form ->
      sendMutationRequest model.csrf (deleteTimelogMutation <| processDeleteTimelogInput form.id)
        |> Task.attempt ReceiveDeleteTimelogMutationResponse
    Nothing ->
      Cmd.none

view : Model -> Html Msg
view ({editTimelogModel} as model) =
  Html.div 
    [] 
    [ Html.div
      [ Attributes.class "level" ]
      [ Html.div
        [ Attributes.class "level-left" ]
        [ Html.h2 
          [ Attributes.class "title" 
          ] 
          [ Html.text "Times"]
        ]
      , Html.div
        [ Attributes.class "level-right" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ case editTimelogModel.updateForm of
            Just form ->
              Html.button
                [ Attributes.class "button is-danger" 
                , Events.onClick <| DeleteTimelog
                ]
                [ Html.span
                  [ Attributes.class "icon is-small" ]
                  [ Html.span
                    [ Attributes.class "fas fa-times-circle" ]
                    []
                  ]
                , Html.span
                  []
                  [ Html.text "Delete" ]
                ]
            Nothing ->
              Html.div 
                []
                []
          ]
        ]
      ]
    , case editTimelogModel.updateForm of
        Just form ->
          updateTimelogForm form model
        Nothing ->
          case editTimelogModel.isPending of 
            False ->
              Html.div 
                []
                [ Html.h3
                  [ Attributes.class "title is-5 has-text-centered" ]
                  [ Html.text "No time log to edit" ]
                ]
            True -> 
              Html.div [] []
    , modal 
        deleteTimelogForm
        model
        editTimelogModel.showModal
        CancelEdit
    ]


updateTimelogForm : UpdateTimelogForm -> Model -> Html Msg
updateTimelogForm form ({editTimelogModel, projectModel} as model) =
  let
    button = 
      case editTimelogModel.isPending of
        True ->
          Html.button
            [ Attributes.class "button is-primary is-loading"
            , Attributes.attribute "disabled" "disabled"
            ]
            [ Html.text "Submit" ]
        False ->
          Html.button
            [ Attributes.class "button is-primary"
            , Events.onClick <| SubmitEditTimelog
            ]
            [ Html.text "Submit" ]
  in
    Html.div 
      []
      [ Html.h3
        [ Attributes.class "title" ]
        [ Html.text "Update" ]
      , formTextArea "Description" InputUpdateTimelogDescription (Just form.description) Full
      , formInput "date" "Date" InputUpdateTimelogDate (Just (Date.toIsoString form.date)) Full
      , formSelect (List.map (\project -> {value = Uuid.toString project.id, title = project.name}) (Array.toList projectModel.projects)) InputUpdateTimelogProject ( Just (Uuid.toString form.project)) Full
      , formInput "time" "Duration" InputUpdateTimelogDuration (Just (TimeDelta.toString form.duration)) Short
      , Html.div 
        [ Attributes.class "field" ]
        [ Html.div 
          [ Attributes.class "control" ]
          [ Html.div
            [ Attributes.class "buttons" ]
            [ button
            , Html.button
              [ Attributes.class "button is-text"
              , Events.onClick CancelEdit
              ]
              [ Html.text "Cancel" ]
            ]
          ]
        ]
      ]

deleteTimelogForm : Model -> Html Msg
deleteTimelogForm ( {editTimelogModel, projectModel} as model) =
  let
    button = 
      case editTimelogModel.isPending of
        True ->
          Html.button
            [ Attributes.class "button is-primary is-loading"
            , Attributes.attribute "disabled" "disabled"
            ]
            [ Html.text "Submit" ]
        False ->
          Html.button
            [ Attributes.class "button is-primary"
            , Events.onClick <| SubmitDeleteTimelog
            ]
            [ Html.text "Submit" ]
  in
    Html.div 
      []
      [ Html.h3
        [ Attributes.class "title" ]
        [ Html.text "Delete" ]
      , Html.p
        [ Attributes.class "field" ]
        [ Html.text "Are you sure you want to delete this log?" ]
      , Html.div 
        [ Attributes.class "field" ]
        [ Html.div 
          [ Attributes.class "control" ]
          [ Html.div
            [ Attributes.class "buttons" ]
            [ button
            , Html.button
              [ Attributes.class "button is-text"
              , Events.onClick CloseFormModal
              ]
              [ Html.text "Cancel" ]
            ]
          ]
        ]
      ]