module Api.Project exposing (..)

import Types.Project exposing 
  ( Project
  , ProjectsRequest
  , CreateProjectForm
  , CreateProjectMutation
  , CreateProjectInput
  , UpdateProjectMutation
  , UpdateProjectInput
  , ProjectMutationResult
  , ProjectDeleteMutationResult
  , DeleteProjectInput
  , DeleteProjectMutation
  , ProjectMember
  , ProjectWithMembers
  , EditProjectRequest
  )
import Api exposing (..)
import Api.User exposing (userObject)
import GraphQL.Request.Builder exposing 
  ( ObjectType
  , ValueSpec
  , NonNull
  , Request
  , Query
  , Mutation
  , customScalar
  , object
  , with
  , field
  , string
  , extract
  , queryDocument
  , list
  , request
  , mutationDocument
  , bool
  )
import GraphQL.Request.Builder.Arg as Arg
import GraphQL.Request.Builder.Variable as Var
import Uuid exposing (Uuid)

projectsMembersObject : ValueSpec NonNull  ObjectType (ProjectMember) vars
projectsMembersObject =
  object ProjectMember
      |> with (field "user" [] userObject)

projectWithMembersObject : ValueSpec NonNull  ObjectType (ProjectWithMembers) vars
projectWithMembersObject =
  object ProjectWithMembers
      |> with (field "id" [] uuid)
      |> with (field "name" [] string)
      |> with (field "colour" [] string)
      |> with (field "company" [] string)
      |> with (field "abbreviation" [] string)
      |> with (field "members" [] (list projectsMembersObject))

projectsObject : ValueSpec NonNull  ObjectType (Project) vars
projectsObject =
  object Project
      |> with (field "id" [] uuid)
      |> with (field "name" [] string)
      |> with (field "colour" [] string)
      |> with (field "company" [] string)
      |> with (field "abbreviation" [] string)

projectsQuery : Request Query ProjectsRequest
projectsQuery =
  let
    queryRoot =
      object ProjectsRequest
        |> with (field "allProjects" [] (list projectsObject))
  in
    queryDocument queryRoot |> request ()

projectQuery : Uuid -> Request Query ProjectWithMembers
projectQuery uuid =
  let
    projectIDVar =
      Var.required "projectId" .projectId Var.string
    queryRoot =
      extract
        (field "project"
            [ ( "id", Arg.variable projectIDVar ) ]
            projectWithMembersObject
        )
    id = Uuid.toString uuid
  in
    queryDocument queryRoot |> request { projectId = id }


editProjectQuery : Uuid -> Request Query EditProjectRequest
editProjectQuery uuid =
  let
    projectIDVar =
      Var.required "projectId" .projectId Var.string
    queryRoot =
      object EditProjectRequest
        |> with (field "project"
            [ ( "id", Arg.variable projectIDVar ) ]
            projectWithMembersObject
          )
        |> with (field "allUsers" [] (list userObject))
    id = Uuid.toString uuid
  in
    queryDocument queryRoot |> request { projectId = id }

convertToCreateProjectMutation : CreateProjectForm -> CreateProjectMutation
convertToCreateProjectMutation project =
  CreateProjectMutation project.name project.colour project.company project.abbreviation


processCreateProjectInput : CreateProjectForm -> CreateProjectInput
processCreateProjectInput project =
  let
    newProject = convertToCreateProjectMutation project
  in
    { input = newProject
    }

convertToUpdateProjectMutation : ProjectWithMembers -> UpdateProjectMutation
convertToUpdateProjectMutation project =
  UpdateProjectMutation (Uuid.toString project.id) project.name project.colour project.company project.abbreviation

processUpdateProjectInput : ProjectWithMembers -> UpdateProjectInput
processUpdateProjectInput project =
  let
    newProject = convertToUpdateProjectMutation project
  in
    { input = newProject
    }

convertToDeleteProjectMutation : Uuid -> DeleteProjectMutation
convertToDeleteProjectMutation id =
  DeleteProjectMutation <| Uuid.toString id

processDeleteProjectInput : Uuid -> DeleteProjectInput
processDeleteProjectInput id =
  let
    newProject = convertToDeleteProjectMutation id
  in
    { input = newProject
    }

createProjectMutation : CreateProjectInput -> Request Mutation Project
createProjectMutation project =
  let
    projectVar =
        Var.required "input"
        .input
        (Var.object "ProjectInput"
            [ Var.field "name" .name Var.string
            , Var.field "colour" .colour Var.string
            , Var.field "company" .company Var.string
            , Var.field "abbreviation" .abbreviation Var.string
            ]
        )

    mutationRoot =
      extract
        (field "createProject"
          [ ("input", Arg.variable projectVar) ]
          (extract (field "project" [] projectsObject))
        )

  in
    mutationDocument mutationRoot
      |> request project

updateProjectMutation : UpdateProjectInput -> Request Mutation ProjectMutationResult
updateProjectMutation project =
  let
    projectVar =
        Var.required "input"
        .input
        (Var.object "UpdateProjectInput"
            [ Var.field "id" .id Var.string
            , Var.field "name" .name Var.string
            , Var.field "colour" .colour Var.string
            , Var.field "company" .company Var.string
            , Var.field "abbreviation" .abbreviation Var.string
            ]
        )

    mutationRoot =
      extract
        (field "updateProject"
          [ ("input", Arg.variable projectVar) ]
          (object ProjectMutationResult
            |> with (field "project" [] projectsObject)
            |> with (field "ok" [] bool)
          )
        )

  in
    mutationDocument mutationRoot
      |> request project

deleteProjectMutation : DeleteProjectInput -> Request Mutation ProjectDeleteMutationResult
deleteProjectMutation project =
  let
    projectVar =
        Var.required "input"
        .input
        (Var.object "DeleteProjectInput"
            [ Var.field "id" .id Var.string
            ]
        )

    mutationRoot =
      extract
        (field "deleteProject"
          [ ("input", Arg.variable projectVar) ]
          (object ProjectDeleteMutationResult
            |> with (field "projectId" [] uuid)
            |> with (field "ok" [] bool)
          )
        )
  in
    mutationDocument mutationRoot
      |> request project