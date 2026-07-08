import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type, array_type } from "../../fable-library.4.1.4/Reflection.js";

export class ParallelArray$1 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Infinite", "Bounded"];
    }
}

export function ParallelArray$1_$reflection(gen0) {
    return union_type("FSharpPlus.Data.ParallelArray`1", [gen0], ParallelArray$1, () => [[["Item", gen0]], [["Item", array_type(gen0)]]]);
}

export function ParallelArray_run(_arg) {
    if (_arg.tag === 1) {
        return _arg.fields[0];
    }
    else {
        throw new Error("Resulting array would be infinite.");
    }
}

/**
 * Creates a parallel array from a normal array.
 */
export function ParallelArrayOperators_parray(s) {
    return new ParallelArray$1(1, [s]);
}

export function ParallelArray$1_Return_1505(x) {
    return new ParallelArray$1(0, [x]);
}

