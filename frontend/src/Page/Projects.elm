module Page.Projects exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Date exposing (..)
import Uuid exposing (Uuid)
import Types exposing (Model, Flags)
import Url
import GraphQL.Client.Http as GraphQLClient
import Types.Project exposing 
  ( Project
  , ProjectModel
  , CreateProjectForm
  , ProjectsRequest
  )
import Api exposing (sendQueryRequest)
import Api.Project exposing (projectsQuery)
import Task
import Browser.Navigation as Nav
import Array exposing (Array)
import Route exposing (..)


init : Flags -> Url.Url -> Nav.Key -> ( ProjectModel, Cmd Msg )
init flags url key =
  let 
    route = Route.fromUrl url
  in
  ( { readyProjects = False
    , projects = Array.empty
    , errResult = Nothing
    , isPending = False
    }
  , case route of 
    ProjectsR ->
      sendProjectsQuery flags.csrftoken
    _ -> 
      Cmd.none
  )

type Msg  
  = ReceiveProjectsResponse (Result GraphQLClient.Error ProjectsRequest)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ timelogModel, projectModel, flags } as model) =
  case msg of
    ReceiveProjectsResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveProjectsResponse (Ok response) ->
      let
        newProjectModel = 
          { projectModel | projects = Array.fromList response.allProjects, readyProjects = True }
      in
        ( { model
          | projectModel = newProjectModel
          }
        , Cmd.none 
        )


passToModel : ProjectModel -> Model -> Model
passToModel projectModel model =
  { model | projectModel = projectModel }

sendProjectsQuery : String -> Cmd Msg
sendProjectsQuery csrf =
  sendQueryRequest csrf projectsQuery
    |> Task.attempt ReceiveProjectsResponse

view : Model -> Html Msg
view model =
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
        [ Html.a
          [ Attributes.class "button is-success" 
          , Attributes.href "/projects/add"
          ]
          [ Html.span
            [ Attributes.class "icon is-small" ]
            [ Html.span
              [ Attributes.class "fas fa-plus-circle" ]
              []
            ]
          , Html.span
            []
            [ Html.text "New" ]
          ]
        ]
      ]
    , Html.div 
      []
      [ projectList model ]
    ]

projectView: Int -> Project -> Html Msg
projectView index project =
      Html.div
      [ Attributes.class "custom-columns" ]
      [ Html.div
        [ Attributes.class "custom-column column-1" ]
        [ Html.div
          [ Attributes.class "project-color"
          , Attributes.style "background-color" project.colour
          ]
          []
        , Html.div
          [ Attributes.class "project-details" ]
          [ Html.div
            [ Attributes.class "has-text-weight-bold is-size-5"]
            [ Html.text project.abbreviation
            ]
          ]
        ]
      , Html.div
        [ Attributes.class "custom-column column-2" ]
        [ Html.div 
          [ Attributes.class "has-text-weight-bold is-size-5" ]
          [ Html.text project.name ]
        , Html.div
          []
          [ Html.text project.company ]
        ]
      , Html.div
        [ Attributes.class "custom-column column-3" ]
        [ actions index project.id ]
        
      ]

projectList : Model -> Html Msg
projectList model =
  Html.div
    [ Attributes.class "row-group"  ]
    (List.indexedMap projectView <| Array.toList model.projectModel.projects)

actions : Int -> Uuid -> Html Msg
actions index id =
  Html.div
    [ Attributes.class "buttons" ]
    [ Html.a
      [ Attributes.class "button"
      , Attributes.href <| "/projects/edit/" ++ (Uuid.toString id)
      ]
      [ Html.span
        [ Attributes.class "fas fa-pen"
        ]
        []
      ]
    -- , Html.span
    --   [ Attributes.class "delete"
    --   , Events.onClick <| DeleteProject id
    --   ]
    --   []
    ]
