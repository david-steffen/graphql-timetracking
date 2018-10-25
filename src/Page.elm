module Page exposing (formInput, formSelect)

import Html as H exposing (..)
import Html.Attributes as A exposing (..)
import Html.Events as E exposing (..)
import Json.Decode as JD
import Uuid exposing (Uuid)
import Types exposing (Model)

type alias SelectOption =
  { value : String
  , title : String
  }

onChange : (String -> msg) -> H.Attribute msg
onChange handler =
    E.on "change" <| JD.map handler <| JD.at ["target", "value"] JD.string


formSelect : List SelectOption -> (String -> a) -> Maybe String -> Html a
formSelect list msg value =
  H.div 
    [ A.class "field" ]
    [ H.label 
      [ A.class "label" ]
      [ H.div
        [ A.class "control is-expanded" ]
        [ H.div 
          [ A.class "select is-fullwidth" ]
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

formInput : String -> String -> (String -> a) -> Maybe String -> Html a
formInput type_ placeholder msg value =
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
          [ A.class "control" ]
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