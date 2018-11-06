module Types.Project exposing 
  ( Project
  , ProjectModel
  , ProjectsRequest
  , CreateProjectMutation
  , CreateProjectInput
  , CreateProjectForm
  , UpdateProjectMutation
  , UpdateProjectInput
  , ProjectFormAction(..)
  , DeleteProjectMutation
  , DeleteProjectInput
  , ProjectDeleteMutationResult
  )

import Uuid exposing (Uuid)
import Array exposing (Array)

type alias ProjectModel =
  { readyProjects : Bool
  , projects : Array Project
  , errResult : Maybe String
  , createForm : Maybe CreateProjectForm
  , updateForm : Maybe Project
  , isPendingProject : Bool
  , selectedIndex : Maybe Int
  , formAction : ProjectFormAction
  , deleteId : Maybe Uuid
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

type alias CreateProjectMutation =
  { name : String
  , colour : String
  , company : String
  , abbreviation : String
  }

type alias CreateProjectInput =
  { input : CreateProjectMutation }

type alias CreateProjectForm =
  { name : String
  , colour : String
  , company : String
  , abbreviation : String
  }

type alias UpdateProjectMutation =
  { id : String
  , name : String
  , colour : String
  , company : String
  , abbreviation : String
  }

type alias UpdateProjectInput =
  { input : UpdateProjectMutation }

type alias ProjectDeleteMutationResult =
  { projectId : Uuid
  ,  ok : Bool
  }

type alias DeleteProjectMutation =
  { id : String
  }

type alias DeleteProjectInput = 
  { input : DeleteProjectMutation }

type ProjectFormAction
  = Noop
  | Create
  | Update
  | Delete