module Types.Timelog exposing (..)

import Array exposing (Array)
import Uuid exposing (Uuid)
import Types.Project exposing (Project)
import Date exposing (Date)
import Utils.TimeDelta exposing (TimeDelta)

type alias TimelogModel =
  { readyTimes : Bool
  , timelogs : Array Timelog
  , createForm : Maybe CreateTimelogForm
  , updateForm : Maybe UpdateTimelogForm
  , formAction : TimelogFormAction
  , errResult : Maybe String
  , isPending : Bool
  , deleteId : Maybe Uuid
  }

type alias TimelogWithProject =
  { id : Uuid
  , description : String
  , duration : TimeDelta
  , date : Date
  , project : Project
  }

type alias Timelog =
  { id : Uuid
  , description : String
  , duration : TimeDelta
  , date : Date
  , project : ProjectRefQuery
  }

type alias ProjectRefQuery =
  { id : Uuid
  }

type alias TimelogsRequest =
  { allTimelogs : List Timelog
  }

type alias TimelogsWithProjectsRequest =
  { allTimelogs : List Timelog
  , allProjects : List Project
  }

type alias CreateTimelogMutation =
  { description : String
  , duration : String
  , date : String
  , project : String
  }

type alias UpdateTimelogMutation =
  { id : String
  , description : String
  , duration : String
  , date : String
  , project : String
  }

type alias DeleteTimelogMutation =
  { id : String
  }

type alias TimelogMutationResult =
  { timelog : Timelog
  , ok : Bool
  }

type alias TimelogDeleteMutationResult =
  { timelogId : Uuid
  ,  ok : Bool
  }

type alias CreateTimelogInput =
  { input : CreateTimelogMutation }

type alias UpdateTimelogInput =
  { input : UpdateTimelogMutation }

type alias DeleteTimelogInput = 
  { input : DeleteTimelogMutation }

type alias CreateTimelogForm =
  { description : String
  , duration : Maybe TimeDelta
  , date : Maybe Date
  , project : String
  }

type alias UpdateTimelogForm =
  { id : Uuid
  , description : String
  , duration : TimeDelta
  , date : Date
  , project : Uuid
  }

type TimelogFormAction
  = Noop
  | Create
  | Update
  | Delete