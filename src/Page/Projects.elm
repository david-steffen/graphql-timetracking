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
  , ProjectFormAction(..)
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
  , createForm = Nothing
  , updateForm = Nothing
  , formAction = Noop
  , isPendingProject = False
  , selectedIndex = Nothing
  , deleteId = Nothing
  }

type Msg  
  = CreateProject
  | SubmitCreateProject
  | ReceiveCreateProjectMutationResponse (Result GraphQLClient.Error Project)
  | ReceiveUpdateProjectMutationResponse (Result GraphQLClient.Error Project)
  | ReceiveDeleteProjectMutationResponse (Result GraphQLClient.Error ProjectDeleteMutationResult)
  | InputCreateProjectName String
  | InputCreateProjectAbbreviation String
  | InputCreateProjectColour String
  | InputCreateProjectCompany String
  | EditProject Int Uuid
  | SubmitEditProject
  | InputUpdateProjectName String
  | InputUpdateProjectAbbreviation String
  | InputUpdateProjectColour String
  | InputUpdateProjectCompany String
  | DeleteProject Uuid
  | SubmitDeleteProject
  | CloseFormModal

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ timelogModel, projectModel } as model) =
  case msg of
    CreateProject ->
      let
        newProjectModel = 
          { projectModel 
          | formAction = Create
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    SubmitCreateProject ->
      let
        newProjectModel = 
          { projectModel 
          | isPendingProject = True
          }  
      in
        ( passToModel newProjectModel model
        , sendCreateProjectMutation model
        )
    ReceiveCreateProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { projectModel 
          | isPendingProject = False
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveCreateProjectMutationResponse (Ok response) ->
      let
        projects = Array.push response projectModel.projects
        newProjectModel = 
          { projectModel 
          | projects = projects
          , createForm = Nothing
          , formAction = Noop
          , isPendingProject = False
          }
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveUpdateProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { projectModel 
          | isPendingProject = False
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveUpdateProjectMutationResponse (Ok response) ->
      let
        index = projectModel.selectedIndex |> Maybe.withDefault 0
        projects = Array.set index response projectModel.projects
        newProjectModel = 
          { projectModel 
          | projects = projects
          , updateForm = Nothing
          , formAction = Noop
          , isPendingProject = False
          }
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveDeleteProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { projectModel 
          | isPendingProject = False
          , deleteId = Nothing
          , formAction = Noop
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
          , isPendingProject = False
          , deleteId = Nothing
          , formAction = Noop
          }
        newTimelogModel = 
          { timelogModel
          | timelogs = timelogs
          }
      in
        ( { model | projectModel = newProjectModel, timelogModel = newTimelogModel}
        , Cmd.none
        )
    InputCreateProjectName string ->
      let
        project = hasProjectForm projectModel.createForm
        newProject =
          { project
          | name = string
          }
      in
        ( passToModel 
          { projectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    InputCreateProjectAbbreviation string ->
      let
        project = hasProjectForm projectModel.createForm
        newProject =
          { project
          | abbreviation = string
          }
      in
        ( passToModel 
          { projectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    InputCreateProjectColour string ->
      let
        project = hasProjectForm projectModel.createForm
        newProject =
          { project
          | colour = string
          }
      in
        ( passToModel 
          { projectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    InputCreateProjectCompany string ->
      let
        project = hasProjectForm projectModel.createForm
        newProject =
          { project
          | company = string
          }
      in
        ( passToModel 
          { projectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    EditProject index id ->
      let
        newProjectModel = 
          { projectModel 
          | updateForm = Array.get index projectModel.projects
          , formAction = Update
          , selectedIndex = Just index
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    SubmitEditProject ->
      let
        newProjectModel = 
          { projectModel 
          | isPendingProject = True
          }  
      in
        ( passToModel newProjectModel model
        , sendUpdateProjectMutation model
        )
    InputUpdateProjectName string ->
      case projectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | name = string
              }
          in
            ( passToModel 
              { projectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateProjectAbbreviation string ->
      case projectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | abbreviation = string
              }
          in
            ( passToModel 
              { projectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateProjectColour string ->
      case projectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | colour = string
              }
          in
            ( passToModel 
              { projectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateProjectCompany string ->
      case projectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | company = string
              }
          in
            ( passToModel 
              { projectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    DeleteProject id ->
      ( passToModel 
        { projectModel 
        | deleteId = Just id
        , formAction = Delete
        }
        model
      , Cmd.none
      )
    SubmitDeleteProject ->
      ( model, sendDeleteProjectMutation model )
    CloseFormModal ->
      ( passToModel 
        { projectModel 
        | formAction = Noop 
        , updateForm = Nothing
        , createForm = Nothing
        , deleteId = Nothing
        }
        model
      , Cmd.none
      )

hasProjectForm : Maybe CreateProjectForm -> CreateProjectForm
hasProjectForm project =
  case project of 
    Just value ->
      value
    Nothing ->
      CreateProjectForm "" "" "" ""

passToModel : ProjectModel -> Model -> Model
passToModel projectModel model =
  { model | projectModel = projectModel }

sendCreateProjectMutation : Model -> Cmd Msg
sendCreateProjectMutation  ({projectModel} as model) =
  case projectModel.createForm of 
    Just createForm ->
      sendMutationRequest model.csrf (createProjectMutation <| processCreateProjectInput createForm)
        |> Task.attempt ReceiveCreateProjectMutationResponse
    Nothing ->
      Cmd.none

sendUpdateProjectMutation : Model -> Cmd Msg
sendUpdateProjectMutation  ({projectModel} as model) =
  case projectModel.updateForm of 
    Just updateForm ->
      sendMutationRequest model.csrf (updateProjectMutation <| processUpdateProjectInput updateForm)
        |> Task.attempt ReceiveUpdateProjectMutationResponse
    Nothing ->
      Cmd.none

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
        [ H.button
          [ A.class "button is-success" 
          , E.onClick CreateProject
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
  case projectModel.formAction of 
    Noop ->
      H.div [] []
    Create ->
      createProjectForm model
    Update ->
      case projectModel.updateForm of
        Just form ->
          updateProjectForm form projectModel.isPendingProject
        Nothing ->
          createProjectForm model
    Delete ->
      deleteProjectForm model

createProjectForm : Model -> Html Msg
createProjectForm ({projectModel} as model) =
  let
    button = 
      case projectModel.isPendingProject of
        True ->
          H.button
            [ A.class "button is-primary is-loading"
            , A.attribute "disabled" "disabled"
            ]
            [ H.text "Submit" ]
        False ->
          H.button
            [ A.class "button is-primary"
            , E.onClick SubmitCreateProject
            ]
            [ H.text "Submit" ]
  in
    H.div 
      []
      [ H.h3
        [ A.class "title" ]
        [ H.text "Add" ]
      , formInput "text" "Name" InputCreateProjectName Nothing Full
      , formInput "text" "Company" InputCreateProjectCompany Nothing Full
      , formInput "text" "Abbreviation" InputCreateProjectAbbreviation Nothing Full
      , formInput "color" "Colour" InputCreateProjectColour Nothing Short
      , H.div [ A.class "field" ]
        [ H.div [ A.class "control" ]
          [ button
          , H.button
            [ A.class "button is-text"
            , E.onClick CloseFormModal
            ]
            [ H.text "Cancel" ]
          ]
        ]
      ]

updateProjectForm : Project -> Bool -> Html Msg
updateProjectForm form isPending =
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
            , E.onClick SubmitEditProject
            ]
            [ H.text "Submit" ]
  in
    H.div 
      []
      [ H.h3
        [ A.class "title" ]
        [ H.text "Update" ]
      , formInput "text" "Name" InputUpdateProjectName (Just form.name) Full
      , formInput "text" "Company" InputUpdateProjectCompany (Just form.company) Full
      , formInput "text" "Abbreviation" InputUpdateProjectAbbreviation (Just form.abbreviation) Full
      , formInput "color" "Colour" InputUpdateProjectColour (Just form.colour) Short
      , H.div [ A.class "field" ]
        [ H.div [ A.class "control" ]
          [ button
          , H.button
            [ A.class "button is-text"
            , E.onClick CloseFormModal
            ]
            [ H.text "Cancel" ]
          ]
        ]
      ]


projectList : Model -> Html Msg
projectList model =
  H.div
    [ A.class "row-group"  ]
    (List.indexedMap projectView <| Array.toList model.projectModel.projects)

actions : Int -> Uuid -> Html Msg
actions index id =
  H.div
    []
    [ H.span
      [ A.class "icon" ]
      [ H.span
        [ A.class "fas fa-pen"
        , E.onClick <| EditProject index id
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
      case model.projectModel.formAction of 
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
      case projectModel.isPendingProject of
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
