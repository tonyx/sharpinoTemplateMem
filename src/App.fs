module App

open Fable.React
open Fable.React.Props
open Browser.Dom

let helloWorld () =
    div [] [
        h1 [] [ str "Sharpino Live Simulation" ]
        p [] [ str "Hello from Fable & React!" ]
    ]

ReactDom.render(helloWorld(), document.getElementById("root"))
