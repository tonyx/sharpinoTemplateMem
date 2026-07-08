import { class_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { EventBroker_MessageSenders, MemoryStorage_MemoryStorage_$ctor } from "./SharpinoCoreShim.js";
import { Sharpino_Template_TaskShim_taskResult, Sharpino_Template_TaskShim_TaskResultBuilder__Return_1505, Sharpino_Template_StateView_getAggregateStatesInATimeIntervalAsync, Sharpino_Template_TaskShim_TaskResultBuilder__Bind_454FBA93, Sharpino_CommandHandler_GlobalState_runAggregateCommand, Sharpino_CommandHandler_GlobalState_runInit, Sharpino_CommandHandler_GlobalState_getAggregateStorageFreshStateViewer } from "./SharpinoHandlerShim.js";
import { maxValue, minValue, now } from "./fable_modules/fable-library.4.1.4/Date.js";
import { TodoCommands } from "./Models/Todo/Commands.js";
import { TodoId__get_Value } from "./Commons.js";
import { FSharpResult$2 } from "./fable_modules/fable-library.4.1.4/Choice.js";
import { defaultArg } from "./fable_modules/fable-library.4.1.4/Option.js";
import { createCancellationToken } from "./fable_modules/fable-library.4.1.4/Async.js";
import { map } from "./fable_modules/fable-library.4.1.4/List.js";

export class TodoManager {
    constructor(messageSenders, eventStore, todosViewer) {
        this.messageSenders = messageSenders;
        this.eventStore = eventStore;
        this.todosViewer = todosViewer;
    }
}

export function TodoManager_$reflection() {
    return class_type("Sharpino.Template.TodoManager", void 0, TodoManager);
}

export function TodoManager_$ctor_Z5EE5FDB5(messageSenders, eventStore, todosViewer) {
    return new TodoManager(messageSenders, eventStore, todosViewer);
}

export function TodoManager_$ctor() {
    const memoryStorage = MemoryStorage_MemoryStorage_$ctor();
    return TodoManager_$ctor_Z5EE5FDB5(new EventBroker_MessageSenders(), memoryStorage, (id) => Sharpino_CommandHandler_GlobalState_getAggregateStorageFreshStateViewer(memoryStorage, id));
}

export function TodoManager__AddTodo_5AC33647(this$, todo) {
    return Sharpino_CommandHandler_GlobalState_runInit(this$.eventStore, this$.messageSenders, todo);
}

export function TodoManager__Start_401790A8(this$, id) {
    const cmd = new TodoCommands(0, [now()]);
    return Sharpino_CommandHandler_GlobalState_runAggregateCommand(TodoId__get_Value(id), this$.eventStore, this$.messageSenders, cmd);
}

export function TodoManager__Complete_401790A8(this$, id) {
    const cmd = new TodoCommands(1, [now()]);
    return Sharpino_CommandHandler_GlobalState_runAggregateCommand(TodoId__get_Value(id), this$.eventStore, this$.messageSenders, cmd);
}

export function TodoManager__GetTodo_401790A8(this$, id) {
    const input = this$.todosViewer(TodoId__get_Value(id));
    if (input.tag === 1) {
        return new FSharpResult$2(1, [input.fields[0]]);
    }
    else {
        return new FSharpResult$2(0, [input.fields[0][1]]);
    }
}

export function TodoManager__GetTodosAsync_Z38F9059F(this$, ct) {
    const ct_1 = defaultArg(ct, createCancellationToken());
    return Sharpino_Template_TaskShim_TaskResultBuilder__Bind_454FBA93(Sharpino_Template_TaskShim_taskResult, Sharpino_Template_StateView_getAggregateStatesInATimeIntervalAsync(this$.eventStore, minValue(), maxValue(), ct_1), (_arg) => Sharpino_Template_TaskShim_TaskResultBuilder__Return_1505(Sharpino_Template_TaskShim_taskResult, map((tuple) => tuple[1], _arg)));
}

