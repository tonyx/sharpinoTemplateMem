namespace Expecto

open System
open System.Threading.Tasks

#if FABLE_COMPILER
open Fable.Core
#endif

type Test =
    | TestCase of string * (unit -> unit)
    #if FABLE_COMPILER
    | TestCaseTask of string * (unit -> Async<unit>)
    #else
    | TestCaseTask of string * (unit -> Task<unit>)
    #endif
    | TestList of string * Test list

module Expect =
    let isOk (res: Result<'a, 'b>) msg =
        match res with
        | Ok _ -> ()
        | Error e -> failwithf "%s: Expected Ok, but got Error: %A" msg e

    let isTrue (cond: bool) msg =
        if not cond then failwith msg

    let hasLength (s: System.Collections.IEnumerable) (len: int) msg =
        let mutable count = 0
        for _ in s do count <- count + 1
        if count <> len then failwithf "%s: Expected length %d, but got %d" msg len count

[<AutoOpen>]
module TestDsl =
    let testList name tests = TestList (name, tests)
    let testCase name f = TestCase (name, f)
    let testCaseTask name f = TestCaseTask (name, f)
    let testSequenced test = test

type TestsAttribute() =
    inherit Attribute()

#if FABLE_COMPILER
module Async =
    let inline AwaitTask (x: obj) : Async<'T> =
        if Fable.Core.JsInterop.emitJsExpr [x] "typeof $0.then === 'function'" then
            unbox (Async.AwaitPromise (unbox x))
        else
            unbox x

    let inline RunSynchronously (x: Async<'T>) : 'T =
        let mutable result = None
        Async.StartImmediate(async {
            let! res = x
            result <- Some res
        })
        result.Value
#endif
