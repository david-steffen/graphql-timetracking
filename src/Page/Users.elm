module Page.Users exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Types exposing (Model)
import Types.User exposing (UserModel)

init : UserModel
init =
  { errResult = Nothing
  , readyUsers = False
  , users = []
  , isPending = False
  }

type Msg  
  = None

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  ( model, Cmd.none )

view : Model -> Html msg
view model =
  H.div [] []