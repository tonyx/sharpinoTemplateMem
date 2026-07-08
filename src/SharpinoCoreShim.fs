namespace Sharpino.Core

open System

type Event<'State> =
    abstract member Process : 'State -> Result<'State, string>

type AggregateCommand<'State, 'Events> =
    abstract member Execute : 'State -> Result<'State * 'Events list, string>
    abstract member Undoer : Option<unit>

type MessageSenders =
    | NoSender

type AggregateViewer<'State> = Guid -> Result<int * 'State, string>

namespace Sharpino.EventBroker

type MessageSenders =
    | NoSender

namespace Sharpino.Storage

open System

[<AutoOpen>]
module GlobalStorageState =
    let mutable states : Map<Guid, obj> = Map.empty
    let mutable events : Map<Guid, obj list> = Map.empty
    
    let clear() =
        states <- Map.empty
        events <- Map.empty

type IEventStore<'Format> = interface end

namespace Sharpino.MemoryStorage

open Sharpino.Storage
open System

type MemoryStorage() =
    interface IEventStore<string>
    member this.Reset version storageName =
        GlobalStorageState.clear()

namespace Sharpino.Cache

type AggregateCache3() =
    static member Instance = AggregateCache3()
    member this.Clear() = ()

type DetailsCache() =
    static member Instance = DetailsCache()
    member this.Clear() = ()
