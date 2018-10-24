module Api.Project exposing (..)

import Types.Project exposing 
  ( Project
  , ProjectsRequest
  , CreateProjectInput
  , ProjectMutation
  , ProjectInput
  )
import Api exposing (..)
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
  )
import GraphQL.Request.Builder.Arg as Arg
import GraphQL.Request.Builder.Variable as Var

projectsObject  : ValueSpec NonNull  ObjectType (Project) vars
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

convertToProjectMutation : CreateProjectInput -> ProjectMutation
convertToProjectMutation project =
  ProjectMutation project.name project.colour project.company project.abbreviation


processCreateProjectInput : CreateProjectInput -> ProjectInput
processCreateProjectInput project =
  let
    newProject = convertToProjectMutation project
  in
    { input = newProject
    }

projectMutation : ProjectInput -> Request Mutation Project
projectMutation project =
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
      |> request
        { input =
          { name = project.input.name
          , colour = project.input.colour
          , company = project.input.company
          , abbreviation = project.input.abbreviation
          }
        }