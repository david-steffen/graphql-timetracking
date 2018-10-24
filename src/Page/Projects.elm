module Page.Projects exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Date exposing (..)
import Uuid exposing (Uuid)
import Types exposing (Model)
import GraphQL.Client.Http as GraphQLClient
import Types.Project exposing (Project, ProjectModel, CreateProjectInput)
import Task
import Page exposing (formInput, formSelect)
import Api exposing (sendMutationRequest)
import Api.Project exposing (projectMutation, processCreateProjectInput)


init : ProjectModel
init =
  { readyProjects = False
  , projects = []
  , errResult = Nothing
  , formProject = Nothing
  , isPendingProject = False
  }


type Msg  
  = CreateProject
  | ReceiveProjectMutationResponse (Result GraphQLClient.Error Project)
  | InputProjectName String
  | InputProjectAbbreviation String
  | InputProjectColour String
  | InputProjectCompany String

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ projectModel } as model) =
  case msg of
    CreateProject ->
      let
        newProjectModel = 
          { projectModel 
          | isPendingProject = True
          }  
      in
        ( passToModel newProjectModel model
        , sendProjectMutation model
        )
    ReceiveProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { projectModel 
          | isPendingProject = False
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveProjectMutationResponse (Ok response) ->
      let
        reversed = List.reverse projectModel.projects
        projects = response :: reversed
        newProjectModel = 
          { projectModel 
          | projects = List.reverse projects
          , formProject = Nothing
          , isPendingProject = False
          }
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    InputProjectName string ->
      let
        project = createProjectForm projectModel.formProject
        newProject =
          { project
          | name = string
          }
      in
        ( passToModel 
          { projectModel 
          | formProject = Just newProject
          }
          model
        , Cmd.none
        )
    InputProjectAbbreviation string ->
        let
            project = createProjectForm projectModel.formProject
            newProject =
                { project
                | abbreviation = string
                }
        in
          ( passToModel 
            { projectModel 
            | formProject = Just newProject
            }
            model
          , Cmd.none
          )
    InputProjectColour string ->
        let
            project = createProjectForm projectModel.formProject
            newProject =
                { project
                | colour = string
                }
        in
          ( passToModel 
            { projectModel 
            | formProject = Just newProject
            }
            model
          , Cmd.none
          )
    InputProjectCompany string ->
        let
            project = createProjectForm projectModel.formProject
            newProject =
                { project
                | company = string
                }
        in
          ( passToModel 
            { projectModel 
            | formProject = Just newProject
            }
            model
          , Cmd.none
          )

createProjectForm : Maybe CreateProjectInput -> CreateProjectInput
createProjectForm project =
  case project of 
    Just value ->
      value
    Nothing ->
      CreateProjectInput "" "" "" ""

passToModel : ProjectModel -> Model -> Model
passToModel projectModel model =
  { model | projectModel = projectModel }

sendProjectMutation : Model -> Cmd Msg
sendProjectMutation  ({projectModel} as model) =
  case projectModel.formProject of 
    Just formProject ->
      sendMutationRequest model.csrf (projectMutation <| processCreateProjectInput formProject)
        |> Task.attempt ReceiveProjectMutationResponse
    Nothing ->
      Cmd.none

view : Model -> Html Msg
view model =
  H.div 
    [] 
    [ H.h2 
      [ A.class "title" ]
      [ H.text "Projects" ]
    , H.div 
      []
      [ projectSide model ]
    , H.div 
      []
      [ projectList model ]
    ]

projectNode: Project -> Html Msg
projectNode project =
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
        ]

projectSide : Model -> Html Msg
projectSide model =
  H.div
    [ A.class "columns" ]
    [ H.div 
      [ A.class "column" ]
      []
    , projectForm model
    , H.div 
      [ A.class "column" ]
      []
    ]

projectForm : Model -> Html Msg
projectForm ({projectModel} as model) =
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
            , E.onClick CreateProject
            ]
            [ H.text "Submit" ]
  in
    H.div 
      [ A.class "column is-half" ]
      [ formInput "text" "Name" InputProjectName Nothing
      , formInput "text" "Company" InputProjectCompany Nothing
      , formInput "text" "Abbreviation" InputProjectAbbreviation Nothing
      , formInput "color" "Colour" InputProjectColour Nothing 
      , H.div [ A.class "field" ]
        [ H.div [ A.class "control" ]
          [ button
          ]
        ]
      ]


projectList : Model -> Html Msg
projectList model =
    H.div
        [ A.class "row-group"  ]
        (List.map projectNode model.projectModel.projects)

