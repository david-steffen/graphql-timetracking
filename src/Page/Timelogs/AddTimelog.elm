module Page.Timelogs.AddTimelog exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Browser.Navigation as Nav
import Types exposing (Model)
import Types.Timelog exposing 
  ( Timelog
  , TimelogModel
  , AddTimelogModel
  , TimelogsWithProjectsRequest
  , CreateTimelogInput
  , CreateTimelogForm
  , TimelogMutationResult
  )
import Types.Project exposing (Project)
import Utils.SimpleTime as SimpleTime exposing (..)
import Date exposing (Unit(..), Interval(..), Date)
import Uuid exposing (Uuid)
import GraphQL.Client.Http as GraphQLClient
import Api exposing (sendMutationRequest)
import Api.Timelog exposing 
  ( processCreateTimelogInput
  , createTimelogMutation
  )
import Utils.TimeDelta as TimeDelta exposing (TimeDelta)
import Page exposing (InputLength(..), formInput, formSelect, rangeFromDate, formTextArea)
import Array exposing (Array)
import Task exposing (Task)


init : AddTimelogModel
init =
  { errResult = Nothing
  , createForm = Nothing
  , isPending = False
  }


type Msg
  = SubmitCreateTimelog
  | ReceiveCreateTimelogMutationResponse (Result GraphQLClient.Error TimelogMutationResult)
  | InputCreateTimelogDescription String
  | InputCreateTimelogDate String
  | InputCreateTimelogDuration String
  | InputCreateTimelogProject String
  | CancelAdd


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({addTimelogModel, timelogModel, projectModel} as model) =
  case msg of
    SubmitCreateTimelog ->
      let
        newTimelogModel = 
          { addTimelogModel 
          | isPending = True
          }  
      in
        ( passToModel newTimelogModel model
        , sendCreateTimelogMutation model
        )
    ReceiveCreateTimelogMutationResponse (Err err) ->
      let
        newTimelogModel = 
          { addTimelogModel
          | isPending = False
          }  
      in
        ( passToModel newTimelogModel model
        , Cmd.none
        )
    ReceiveCreateTimelogMutationResponse (Ok response) ->
      let
        range = rangeFromDate timelogModel.filterDate timelogModel.filterView
        start = Tuple.first range
        end = Tuple.second range
        newAddTimelogModel =
          { addTimelogModel
          | createForm = Nothing
          , isPending = False
          }
      in
        if Date.isBetween start end response.timelog.date then
          let
            timelogs = Array.push response.timelog timelogModel.timelogs
            newTimelogModel = 
              { timelogModel 
              | timelogs = timelogs
              }
          in
            ( { model 
              | timelogModel = newTimelogModel
              , addTimelogModel = newAddTimelogModel
              }
            , redirectToTimelogsPage model
            )
        else 
          ( { model 
            | addTimelogModel = newAddTimelogModel
            }
          , redirectToTimelogsPage model
          )
    InputCreateTimelogDescription string ->
      let
        timelog = hasCreateTimelogForm addTimelogModel.createForm
        newTimelog =
          { timelog
              | description = string
          }
      in
        ( passToModel 
          { addTimelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    InputCreateTimelogDate string ->
      let
        timelog = hasCreateTimelogForm addTimelogModel.createForm
        newTimelog =
          { timelog
              | date = Date.fromIsoString string |> Result.toMaybe
          }
      in
        ( passToModel 
          { addTimelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    InputCreateTimelogDuration string ->
      let
        timelog = hasCreateTimelogForm addTimelogModel.createForm
        newTimelog =
            { timelog
                | duration = SimpleTime.parse string |> Result.toMaybe
            }
      in
        ( passToModel 
          { addTimelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    InputCreateTimelogProject string ->
      let
        timelog = hasCreateTimelogForm addTimelogModel.createForm
        newTimelog =
          { timelog
          | project = string
          }
      in
        ( passToModel 
          { addTimelogModel | createForm = Just newTimelog }
          model
        , Cmd.none
        )
    CancelAdd ->
      let
        newAddTimelogModel = 
          { addTimelogModel
          | createForm = Nothing
          }
      in
        ( { model 
          | addTimelogModel = newAddTimelogModel 
          }
        , redirectToTimelogsPage model )
    
redirectToTimelogsPage : Model -> Cmd Msg
redirectToTimelogsPage model =
  Nav.pushUrl model.key "/"

hasCreateTimelogForm : Maybe CreateTimelogForm -> CreateTimelogForm
hasCreateTimelogForm timelog =
  case timelog of 
    Just value ->
      value
    Nothing ->
      CreateTimelogForm "" Nothing Nothing ""

passToModel : AddTimelogModel -> Model -> Model
passToModel addTimelogModel model =
  { model | addTimelogModel = addTimelogModel }

sendCreateTimelogMutation : Model -> Cmd Msg
sendCreateTimelogMutation  ({addTimelogModel} as model) =
  case addTimelogModel.createForm of 
    Just createForm ->
      sendMutationRequest model.csrf (createTimelogMutation <| processCreateTimelogInput createForm)
        |> Task.attempt ReceiveCreateTimelogMutationResponse
    Nothing ->
      Cmd.none

    
view : Model -> Html Msg
view model =
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
      ]
    , createTimelogForm model 
    ]

createTimelogForm : Model -> Html Msg
createTimelogForm ( {addTimelogModel, projectModel} as model) =
  let
    button = 
      case addTimelogModel.isPending of
        True ->
          Html.button
            [ Attributes.class "button is-primary is-loading"
            , Attributes.attribute "disabled" "disabled"
            ]
            [ Html.text "Submit" ]
        False ->
          Html.button
            [ Attributes.class "button is-primary"
            , Events.onClick SubmitCreateTimelog
            ]
            [ Html.text "Submit" ]
  in
    Html.div 
      []
      [ Html.h3
        [ Attributes.class "title" ]
        [ Html.text "Add" ]
      , formTextArea "Description" InputCreateTimelogDescription Nothing Full
      , formInput "date" "Date" InputCreateTimelogDate Nothing Full
      , formSelect (List.map (\project -> {value = Uuid.toString project.id, title = project.name}) (Array.toList projectModel.projects)) InputCreateTimelogProject Nothing Full
      , formInput "time" "Duration" InputCreateTimelogDuration Nothing Short
      , Html.div [ Attributes.class "field" ]
        [ Html.div 
          [ Attributes.class "control" ]
          [ Html.div
            [ Attributes.class "buttons" ]
            [ button
            , Html.button
              [ Attributes.class "button is-text"
              , Events.onClick CancelAdd
              ]
              [ Html.text "Cancel" ]
            ]
          ]
        ]
      ]



