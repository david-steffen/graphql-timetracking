module Page.Profile exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Types exposing (Model, Flags)
import Url
import Types.User exposing (User, ProfileRequest, ProfileModel)
import Browser.Navigation as Nav
import GraphQL.Client.Http as GraphQLClient
import Route exposing (..)
import Api exposing (sendQueryRequest)
import Api.User exposing (profileQuery)
import Task

init : Flags -> Url.Url -> Nav.Key -> ( ProfileModel, Cmd Msg )
init flags url key =
  let 
    route = Route.fromUrl url
  in
  ( { errResult = Nothing
    , readyUser = False
    , user = Nothing
    , isPending = False
    }
  , sendProfileQuery flags.csrftoken
  )

type Msg  
  = ReceiveProfileResponse (Result GraphQLClient.Error ProfileRequest)

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of 
    ReceiveProfileResponse (Err err) ->
      ( model, Cmd.none ) 
    ReceiveProfileResponse (Ok response) ->
      let
        profileModel = model.profileModel
        newProfileModel =
          { profileModel | user = Just response.profile }
      in
        ( { model
          | profileModel = newProfileModel
          }
        , Cmd.none 
          )

sendProfileQuery : String -> Cmd Msg
sendProfileQuery csrf =
  sendQueryRequest csrf profileQuery
    |> Task.attempt ReceiveProfileResponse

view : Model -> Html msg
view ({profileModel} as model) =
    Html.div 
    []
    [ Html.div
      [ Attributes.class "level is-mobile" ]
      [ Html.div
        [ Attributes.class "level-left" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ Html.h1
            [ Attributes.class "title" ]
            [ Html.text "Profile" 
            ]
          ]
        ]
      , Html.div
        [ Attributes.class "level-right" ]
        [ Html.div
          [ Attributes.class "level-item" ]
          [ Html.a
            [ Attributes.class "button is-success" 
            , Attributes.href "/profile/edit"
            ]
            [ Html.span
              [ Attributes.class "icon is-small" ]
              [ Html.span
                [ Attributes.class "fas fa-plus-circle" ]
                []
              ]
            , Html.span
              []
              [ Html.text "Edit" ]
            ]
          ]
        ]
      ]
    , case profileModel.user of
        Just user ->
          Html.div
            []
            [ Html.ul
              []
              [ Html.li
                []
                [ Html.span [ class "title is-6" ] [ Html.text "First name: " ]
                , Html.span [] [ Html.text user.firstName ]
                ]
              , Html.li
                []
                [ Html.span [ class "title is-6" ] [ Html.text "Last name: " ]
                , Html.span [] [ Html.text user.lastName ]
                ]
              , Html.li
                []
                [ Html.span [ class "title is-6" ] [ Html.text "Email: " ]
                , Html.span [] [ Html.text user.email ]
                ]
              ]

            ]
        Nothing ->
          Html.div [] []
    ]