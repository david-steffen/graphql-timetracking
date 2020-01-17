module DonutChart exposing (..)

import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Svg exposing (..)
import Svg.Attributes as SvgAttr exposing (..)
import Svg.Events as SvgEvents exposing (..)
import Array
import Utils.TimeDelta as TimeDelta exposing (TimeDelta, twoDigitTime)

type alias Model =
  { selected : Maybe Int
  , points : List Point
  , innerRadius : Float
  , outerRadius : Float
  , displayTotal : TimeDelta
  }

init: Model
init = 
  { selected = Nothing
  , points = []
  , innerRadius = 95
  , outerRadius = 70
  , displayTotal = TimeDelta 0 0 0 0
  }

type alias Point =
  { value : Float
  , color : String
  , key : String
  , display : TimeDelta
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
    x = radius * sin angle
    y = radius * -(cos angle)
  in
    toFixed 2 x ++ "," ++ toFixed 2 y

segmentsComputed : Float -> List Point -> List Segment
segmentsComputed total points = 
  let
    createSegments start segments points_ =
      let
        point = case List.head points_ of
            Just val ->
              val
            Nothing ->
              { value = 0
              , color = "#333"
              , key = "unknown"
              , display = TimeDelta 0 0 0 0
              }
                
        size = point.value / total
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

plotVectors : Float -> Float -> Segment -> String
plotVectors innerRadius outerRadius segment =
  let
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
          List.reverse list
      
    innerEdgeList angle limit list =
      let
          newAngle = angle - 0.05
          newList = (getPoint newAngle innerRadius) :: list
      in
        if newAngle > limit then
          innerEdgeList newAngle limit newList
        else
          List.reverse list      
  in
    [ getPoint start outerRadius ] 
    ++ ( outerEdgeList start end [] ) 
    ++ [ getPoint end outerRadius ]
    ++ [ getPoint end innerRadius ] 
    ++ ( innerEdgeList end start [] )
    ++ [ getPoint start innerRadius ] 
    |> String.join " " 

view model =
  let
    partialPolygon = polygonView model.selected model.innerRadius model.outerRadius
    times = List.map (\point -> point.value) model.points |> List.sort
    totalTime = List.sum times
    selectedTime index points =
      let
        point = Array.get index (Array.fromList points)
      in
        case point of 
          Just val ->
            val.display
          Nothing ->
            TimeDelta 0 0 0 0
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
              (if List.length model.points > 0 then
                (List.indexedMap partialPolygon (segmentsComputed totalTime model.points))
              else
                [ Svg.polygon
                  [ SvgAttr.class "donut-segment"
                  , SvgAttr.fill "#333"
                  , SvgAttr.opacity "0.2"
                  , SvgAttr.points <| plotVectors model.innerRadius model.outerRadius (Segment 0 1 "#333")                     
                  ]
                  []
                ]
              )
              , Svg.g
                []
                ( case model.selected of
                    Just val ->
                      formatDisplay <| selectedTime val model.points 
                    Nothing ->
                      formatDisplay model.displayTotal
                )
            ]
          ]
        ]
      ]

formatDisplay : TimeDelta -> List (Svg msg)
formatDisplay timeDelta =
  let
      dayString = 
        case timeDelta.days of
          1 -> "day"
          _ -> "days"
  in
  
  [ Svg.text_
    [ SvgAttr.x "50%"
    , SvgAttr.y "40%"
    , SvgAttr.class "large" 
    ]
    [ Svg.text <| String.fromInt timeDelta.days 
    , Svg.tspan
        []
        [ Svg.text dayString ]
    ]
  , Svg.text_
    [ SvgAttr.x "50%"
    , SvgAttr.y "60%"
    , SvgAttr.class "small" 
    ]
    [ Svg.text 
      <| String.join ":"
        [ twoDigitTime (timeDelta.hours)
        , twoDigitTime (timeDelta.minutes)
        , twoDigitTime (timeDelta.seconds)
        ]
    ]
  ]

polygonView : Maybe Int -> Float -> Float -> Int -> Segment -> ( Svg Msg )
polygonView selected innerRadius outerRadius index segment  =
  let
    newSelected = Maybe.withDefault -1 selected
    opacity =
      if newSelected == -1 then
        1
      else if newSelected == index then
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
      , SvgAttr.points <| plotVectors innerRadius outerRadius segment                        
      ]
      []