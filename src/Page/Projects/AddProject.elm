module Page.Projects.AddProject exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Uuid exposing (Uuid)
import Types exposing (Model)
import GraphQL.Client.Http as GraphQLClient
import Types.Project exposing 
  ( Project
  , ProjectModel
  , CreateProjectForm
  , ProjectDeleteMutationResult
  , AddProjectModel
  )
import Task
import Page exposing (InputLength(..), formInput, formSelect)
import Api exposing (sendMutationRequest)
import Api.Project exposing 
  ( createProjectMutation
  , processCreateProjectInput
  )
import Array exposing (Array)
import Browser.Navigation as Nav


init : AddProjectModel
init =
  { errResult = Nothing
  , createForm = Nothing
  , isPending = False
  }

type Msg  
  = SubmitCreateProject
  | ReceiveCreateProjectMutationResponse (Result GraphQLClient.Error Project)
  | InputCreateProjectName String
  | InputCreateProjectAbbreviation String
  | InputCreateProjectColour String
  | InputCreateProjectCompany String
  | CancelAdd


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ addProjectModel, projectModel } as model) =
  case msg of
    SubmitCreateProject ->
      let
        newProjectModel = 
          { addProjectModel 
          | isPending = True
          }  
      in
        ( passToModel newProjectModel model
        , sendCreateProjectMutation model
        )
    ReceiveCreateProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { addProjectModel
          | isPending = False
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveCreateProjectMutationResponse (Ok response) ->
      let
        projects = Array.push response projectModel.projects
        newAddProjectModel = 
          { addProjectModel 
          | createForm = Nothing
          , isPending = False
          }
        newProjectModel =
          { projectModel 
          | projects = projects
          }
      in
        ( { model
          | addProjectModel = newAddProjectModel
          , projectModel = newProjectModel
          }
        , Cmd.none
        )
    InputCreateProjectName string ->
      let
        project = hasProjectForm addProjectModel.createForm
        newProject =
          { project
          | name = string
          }
      in
        ( passToModel 
          { addProjectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    InputCreateProjectAbbreviation string ->
      let
        project = hasProjectForm addProjectModel.createForm
        newProject =
          { project
          | abbreviation = string
          }
      in
        ( passToModel 
          { addProjectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    InputCreateProjectColour string ->
      let
        project = hasProjectForm addProjectModel.createForm
        newProject =
          { project
          | colour = string
          }
      in
        ( passToModel 
          { addProjectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    InputCreateProjectCompany string ->
      let
        project = hasProjectForm addProjectModel.createForm
        newProject =
          { project
          | company = string
          }
      in
        ( passToModel 
          { addProjectModel 
          | createForm = Just newProject
          }
          model
        , Cmd.none
        )
    CancelAdd ->
      let
        newAddProjectModel = 
          { addProjectModel
          | createForm = Nothing
          }
      in
        ( { model 
          | addProjectModel = newAddProjectModel 
          }
        , Nav.pushUrl model.key "/projects" )

hasProjectForm : Maybe CreateProjectForm -> CreateProjectForm
hasProjectForm project =
  case project of 
    Just value ->
      value
    Nothing ->
      CreateProjectForm "" "" "" ""

passToModel : AddProjectModel -> Model -> Model
passToModel addProjectModel model =
  { model | addProjectModel = addProjectModel }

sendCreateProjectMutation : Model -> Cmd Msg
sendCreateProjectMutation  ({addProjectModel} as model) =
  case addProjectModel.createForm of 
    Just createForm ->
      sendMutationRequest model.csrf (createProjectMutation <| processCreateProjectInput createForm)
        |> Task.attempt ReceiveCreateProjectMutationResponse
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
      ]
    , createProjectForm model
    ]

createProjectForm : Model -> Html Msg
createProjectForm ({addProjectModel} as model) =
  let
    button = 
      case addProjectModel.isPending of
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
            , E.onClick CancelAdd
            ]
            [ H.text "Cancel" ]
          ]
        ]
      ]