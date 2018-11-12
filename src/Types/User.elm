module Types.User exposing (..)

import Uuid exposing (Uuid)

type alias UserModel =
  { errResult : Maybe String
  , readyUsers : Bool
  , users : List User
  , isPending : Bool
  }

type alias User =
  { id : Uuid
  , email : String
  , first_name : String
  , last_name : String
  }

type alias UsersRequest =
  { allUsers : List User
  }

