module Api.Timelog exposing (..)

import Utils.TimeDelta as TimeDelta exposing (TimeDelta)
import Date exposing (Date)
import Types.Timelog exposing (Timelog)
import Types.Project exposing (Project)
import Api exposing (..)
import Api.Project exposing (projectsObject)
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
import GraphQL.Client.Http as GraphQLClient
import Task exposing (Task)
import Uuid exposing (Uuid)
import Types.Timelog exposing 
  ( TimelogQuery
  , ProjectRefQuery
  , TimelogsRequest
  , TimelogsWithProjectsRequest
  , TimelogMutation
  , TimelogInput
  , CreateTimelogInput
  )


mergeWithProjects : List TimelogQuery -> List Project -> List Timelog  
mergeWithProjects timelogs projects =
  List.map
    (\timelog ->
      let
        projectFiltered = List.filter (\x -> x.id == timelog.project.id) projects
        project =
          List.head projectFiltered
            |> Maybe.withDefault 
              { id = timelog.project.id
              , name = ""
              , colour = ""
              , company = ""
              , abbreviation = ""
              }
      in
        Timelog timelog.id timelog.description timelog.duration timelog.date project
    )
    timelogs

projectRefObject : ValueSpec NonNull ObjectType ProjectRefQuery vars
projectRefObject =
  object ProjectRefQuery
    |> with (field "id" [] uuid)

timelogsObject : ValueSpec NonNull ObjectType TimelogQuery vars
timelogsObject =
  object TimelogQuery
    |> with (field "id" [] uuid)
    |> with (field "description" [] string)
    |> with (field "duration" [] timeDelta)
    |> with (field "date" [] date)
    |> with (field "project" [] projectRefObject)

timelogsQuery : Request Query TimelogsRequest
timelogsQuery =
  let
    queryRoot =
      object TimelogsRequest
        |> with (field "allTimelogs" [] (list timelogsObject))
  in
    queryDocument queryRoot |> request ()

timelogsWithProjectsQuery : Request Query TimelogsWithProjectsRequest
timelogsWithProjectsQuery =
  let
    queryRoot =
      object TimelogsWithProjectsRequest
        |> with (field "allTimelogs" [] (list timelogsObject))
        |> with (field "allProjects" [] (list projectsObject))
  in
    queryDocument queryRoot |> request ()

timelogObject : ValueSpec NonNull ObjectType (Timelog) vars
timelogObject =
  object Timelog
    |> with (field "id" [] uuid)
    |> with (field "description" [] string)
    |> with (field "duration" [] timeDelta)
    |> with (field "date" [] date)
    |> with (field "project" [] projectsObject)

timelogQuery : Request Query Timelog
timelogQuery =
  let
    timelogIDVar =
      Var.required "id" .id Var.string

    queryRoot =
      extract
        (field "timelog"
          [ ( "id", Arg.variable timelogIDVar ) ]
          timelogObject
        )
  in
    queryDocument queryRoot
      |> request
        { id = "1" }

convertToTimelogMutation : CreateTimelogInput -> TimelogMutation
convertToTimelogMutation timelog =
  let
    dateString =
      case timelog.date of
        Just date ->
          Date.toIsoString date
        Nothing ->
          ""
    durationString =
      case timelog.duration of
        Just duration ->
          TimeDelta.toString duration
        Nothing ->
          ""
  in
    TimelogMutation timelog.description durationString dateString timelog.project


processCreateTimelogInput : CreateTimelogInput -> TimelogInput
processCreateTimelogInput timeLog =
  let
    newTimeLog = convertToTimelogMutation timeLog
  in
    { input = newTimeLog
    }

timelogMutation : TimelogInput -> Request Mutation Timelog
timelogMutation timelog =
  let
    taskVar =
        Var.required "input"
        .input
        (Var.object "TaskInput"
            [ Var.field "description" .description Var.string
            , Var.field "duration" .duration Var.string
            , Var.field "date" .date Var.string
            , Var.field "project" .project Var.string
            ]
        )

    mutationRoot =
      extract
        (field "createTask"
          [ ("input", Arg.variable taskVar) ]
          (extract (field "task" [] timelogObject))
        )

  in
    mutationDocument mutationRoot
      |> request
        { input =
          { description = timelog.input.description
          , project = timelog.input.project
          , date = timelog.input.date
          , duration = timelog.input.duration
          }
        }