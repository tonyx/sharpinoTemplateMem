namespace Sharpino.CommandHandler

open System
open Sharpino.Core
open Sharpino.Storage
open Sharpino.MemoryStorage
open Sharpino.Template.Models

[<AutoOpen>]
module GlobalState =
    let getAggregateStorageFreshStateViewer<'Todo, 'Events, 'Format> (store: MemoryStorage) : AggregateViewer<'Todo> =
        fun (id: Guid) ->
            match states.TryFind id with
            | Some s -> Ok (1, s :?> 'Todo)
            | None -> Error (sprintf "Aggregate not found: %A" id)

    let runInit<'Todo, 'Events, 'Format> (store: IEventStore<'Format>) (senders: obj) (todo: 'Todo) =
        let id =
            match box todo with
            | :? Todo as t -> t.TodoId.Value
            | _ -> Guid.Empty
        states <- states.Add(id, todo)
        Ok ()

    let runAggregateCommand<'Todo, 'Events, 'Format> (id: Guid) (store: IEventStore<'Format>) (senders: obj) (cmd: AggregateCommand<'Todo, 'Events>) =
        match states.TryFind id with
        | Some stateObj ->
            let state = stateObj :?> 'Todo
            match cmd.Execute state with
            | Ok (newState, evts) ->
                states <- states.Add(id, newState)
                let currentEvts = match events.TryFind id with Some e -> e | None -> []
                events <- events.Add(id, currentEvts @ (evts |> List.map box))
                Ok ()
            | Error e -> Error e
        | None -> Error (sprintf "Aggregate not found for command execution: %A" id)

namespace Sharpino.Template

open System
open System.Threading
open System.Threading.Tasks
open Sharpino.Storage
open Sharpino.CommandHandler

module StateView =
    let getAggregateStatesInATimeIntervalAsync<'Todo, 'Events, 'Format> (store: IEventStore<'Format>) (start: DateTime) (finish: DateTime) (ct: Option<CancellationToken>) =
        let allStates =
            states
            |> Map.toList
            |> List.map (fun (k, v) -> (k, v :?> 'Todo))
        #if FABLE_COMPILER
        async { return Ok allStates }
        #else
        Task.FromResult (Ok allStates)
        #endif

// Task and FsToolkit shims for Fable compatibility
[<AutoOpen>]
module TaskShim =
    #if FABLE_COMPILER
    open Fable.Core
    #endif

    type TaskBuilder() =
        #if FABLE_COMPILER
        member this.Bind(x: Task<'T>, f: 'T -> Async<'U>) = async.Bind(Async.AwaitPromise (unbox x), f)
        #else
        member this.Bind(x: Task<'T>, f: 'T -> Async<'U>) = async.Bind(Async.AwaitTask x, f)
        #endif
        member this.Bind(x: Async<'T>, f: 'T -> Async<'U>) = async.Bind(x, f)
        member this.Return(x: 'T) = async.Return(x)
        member this.ReturnFrom(x: Async<'T>) = async.ReturnFrom(x)
        member this.Zero() = async.Zero()
        member this.Delay(f: unit -> Async<'T>) = async.Delay(f)
        member this.Run(f: Async<'T>) = f
    let task = TaskBuilder()

    type TaskResultBuilder() =
        member this.Bind(x: Task<Result<'T, 'E>>, f: 'T -> Async<Result<'U, 'E>>) =
            async {
                #if FABLE_COMPILER
                let! res = Async.AwaitPromise (unbox x)
                #else
                let! res = Async.AwaitTask x
                #endif
                match res with
                | Ok v -> return! f v
                | Error e -> return Error e
            }
        member this.Bind(x: Async<Result<'T, 'E>>, f: 'T -> Async<Result<'U, 'E>>) =
            async {
                let! res = x
                match res with
                | Ok v -> return! f v
                | Error e -> return Error e
            }
        member this.Return(x: 'T) = async.Return(Ok x)
        member this.ReturnFrom(x: Async<Result<'T, 'E>>) = x
    let taskResult = TaskResultBuilder()

// FSharpPlus shims for Fable compatibility
[<AutoOpen>]
module FSharpPlusShim =
    let inline (|>>) x f = List.map f x

// Mock Result.get for Tests.fs
namespace FsToolkit.ErrorHandling
module Result =
    let get = function Ok x -> x | Error e -> failwithf "Expected Ok, got Error: %A" e

// Mock DotNetEnv for Tests.fs
namespace DotNetEnv
module Env =
    let Load() = ()
