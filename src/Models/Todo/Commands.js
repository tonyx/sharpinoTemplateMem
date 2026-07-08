import { Todo__Activate_7F9DDECF, Todo__Complete_7F9DDECF } from "./Todo.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { TodoEvents } from "./Events.js";
import { singleton } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";

export class TodoCommands extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Activate", "Complete"];
    }
    Execute(todo) {
        const this$ = this;
        if (this$.tag === 1) {
            const dateTime_1 = this$.fields[0];
            const input_3 = Todo__Complete_7F9DDECF(todo, dateTime_1);
            if (input_3.tag === 1) {
                const e_1 = input_3.fields[0];
                return new FSharpResult$2(1, [e_1]);
            }
            else {
                const x_1 = input_3.fields[0];
                return new FSharpResult$2(0, [[x_1, singleton(new TodoEvents(1, [dateTime_1]))]]);
            }
        }
        else {
            const dateTime = this$.fields[0];
            const input_1 = Todo__Activate_7F9DDECF(todo, dateTime);
            if (input_1.tag === 1) {
                const e = input_1.fields[0];
                return new FSharpResult$2(1, [e]);
            }
            else {
                const x = input_1.fields[0];
                return new FSharpResult$2(0, [[x, singleton(new TodoEvents(0, [dateTime]))]]);
            }
        }
    }
    get Undoer() {
        return void 0;
    }
}

export function TodoCommands_$reflection() {
    return union_type("Sharpino.Template.Models.TodoCommands", [], TodoCommands, () => [[["Item", class_type("System.DateTime")]], [["Item", class_type("System.DateTime")]]]);
}

