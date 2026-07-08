namespace Sharpino.Template
open System
#if !FABLE_COMPILER
open System.Text.Json.Serialization
#endif

module Commons =
    type TodoId =
        | TodoId of Guid
        with
            static member New = TodoId (Guid.NewGuid())
            member this.Value = match this with TodoId id -> id

#if !FABLE_COMPILER
    let jsonOptions =
        JsonFSharpOptions.Default()
            .ToJsonSerializerOptions()
#endif




