module Route exposing (Route(..), fromUrl)

import Url.Parser as Parser exposing (Parser, (</>), oneOf, top, map, custom, s)
import Url exposing (Url)
import Uuid exposing (Uuid, fromString)

type Route
  = TimelogsR
  | ProjectsR
  | AddProjectR
  | EditProjectR Uuid
  | AboutR
  | NotFoundR

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map TimelogsR  top
    , map ProjectsR  (s "projects")
    , map AddProjectR  (s "projects" </> s "add")
    , map EditProjectR  (s "projects" </> s "edit" </> uuid)
    , map AboutR     (s "about")
    ]


fromUrl : Url -> Route
fromUrl url =
  case Parser.parse routeParser url of
    Just answer ->
      answer

    Nothing ->
      NotFoundR

uuid : Parser (Uuid -> a) a
uuid =
  custom "UUID" Uuid.fromString