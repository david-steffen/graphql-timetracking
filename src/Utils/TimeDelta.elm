module Utils.TimeDelta exposing (TimeDelta, fromString, totalTime, decoder, toString)

import String exposing (split, toInt, fromInt)
import List exposing (head, take, length, drop, tail)
import Array
import Json.Decode as Decode exposing (Decoder, andThen, string)
import Json.Decode.Extra as JDExtra exposing (fromResult)
import Result exposing (Result)
import Regex

type alias TimeDelta =
  { days : Int
  , hours : Int
  , minutes : Int
  , seconds : Int
  }


fromString: String -> Result String TimeDelta
fromString string =
  let
    spaceAndColon = 
      Maybe.withDefault Regex.never <|
        Regex.fromString "\\s|:"
    timeArray =
      Regex.split spaceAndColon string
        |> List.map parseInt
        |> Array.fromList

  in
    case Array.length timeArray of
      2 ->
        Ok
        { days = 0
        , hours = (Array.get 0 (timeArray) |> Maybe.withDefault 0)
        , minutes = (Array.get 1 (timeArray)|> Maybe.withDefault 0)
        , seconds = 0
        }
      3 ->
        Ok
        { days = 0
        , hours = (Array.get 0 (timeArray) |> Maybe.withDefault 0)
        , minutes = (Array.get 1 (timeArray)|> Maybe.withDefault 0)
        , seconds = (Array.get 2 (timeArray)|> Maybe.withDefault 0)
        }
      5 ->
        Ok
        { days = (Array.get 0 (timeArray)|> Maybe.withDefault 0)
        , hours = (Array.get 2 (timeArray) |> Maybe.withDefault 0)
        , minutes = (Array.get 3 (timeArray)|> Maybe.withDefault 0)
        , seconds = (Array.get 4 (timeArray)|> Maybe.withDefault 0)
        }
      _ ->
        Err "invalid format"

parseInt str =
    str
        |> toInt
        |> Maybe.withDefault 0

totalTime: TimeDelta -> String
totalTime timeDelta =
    String.join ":"
        [ twoDigitTime (getTotalHours timeDelta)
        , twoDigitTime (timeDelta.minutes)
        ]

getTotalHours timeDelta =
    timeDelta.hours + (timeDelta.days * 24)

twoDigitTime: Int -> String
twoDigitTime int =
    if int < 10 then
        "0" ++ fromInt int
    else
        fromInt int

toString : TimeDelta -> String
toString timeDelta =
    let
        days =
            if timeDelta.days > 0 then
                let
                    stringDays = fromInt timeDelta.days
                    daysString =
                        if timeDelta.days == 1 then
                            " day "
                        else
                            " days "
                in
                    stringDays++daysString
            else
                ""
        time =
            String.join ":"
                [ twoDigitTime (timeDelta.hours)
                , twoDigitTime (timeDelta.minutes)
                , twoDigitTime (timeDelta.seconds)
                ]
    in
        days++time


decoder : Decoder TimeDelta
decoder =
    string |> Decode.andThen (fromString >> JDExtra.fromResult)
