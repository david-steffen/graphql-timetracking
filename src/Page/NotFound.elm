module Page.NotFound exposing (..)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)

type alias Model =
  { }

init : Model
init =
  Model

type Msg = None

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  ( model, Cmd.none )

view : Model -> Html msg
view model =
  H.div 
    [ A.class "not-found-wrap"
    ]
    [ H.h1 [] [ H.text "404" ]
    , H.div
      []
      [ H.p []
        [ H.text
        """
        Page not found
        """
        ]
      , H.a
        [ A.href "/"
        ]
        [ H.span
          [ A.class "fa fa-home"
          ]
          []
        ]
      ]
    ]