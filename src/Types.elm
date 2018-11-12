module Types exposing (Model, Flags)

import Browser.Navigation as Nav
import Url
import Route exposing (..)
import Types.Timelog exposing (TimelogModel)
import Types.Project exposing (ProjectModel, AddProjectModel, EditProjectModel)
import Types.User exposing (UserModel)

type alias Model =
  { key : Nav.Key
  , url : Url.Url
  , csrf : String
  , timelogModel : TimelogModel
  , projectModel : ProjectModel
  , addProjectModel : AddProjectModel
  , editProjectModel : EditProjectModel
  , userModel : UserModel
  , showMenu : Bool
  }

type alias Flags =
  { csrftoken : String
  }