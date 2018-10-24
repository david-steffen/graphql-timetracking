port module Ports exposing (csrf)

port csrf : (String -> msg) -> Sub msg
