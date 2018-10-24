module Page.About exposing (..)

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
    [ A.class "inner-wrap" 
    ]
    [ H.h1 [] [ H.text "About me" ]
    , H.div
      []
      [ H.p []
        [ H.text
        """
        I am a professional fullstack web developer from Brighton, UK with over
        five years of experience creating bespoke webapps, websites, e-learning apps and games.
        """
        ]
      , H.p []
        [ H.text
        """
        I work with multiple programming languages, both server side and client side, so if you are looking for
        help with a project then please feel free to get in touch.
        """
        ]
      , H.p []
        [ H.text
        """
        I have experience building MVC apps, Rest API's and microservices using frameworks such as Django, Laravel 
        and Spring as well as bespoke and working on machine to machine servers.
        I also have experience building client side multiple and single page apps using Javascript libraries
        such as jQuery, React/Redux, Vue/Vuex or Elm lang and build tools including webpack, gulp and browserify.
        """
        ]
      , H.p []
        [ H.text
        """
        If you have any queries or ideas you would like to discuss then give me a call or send me an email and I'll be in touch shortly.
        """
        ]
      ]
    ]