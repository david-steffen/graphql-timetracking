module Route exposing (Route(..), fromUrl)

import Url.Parser as Parser exposing (Parser, (</>), oneOf, top, map, custom, s)
import Url exposing (Url)
import Uuid exposing (Uuid, fromString)

type Route
  = TimelogsR
  | AddTimelogR
  | EditTimelogR Uuid
  | ProjectsR
  | AddProjectR
  | EditProjectR Uuid
  | UsersR
  | NotFoundR

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map TimelogsR  top
    , map AddTimelogR  (s "times" </> s "add")
    , map EditTimelogR  (s "times" </> s "edit" </> uuid)
    , map ProjectsR  (s "projects")
    , map AddProjectR  (s "projects" </> s "add")
    , map EditProjectR  (s "projects" </> s "edit" </> uuid)
    , map UsersR     (s "users")
    , map NotFoundR (s "404")
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