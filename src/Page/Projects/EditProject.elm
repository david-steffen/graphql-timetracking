module Page.Projects.EditProject exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Uuid exposing (Uuid)
import GraphQL.Client.Http as GraphQLClient
import Types exposing (Model, Flags)
import Url
import Types.Project exposing 
  ( Project
  , ProjectWithMembers
  , EditProjectModel
  , ProjectMutationResult
  , ProjectDeleteMutationResult
  , EditProjectRequest
  )
import Types.User exposing (User)
import Task
import Page exposing 
  ( InputLength(..)
  , formInput
  , formSelect
  , membersSelect
  , modal
  )
import Api exposing (sendQueryRequest, sendMutationRequest)
import Api.Project exposing 
  ( editProjectQuery
  , updateProjectMutation
  , deleteProjectMutation
  , processUpdateProjectInput
  , processDeleteProjectInput
  )
import Array exposing (Array)
import Browser.Navigation as Nav
import Route exposing (..)

init : Flags -> Url.Url -> Nav.Key -> ( EditProjectModel, Cmd Msg )
init flags url key =
  let 
    route = Route.fromUrl url
  in
  ( { errResult = Nothing
    , updateForm = Nothing
    , isPending = False
    , addMembers = []
    , removeMembers = []
    , showModal = False
    }
  , case route of
      EditProjectR uuid ->
        sendEditProjectQuery flags.csrftoken uuid
      _ ->
        Cmd.none
  )

type Msg  
  = SubmitEditProject
  | ReceiveEditProjectResponse (Result GraphQLClient.Error EditProjectRequest)
  | ReceiveUpdateProjectMutationResponse (Result GraphQLClient.Error ProjectMutationResult)
  | InputUpdateProjectName String
  | InputUpdateProjectAbbreviation String
  | InputUpdateProjectColour String
  | InputUpdateProjectCompany String
  | CancelEdit
  | AddMembers User
  | RemoveMembers User
  | ReceiveDeleteProjectMutationResponse (Result GraphQLClient.Error ProjectDeleteMutationResult)
  | DeleteProject
  | SubmitDeleteProject
  | CloseFormModal


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ timelogModel, projectModel, editProjectModel, userModel } as model) =
  case msg of
    ReceiveEditProjectResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveEditProjectResponse (Ok response) ->
      let
        newProjectModel = 
          { editProjectModel | updateForm = Just response.project }
        newUserModel =
          { userModel | users = response.allUsers}
      in
        ( { model
          | editProjectModel = newProjectModel
          , userModel = newUserModel
          }
        , Cmd.none 
        )
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
          , addMembers = []
          , removeMembers = []
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
          , addMembers = []
          , removeMembers = []
          }
      in
        ( { model 
          | editProjectModel = newEditProjectModel 
          }
        , redirectToProjectsPage model)
    AddMembers user ->
      let
        newEditProjectModel = 
          if List.member user editProjectModel.removeMembers then
            let
              newRemoveMembers =
                List.filter (\usr ->
                  user /= usr
                  ) editProjectModel.removeMembers
            in
              { editProjectModel
              | removeMembers = newRemoveMembers 
              }
          else
            let
              newAddMembers = 
                user :: editProjectModel.addMembers
            in
              { editProjectModel
              | addMembers = newAddMembers 
              }
      in
        ( { model 
          | editProjectModel = newEditProjectModel 
          }
        , Cmd.none)
    RemoveMembers user ->
      let
        newEditProjectModel =
          if List.member user editProjectModel.addMembers then
            let 
              newAddMembers = List.filter (\usr ->
                user /= usr
                ) editProjectModel.addMembers
            in
              { editProjectModel
              | addMembers = newAddMembers 
              }
          else
            { editProjectModel
            | removeMembers = user :: editProjectModel.removeMembers
            }
      in
        ( { model 
          | editProjectModel = newEditProjectModel 
          }
        , Cmd.none)
    ReceiveDeleteProjectMutationResponse (Err err) ->
      let
        newProjectModel = 
          { editProjectModel 
          | isPending = False
          , showModal = False
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
          }
        newTimelogModel = 
          { timelogModel
          | timelogs = timelogs
          }
        newEditProjectModal =
          { editProjectModel
          | showModal = False
          }
      in
        ( { model 
          | projectModel = newProjectModel
          , timelogModel = newTimelogModel
          , editProjectModel = newEditProjectModal
          }
        , redirectToProjectsPage model
        )
    DeleteProject->
      ( passToModel 
        { editProjectModel 
        | showModal = True
        }
        model
      , Cmd.none
      )
    SubmitDeleteProject ->
      ( passToModel 
        { editProjectModel 
        | isPending = True
        }
        model
      , sendDeleteProjectMutation model
      )
    CloseFormModal ->
      ( passToModel 
        { editProjectModel 
        | showModal = False
        }
        model
      , Cmd.none
      )

redirectToProjectsPage : Model -> Cmd Msg
redirectToProjectsPage model =
  Nav.pushUrl model.key "/projects"


passToModel : EditProjectModel -> Model -> Model
passToModel projectModel model =
  { model | editProjectModel = projectModel }

sendEditProjectQuery : String -> Uuid -> Cmd Msg
sendEditProjectQuery csrf uuid =
  sendQueryRequest csrf (editProjectQuery uuid)
    |> Task.attempt ReceiveEditProjectResponse

sendUpdateProjectMutation : Model -> Cmd Msg
sendUpdateProjectMutation  ({editProjectModel} as model) =
  case editProjectModel.updateForm of 
    Just updateForm ->
      sendMutationRequest model.flags.csrftoken
        ( updateProjectMutation 
          <| processUpdateProjectInput updateForm editProjectModel.addMembers editProjectModel.removeMembers
        )
        |> Task.attempt ReceiveUpdateProjectMutationResponse
    Nothing ->
      Cmd.none

sendDeleteProjectMutation : Model -> Cmd Msg
sendDeleteProjectMutation ({editProjectModel} as model) =
  case editProjectModel.updateForm of 
    Just form ->
      sendMutationRequest model.flags.csrftoken (deleteProjectMutation <| processDeleteProjectInput form.id)
        |> Task.attempt ReceiveDeleteProjectMutationResponse
    Nothing ->
      Cmd.none

view : Model -> Html Msg
view ({editProjectModel} as model) =
  Html.div 
    [] 
    [ Html.div
      [ Attributes.class "level" ]
      [ Html.div
        [ Attributes.class "level-left" ]
        [ Html.h2 
          [ Attributes.class "title" 
          ] 
          [ Html.text "Projects"]
        ]
      , Html.div
        [ Attributes.class "level-right" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ case editProjectModel.updateForm of
            Just form ->
              Html.button
                [ Attributes.class "button is-danger" 
                , Events.onClick <| DeleteProject
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
              Html.div [] []
          ]
        ]
      ]
    , case editProjectModel.updateForm of
        Just form ->
          updateProjectForm form model
        Nothing ->
          Html.div [] []
    , modal 
        deleteProjectForm
        model
        editProjectModel.showModal
        CancelEdit
    ]


updateProjectForm : ProjectWithMembers -> Model -> Html Msg
updateProjectForm form ({editProjectModel, userModel} as model) =
  let
    button = 
      case editProjectModel.isPending of
        True ->
          Html.button
            [ Attributes.class "button is-primary is-loading"
            , Attributes.attribute "disabled" "disabled"
            ]
            [ Html.text "Submit" ]
        False ->
          Html.button
            [ Attributes.class "button is-primary"
            , Events.onClick SubmitEditProject
            ]
            [ Html.text "Submit" ]
    members =
      List.append editProjectModel.addMembers form.members
        |> List.filter (\user ->
          not (List.member user editProjectModel.removeMembers)
        )
    availableUsers = 
      List.filter (\user ->
        not (List.member user members)
      ) userModel.users
  in
    Html.div 
      []
      [ Html.h3
        [ Attributes.class "title" ]
        [ Html.text "Update" ]
      , formInput "text" "Name" InputUpdateProjectName (Just form.name) Full
      , formInput "text" "Company" InputUpdateProjectCompany (Just form.company) Full
      , formInput "text" "Abbreviation" InputUpdateProjectAbbreviation (Just form.abbreviation) Full
      , formInput "color" "Colour" InputUpdateProjectColour (Just form.colour) Short
      , membersSelect members availableUsers RemoveMembers AddMembers
      , Html.div [ Attributes.class "field" ]
        [ Html.div [ Attributes.class "control" ]
          [ button
          , Html.button
            [ Attributes.class "button is-text"
            , Events.onClick CancelEdit
            ]
            [ Html.text "Cancel" ]
          ]
        ]
      ]

deleteProjectForm : Model -> Html Msg
deleteProjectForm ( {editProjectModel} as model) =
  let
    button = 
      case editProjectModel.isPending of
        True ->
          Html.button
            [ Attributes.class "button is-primary is-loading"
            , Attributes.attribute "disabled" "disabled"
            ]
            [ Html.text "Confirm" ]
        False ->
          Html.button
            [ Attributes.class "button is-primary"
            , Events.onClick <| SubmitDeleteProject
            ]
            [ Html.text "Confirm" ]
  in
    Html.div 
      []
      [ Html.h3
        [ Attributes.class "title" ]
        [ Html.text "Delete" ]
      , Html.p
        [ Attributes.class "field" ]
        [ Html.text "Are you sure you want to delete this project?" ]
      , Html.p
        [ Attributes.class "field" ]
        [ Html.text "You will lose all data associated with this project including the times logged against it" ]
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
