module Page.About exposing (..)

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
    [ Attributes.class "inner-wrap" 
    ]
    [ Html.h1 [] [ Html.text "About me" ]
    , Html.div
      []
      [ Html.p []
        [ Html.text
        """
        I am a professional fullstack web developer from Brighton, UK with over
        five years of experience creating bespoke webapps, websites, e-learning apps and games.
        """
        ]
      , Html.p []
        [ Html.text
        """
        I work with multiple programming languages, both server side and client side, so if you are looking for
        help with a project then please feel free to get in touch.
        """
        ]
      , Html.p []
        [ Html.text
        """
        I have experience building MVC apps, Rest API's and microservices using frameworks such as Django, Laravel 
        and Spring as well as bespoke and working on machine to machine servers.
        I also have experience building client side multiple and single page apps using Javascript libraries
        such as jQuery, React/Redux, Vue/Vuex or Elm lang and build tools including webpack, gulp and browserify.
        """
        ]
      , Html.p []
        [ Html.text
        """
        If you have any queries or ideas you would like to discuss then give me a call or send me an email and I'll be in touch shortly.
        """
        ]
      ]
    ]