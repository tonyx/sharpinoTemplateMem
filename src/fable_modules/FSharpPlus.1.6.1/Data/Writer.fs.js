import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type, tuple_type } from "../../fable-library.4.1.4/Reflection.js";

export class Writer$2 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Writer"];
    }
}

export function Writer$2_$reflection(gen0, gen1) {
    return union_type("FSharpPlus.Data.Writer`2", [gen0, gen1], Writer$2, () => [[["Item", tuple_type(gen1, gen0)]]]);
}

/**
 * Unwraps a writer computation as a (result, output) pair. (The inverse of Writer.)
 */
export function Writer_run(_arg) {
    return _arg.fields[0];
}

export function Writer_map(f, _arg) {
    return new Writer$2([f(_arg.fields[0][0]), _arg.fields[0][1]]);
}

/**
 * Extract the output from a writer computation.
 */
export function Writer_exec(_arg) {
    return _arg.fields[0][1];
}

/**
 * Embeds a simple writer action.
 */
export function Writer_tell(w) {
    return new Writer$2([void 0, w]);
}

/**
 * An action that executes the action <paramref name="m"/> and adds its output
 * to the value of the computation.
 */
export function Writer_listen(m) {
    const w = m.fields[0][1];
    return new Writer$2([[m.fields[0][0], w], w]);
}

/**
 * Action that executes the action m, which returns a value and a function, and returns the value, applying the function to the output.
 */
export function Writer_pass(m) {
    return new Writer$2([m.fields[0][0][0], m.fields[0][0][1](m.fields[0][1])]);
}

export function Writer$2_Map_Z48653D30(x, f) {
    return Writer_map(f, x);
}

/**
 * Lifts a function into a Writer. Same as map.
 * To be used in Applicative Style expressions, combined with <*>
 */
export function Writer$2_op_LessBangGreater_101DCED0(f, x) {
    return Writer_map(f, x);
}

export function Writer$2_Tell_1505(w) {
    return Writer_tell(w);
}

export function Writer$2_Listen_15B10646(m) {
    return Writer_listen(m);
}

export function Writer$2_Pass_Z72C5ABC1(m) {
    return Writer_pass(m);
}

export function Writer$2_Extract_15B10646(_arg) {
    return _arg.fields[0][1];
}

export function Writer$2_op_EqualsGreaterGreater_3C160093(g, f) {
    const g_1 = g;
    return new Writer$2([g_1.fields[0][0], f(g_1)]);
}

