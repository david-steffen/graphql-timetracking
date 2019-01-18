module Api exposing (..)

import Date exposing (Date)
import Utils.TimeDelta as TimeDelta exposing (TimeDelta)
import Utils.SimpleTime as SimpleTime exposing (Time)
import Utils.DateDecoder as DateDecoder exposing (..)
import Uuid exposing (Uuid)
import Task exposing (Task)
import GraphQL.Request.Builder exposing 
  ( ValueSpec
  , NonNull
  , Request
  , Query
  , Mutation
  , ObjectType
  , customScalar
  , object
  , with
  , bool
  , field
  )
import GraphQL.Request.Builder.Variable as Var

import GraphQL.Client.Http as GraphQLClient
import Http exposing (header)

type TimeType
  = TimeType

type TimeDeltaType
  = TimeDeltaType

type DateType
  = DateType

type UuidType
  = UuidType

timeDelta : ValueSpec NonNull TimeDeltaType TimeDelta vars
timeDelta =
  TimeDelta.decoder
    |> customScalar TimeDeltaType

time : ValueSpec NonNull TimeType Time vars
time =
  SimpleTime.decoder
    |> customScalar TimeType

date : ValueSpec NonNull DateType Date vars
date =
  DateDecoder.decoder
    |> customScalar DateType

uuid : ValueSpec NonNull UuidType Uuid vars
uuid =
  Uuid.decoder
    |> customScalar UuidType


-- Custom scalar type for variables using enum cheat
dateVar : Var.VariableSpec Var.NonNull Date
dateVar =
  Var.enum "Date" (\x -> Date.toIsoString x)

uuidVar : Var.VariableSpec Var.NonNull Uuid
uuidVar =
  Var.enum "UUID" (\x -> Uuid.toString x)

requestOptions : String -> GraphQLClient.RequestOptions
requestOptions csrf =
  { method = "POST"
  , headers = [(header "X-CSRFToken" csrf)]
  , url = "/graphql"
  , timeout = Nothing
  , withCredentials = False
  }



sendQueryRequest : String -> Request Query a -> Task GraphQLClient.Error a
sendQueryRequest csrf request =
  let
    options = requestOptions csrf
  in
    GraphQLClient.customSendQuery options request

sendMutationRequest : String -> Request Mutation a -> Task GraphQLClient.Error a
sendMutationRequest csrf request =
  let
    options = requestOptions csrf
  in
    GraphQLClient.customSendMutation options request