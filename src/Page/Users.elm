module Page.Users exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Types exposing (Model, Flags)
import Url
import Types.User exposing (User, UsersRequest, UserModel)
import Browser.Navigation as Nav
import GraphQL.Client.Http as GraphQLClient
import Route exposing (..)
import Api exposing (sendQueryRequest)
import Api.User exposing (usersQuery)
import Task

init : Flags -> Url.Url -> Nav.Key -> ( UserModel, Cmd Msg )
init flags url key =
  let 
    route = Route.fromUrl url
  in
  ( { errResult = Nothing
    , readyUsers = False
    , users = []
    , isPending = False
    }
  , case route of
      UsersR ->
        sendUsersQuery flags.csrftoken
      _ -> Cmd.none
  )

type Msg  
  = ReceiveUsersResponse (Result GraphQLClient.Error UsersRequest)
  

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of 
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

sendUsersQuery : String -> Cmd Msg
sendUsersQuery csrf =
  sendQueryRequest csrf usersQuery
    |> Task.attempt ReceiveUsersResponse

view : Model -> Html msg
view model =
  Html.div [] []