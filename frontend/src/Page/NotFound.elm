module Page.NotFound exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)

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
  Html.div 
    [ Attributes.class "not-found-wrap"
    ]
    [ Html.h1 [] [ Html.text "404" ]
    , Html.div
      []
      [ Html.p []
        [ Html.text
        """
        Page not found
        """
        ]
      , Html.a
        [ Attributes.href "/"
        ]
        [ Html.span
          [ Attributes.class "fa fa-home"
          ]
          []
        ]
      ]
    ]