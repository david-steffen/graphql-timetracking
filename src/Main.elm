module Main exposing (Msg)

import Browser
import Browser.Navigation as Nav
import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Url
import Route exposing (..)
import Page.Timelogs as Timelogs exposing (..)
import Page.Projects as Projects exposing (..)
import Page.Projects.AddProject as AddProject exposing (..)
import Page.Projects.EditProject as EditProject exposing (..)
import Page.Users as Users exposing (..)
import Page.About as About exposing (..)
import Page.NotFound as NotFound exposing (..)
import Json.Decode as JD exposing (..)
import Api exposing (sendQueryRequest)
import Api.Timelog exposing (timelogsQuery, timelogsWithProjectsQuery)
import Api.Project exposing (projectsQuery, projectQuery, editProjectQuery)
import GraphQL.Client.Http as GraphQLClient
import Task exposing (Task)
import Types exposing (Model, Flags)
import Types.Timelog exposing (TimelogsRequest, TimelogsWithProjectsRequest)
import Types.Project exposing (Project, ProjectWithMembers, ProjectsRequest, EditProjectRequest)
import Array exposing (Array)
import Uuid exposing (Uuid)
-- MAIN


main : Program Flags Model Msg
main =
  Browser.application
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    , onUrlChange = UrlChanged
    , onUrlRequest = LinkClicked
    }

-- MODEL


init : Flags -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
  handleRoute
    { key = key
    , url = url
    , csrf = flags.csrftoken
    , timelogModel = Timelogs.init
    , projectModel = Projects.init
    , addProjectModel = AddProject.init
    , editProjectModel = EditProject.init
    , userModel = Users.init
    , showMenu = False
    }


-- UPDATE


type Msg
  = LinkClicked Browser.UrlRequest
  | UrlChanged Url.Url
  | TimelogMsg Timelogs.Msg
  | ProjectMsg Projects.Msg
  | AddProjectMsg AddProject.Msg
  | EditProjectMsg EditProject.Msg
  | UserMsg Users.Msg
  | ReceiveTimelogsResponse (Result GraphQLClient.Error TimelogsRequest)
  | ReceiveTimelogsWithProjectsResponse (Result GraphQLClient.Error TimelogsWithProjectsRequest)
  | ReceiveProjectsResponse (Result GraphQLClient.Error ProjectsRequest)
  | ReceiveProjectResponse (Result GraphQLClient.Error ProjectWithMembers)
  | ReceiveEditProjectResponse (Result GraphQLClient.Error EditProjectRequest)
  | ToggleMenu 
  -- | NotFoundMsg NotFound.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    LinkClicked urlRequest ->
      case urlRequest of
        Browser.Internal url ->
          ( model, Nav.pushUrl model.key (Url.toString url) )

        Browser.External href ->
          ( model, Nav.load href )

    UrlChanged url ->
      handleRoute { model | url = url }

    TimelogMsg timelogMsg ->
      stepTimelog model ( Timelogs.update timelogMsg model )

    ProjectMsg projectMsg ->
      stepProject model ( Projects.update projectMsg model )
    AddProjectMsg addProjectMsg ->
      stepAddProject model ( AddProject.update addProjectMsg model )
    EditProjectMsg editProjectMsg ->
      stepEditProject model ( EditProject.update editProjectMsg model )
    UserMsg userMsg ->
      stepUser model ( Users.update userMsg model )
    ReceiveTimelogsResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveTimelogsResponse (Ok response) ->
      let
        timelogModel = model.timelogModel
        newTimelogModel = 
          { timelogModel | timelogs = Array.fromList response.allTimelogs, readyTimes = True }
      in
        ( { model
          | timelogModel = newTimelogModel
          }
        , Cmd.none 
        )
    ReceiveTimelogsWithProjectsResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveTimelogsWithProjectsResponse (Ok response) ->
      let
        timelogModel = model.timelogModel
        newTimelogModel = 
          { timelogModel | timelogs = Array.fromList response.allTimelogs, readyTimes = True }
        projectModel = model.projectModel
        newProjectModel = 
          { projectModel | projects = Array.fromList response.allProjects, readyProjects = True }
      in
        ( { model
          | timelogModel = newTimelogModel
          , projectModel = newProjectModel
          }
        , Cmd.none 
        )
    ReceiveProjectsResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveProjectsResponse (Ok response) ->
      let
        projectModel = model.projectModel
        newProjectModel = 
          { projectModel | projects = Array.fromList response.allProjects, readyProjects = True }
      in
        ( { model
          | projectModel = newProjectModel
          }
        , Cmd.none 
        )
    ReceiveProjectResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveProjectResponse (Ok response) ->
      let
        editProjectModel = model.editProjectModel

        newProjectModel = 
          { editProjectModel | updateForm = Just response }
      in
        ( { model
          | editProjectModel = newProjectModel
          }
        , Cmd.none 
        )
    ReceiveEditProjectResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveEditProjectResponse (Ok response) ->
      let
        editProjectModel = model.editProjectModel
        userModel = model.userModel
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
    ToggleMenu ->
      ( { model
        | showMenu = not model.showMenu
        }
      , Cmd.none
      )

stepTimelog : Model -> ( Model, Cmd Timelogs.Msg ) -> ( Model, Cmd Msg )
stepTimelog model (timelogModel, cmds) =
  ( timelogModel
  , Cmd.map TimelogMsg cmds
  )

stepProject : Model -> ( Model, Cmd Projects.Msg ) -> ( Model, Cmd Msg )
stepProject model (projectModel, cmds) =
  ( projectModel
  , Cmd.map ProjectMsg cmds
  )

stepAddProject : Model -> ( Model, Cmd AddProject.Msg ) -> ( Model, Cmd Msg )
stepAddProject model (addProjectModel, cmds) =
  ( addProjectModel
  , Cmd.map AddProjectMsg cmds
  )

stepEditProject : Model -> ( Model, Cmd EditProject.Msg ) -> ( Model, Cmd Msg )
stepEditProject model (editProjectModel, cmds) =
  ( editProjectModel
  , Cmd.map EditProjectMsg cmds
  )

stepUser : Model -> ( Model, Cmd Users.Msg ) -> ( Model, Cmd Msg )
stepUser model (userModel, cmds) =
  ( userModel
  , Cmd.map UserMsg cmds
  )

sendTimeLogsQuery : String -> Cmd Msg
sendTimeLogsQuery csrf =
  sendQueryRequest csrf timelogsQuery
    |> Task.attempt ReceiveTimelogsResponse

sendTimeLogsWithProjectsQuery : String -> Cmd Msg
sendTimeLogsWithProjectsQuery csrf =
  sendQueryRequest csrf timelogsWithProjectsQuery 
    |> Task.attempt ReceiveTimelogsWithProjectsResponse

sendProjectsQuery : String -> Cmd Msg
sendProjectsQuery csrf =
  sendQueryRequest csrf projectsQuery
    |> Task.attempt ReceiveProjectsResponse

sendProjectQuery : String -> Uuid -> Cmd Msg
sendProjectQuery csrf uuid =
  sendQueryRequest csrf (projectQuery  uuid)
    |> Task.attempt ReceiveProjectResponse

sendEditProjectQuery : String -> Uuid -> Cmd Msg
sendEditProjectQuery csrf uuid =
  sendQueryRequest csrf (editProjectQuery  uuid)
    |> Task.attempt ReceiveEditProjectResponse

handleRoute : Model -> ( Model, Cmd Msg )
handleRoute ({ timelogModel, projectModel, csrf } as model) =
  let
    route = Route.fromUrl model.url
  in
    case route of
      TimelogsR ->
        if timelogModel.readyTimes then
          ( model, Cmd.none )
        else if projectModel.readyProjects then
          ( model, sendTimeLogsQuery csrf )
        else
          ( model, sendTimeLogsWithProjectsQuery csrf )

      ProjectsR ->
        if projectModel.readyProjects then
          ( model, Cmd.none )
        else
          ( model, sendProjectsQuery csrf )
      AddProjectR ->
        ( model, Cmd.none )
      EditProjectR uuid ->
        ( model, sendEditProjectQuery csrf uuid )
      _ ->
        ( model, Cmd.none )

-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none

-- VIEW

title : Route -> String
title route = 
  let
    fragment = 
      case route of
        TimelogsR ->
          "Times"
        ProjectsR ->
          "Projects"
        AboutR ->
          "About me"
        _ ->
          "Home"
  in
    "Timetrackr - " ++ fragment

view : Model -> Browser.Document Msg
view model =
  let
    currentRoute = 
      Route.fromUrl model.url
  in
    { title =  title <| (Route.fromUrl model.url)
    , body =
        [ header model
        , H.section
          [ A.class "section"
          ]
          [ H.div
            [ A.class "container" ]
            [ viewPage model ]
          ]
        ]
    }

viewPage : Model -> Html Msg
viewPage model = 
  let
    currentRoute = 
      Route.fromUrl model.url
  in
    case currentRoute of
      TimelogsR ->
        H.map TimelogMsg (Timelogs.view model)
      ProjectsR ->
        H.map ProjectMsg (Projects.view model)
      AddProjectR ->
        H.map AddProjectMsg (AddProject.view model)
      EditProjectR uuid ->
        H.map EditProjectMsg (EditProject.view model)
      _ ->
        H.div [] []

header : Model -> Html Msg
header model =
    H.header [ A.class "header" ]
        [ H.div [ A.class "container is-fluid" ] [ nav model ]
        ]

nav : Model -> Html Msg
nav model =
  let
      route = Route.fromUrl model.url
  in
    H.nav
      [ A.class "navbar"
      , A.attribute "role" "navigation"
      , A.attribute "aria-label" "main navigation"
      ]
      [ H.div
        [ A.class "navbar-brand" ]
        ( navbarBrand model.showMenu )
      , H.div
        [ A.classList [ ("navbar-menu", True), ("is-active", model.showMenu) ]
        ]
        [ H.ul [ A.class "navbar-start" ]
          [ link "/" "Times" route TimelogsR
          , link "/projects" "Projects" route ProjectsR
          ]
        ]
      ]

navbarBrand : Bool -> List (Html Msg)
navbarBrand showMenu =
  [ H.a
    [ A.class "navbar-item"
    , A.href "/"
    ]
    [ H.h1
        [ A.class "title is-1" ]
        [ H.span [ A.class "icon is-large" ] [ H.i [ A.class "far fa-clock" ] [] ]
        , H.text "Time Trackr"
        ]
    ]
  , H.div
    [ A.attribute "role" "button"
    , A.classList [ ("navbar-burger", True), ("is-active", showMenu) ] 
    , A.attribute "aria-label" "menu" 
    , A.attribute "aria-expanded" "false"
    , E.onClick ToggleMenu
    ]
    [ H.span 
      [ A.attribute "aria-hidden" "true"
      ]
      []
    , H.span 
      [ A.attribute "aria-hidden" "true"
      ]
      []
    , H.span 
      [ A.attribute "aria-hidden" "true"
      ]
      []
    ]
  ]

link: String -> String -> Route -> Route -> Html Msg
link href title_ currentRoute route =
  let
    classString = 
      if currentRoute == route then 
        "selected"
      else 
        ""
  in
    H.li 
      []
      [ H.a
        [ A.href href 
        , A.class classString
        ]
        [ H.text title_]
      ] 
 
alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
  ( msg, True )

footer: Html msg
footer =
  H.footer 
    [] 
    []
