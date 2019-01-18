module Page exposing 
  ( InputLength(..)
  , formInput
  , formSelect
  , formTextArea
  , membersSelect
  , fullNameString
  , onClickPreventDefault
  , onChange
  , rangeFromDate
  , modal
  )

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Html.Events as Events exposing (..)
import Json.Decode as JD
import Uuid exposing (Uuid)
import Types exposing (Model)
import Types.Timelog exposing 
  ( FilterView(..)
  )
import Types.User exposing (User)
import Date exposing (Unit(..), Interval(..), Date)

type alias SelectOption =
  { value : String
  , title : String
  }

type InputLength
  = Short
  | Full

onClickPreventDefault : msg -> Attribute msg
onClickPreventDefault msg =
  Events.preventDefaultOn "click" <| JD.map alwaysPreventDefault <| JD.succeed msg

alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
  ( msg, True )

onChange : (String -> msg) -> Html.Attribute msg
onChange handler =
    Events.on "change" <| JD.map handler <| JD.at ["target", "value"] JD.string

isFullwidth : InputLength -> Bool
isFullwidth length =
  case length of 
    Short ->
      False
    Full ->
      True

formSelect : List SelectOption -> (String -> msg) -> Maybe String -> InputLength -> Html msg
formSelect list msg value inputLength =
  Html.div 
    [ Attributes.class "field" ]
    [ Html.label 
      [ Attributes.class "label" ]
      [ Html.div
        [ Attributes.classList [("control", True), ("is-expanded", isFullwidth inputLength)] ]
        [ Html.div 
          [ Attributes.classList [("select", True), ("is-fullwidth", isFullwidth inputLength)] ]
          [ Html.select
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
                in
                  Html.option
                    [ Attributes.value item.value
                    , Attributes.selected selected
                    ]
                    [ Html.text item.title ]
              )
            ( SelectOption "" "Please select..." :: list )
            )
          ]
        ]
      ]
    ]

formTextArea : String -> (String -> msg) -> Maybe String -> InputLength -> Html msg
formTextArea placeholder msg value inputLength =
  let
    content =
      case value of
        Just val ->
          Html.text val
        Nothing ->
          Html.text ""
  in
    Html.div 
      [ Attributes.class "field" ]
      [ Html.label 
        [ Attributes.class "label" ]
        [ Html.div 
          [ Attributes.classList [("control", True), ("is-expanded", isFullwidth inputLength)] ]
          [ Html.textarea
            [ Attributes.class "textarea"
            , Attributes.placeholder placeholder
            , Events.onInput msg
            ]
            [ content ]
          ]
        ]
      ]

formInput : String -> String -> (String -> msg) -> Maybe String -> InputLength -> Html msg
formInput type_ placeholder msg value inputLength =
  let
    attributes =
      case value of
        Just val ->
          [ Attributes.value val ]
        Nothing ->
          []
  in
    Html.div 
      [ Attributes.class "field" ]
      [ Html.label 
        [ Attributes.class "label" ]
        [ Html.div 
          [ Attributes.classList [("control", True), ("is-expanded", isFullwidth inputLength)] ]
          [ Html.input
            (List.append attributes
            [ Attributes.class "input"
            , Attributes.type_ type_
            , Attributes.placeholder placeholder
            , Events.onInput msg
            ])
            []
          ]
        ]
      ]

fullNameString : User -> String
fullNameString user =
  user.first_name ++ " " ++ user.last_name

membersSelect : List User -> List User -> (User -> msg) -> (User -> msg) -> Html msg
membersSelect members availableUsers removeMembersMsg addMembersMsg  = 
  Html.div
    [ Attributes.class "field" ]
    [ Html.div
      []
      [ Html.h4
        [ Attributes.class "title is-4 has-text-centered-mobile" ]
        [ Html.text "Assigned" ]
      , if List.isEmpty members then
          Html.p 
            [ Attributes.class "subtitle has-text-centered is-6" ] 
            [ Html.text "No users assigned" ]
        else
          Html.div
            [ Attributes.class "field is-grouped is-grouped-multiline" ]
            ( List.map 
              (\user -> 
                Html.div
                  [ Attributes.class "control" ]
                  [ Html.div 
                    [ Attributes.class "tags has-addons" ]
                    [ Html.span
                      [ Attributes.class "tag is-capitalized is-primary"
                      ] 
                      [ Html.text <| fullNameString user ]
                    , Html.span
                      [ Events.onClick <| removeMembersMsg user
                      , Attributes.class "tag is-delete"
                      ]
                      []
                    ]
                  ]
              ) 
              members
            )
      ]
    , Html.div 
      []
      [ Html.h4
        [ Attributes.class "title is-4 has-text-centered-mobile" ]
        [ Html.text "Available" ]
      , if List.isEmpty availableUsers then
          Html.p 
            [ Attributes.class "subtitle has-text-centered is-6" ] 
            [ Html.text "No users to add" ]
        else
          Html.div
            [ Attributes.class "field is-grouped is-grouped-multiline" ]
            ( List.map 
              (\user -> 
                Html.div
                  [ Attributes.class "control" ]
                  [ Html.div 
                    [ Attributes.class "tags has-addons" ]
                    [ Html.span
                      [ Attributes.class "tag is-capitalized is-primary"
                      , Events.onClick <| addMembersMsg user
                      ] 
                      [ Html.text <| fullNameString user ]
                    ]
                  ]
              ) 
              availableUsers
            )
      ]
    ]

rangeFromDate : Date -> FilterView -> ( Date, Date )
rangeFromDate date filterView =
  let
    start =
      case filterView of
        WeekView ->
          Date.floor Monday date
        MonthView ->
          Date.floor Month date
    end =
      case filterView of
        WeekView ->
          Date.ceiling Sunday date
        MonthView ->
          let
            month = Date.add Months 1 date |> Date.floor Month
          in
            Date.add Days -1 month
  in
    (start, end)

modal : (Model -> Html msg) -> Model -> Bool -> msg -> Html msg
modal contents model showModal closeMsg =
  Html.div 
    [ Attributes.classList [("modal", True), ("is-active", showModal) ] ]
    [ Html.div
      [ Attributes.class "modal-background" ]
      []
    , Html.div 
      [ Attributes.class "modal-content" ]
      [ Html.div
        [ Attributes.class "box" ]
        [ contents model ]
      ]
    , Html.button
      [ Attributes.class "modal-close is-large"
      , Attributes.attribute "aria-label" "close"
      , Events.onClick closeMsg
      ]
      []
    ]