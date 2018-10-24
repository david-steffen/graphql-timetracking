module Utils.DateDecoder exposing (decoder)

import Date exposing (Date)
import Json.Decode exposing (Decoder, andThen, string)
import Json.Decode.Extra exposing (fromResult)

decoder : Decoder Date
decoder =
    string |> andThen (Date.fromIsoString >> fromResult)
