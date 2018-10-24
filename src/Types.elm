module Types exposing (Model, Flags)

import Browser.Navigation as Nav
import Url
import Route exposing (..)
import Types.Timelog exposing (TimelogModel)
import Types.Project exposing (ProjectModel)

type alias Model =
  { key : Nav.Key
  , url : Url.Url
  , csrf : String
  , timelogModel : TimelogModel
  , projectModel : ProjectModel
  , showMenu : Bool
  }

type alias Flags =
  { csrftoken : String
  }