import { Attribute } from "../../fable-library.4.1.4/Types.js";
import { class_type } from "../../fable-library.4.1.4/Reflection.js";

export class OptionalAttribute extends Attribute {
    constructor() {
        super();
    }
}

export function OptionalAttribute_$reflection() {
    return class_type("FSharpPlus.Control.OptionalAttribute", void 0, OptionalAttribute, class_type("System.Attribute"));
}

export function OptionalAttribute_$ctor() {
    return new OptionalAttribute();
}

