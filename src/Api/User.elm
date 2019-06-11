module Api.User exposing (..)

import Types.User exposing 
  ( User
  , Account
  , UsersRequest
  , ProfileRequest
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

userObject : ValueSpec NonNull  ObjectType (User) vars
userObject =
  object User
      |> with (field "id" [] uuid)
      |> with (field "email" [] string)
      |> with (field "firstName" [] string)
      |> with (field "lastName" [] string)
      |> with (field "account" [] accountObject)

accountObject : ValueSpec NonNull  ObjectType (Account) vars
accountObject =
  object Account
      |> with (field "id" [] uuid)
      |> with (field "accType" [] string)
      |> with (field "name" [] string)
      |> with (field "globalWorkDayHours" [] int)

usersQuery : Request Query UsersRequest
usersQuery =
  let
    queryRoot =
      object UsersRequest
        |> with (field "allUsers" [] (list userObject))
  in
    queryDocument queryRoot |> request ()

profileQuery : Request Query ProfileRequest
profileQuery =
  let
    queryRoot =
      object ProfileRequest
        |> with (field "profile" [] userObject)
  in
    queryDocument queryRoot |> request ()
