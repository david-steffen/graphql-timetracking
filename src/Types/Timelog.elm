module Types.Timelog exposing 
  ( Timelog
  , TimelogModel
  , TimelogQuery
  , ProjectRefQuery
  , TimelogsRequest
  , TimelogsWithProjectsRequest
  , CreateTimelogMutation
  , UpdateTimelogMutation
  , CreateTimelogForm
  , UpdateTimelogForm
  , CreateTimelogInput
  , UpdateTimelogInput
  , TimelogFormAction(..)
  )

import Uuid exposing (Uuid)
import Types.Project exposing (Project)
import Date exposing (Date)
import Utils.TimeDelta exposing (TimeDelta)

type alias TimelogModel =
  { readyTimes : Bool
  , timelogs : List Timelog
  , createForm : Maybe CreateTimelogForm
  , updateForm : Maybe UpdateTimelogForm
  , formAction : TimelogFormAction
  , errResult : Maybe String
  , isPendingTimelog : Bool
  }

type alias Timelog =
  { id : Uuid
  , description : String
  , duration : TimeDelta
  , date : Date
  , project : Project
  }

type alias TimelogQuery =
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
  { allTimelogs : List TimelogQuery
  }

type alias TimelogsWithProjectsRequest =
  { allTimelogs : List TimelogQuery
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


type alias CreateTimelogInput =
  { input : CreateTimelogMutation }

type alias UpdateTimelogInput =
  { input : UpdateTimelogMutation }

type alias CreateTimelogForm =
  { description : String
  , duration : Maybe TimeDelta
  , date : Maybe Date
  , project : String
  }

type alias UpdateTimelogForm =
  { id : String
  , description : String
  , duration : TimeDelta
  , date : Date
  , project : String
  }

type TimelogFormAction
  = Create
  | Update