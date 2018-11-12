module Page.Projects.EditProject exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Uuid exposing (Uuid)
import Types exposing (Model)
import GraphQL.Client.Http as GraphQLClient
import Types.Project exposing 
  ( Project
  , ProjectWithMembers
  , EditProjectModel
  , ProjectMutationResult
  )
import Task
import Page exposing (InputLength(..), formInput, formSelect)
import Api exposing (sendMutationRequest)
import Api.Project exposing 
  ( updateProjectMutation
  , processUpdateProjectInput
  )
import Array exposing (Array)
import Browser.Navigation as Nav

init : EditProjectModel
init =
  { errResult = Nothing
  , updateForm = Nothing
  , isPending = False
  }

type Msg  
  = SubmitEditProject
  | ReceiveUpdateProjectMutationResponse (Result GraphQLClient.Error ProjectMutationResult)
  | InputUpdateProjectName String
  | InputUpdateProjectAbbreviation String
  | InputUpdateProjectColour String
  | InputUpdateProjectCompany String
  | CancelEdit


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ projectModel, editProjectModel } as model) =
  case msg of
    ReceiveUpdateProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { editProjectModel 
          | isPending = False
          }  
      in
        ( passToModel newProjectModel model
        , Cmd.none
        )
    ReceiveUpdateProjectMutationResponse (Ok response) ->
      let
        projectPositions = 
          Array.indexedMap (\i x ->
              (i, x.id)
            )
            projectModel.projects 
        projectPosition = Array.filter (\x -> (Tuple.second x) == response.project.id) projectPositions
        projectIndex = 
          case Array.get 0 projectPosition of 
            Just val ->
              Tuple.first val
            Nothing ->
              0
        projects = Array.set projectIndex response.project projectModel.projects
        newProjectModel = 
          { projectModel
          | projects = projects
          }
        
        newEditProjectModel = 
          { editProjectModel
          | updateForm = Nothing
          , isPending = False
          }
      in
        ( { model 
          | projectModel = newProjectModel
          , editProjectModel = newEditProjectModel
          }
        , redirectToProjectsPage model
        )
    SubmitEditProject ->
      let
        newProjectModel = 
          { editProjectModel 
          | isPending = True
          }  
      in
        ( passToModel newProjectModel model
        , sendUpdateProjectMutation model
        )
    InputUpdateProjectName string ->
      case editProjectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | name = string
              }
          in
            ( passToModel 
              { editProjectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateProjectAbbreviation string ->
      case editProjectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | abbreviation = string
              }
          in
            ( passToModel 
              { editProjectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateProjectColour string ->
      case editProjectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | colour = string
              }
          in
            ( passToModel 
              { editProjectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    InputUpdateProjectCompany string ->
      case editProjectModel.updateForm of 
        Just updateForm ->
          let
            newProject =
              { updateForm
              | company = string
              }
          in
            ( passToModel 
              { editProjectModel 
              | updateForm = Just newProject
              }
              model
            , Cmd.none
            )
        Nothing ->
          ( model, Cmd.none )
    CancelEdit ->
      let
        newEditProjectModel = 
          { editProjectModel
          | updateForm = Nothing
          }
      in
        ( { model 
          | editProjectModel = newEditProjectModel 
          }
        , redirectToProjectsPage model)

redirectToProjectsPage : Model -> Cmd Msg
redirectToProjectsPage model =
  Nav.pushUrl model.key "/projects"


passToModel : EditProjectModel -> Model -> Model
passToModel projectModel model =
  { model | editProjectModel = projectModel }


sendUpdateProjectMutation : Model -> Cmd Msg
sendUpdateProjectMutation  ({editProjectModel} as model) =
  case editProjectModel.updateForm of 
    Just updateForm ->
      sendMutationRequest model.csrf (updateProjectMutation <| processUpdateProjectInput updateForm)
        |> Task.attempt ReceiveUpdateProjectMutationResponse
    Nothing ->
      Cmd.none

view : Model -> Html Msg
view ({editProjectModel} as model) =
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
        []
        ]
    , case editProjectModel.updateForm of
        Just form ->
          updateProjectForm form editProjectModel.isPending
        Nothing ->
          H.div [] []
    ]


updateProjectForm : ProjectWithMembers -> Bool -> Html Msg
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
            , E.onClick CancelEdit
            ]
            [ H.text "Cancel" ]
          ]
        ]
      ]


members membersList = 
  H.div
    []
    []

