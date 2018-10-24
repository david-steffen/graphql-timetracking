module Types.Timelog exposing 
  ( Timelog
  , TimelogModel
  , TimelogQuery
  , ProjectRefQuery
  , TimelogsRequest
  , TimelogsWithProjectsRequest
  , TimelogMutation
  , TimelogInput
  , CreateTimelogInput
  )

import Uuid exposing (Uuid)
import Types.Project exposing (Project)
import Date exposing (Date)
import Utils.TimeDelta exposing (TimeDelta)

type alias TimelogModel =
  { readyTimes : Bool
  , timelogs : List Timelog
  , formTimelog : Maybe CreateTimelogInput
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

type alias TimelogMutation =
  { description : String
  , duration : String
  , date : String
  , project : String
  }

type alias TimelogInput =
  { input : TimelogMutation  }

type alias CreateTimelogInput =
  { description : String
  , duration : Maybe TimeDelta
  , date : Maybe Date
  , project : String
  }