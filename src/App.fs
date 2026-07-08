module App

open Fable.React
open Fable.React.Props
open Browser.Dom
open System
open Expecto

type TestStatus =
    | Pending
    | Running
    | Passed
    | Failed of string

type TestResult =
    { Name: string
      Status: TestStatus }

let rec flattenTests (test: Test) (prefix: string) : TestResult list =
    match test with
    | TestCase (name, _) -> [ { Name = prefix + name; Status = Pending } ]
    | TestCaseTask (name, _) -> [ { Name = prefix + name; Status = Pending } ]
    | TestList (name, list) ->
        let newPrefix = if String.IsNullOrEmpty prefix then name + " > " else prefix + name + " > "
        list |> List.collect (fun t -> flattenTests t newPrefix)

let rec runTestByName (test: Test) (targetName: string) (prefix: string) : Async<unit> =
    async {
        match test with
        | TestCase (name, f) when prefix + name = targetName ->
            try
                f()
            with
            | ex -> failwith ex.Message
        | TestCaseTask (name, f) when prefix + name = targetName ->
            try
                let! _ = f() |> Async.AwaitTask
                ()
            with
            | ex -> failwith ex.Message
        | TestList (name, list) ->
            let newPrefix = if String.IsNullOrEmpty prefix then name + " > " else prefix + name + " > "
            for t in list do
                do! runTestByName t targetName newPrefix
        | _ -> ()
    }

type State =
    { Results: TestResult list }

type Msg =
    | RunTests
    | UpdateStatus of string * TestStatus

let reducer (state: State) (msg: Msg) : State =
    match msg with
    | RunTests -> state
    | UpdateStatus (name, status) ->
        let newResults =
            state.Results
            |> List.map (fun r -> if r.Name = name then { r with Status = status } else r)
        { state with Results = newResults }

let view (state: State) (dispatch: Msg -> unit) =
    let total = state.Results.Length
    let passed = state.Results |> List.filter (fun r -> match r.Status with Passed -> true | _ -> false) |> List.length
    let failed = state.Results |> List.filter (fun r -> match r.Status with Failed _ -> true | _ -> false) |> List.length

    let runAll () =
        async {
            for r in state.Results do
                dispatch (UpdateStatus (r.Name, Running))
                try
                    do! runTestByName Tests.tests r.Name ""
                    dispatch (UpdateStatus (r.Name, Passed))
                with
                | ex ->
                    dispatch (UpdateStatus (r.Name, Failed ex.Message))
        }
        |> Async.StartImmediate

    div [ Style [ 
            Background "#1e1e2e"
            Color "#cdd6f4"
            FontFamily "system-ui, -apple-system, sans-serif"
            Padding "24px"
            MinHeight "100vh"
            Custom ("box-sizing", "border-box")
          ] ] [
        div [ Style [ MaxWidth "800px"; Margin "0 auto" ] ] [
            h1 [ Style [ Color "#f5c2e7"; MarginBottom "24px"; FontSize "2.2rem"; FontWeight "700" ] ] [
                str "Sharpino In-Browser Test Runner"
            ]
            
            div [ Style [ 
                    Custom ("display", "flex")
                    Custom ("gap", "16px")
                    Background "#313244"
                    Padding "20px"
                    BorderRadius "12px"
                    MarginBottom "24px"
                    BoxShadow "0 4px 6px rgba(0, 0, 0, 0.1)"
                  ] ] [
                div [ Style [ Flex "1" ] ] [
                    div [ Style [ FontSize "0.9rem"; Color "#a6adc8"; MarginBottom "4px" ] ] [ str "TOTAL TESTS" ]
                    div [ Style [ FontSize "1.8rem"; FontWeight "bold" ] ] [ str (string total) ]
                ]
                div [ Style [ Flex "1"; Color "#a6e3a1" ] ] [
                    div [ Style [ FontSize "0.9rem"; Color "#a6adc8"; MarginBottom "4px" ] ] [ str "PASSED" ]
                    div [ Style [ FontSize "1.8rem"; FontWeight "bold" ] ] [ str (string passed) ]
                ]
                div [ Style [ Flex "1"; Color "#f38ba8" ] ] [
                    div [ Style [ FontSize "0.9rem"; Color "#a6adc8"; MarginBottom "4px" ] ] [ str "FAILED" ]
                    div [ Style [ FontSize "1.8rem"; FontWeight "bold" ] ] [ str (string failed) ]
                ]
                div [ Style [ Custom ("align-self", "center") ] ] [
                    button [ 
                        OnClick (fun _ -> runAll())
                        Style [
                            Background "#89b4fa"
                            Color "#11111b"
                            Border "none"
                            Padding "12px 24px"
                            BorderRadius "8px"
                            FontSize "1rem"
                            FontWeight "bold"
                            Cursor "pointer"
                            Transition "background 0.2s"
                        ]
                    ] [ str "Run All Tests" ]
                ]
            ]

            div [ Style [ 
                    Background "#181825"
                    BorderRadius "12px"
                    Padding "16px"
                    BoxShadow "0 4px 6px rgba(0, 0, 0, 0.1)"
                  ] ] [
                h2 [ Style [ FontSize "1.2rem"; MarginBottom "16px"; Color "#bac2de" ] ] [ str "Test Cases" ]
                div [ Style [ Custom ("display", "flex"); Custom ("flex-direction", "column"); Custom ("gap", "12px") ] ] (
                    state.Results |> List.map (fun r ->
                        let statusColor, statusText, statusIcon =
                            match r.Status with
                            | Pending -> "#585b70", "Pending", "⚪"
                            | Running -> "#f9e2af", "Running...", "🟡"
                            | Passed -> "#a6e3a1", "Passed", "✅"
                            | Failed msg -> "#f38ba8", sprintf "Failed: %s" msg, "❌"
                        
                        div [ Style [
                                Custom ("display", "flex")
                                Custom ("align-items", "center")
                                Custom ("justify-content", "space-between")
                                Padding "12px 16px"
                                Background "#313244"
                                BorderRadius "8px"
                                BorderLeft (sprintf "4px solid %s" statusColor)
                              ] ] [
                            div [] [
                                span [ Style [ FontSize "1.1rem"; FontWeight "500" ] ] [ str r.Name ]
                            ]
                            div [ Style [ Color statusColor; FontWeight "bold"; FontSize "0.9rem" ] ] [
                                span [ Style [ MarginRight "8px" ] ] [ str statusIcon ]
                                str statusText
                            ]
                        ]
                    )
                )
            ]
        ]
    ]

let initialResults = flattenTests Tests.tests ""
let mutable state = { Results = initialResults }

let rec render() =
    let dispatch msg =
        state <- reducer state msg
        render()
    ReactDom.render(view state dispatch, document.getElementById("root"))

render()
