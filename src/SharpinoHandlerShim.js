import { toList, FSharpMap__Add, FSharpMap__TryFind } from "./fable_modules/fable-library.4.1.4/Map.js";
import { Storage_GlobalStorageState_events, Storage_GlobalStorageState_states } from "./SharpinoCoreShim.js";
import { toFail, printf, toText } from "./fable_modules/fable-library.4.1.4/String.js";
import { FSharpResult$2 } from "./fable_modules/fable-library.4.1.4/Choice.js";
import { value as value_1 } from "./fable_modules/fable-library.4.1.4/Option.js";
import { Todo } from "./Models/Todo/Todo.js";
import { TodoId__get_Value } from "./Commons.js";
import { map, append, empty } from "./fable_modules/fable-library.4.1.4/List.js";
import { singleton } from "./fable_modules/fable-library.4.1.4/AsyncBuilder.js";
import { class_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { awaitPromise } from "./fable_modules/fable-library.4.1.4/Async.js";

export function Sharpino_CommandHandler_GlobalState_getAggregateStorageFreshStateViewer(store, id) {
    const matchValue = FSharpMap__TryFind(Storage_GlobalStorageState_states(), id);
    if (matchValue == null) {
        return new FSharpResult$2(1, [toText(printf("Aggregate not found: %A"))(id)]);
    }
    else {
        return new FSharpResult$2(0, [[1, value_1(matchValue)]]);
    }
}

export function Sharpino_CommandHandler_GlobalState_runInit(store, senders, todo) {
    let t;
    let id;
    const matchValue = todo;
    id = ((matchValue instanceof Todo) ? ((t = matchValue, TodoId__get_Value(t.TodoId))) : "00000000-0000-0000-0000-000000000000");
    Storage_GlobalStorageState_states(FSharpMap__Add(Storage_GlobalStorageState_states(), id, todo));
    return new FSharpResult$2(0, [void 0]);
}

export function Sharpino_CommandHandler_GlobalState_runAggregateCommand(id, store, senders, cmd) {
    const matchValue = FSharpMap__TryFind(Storage_GlobalStorageState_states(), id);
    if (matchValue == null) {
        return new FSharpResult$2(1, [toText(printf("Aggregate not found for command execution: %A"))(id)]);
    }
    else {
        const state = value_1(matchValue);
        const matchValue_1 = cmd.Execute(state);
        if (matchValue_1.tag === 1) {
            return new FSharpResult$2(1, [matchValue_1.fields[0]]);
        }
        else {
            Storage_GlobalStorageState_states(FSharpMap__Add(Storage_GlobalStorageState_states(), id, matchValue_1.fields[0][0]));
            let currentEvts;
            const matchValue_2 = FSharpMap__TryFind(Storage_GlobalStorageState_events(), id);
            currentEvts = ((matchValue_2 == null) ? empty() : matchValue_2);
            Storage_GlobalStorageState_events(FSharpMap__Add(Storage_GlobalStorageState_events(), id, append(currentEvts, map((value) => value, matchValue_1.fields[0][1]))));
            return new FSharpResult$2(0, [void 0]);
        }
    }
}

export function Sharpino_Template_StateView_getAggregateStatesInATimeIntervalAsync(store, start, finish, ct) {
    const allStates = map((tupledArg) => [tupledArg[0], tupledArg[1]], toList(Storage_GlobalStorageState_states()));
    return singleton.Delay(() => singleton.Return(new FSharpResult$2(0, [allStates])));
}

export class Sharpino_Template_TaskShim_TaskBuilder {
    constructor() {
    }
}

export function Sharpino_Template_TaskShim_TaskBuilder_$reflection() {
    return class_type("Sharpino.Template.TaskShim.TaskBuilder", void 0, Sharpino_Template_TaskShim_TaskBuilder);
}

export function Sharpino_Template_TaskShim_TaskBuilder_$ctor() {
    return new Sharpino_Template_TaskShim_TaskBuilder();
}

export function Sharpino_Template_TaskShim_TaskBuilder__Bind_Z521FF722(this$, x, f) {
    return singleton.Bind(awaitPromise(x), f);
}

export function Sharpino_Template_TaskShim_TaskBuilder__Bind_7A510B33(this$, x, f) {
    return singleton.Bind(x, f);
}

export function Sharpino_Template_TaskShim_TaskBuilder__Return_1505(this$, x) {
    return singleton.Return(x);
}

export function Sharpino_Template_TaskShim_TaskBuilder__ReturnFrom_ZD4A93B1(this$, x) {
    return singleton.ReturnFrom(x);
}

export function Sharpino_Template_TaskShim_TaskBuilder__Zero(this$) {
    return singleton.Zero();
}

export function Sharpino_Template_TaskShim_TaskBuilder__Delay_Z5276B41B(this$, f) {
    return singleton.Delay(f);
}

export function Sharpino_Template_TaskShim_TaskBuilder__Run_ZD4A93B1(this$, f) {
    return f;
}

export const Sharpino_Template_TaskShim_task = Sharpino_Template_TaskShim_TaskBuilder_$ctor();

export class Sharpino_Template_TaskShim_TaskResultBuilder {
    constructor() {
    }
}

export function Sharpino_Template_TaskShim_TaskResultBuilder_$reflection() {
    return class_type("Sharpino.Template.TaskShim.TaskResultBuilder", void 0, Sharpino_Template_TaskShim_TaskResultBuilder);
}

export function Sharpino_Template_TaskShim_TaskResultBuilder_$ctor() {
    return new Sharpino_Template_TaskShim_TaskResultBuilder();
}

export function Sharpino_Template_TaskShim_TaskResultBuilder__Bind_Z6722B822(this$, x, f) {
    return singleton.Delay(() => singleton.Bind(awaitPromise(x), (_arg) => {
        const res = _arg;
        return (res.tag === 1) ? singleton.Return(new FSharpResult$2(1, [res.fields[0]])) : singleton.ReturnFrom(f(res.fields[0]));
    }));
}

export function Sharpino_Template_TaskShim_TaskResultBuilder__Bind_454FBA93(this$, x, f) {
    return singleton.Delay(() => singleton.Bind(x, (_arg) => {
        const res = _arg;
        return (res.tag === 1) ? singleton.Return(new FSharpResult$2(1, [res.fields[0]])) : singleton.ReturnFrom(f(res.fields[0]));
    }));
}

export function Sharpino_Template_TaskShim_TaskResultBuilder__Return_1505(this$, x) {
    return singleton.Return(new FSharpResult$2(0, [x]));
}

export function Sharpino_Template_TaskShim_TaskResultBuilder__ReturnFrom_2D6B8459(this$, x) {
    return x;
}

export const Sharpino_Template_TaskShim_taskResult = Sharpino_Template_TaskShim_TaskResultBuilder_$ctor();

export function FsToolkit_ErrorHandling_Result_get(_arg) {
    if (_arg.tag === 1) {
        return toFail(printf("Expected Ok, got Error: %A"))(_arg.fields[0]);
    }
    else {
        return _arg.fields[0];
    }
}

export function DotNetEnv_Env_Load() {
}

