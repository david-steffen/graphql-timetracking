module Api.Timelog exposing (..)

import Utils.TimeDelta as TimeDelta exposing (..)
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
  , bool
  )
import GraphQL.Request.Builder.Arg as Arg
import GraphQL.Request.Builder.Variable as Var
import GraphQL.Client.Http as GraphQLClient
import Task exposing (Task)
import Uuid exposing (Uuid)
import Types.Timelog exposing 
  ( Timelog
  , ProjectRefQuery
  , TimelogsRequest
  , TimelogsWithProjectsRequest
  , EditTimelogRequest
  , CreateTimelogMutation
  , UpdateTimelogMutation
  , DeleteTimelogMutation
  , CreateTimelogInput
  , UpdateTimelogInput
  , DeleteTimelogInput
  , CreateTimelogForm
  , UpdateTimelogForm
  , TimelogMutationResult
  , TimelogDeleteMutationResult
  )

projectRefObject : ValueSpec NonNull ObjectType ProjectRefQuery vars
projectRefObject =
  object ProjectRefQuery
    |> with (field "id" [] uuid)

timelogsQuery : Request Query TimelogsRequest
timelogsQuery =
  let
    queryRoot =
      object TimelogsRequest
        |> with (field "allTimelogs" [] (list timelogObject))
  in
    queryDocument queryRoot |> request ()

timelogsRangeQuery : Date -> Date -> Request Query TimelogsRequest
timelogsRangeQuery rangeStart rangeEnd =
  let
    rangeStartVar =
      Var.required "rangeStart" .rangeStart dateVar

    rangeEndVar =
      Var.required "rangeEnd" .rangeEnd dateVar

    queryRoot =
      object TimelogsRequest
        |> with (field "timelogsByRange" 
          [ ( "start", Arg.variable rangeStartVar )
          , ( "end", Arg.variable rangeEndVar )
          ] 
          (list timelogObject))
  in
    queryDocument queryRoot |> request { rangeStart = rangeStart, rangeEnd = rangeEnd }


timelogsWithProjectsQuery : Request Query TimelogsWithProjectsRequest
timelogsWithProjectsQuery =
  let
    queryRoot =
      object TimelogsWithProjectsRequest
        |> with (field "allTimelogs" [] (list timelogObject))
        |> with (field "allProjects" [] (list projectsObject))
  in
    queryDocument queryRoot |> request ()

timelogsRangeWithProjectsQuery : Date -> Date -> Request Query TimelogsWithProjectsRequest
timelogsRangeWithProjectsQuery rangeStart rangeEnd =
  let
    rangeStartVar =
      Var.required "rangeStart" .rangeStart dateVar

    rangeEndVar =
      Var.required "rangeEnd" .rangeEnd dateVar

    queryRoot =
      object TimelogsWithProjectsRequest
        |> with (field "timelogsByRange" 
          [ ( "start", Arg.variable rangeStartVar )
          , ( "end", Arg.variable rangeEndVar )
          ] 
          (list timelogObject))
        |> with (field "allProjects" [] (list projectsObject))

  in
    queryDocument queryRoot |> request { rangeStart = rangeStart, rangeEnd = rangeEnd }

timelogObject : ValueSpec NonNull ObjectType (Timelog) vars
timelogObject =
  object Timelog
    |> with (field "id" [] uuid)
    |> with (field "description" [] string)
    |> with (field "duration" [] timeDelta)
    |> with (field "date" [] date)
    |> with (field "project" [] projectRefObject)


timelogQuery : Uuid -> Request Query Timelog
timelogQuery uuid =
  let
    timelogIDVar =
      Var.required "taskId" .timelogId uuidVar

    queryRoot =
      extract
        (field "timelog"
          [ ( "id", Arg.variable timelogIDVar ) ]
          timelogObject
        )
  in
    queryDocument queryRoot |> request { timelogId = uuid }

editTimelogQuery : Uuid -> Request Query EditTimelogRequest
editTimelogQuery uuid =
  let
    timelogIDVar =
      Var.required "taskId" .timelogId uuidVar
    queryRoot =
      object EditTimelogRequest
        |> with (field "timelog"
            [ ( "id", Arg.variable timelogIDVar ) ]
            timelogObject
          )
        |> with (field "allProjects" [] (list projectsObject))
  in
    queryDocument queryRoot |> request { timelogId = uuid }

convertToCreateTimelogMutation : CreateTimelogForm -> CreateTimelogMutation
convertToCreateTimelogMutation timelog =
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
    CreateTimelogMutation timelog.description durationString dateString timelog.project

convertToUpdateTimelogMutation : UpdateTimelogForm -> UpdateTimelogMutation
convertToUpdateTimelogMutation timelog =
  let
    id = 
      Uuid.toString timelog.id
    dateString =
      Date.toIsoString timelog.date
    durationString =
      TimeDelta.toString timelog.duration
    projectId = 
      Uuid.toString timelog.project
  in
    UpdateTimelogMutation id timelog.description durationString dateString projectId

convertToDeleteTimelogMutation : Uuid -> DeleteTimelogMutation
convertToDeleteTimelogMutation id =
  DeleteTimelogMutation <| Uuid.toString id

processCreateTimelogInput : CreateTimelogForm -> CreateTimelogInput
processCreateTimelogInput timelog =
  let
    newTimeLog = convertToCreateTimelogMutation timelog
  in
    { input = newTimeLog
    }

processUpdateTimelogInput : UpdateTimelogForm -> UpdateTimelogInput
processUpdateTimelogInput timelog =
  let
    newTimeLog = convertToUpdateTimelogMutation timelog
  in
    { input = newTimeLog
    }

processDeleteTimelogInput : Uuid -> DeleteTimelogInput
processDeleteTimelogInput id =
  let
    newTimeLog = convertToDeleteTimelogMutation id
  in
    { input = newTimeLog
    }

createTimelogMutation : CreateTimelogInput -> Request Mutation TimelogMutationResult
createTimelogMutation timelog =
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
          (object TimelogMutationResult
            |> with (field "task" [] timelogObject)
            |> with (field "ok" [] bool)
          )
        )

  in
    mutationDocument mutationRoot
      |> request timelog

updateTimelogMutation : UpdateTimelogInput -> Request Mutation TimelogMutationResult
updateTimelogMutation timelog =
  let
    taskVar =
        Var.required "input"
        .input
        (Var.object "UpdateTaskInput"
            [ Var.field "id" .id Var.string
            , Var.field "description" .description Var.string
            , Var.field "duration" .duration Var.string
            , Var.field "date" .date Var.string
            , Var.field "project" .project Var.string
            ]
        )

    mutationRoot =
      extract
        (field "updateTask"
          [ ("input", Arg.variable taskVar) ]
          (object TimelogMutationResult
            |> with (field "task" [] timelogObject)
            |> with (field "ok" [] bool)
          )
        )
  in
    mutationDocument mutationRoot
      |> request timelog

deleteTimelogMutation : DeleteTimelogInput -> Request Mutation TimelogDeleteMutationResult
deleteTimelogMutation timelog =
  let
    taskVar =
        Var.required "input"
        .input
        (Var.object "DeleteTaskInput"
            [ Var.field "id" .id Var.string
            ]
        )

    mutationRoot =
      extract
        (field "deleteTask"
          [ ("input", Arg.variable taskVar) ]
          (object TimelogDeleteMutationResult
            |> with (field "taskId" [] uuid)
            |> with (field "ok" [] bool)
          )
        )
  in
    mutationDocument mutationRoot
      |> request timelog