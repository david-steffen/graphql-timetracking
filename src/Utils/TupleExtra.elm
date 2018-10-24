module Utils.TupleExtra exposing (first, second, third)

first : (a1, a2, a3) -> a1
first (x,_,_) =
    x

second : (a1, a2, a3) -> a2
second (_,y,_) =
    y

third : (a1, a2, a3) -> a3
third (_,_,z) =
    z