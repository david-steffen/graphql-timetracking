module Types.User exposing (..)

import Uuid exposing (Uuid)

type alias UserModel =
  { errResult : Maybe String
  , readyUsers : Bool
  , users : List User
  , isPending : Bool
  }

type alias ProfileModel =
  { errResult : Maybe String
  , readyUser : Bool
  , user : Maybe User
  , isPending : Bool
  }

type alias User =
  { id : Uuid
  , email : String
  , firstName : String
  , lastName : String
  , account : Account
  }

type alias Account =
  { id : Uuid
  , name : String
  , accType : String
  , globalWorkDayHours : Int
  }

type alias UsersRequest =
  { allUsers : List User
  }

type alias ProfileRequest =
  { profile : User
  }

