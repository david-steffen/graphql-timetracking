module Types.Project exposing 
  ( Project
  , ProjectModel
  , ProjectsRequest
  , ProjectMutation
  , ProjectInput
  , CreateProjectInput
  )

import Uuid exposing (Uuid)

type alias ProjectModel =
  { readyProjects : Bool
  , projects : List Project
  , errResult : Maybe String
  , formProject : Maybe CreateProjectInput
  , isPendingProject : Bool
  }

type alias Project =
  { id : Uuid
  , name : String
  , colour : String
  , company : String
  , abbreviation : String
  }

type alias ProjectsRequest =
  { allProjects : List Project
  }

type alias ProjectMutation =
  { name : String
  , colour : String
  , company : String
  , abbreviation : String
  }

type alias ProjectInput =
  { input : ProjectMutation }

type alias CreateProjectInput =
  { name : String
  , colour : String
  , company : String
  , abbreviation : String
  }