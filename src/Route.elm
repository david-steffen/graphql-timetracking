module Route exposing (Route(..), fromUrl, toString)

import Url.Parser as Parser exposing (Parser, top, map, oneOf, s)
import Url exposing (Url)
import Debug

type Route
  = TimelogsR
  | ProjectsR
  | AboutR
  | NotFoundR

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map TimelogsR  top
    , map ProjectsR  (s "projects")
    , map AboutR     (s "about")
    ]


fromUrl : Url -> Route
fromUrl url =
  case Parser.parse routeParser url of
    Just answer ->
      answer

    Nothing ->
      NotFoundR

toString : Route -> String
toString page =
  let
    name =
      case page of
        TimelogsR ->
          ""
        ProjectsR ->
          "projects"
        AboutR ->
          "about"
        _ ->
          "404"

  in
    "/" ++ name