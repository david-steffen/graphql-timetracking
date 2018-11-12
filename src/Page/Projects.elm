module Page.Projects exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Date exposing (..)
import Uuid exposing (Uuid)
import Types exposing (Model)
import GraphQL.Client.Http as GraphQLClient
import Types.Project exposing 
  ( Project
  , ProjectModel
  , CreateProjectForm
  , ProjectDeleteMutationResult
  )
import Task
import Page exposing (InputLength(..), formInput, formSelect)
import Api exposing (sendMutationRequest)
import Api.Project exposing 
  ( createProjectMutation
  , updateProjectMutation
  , deleteProjectMutation
  , processCreateProjectInput
  , processUpdateProjectInput
  , processDeleteProjectInput
  )
import Array exposing (Array)


init : ProjectModel
init =
  { readyProjects = False
  , projects = Array.empty
  , errResult = Nothing
  , isPending = False
  , deleteId = Nothing
  }

type Msg  
  = ReceiveDeleteProjectMutationResponse (Result GraphQLClient.Error ProjectDeleteMutationResult)
  | DeleteProject Uuid
  | SubmitDeleteProject
  | CloseFormModal

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ timelogModel, projectModel } as model) =
  case msg of
    ReceiveDeleteProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { projectModel 
          | isPending = False
          , deleteId = Nothing
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveDeleteProjectMutationResponse (Ok response) ->
      let
        projects = Array.filter (\x -> response.projectId /= x.id) projectModel.projects
        timelogs = Array.filter (\x -> response.projectId /= x.project.id) timelogModel.timelogs
        newProjectModel = 
          { projectModel 
          | projects = projects
          , isPending = False
          , deleteId = Nothing
          }
        newTimelogModel = 
          { timelogModel
          | timelogs = timelogs
          }
      in
        ( { model | projectModel = newProjectModel, timelogModel = newTimelogModel}
        , Cmd.none
        )
    DeleteProject id ->
      ( passToModel 
        { projectModel 
        | deleteId = Just id
        }
        model
      , Cmd.none
      )
    SubmitDeleteProject ->
      ( passToModel 
        { projectModel 
        | isPending = True
        }
        model
      , sendDeleteProjectMutation model
      )
    CloseFormModal ->
      ( passToModel 
        { projectModel 
        | deleteId = Nothing
        }
        model
      , Cmd.none
      )

passToModel : ProjectModel -> Model -> Model
passToModel projectModel model =
  { model | projectModel = projectModel }

sendDeleteProjectMutation : Model -> Cmd Msg
sendDeleteProjectMutation ({projectModel} as model) =
  case projectModel.deleteId of 
    Just id ->
      sendMutationRequest model.csrf (deleteProjectMutation <| processDeleteProjectInput id)
        |> Task.attempt ReceiveDeleteProjectMutationResponse
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
          [ H.text "Projects"]
        ]
      , H.div
        [ A.class "level-right" ]
        [ H.a
          [ A.class "button is-success" 
          , A.href "/projects/add"
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
      [ projectList model ]
    , formModal model
    ]

projectView: Int -> Project -> Html Msg
projectView index project =
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
          [ H.text project.abbreviation
          ]
        ]
      , H.div
        [ A.class "media-content" ]
        [ H.div
          [ A.class "content" ]
          [ H.p
            [ A.class "has-text-weight-bold" ]
            [ H.text project.name
            , H.br [] []
            , H.text project.company
            ]
          ]
        ]
      ]
    , actions index project.id
    ]

projectForm : Model -> Html Msg
projectForm ( {projectModel} as model) = 
  deleteProjectForm model

projectList : Model -> Html Msg
projectList model =
  H.div
    [ A.class "row-group"  ]
    (List.indexedMap projectView <| Array.toList model.projectModel.projects)

actions : Int -> Uuid -> Html Msg
actions index id =
  H.div
    []
    [ H.a
      [ A.class "icon"
      , A.href <| "/projects/edit/" ++ (Uuid.toString id)
      ]
      [ H.span
        [ A.class "fas fa-pen"
        ]
        []
      ]
    , H.span
      [ A.class "delete"
      , E.onClick <| DeleteProject id
      ]
      []
    ]

formModal : Model -> Html Msg
formModal model =
  let
    showModal =
      case model.projectModel.deleteId of 
        Just val ->
          True
        Nothing ->
          False
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
          [ projectForm model ]
        ]
      , H.button
        [ A.class "modal-close is-large"
        , A.attribute "aria-label" "close"
        , E.onClick CloseFormModal
        ]
        []
      ]

deleteProjectForm : Model -> Html Msg
deleteProjectForm ( {projectModel} as model) =
  let
    button = 
      case projectModel.isPending of
        True ->
          H.button
            [ A.class "button is-primary is-loading"
            , A.attribute "disabled" "disabled"
            ]
            [ H.text "Confirm" ]
        False ->
          H.button
            [ A.class "button is-primary"
            , E.onClick <| SubmitDeleteProject
            ]
            [ H.text "Confirm" ]
  in
    H.div 
      []
      [ H.h3
        [ A.class "title" ]
        [ H.text "Delete" ]
      , H.p
        [ A.class "field" ]
        [ H.text "Are you sure you want to delete this project?" ]
      , H.p
        [ A.class "field" ]
        [ H.text "You will lose all data associated with this project including the times logged against it" ]
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
