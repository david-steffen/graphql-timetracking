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
import Page.Profile as Profile exposing (..)
import Json.Decode as JD exposing (..)
import Task exposing (Task)
import Types exposing (Model, Flags)
import Array exposing (Array)
import Uuid exposing (Uuid)
import Date exposing (Unit(..), Interval(..))
import Time exposing (millisToPosix, utc)
import GraphQL.Client.Http as GraphQLClient
import Http


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
  let
    (timelogModel, timelogCmd) = Timelogs.init flags url key
    (addTimelogModel, addTimelogCmd) = AddTimelog.init flags url key
    (editTimelogModel, editTimelogCmd) = EditTimelog.init flags url key
    (projectModel, projectCmd) = Projects.init flags url key
    (addProjectModel, addProjectCmd) = AddProject.init flags url key
    (editProjectModel, editProjectCmd) = EditProject.init flags url key
    (userModel, userCmd) = Users.init flags url key
    (profileModel, profileCmd) = Profile.init flags url key
  in
  -- handleRoute
    ( { key = key
      , url = url
      , flags = flags
      , route = Route.fromUrl url
      , timelogModel = timelogModel
      , addTimelogModel = addTimelogModel
      , editTimelogModel = editTimelogModel
      , projectModel = projectModel
      , addProjectModel = addProjectModel
      , editProjectModel = editProjectModel
      , userModel = userModel
      , profileModel = profileModel
      , showMenu = False
      , today = Date.fromPosix utc (millisToPosix 0)
      , errorMsg = Nothing
      }
    , Cmd.batch 
      [ Cmd.map TimelogMsg timelogCmd
      , Cmd.map AddTimelogMsg addTimelogCmd
      , Cmd.map EditTimelogMsg editTimelogCmd
      , Cmd.map ProjectMsg projectCmd
      , Cmd.map AddProjectMsg addProjectCmd
      , Cmd.map EditProjectMsg editProjectCmd
      , Cmd.map UserMsg userCmd
      , Cmd.map ProfileMsg profileCmd
      ]
    )

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
  | ProfileMsg Profile.Msg
  | ToggleMenu
  | Logout
  | CloseErrorMessage


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
      let
        ( newModel, timelogCmd ) = Timelogs.update timelogMsg model
      in
        ( newModel, Cmd.map TimelogMsg timelogCmd )
    AddTimelogMsg addTimelogMsg ->
      let
        ( newModel, addTimelogCmd ) = AddTimelog.update addTimelogMsg model
      in
        ( newModel, Cmd.map AddTimelogMsg addTimelogCmd )
    EditTimelogMsg editTimelogMsg ->
      let
        ( newModel, editTimelogCmd ) = EditTimelog.update editTimelogMsg model
      in
        ( newModel, Cmd.map EditTimelogMsg editTimelogCmd )
    ProjectMsg projectMsg ->
      let
        ( newModel, projectCmd ) = Projects.update projectMsg model
      in
        ( newModel, Cmd.map ProjectMsg projectCmd )
    AddProjectMsg addProjectMsg ->
      let
        ( newModel, addProjectCmd ) = AddProject.update addProjectMsg model
      in
        ( newModel, Cmd.map AddProjectMsg addProjectCmd )
    EditProjectMsg editProjectMsg ->
      let
        ( newModel, editProjectCmd ) = EditProject.update editProjectMsg model
      in
        ( newModel, Cmd.map EditProjectMsg editProjectCmd )
    UserMsg userMsg ->
      let
        ( newModel, userCmd ) = Users.update userMsg model
      in
        ( newModel, Cmd.map UserMsg userCmd )
    ProfileMsg profileMsg ->
      let
        ( newModel, profileCmd ) = Profile.update profileMsg model
      in
        ( newModel, Cmd.map ProfileMsg profileCmd )
    ToggleMenu ->
      ( { model
        | showMenu = not model.showMenu
        }
      , Cmd.none
      )
    Logout ->
      ( model, Nav.load "/accounts/logout/" )
    CloseErrorMessage ->
      ( model, Cmd.none )

handleRoute : Model -> ( Model, Cmd Msg )
handleRoute ({flags, url, key} as model) =
  let
    (_, timelogCmd) = Timelogs.init flags url key
    (_, addTimelogCmd) = AddTimelog.init flags url key
    (_, editTimelogCmd) = EditTimelog.init flags url key
    (_, projectCmd) = Projects.init flags url key
    (_, addProjectCmd) = AddProject.init flags url key
    (_, editProjectCmd) = EditProject.init flags url key
    (_, userCmd) = Users.init flags url key
    (_, profileCmd) = Profile.init flags url key
    route = Route.fromUrl url
  in
    ( model
    , Cmd.batch 
      [ Cmd.map TimelogMsg timelogCmd
      , Cmd.map AddTimelogMsg addTimelogCmd
      , Cmd.map EditTimelogMsg editTimelogCmd
      , Cmd.map ProjectMsg projectCmd
      , Cmd.map AddProjectMsg addProjectCmd
      , Cmd.map EditProjectMsg editProjectCmd
      , Cmd.map UserMsg userCmd
      -- , Cmd.map ProfileMsg profileCmd
      ]
    )

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
        AddTimelogR ->
          "Add new time"
        EditTimelogR id ->
          "Edit time"
        ProjectsR ->
          "Projects"
        AddProjectR ->
          "Add new project"
        EditProjectR id ->
          "Edit project"
        UsersR ->
          "Users"
        ProfileR ->
          "Profile"
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
        , case model.errorMsg of 
            Just errors ->
              errorMessages errors
            Nothing ->
              Html.div [] []
        ]
    }

errorMessages : GraphQLClient.Error -> Html Msg
errorMessages errors =
  case errors of
    GraphQLClient.HttpError httpError ->
      case httpError of
        Http.BadUrl string ->
          errorMessageView string
        Http.Timeout ->
          errorMessageView "Connection timed out"
        Http.NetworkError ->
          errorMessageView "There's a problem with the network. Please check your connection"
        Http.BadStatus response ->
          errorMessageView response.body
        Http.BadPayload string response ->
          errorMessageView response.body
        -- _ ->
        --   errorMessageView "Something went wrong"
    GraphQLClient.GraphQLError graphQLErrors ->
      Html.div [] <| List.map (\x -> errorMessageView x.message) graphQLErrors
           


errorMessageView errorString =
  Html.div
    [ Attributes.class "notification is-danger"]
    [ Html.button 
      [ Attributes.class "delete"
      , Events.onClick CloseErrorMessage
      ]
      []
    , Html.text errorString 
    ]

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
      ProfileR ->
        Html.map ProfileMsg (Profile.view model)
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
          ]
        , Html.div [ Attributes.class "navbar-end" ] 
          [ Html.div [ Attributes.class "navbar-item" ]
            [ Html.div [ Attributes.class "field is-grouped" ]
              [ Html.div [ Attributes.class "control " ]
                [ Html.a 
                  [ Attributes.href "/profile"
                  , Attributes.class "icon is-large" 
                  ]
                  [ Html.span 
                    [ Attributes.class "fas fa-lg fa-user" ]
                    []
                  ]
                ]
              , Html.div [ Attributes.class "control" ]
                [ Html.a 
                  [ Events.onClick Logout
                  , Attributes.class "icon is-large" 
                  ]
                  [ Html.span 
                    [ Attributes.class "fas fa-lg fa-sign-out-alt" ]
                    []
                  ]
                ]
              ]
            ]
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
