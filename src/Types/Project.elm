module Types.Project exposing (..)

import Uuid exposing (Uuid)
import Array exposing (Array)
import Types.User exposing (User)

type alias ProjectModel =
  { readyProjects : Bool
  , projects : Array Project
  , errResult : Maybe String
  , isPending : Bool
  , deleteId : Maybe Uuid
  }

type alias AddProjectModel =
  { errResult : Maybe String
  , createForm : Maybe CreateProjectForm
  , isPending : Bool
  }

type alias EditProjectModel =
  { errResult : Maybe String
  , updateForm : Maybe ProjectWithMembers
  , isPending : Bool
  }

type alias Project =
  { id : Uuid
  , name : String
  , colour : String
  , company : String
  , abbreviation : String
  }

type alias ProjectWithMembers =
  { id : Uuid
  , name : String
  , colour : String
  , company : String
  , abbreviation : String
  , members : List ProjectMember
  }

type alias ProjectMember =
  { user : User
  }

type alias EditProjectRequest =
  { project : ProjectWithMembers
  , allUsers : List User
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

type alias ProjectMutationResult =
  { project : Project
  , ok : Bool
  }

type alias ProjectDeleteMutationResult =
  { projectId : Uuid
  ,  ok : Bool
  }

type alias DeleteProjectMutation =
  { id : String
  }

type alias DeleteProjectInput = 
  { input : DeleteProjectMutation }