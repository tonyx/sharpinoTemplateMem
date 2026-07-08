import { Todo__Activate_7F9DDECF, Todo__Complete_7F9DDECF } from "./Todo.js";
import { Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";

export class TodoEvents extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Activated", "Completed"];
    }
    Process(todo) {
        const this$ = this;
        if (this$.tag === 1) {
            const dateTime_1 = this$.fields[0];
            return Todo__Complete_7F9DDECF(todo, dateTime_1);
        }
        else {
            const dateTime = this$.fields[0];
            return Todo__Activate_7F9DDECF(todo, dateTime);
        }
    }
}

export function TodoEvents_$reflection() {
    return union_type("Sharpino.Template.Models.TodoEvents", [], TodoEvents, () => [[["Item", class_type("System.DateTime")]], [["Item", class_type("System.DateTime")]]]);
}

