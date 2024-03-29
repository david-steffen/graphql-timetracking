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
  , AddProjectRequest
  , EditProjectRequest
  )
import Types.User exposing ( User )
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
  , int
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
    |> with (field "id" [] uuid)
    |> with (field "user" [] userObject)

projectWithMembersObject : ValueSpec NonNull  ObjectType (ProjectWithMembers) vars
projectWithMembersObject =
  object ProjectWithMembers
    |> with (field "id" [] uuid)
    |> with (field "name" [] string)
    |> with (field "colour" [] string)
    |> with (field "company" [] string)
    |> with (field "abbreviation" [] string)
    |> with (field "workDayHours" [] int)
    |> with (field "members" [] (list userObject))

projectsObject : ValueSpec NonNull  ObjectType (Project) vars
projectsObject =
  object Project
    |> with (field "id" [] uuid)
    |> with (field "name" [] string)
    |> with (field "colour" [] string)
    |> with (field "company" [] string)
    |> with (field "abbreviation" [] string)
    |> with (field "workDayHours" [] int)


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
      Var.required "projectId" .projectId uuidVar
    queryRoot =
      extract
        (field "project"
            [ ( "id", Arg.variable projectIDVar ) ]
            projectWithMembersObject
        )
  in
    queryDocument queryRoot |> request { projectId = uuid }

addProjectQuery : Request Query AddProjectRequest
addProjectQuery =
  let
    queryRoot =
      object AddProjectRequest
        |> with (field "allUsers" [] (list userObject))

  in
    queryDocument queryRoot |> request ()

editProjectQuery : Uuid -> Request Query EditProjectRequest
editProjectQuery uuid =
  let
    projectIDVar =
      Var.required "projectId" .projectId uuidVar
    queryRoot =
      object EditProjectRequest
        |> with (field "project"
            [ ( "id", Arg.variable projectIDVar ) ]
            projectWithMembersObject
          )
        |> with (field "allUsers" [] (list userObject))

  in
    queryDocument queryRoot |> request { projectId = uuid }

convertToCreateProjectMutation : CreateProjectForm -> List User -> CreateProjectMutation
convertToCreateProjectMutation project addMembers =
  let
    addMembersStrings = List.map (\x -> Uuid.toString x.id) addMembers
  in
    CreateProjectMutation
      project.name
      project.colour
      project.company
      project.abbreviation
      project.workDayHours
      addMembersStrings


processCreateProjectInput : CreateProjectForm -> List User -> CreateProjectInput
processCreateProjectInput project addMembers =
  let
    newProject = convertToCreateProjectMutation project addMembers
  in
    { input = newProject
    }

convertToUpdateProjectMutation : 
  ProjectWithMembers
  -> List User 
  -> List User 
  -> UpdateProjectMutation
convertToUpdateProjectMutation project addMembers removeMembers=
  let
    addMembersStrings = List.map (\x -> Uuid.toString x.id) addMembers
    removeMembersStrings = List.map (\x -> Uuid.toString x.id) removeMembers
  in
    UpdateProjectMutation 
      (Uuid.toString project.id) 
      project.name
      project.colour
      project.company
      project.abbreviation
      project.workDayHours
      addMembersStrings
      removeMembersStrings

processUpdateProjectInput : 
  ProjectWithMembers 
  -> List User 
  -> List User 
  -> UpdateProjectInput
processUpdateProjectInput project addMembers removeMembers =
  let
    newProject = convertToUpdateProjectMutation project addMembers removeMembers
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
            , Var.field "workDayHours" .workDayHours Var.int
            , Var.field "addMembers" .addMembers (Var.list Var.string)
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
            , Var.field "workDayHours" .workDayHours Var.int
            , Var.field "addMembers" .addMembers (Var.list Var.string)
            , Var.field "removeMembers" .removeMembers (Var.list Var.string)
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