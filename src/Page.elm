module Page exposing (InputLength(..), formInput, formSelect, fullNameString)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Json.Decode as JD
import Uuid exposing (Uuid)
import Types exposing (Model)
import Types.User exposing (User)

type alias SelectOption =
  { value : String
  , title : String
  }

type InputLength
  = Short
  | Full

onChange : (String -> msg) -> H.Attribute msg
onChange handler =
    E.on "change" <| JD.map handler <| JD.at ["target", "value"] JD.string

isFullwidth : InputLength -> Bool
isFullwidth length =
  case length of 
    Short ->
      False
    Full ->
      True

formSelect : List SelectOption -> (String -> a) -> Maybe String -> InputLength -> Html a
formSelect list msg value inputLength =
  H.div 
    [ A.class "field" ]
    [ H.label 
      [ A.class "label" ]
      [ H.div
        [ A.classList [("control", True), ("is-expanded", isFullwidth inputLength)] ]
        [ H.div 
          [ A.classList [("select", True), ("is-fullwidth", isFullwidth inputLength)] ]
          [ H.select
            [ onChange msg ]
            (List.map
              (\item ->
                let
                  selected =
                    case value of
                      Just val ->
                        if val == item.value then
                          True
                        else
                          False
                      Nothing ->
                        False
                  -- value = 
                in
                  H.option
                    [ A.value item.value
                    , A.selected selected
                    ]
                    [ H.text item.title ]
              )
            ( SelectOption "" "Please select..." :: list )
            )
          ]
        ]
      ]
    ]

formInput : String -> String -> (String -> a) -> Maybe String -> InputLength -> Html a
formInput type_ placeholder msg value inputLength =
  let
    attributes =
      case value of
        Just val ->
          [ A.value val ]
        Nothing ->
          []
  in
    H.div 
      [ A.class "field" ]
      [ H.label 
        [ A.class "label" ]
        [ H.div 
          [ A.classList [("control", True), ("is-expanded", isFullwidth inputLength)] ]
          [ H.input
            (List.append attributes
            [ A.class "input"
            , A.type_ type_
            , A.placeholder placeholder
            , E.onInput msg
            ])
            []
          ]
        ]
      ]

fullNameString : User -> String
fullNameString user =
  user.first_name ++ " " ++ user.last_name