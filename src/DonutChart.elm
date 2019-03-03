module DonutChart exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Svg exposing (..)
import Svg.Attributes as SvgAttr exposing (..)
import Svg.Events as SvgEvents exposing (..)
import Array

type alias Model =
  { selected : Maybe Int
  , points : List Point
  }

init = 
  { selected = Nothing
  , points = []
  }

type alias Point =
  { time : Float
  , color : String
  }

type alias Segment =
  { start : Float
  , end : Float
  , color : String
  }

type Msg
    = MouseOver Int
    | MouseOut

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    MouseOver selected ->
      let
        newModel = 
          { model 
          | selected = Just selected
          }
      in
      (newModel, Cmd.none)
    MouseOut ->
      let
        newModel = 
          { model 
          | selected = Nothing
          }
      in
      (newModel, Cmd.none)


toFixed : Int -> Float -> String
toFixed precision value =
  let
    power =
      toFloat 10 ^ toFloat precision

    pad num =
      case num of
        [ x, y ] ->
          [ x, String.padRight precision '0' y ]

        [ val ] ->
          if precision > 0 then
            [ val, String.padRight precision '0' "" ]
          else
            [ val ]

        val ->
          val
  in
  (round (value * power) |> toFloat)
    / power
    |> String.fromFloat
    |> String.split "."
    |> pad
    |> String.join "."
    
            

getPoint : Float -> Float -> String 
getPoint angle radius =
  let
    x = radius * (sin angle)
    y = radius * -(cos angle)
  in
    (toFixed 2 x) ++ "," ++ (toFixed 2 y)

segmentsComputed : List Point -> List Segment
segmentsComputed points = 
  let
    times = List.map (\point -> point.time) points |> List.sort
    total = List.sum times
    createSegments start segments points_ =
      let
        point = case List.head points_ of
            Just val ->
              val
            Nothing ->
              { time = 0
              , color = "#333"
              }
                
        size = point.time / total
        end = start + size
      in
        if List.length points_ == 0 then
          List.reverse segments
        else 
          let
            newSegments = 
              ( Segment start end point.color ) :: segments
            newPoints = List.drop 1 points_
            newStart = end
          in 
          createSegments newStart newSegments newPoints  
  in
    createSegments 0 [] points

plotVectors : Segment -> String
plotVectors segment =
  let
    innerRadius = 70
    outerRadius = 85
    c = pi * 2
    start = segment.start * c
    end = segment.end * c
    outerEdgeList angle limit list = 
      let
          newAngle = angle + 0.05
          newList = (getPoint newAngle outerRadius) :: list
      in
        if newAngle < limit then
          outerEdgeList newAngle limit newList
        else
          List.reverse newList
      
    innerEdgeList angle limit list =
      let
          newAngle = angle - 0.05
          newList = (getPoint newAngle innerRadius) :: list
      in
        if newAngle > limit then
          innerEdgeList newAngle limit newList
        else
          List.reverse newList      
  in
    ( outerEdgeList start end [] ) 
    ++ [ getPoint end outerRadius ] 
    ++ ( innerEdgeList end start [] )
    ++ [ getPoint start innerRadius ] 
    |> String.join " " 

view model =
  let
    curriedPolygon = polygonView model.selected
    selectedTime index points =
      let
        point = Array.get index (Array.fromList points)
      in 
        toFixed 2 (
          case point of 
            Just val ->
              val.time
            Nothing ->
              0
        )
  in
    Html.div
      []
      [ Html.div
        [ Attributes.class "donut-chart" ]
        [ Html.div
          [ Attributes.class "square" ]
          [ Svg.svg 
            [ SvgAttr.width "200"
            , SvgAttr.height "200"
            , SvgAttr.viewBox "0 0 200 200"
            ]
            [ Svg.g 
              [ SvgAttr.transform "translate(100,100)" ]
              (List.indexedMap curriedPolygon (segmentsComputed model.points))
              , case model.selected of
                Just val ->
                  Svg.text_
                    [ SvgAttr.y "100"
                    , SvgAttr.x "100" 
                    ]
                    [ Html.text <| selectedTime val model.points ]
                  
                Nothing ->
                  div [] []
            ]
          ]
        ]
      ]

polygonView : Maybe Int -> Int -> Segment -> ( Svg Msg )
polygonView selected index segment  =
  let
    newSelected = 
      case selected of
        Just val ->
          val
        Nothing ->
          -1
    opacity = 
      if newSelected == index then
        1
      else
        0.2
  in
    Svg.polygon
      [ SvgEvents.onMouseOver (MouseOver index)
      , SvgEvents.onMouseOut MouseOut
      , SvgAttr.class "donut-segment"
      , SvgAttr.fill segment.color
      , SvgAttr.opacity <| String.fromFloat opacity
      , SvgAttr.points <| plotVectors segment                        
      ]
      []