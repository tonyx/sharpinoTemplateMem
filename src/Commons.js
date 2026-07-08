import { Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { newGuid } from "./fable_modules/fable-library.4.1.4/Guid.js";

export class TodoId extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["TodoId"];
    }
}

export function TodoId_$reflection() {
    return union_type("Sharpino.Template.Commons.TodoId", [], TodoId, () => [[["Item", class_type("System.Guid")]]]);
}

export function TodoId_get_New() {
    return new TodoId(newGuid());
}

export function TodoId__get_Value(this$) {
    return this$.fields[0];
}

