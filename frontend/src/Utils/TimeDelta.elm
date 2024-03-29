module Utils.TimeDelta exposing 
  ( TimeDelta
  , parse
  , totalTime
  , decoder
  , toString
  , add
  , customDaysAdd
  , toFloat
  , toCustomDayFloat
  , twoDigitTime
  )

import String exposing (split, toInt, fromInt)
import List exposing (head, take, length, drop, tail)
import Array
import Json.Decode as Decode exposing (Decoder, andThen, string)
import Json.Decode.Extra as JDExtra exposing (fromResult)
import Result exposing (Result)
import Regex
import Parser exposing 
    ( Parser
    , run
    , oneOf
    , succeed
    , symbol
    , spaces
    , int
    , keyword
    , (|.)
    , (|=)
    )

type alias TimeDelta =
  { days : Int
  , hours : Int
  , minutes : Int
  , seconds : Int
  }


parse : String -> Result String TimeDelta
parse string =
  let
    spaceAndColon = 
      Maybe.withDefault Regex.never <|
        Regex.fromString "\\s|:"
    timeArray =
      Regex.split spaceAndColon string
        |> List.map parseInt
        |> List.filter (\x -> x >= 0)
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
      4 ->
        Ok
        { days = (Array.get 0 (timeArray)|> Maybe.withDefault 0)
        , hours = (Array.get 1 (timeArray) |> Maybe.withDefault 0)
        , minutes = (Array.get 2 (timeArray)|> Maybe.withDefault 0)
        , seconds = (Array.get 3 (timeArray)|> Maybe.withDefault 0)
        }
      _ ->
        Err "invalid format"


parseInt : String -> Int
parseInt str =
    str
        |> toInt
        |> Maybe.withDefault -1

totalTime: TimeDelta -> String
totalTime timeDelta =
    String.join ":"
        [ twoDigitTime (getTotalHours timeDelta)
        , twoDigitTime (timeDelta.minutes)
        ]

getTotalHours : TimeDelta -> Int
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

format : String -> TimeDelta -> String
format pattern timeDelta =
  ""

toSeconds : TimeDelta -> Float
toSeconds timeDelta = 
  let
    minuteSeconds = timeDelta.minutes * 60
    hourSeconds = timeDelta.hours * 3600
    daySeconds = timeDelta.days * 86400
  in
    Basics.toFloat <| timeDelta.seconds + minuteSeconds + hourSeconds + daySeconds

toFloat : TimeDelta -> Float
toFloat timeDelta =
  (toSeconds timeDelta) / 86400

toCustomDayFloat : Int -> TimeDelta -> Float
toCustomDayFloat hoursInDay timeDelta =
  (toSeconds timeDelta) / (3600 * Basics.toFloat hoursInDay)

add : TimeDelta -> TimeDelta -> TimeDelta
add time1 time2 =
  let
    (seconds, secondsExtra) = addTimes time1.seconds time2.seconds
    (minutes, minutesExtra) = addTimes time1.minutes (time2.minutes + secondsExtra)
    (hours, hourExtra) = addHours time1.hours (time2.hours + minutesExtra)
    days = time1.days + time2.days + hourExtra
  in
    TimeDelta days hours minutes seconds
  
addHours : Int -> Int -> (Int, Int)
addHours time1 time2 =
  let
    newTime = time1 + time2
  in
    (remainderBy 24 newTime, newTime // 24)

addTimes : Int -> Int -> (Int, Int)
addTimes time1 time2 = 
  let
    newTime = time1 + time2
  in
    if newTime >= 60 then
      (newTime - 60, 1)
    else
      (newTime, 0)

customDaysAdd : Int -> TimeDelta -> TimeDelta -> TimeDelta
customDaysAdd customDay time1 time2 =
  let
    (seconds, secondsExtra) = addTimes time1.seconds time2.seconds
    (minutes, minutesExtra) = addTimes time1.minutes (time2.minutes + secondsExtra)
    (hours, hourExtra) = addCustomHours customDay time1.hours (time2.hours + minutesExtra)
    days = time1.days + time2.days + hourExtra
  in
    TimeDelta days hours minutes seconds

addCustomHours : Int -> Int -> Int -> (Int, Int)
addCustomHours customDay time1 time2 =
  let
    newTime = time1 + time2
  in
    (remainderBy customDay newTime, newTime // customDay)

decoder : Decoder TimeDelta
decoder =
    string |> Decode.andThen (parse >> JDExtra.fromResult)
