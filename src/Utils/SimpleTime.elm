module Utils.SimpleTime exposing (..)

import String exposing (split, fromInt, toInt)
import Json.Decode as Json exposing (Decoder, andThen, string)
import Json.Decode.Extra as JsonExtra exposing (fromResult)
import Regex
import Array

type alias Time =
  { hours : Int
  , minutes : Int
  , seconds : Int
  }


parse : String -> Result String Time
parse string =
  let
    timeArray =
      split ":" string
        |> List.map (\x -> toInt x |> Maybe.withDefault 0)
        |> Array.fromList
  in 
    if Array.length timeArray == 3 then
      let
        hours = parseHours (Array.get 0 timeArray)
        minutes = parseMinutesOrSeconds (Array.get 1 timeArray)
        seconds = parseMinutesOrSeconds (Array.get 2 timeArray)
      in
        Ok (Time hours minutes seconds)
    else
      Err "invalid format"

parseHours : Maybe Int -> Int
parseHours val = 
  case val of
    Just int ->
      if isValidHour int then
        int 
      else 
        0
    Nothing ->
      0

parseMinutesOrSeconds : Maybe Int -> Int
parseMinutesOrSeconds val = 
  case val of
    Just int ->
      if isValidMinuteOrSecond int then
        int 
      else 
        0
    Nothing ->
      0

isValidHour : Int -> Bool
isValidHour int =
  int >= 0 && int < 24

isValidMinuteOrSecond : Int -> Bool
isValidMinuteOrSecond int =
  int >= 0 && int < 60

toString : Time -> String
toString timeString =
    String.join ":"
        [ twoDigitTime (parseHours (Just timeString.hours))
        , twoDigitTime (parseMinutesOrSeconds (Just timeString.minutes))
        , twoDigitTime (parseMinutesOrSeconds (Just timeString.seconds))
        ]

twoDigitTime: Int -> String
twoDigitTime int =
    if int < 10 then
        "0" ++ fromInt int
    else
        fromInt int


decoder : Decoder Time
decoder =
    string |> Json.andThen (parse >> fromResult)