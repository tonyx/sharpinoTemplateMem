import { Record, Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, string_type, union_type, class_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { TodoId__get_Value, TodoId_get_New, TodoId_$reflection } from "../../Commons.js";
import { compareTo, now } from "../../fable_modules/fable-library.4.1.4/Date.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";

export class State extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Added", "Started", "Completed"];
    }
}

export function State_$reflection() {
    return union_type("Sharpino.Template.Models.State", [], State, () => [[["Item", class_type("System.DateTime")]], [["Item", class_type("System.DateTime")]], [["Item", class_type("System.DateTime")]]]);
}

export class Todo extends Record {
    constructor(TodoId, Text$, State) {
        super();
        this.TodoId = TodoId;
        this.Text = Text$;
        this.State = State;
    }
}

export function Todo_$reflection() {
    return record_type("Sharpino.Template.Models.Todo", [], Todo, () => [["TodoId", TodoId_$reflection()], ["Text", string_type], ["State", State_$reflection()]]);
}

export function Todo_New_Z721C83C5(text) {
    return new Todo(TodoId_get_New(), text, new State(1, [now()]));
}

export function Todo__Activate_7F9DDECF(this$, dateTime) {
    let currentDateTime;
    let input;
    const matchValue = this$.State;
    let matchResult, currentDateTime_1;
    if (matchValue.tag === 0) {
        if ((currentDateTime = matchValue.fields[0], compareTo(currentDateTime, dateTime) < 0)) {
            matchResult = 0;
            currentDateTime_1 = matchValue.fields[0];
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0: {
            input = (new FSharpResult$2(0, [void 0]));
            break;
        }
        default:
            input = (new FSharpResult$2(1, ["Only added todo at earlier dateTime can be activated"]));
    }
    if (input.tag === 1) {
        const e = input.fields[0];
        return new FSharpResult$2(1, [e]);
    }
    else {
        const x_1 = input.fields[0];
        return new FSharpResult$2(0, [new Todo(this$.TodoId, this$.Text, new State(1, [dateTime]))]);
    }
}

export function Todo__Complete_7F9DDECF(this$, dateTime) {
    let currentDateTime;
    let input;
    const matchValue = this$.State;
    let matchResult, currentDateTime_1;
    if (matchValue.tag === 1) {
        if ((currentDateTime = matchValue.fields[0], compareTo(currentDateTime, dateTime) < 0)) {
            matchResult = 0;
            currentDateTime_1 = matchValue.fields[0];
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0: {
            input = (new FSharpResult$2(0, [void 0]));
            break;
        }
        default:
            input = (new FSharpResult$2(1, ["Only active todo at earlier dateTime can be completed"]));
    }
    if (input.tag === 1) {
        const e = input.fields[0];
        return new FSharpResult$2(1, [e]);
    }
    else {
        const x_1 = input.fields[0];
        return new FSharpResult$2(0, [new Todo(this$.TodoId, this$.Text, new State(2, [dateTime]))]);
    }
}

export function Todo__get_Id(this$) {
    return TodoId__get_Value(this$.TodoId);
}

export function Todo_get_SnapshotsInterval() {
    return 50;
}

export function Todo_get_StorageName() {
    return "_Todo";
}

export function Todo_get_Version() {
    return "_01";
}

