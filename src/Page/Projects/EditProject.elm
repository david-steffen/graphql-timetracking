module Page.Projects.EditProject exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Uuid exposing (Uuid)
import GraphQL.Client.Http as GraphQLClient
import Types exposing (Model)
import Types.Project exposing 
  ( Project
  , ProjectWithMembers
  , EditProjectModel
  , ProjectMutationResult
  )
import Types.User exposing (User)
import Task
import Page exposing 
  ( InputLength(..)
  , formInput
  , formSelect
  , membersSelect
  )
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
  , addMembers = []
  , removeMembers = []
  }

type Msg  
  = SubmitEditProject
  | ReceiveUpdateProjectMutationResponse (Result GraphQLClient.Error ProjectMutationResult)
  | InputUpdateProjectName String
  | InputUpdateProjectAbbreviation String
  | InputUpdateProjectColour String
  | InputUpdateProjectCompany String
  | CancelEdit
  | AddMembers User
  | RemoveMembers User


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
      sendMutationRequest model.csrf 
        ( updateProjectMutation 
          <| processUpdateProjectInput updateForm editProjectModel.addMembers editProjectModel.removeMembers
        )
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
          updateProjectForm form model
        Nothing ->
          H.div [] []
    ]


updateProjectForm : ProjectWithMembers -> Model -> Html Msg
updateProjectForm form ({editProjectModel, userModel} as model) =
  let
    button = 
      case editProjectModel.isPending of
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
    H.div 
      []
      [ H.h3
        [ A.class "title" ]
        [ H.text "Update" ]
      , formInput "text" "Name" InputUpdateProjectName (Just form.name) Full
      , formInput "text" "Company" InputUpdateProjectCompany (Just form.company) Full
      , formInput "text" "Abbreviation" InputUpdateProjectAbbreviation (Just form.abbreviation) Full
      , formInput "color" "Colour" InputUpdateProjectColour (Just form.colour) Short
      , membersSelect members availableUsers RemoveMembers AddMembers
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

-- membersSelect : ProjectWithMembers -> Model -> Html Msg
-- membersSelect form ({editProjectModel, userModel} as model) = 
--   let
--     members =
--       List.append editProjectModel.addMembers form.members
--         |> List.filter (\user ->
--           not (List.member user editProjectModel.removeMembers)
--         )
--     availableUsers = 
--       List.filter (\user ->
--         not (List.member user members)
--       ) userModel.users
--   in
--     H.div
--       []
--       [ H.div
--         []
--         [ H.h4
--           [ A.class "title is-4" ]
--           [ H.text "Assigned" ]
--         , H.div
--           []
--           ( List.map 
--             (\user -> 
--               H.div 
--                 [ E.onClick <| RemoveMembers user ] 
--                 [ H.text <| fullNameString user ]
--             ) 
--             members
--           )
--         ]
--       , H.div 
--         []
--         [ H.h4
--           [ A.class "title is-4" ]
--           [ H.text "Available" ]
--         , if List.isEmpty availableUsers then
--             H.p 
--               [ A.class "subtitle has-text-centered" ] 
--               [ H.text "No users to add" ]
--           else
--             H.div
--               []
--               ( List.map 
--                 (\user -> 
--                   H.div 
--                     [ E.onClick <| AddMembers user ] 
--                     [ H.text <| fullNameString user ]
--                 ) 
--                 availableUsers
--               )
--         ]
--       ]
