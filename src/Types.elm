module Types exposing (Model, Flags)

import Browser.Navigation as Nav
import Url
import Route exposing (..)
import Types.Timelog exposing (TimelogModel, AddTimelogModel, EditTimelogModel)
import Types.Project exposing (ProjectModel, AddProjectModel, EditProjectModel)
import Types.User exposing (UserModel)
import Date exposing (Date)
import GraphQL.Client.Http as GraphQLClient

type alias Model =
  { key : Nav.Key
  , url : Url.Url
  , csrf : String
  , timelogModel : TimelogModel
  , addTimelogModel : AddTimelogModel
  , editTimelogModel : EditTimelogModel
  , projectModel : ProjectModel
  , addProjectModel : AddProjectModel
  , editProjectModel : EditProjectModel
  , userModel : UserModel
  , showMenu : Bool
  , today : Date
  , errorMsg : Maybe GraphQLClient.Error
  }

type alias Flags =
  { csrftoken : String
  }
