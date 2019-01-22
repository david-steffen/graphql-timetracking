module Main exposing (Msg)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Url
import Route exposing (..)
import Page.Timelogs as Timelogs exposing (..)
import Page.Timelogs.AddTimelog as AddTimelog exposing (..)
import Page.Timelogs.EditTimelog as EditTimelog exposing (..)
import Page.Projects as Projects exposing (..)
import Page.Projects.AddProject as AddProject exposing (..)
import Page.Projects.EditProject as EditProject exposing (..)
import Page.Users as Users exposing (..)
import Page.About as About exposing (..)
import Page.NotFound as NotFound exposing (..)
import Json.Decode as JD exposing (..)
import Api exposing (sendQueryRequest)
import Api.Timelog exposing (timelogsQuery, timelogsRangeWithProjectsQuery, timelogsWithProjectsQuery, editTimelogQuery)
import Api.Project exposing (projectsQuery, projectQuery, editProjectQuery)
import Api.User exposing (usersQuery)
import GraphQL.Client.Http as GraphQLClient
import Task exposing (Task)
import Types exposing (Model, Flags)
import Types.Timelog exposing (TimelogsRequest, TimelogsWithProjectsRequest, EditTimelogRequest, UpdateTimelogForm)
import Types.Project exposing (Project, ProjectWithMembers, ProjectsRequest, EditProjectRequest)
import Types.User exposing (User, UsersRequest)
import Array exposing (Array)
import Uuid exposing (Uuid)
import Date exposing (Unit(..), Interval(..))
import Time exposing (millisToPosix, utc)


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
    , addTimelogModel = AddTimelog.init
    , editTimelogModel = EditTimelog.init
    , projectModel = Projects.init
    , addProjectModel = AddProject.init
    , editProjectModel = EditProject.init
    , userModel = Users.init
    , showMenu = False
    , today = Date.fromPosix utc (millisToPosix 0)
    }


-- UPDATE


type Msg
  = LinkClicked Browser.UrlRequest
  | UrlChanged Url.Url
  | TimelogMsg Timelogs.Msg
  | AddTimelogMsg AddTimelog.Msg
  | EditTimelogMsg EditTimelog.Msg
  | ProjectMsg Projects.Msg
  | AddProjectMsg AddProject.Msg
  | EditProjectMsg EditProject.Msg
  | UserMsg Users.Msg
  | ReceiveTimelogsResponse (Result GraphQLClient.Error TimelogsRequest)
  | ReceiveTimelogsWithProjectsResponse (Result GraphQLClient.Error TimelogsWithProjectsRequest)
  | ReceiveEditTimelogResponse (Result GraphQLClient.Error EditTimelogRequest)
  | ReceiveProjectsResponse (Result GraphQLClient.Error ProjectsRequest)
  | ReceiveProjectResponse (Result GraphQLClient.Error ProjectWithMembers)
  | ReceiveEditProjectResponse (Result GraphQLClient.Error EditProjectRequest)
  | ReceiveUsersResponse (Result GraphQLClient.Error UsersRequest)
  | ToggleMenu
  | Logout
  | ReceiveDate Date.Date
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
    AddTimelogMsg addTimelogMsg ->
      stepAddTimelog model ( AddTimelog.update addTimelogMsg model )
    EditTimelogMsg editTimelogMsg ->
      stepEditTimelog model ( EditTimelog.update editTimelogMsg model )
    ProjectMsg projectMsg ->
      stepProject model ( Projects.update projectMsg model )
    AddProjectMsg addProjectMsg ->
      stepAddProject model ( AddProject.update addProjectMsg model )
    EditProjectMsg editProjectMsg ->
      stepEditProject model ( EditProject.update editProjectMsg model )
    UserMsg userMsg ->
      stepUser model ( Users.update userMsg model )
    ReceiveTimelogsResponse (Err err) ->
      Debug.log (Debug.toString err)
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
      Debug.log (Debug.toString err)
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
    ReceiveEditTimelogResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveEditTimelogResponse (Ok response) ->
      let
        editTimelogModel = model.editTimelogModel
        projectModel = model.projectModel
        form = 
          UpdateTimelogForm 
            response.timelog.id 
            response.timelog.description 
            response.timelog.duration
            response.timelog.date
            response.timelog.project.id
        newTimelogModel = 
          { editTimelogModel 
          | updateForm = Just form 
          }
        newProjectModel =
          { projectModel | projects = Array.fromList response.allProjects}
      in
        ( { model
          | editTimelogModel = newTimelogModel
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
    ReceiveUsersResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveUsersResponse (Ok response) ->
      let
        userModel = model.userModel
        newUserModel =
          { userModel | users = response.allUsers}
      in
        ( { model
          | userModel = newUserModel
          }
        , Cmd.none 
        )
    ToggleMenu ->
      ( { model
        | showMenu = not model.showMenu
        }
      , Cmd.none
      )
    Logout ->
      ( model, Nav.load "/accounts/logout/" )
    ReceiveDate today ->
      let
        timelogModel = model.timelogModel
        newTimelogModel = 
          { timelogModel
          | filterDate = today 
          }
      in
        ( { model | today = today, timelogModel = newTimelogModel }, 
          if model.projectModel.readyProjects then
            sendTimeLogsQuery model.csrf today model.timelogModel.filterView ReceiveTimelogsResponse
          else
            sendTimeLogsWithProjectsQuery model.csrf today model.timelogModel.filterView ReceiveTimelogsWithProjectsResponse
          )


stepTimelog : Model -> ( Model, Cmd Timelogs.Msg ) -> ( Model, Cmd Msg )
stepTimelog model (timelogModel, cmds) =
  ( timelogModel
  , Cmd.map TimelogMsg cmds
  )

stepAddTimelog : Model -> ( Model, Cmd AddTimelog.Msg ) -> ( Model, Cmd Msg )
stepAddTimelog model (addTimelogModel, cmds) =
  ( addTimelogModel
  , Cmd.map AddTimelogMsg cmds
  )

stepEditTimelog : Model -> ( Model, Cmd EditTimelog.Msg ) -> ( Model, Cmd Msg )
stepEditTimelog model (editTimelogModel, cmds) =
  ( editTimelogModel
  , Cmd.map EditTimelogMsg cmds
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

sendProjectsQuery : String -> Cmd Msg
sendProjectsQuery csrf =
  sendQueryRequest csrf projectsQuery
    |> Task.attempt ReceiveProjectsResponse

sendProjectQuery : String -> Uuid -> Cmd Msg
sendProjectQuery csrf uuid =
  sendQueryRequest csrf (projectQuery uuid)
    |> Task.attempt ReceiveProjectResponse

sendUsersQuery : String -> Cmd Msg
sendUsersQuery csrf =
  sendQueryRequest csrf usersQuery
    |> Task.attempt ReceiveUsersResponse

sendEditProjectQuery : String -> Uuid -> Cmd Msg
sendEditProjectQuery csrf uuid =
  sendQueryRequest csrf (editProjectQuery uuid)
    |> Task.attempt ReceiveEditProjectResponse

initTimelogPage : Cmd Msg
initTimelogPage = 
  Date.today |> Task.perform ReceiveDate

handleRoute : Model -> ( Model, Cmd Msg )
handleRoute ({ timelogModel, projectModel, csrf } as model) =
  let
    route = Route.fromUrl model.url
  in
    case route of
      TimelogsR ->
        if timelogModel.readyTimes then
          ( model, Cmd.none )
        -- else if projectModel.readyProjects then
        --   ( model, sendTimeLogsQuery csrf )
        else
          ( model, initTimelogPage )
      AddTimelogR ->
        if projectModel.readyProjects then
          ( model, Cmd.none )
        else
          ( model, sendProjectsQuery csrf )
      EditTimelogR uuid ->
        ( model, sendEditTimelogQuery csrf uuid ReceiveEditTimelogResponse)
      ProjectsR ->
        if projectModel.readyProjects then
          ( model, Cmd.none )
        else
          ( model, sendProjectsQuery csrf )
      AddProjectR ->
        ( model, sendUsersQuery csrf )
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
    "Cronos - " ++ fragment

view : Model -> Browser.Document Msg
view model =
  let
    currentRoute = 
      Route.fromUrl model.url
  in
    { title =  title <| (Route.fromUrl model.url)
    , body =
        [ header model
        , Html.section
          [ Attributes.class "section"
          ]
          [ Html.div
            [ Attributes.class "container" ]
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
        Html.map TimelogMsg (Timelogs.view model)
      AddTimelogR ->
        Html.map AddTimelogMsg (AddTimelog.view model)
      EditTimelogR uuid ->
        Html.map EditTimelogMsg (EditTimelog.view model)
      ProjectsR ->
        Html.map ProjectMsg (Projects.view model)
      AddProjectR ->
        Html.map AddProjectMsg (AddProject.view model)
      EditProjectR uuid ->
        Html.map EditProjectMsg (EditProject.view model)
      _ ->
        Html.div [] []

header : Model -> Html Msg
header model =
    Html.header [ Attributes.class "header" ]
        [ Html.div [ Attributes.class "container" ] [ nav model ]
        ]

nav : Model -> Html Msg
nav model =
  let
      route = Route.fromUrl model.url
  in
    Html.nav
      [ Attributes.class "navbar"
      , Attributes.attribute "role" "navigation"
      , Attributes.attribute "aria-label" "main navigation"
      ]
      [ Html.div
        [ Attributes.class "navbar-brand" ]
        ( navbarBrand model.showMenu )
      , Html.div
        [ Attributes.classList [ ("navbar-menu", True), ("is-active", model.showMenu) ]
        ]
        [ Html.div [ Attributes.class "navbar-start" ]
          [ link "/" "Times" route TimelogsR
          , link "/projects" "Projects" route ProjectsR
          , Html.a
            [ Events.onClick Logout
            , Attributes.class "navbar-item" ]
            [ Html.text "Logout" ]
            
          ]
        ]
      ]

navbarBrand : Bool -> List (Html Msg)
navbarBrand showMenu =
  [ Html.a
    [ Attributes.class "navbar-item"
    , Attributes.href "/"
    ]
    [ Html.h1
        [ Attributes.class "title is-5" ]
        [ Html.span [ Attributes.class "icon is-large" ] [ Html.i [ Attributes.class "far fa-clock" ] [] ]
        , Html.text "Cronos"
        ]
    ]
  , Html.div
    [ Attributes.attribute "role" "button"
    , Attributes.classList [ ("navbar-burger burger", True), ("is-active", showMenu) ] 
    , Attributes.attribute "aria-label" "menu" 
    , Attributes.attribute "aria-expanded" "false"
    , Events.onClick ToggleMenu
    ]
    [ Html.span 
      [ Attributes.attribute "aria-hidden" "true"
      ]
      []
    , Html.span 
      [ Attributes.attribute "aria-hidden" "true"
      ]
      []
    , Html.span 
      [ Attributes.attribute "aria-hidden" "true"
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
    Html.a
      [ Attributes.href href 
      , Attributes.class <| "navbar-item " ++ classString
      ]
      [ Html.text title_]
      
 
alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
  ( msg, True )

footer: Html msg
footer =
  Html.footer 
    [] 
    []
