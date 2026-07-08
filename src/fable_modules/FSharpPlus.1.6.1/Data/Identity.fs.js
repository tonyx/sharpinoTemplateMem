import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type } from "../../fable-library.4.1.4/Reflection.js";

export class Identity$1 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Identity"];
    }
}

export function Identity$1_$reflection(gen0) {
    return union_type("FSharpPlus.Data.Identity`1", [gen0], Identity$1, () => [[["Item", gen0]]]);
}

export function Identity_run(_arg) {
    return _arg.fields[0];
}

export function Identity_apply(_arg, _arg_1) {
    return new Identity$1(_arg.fields[0](_arg_1.fields[0]));
}

export function Identity_bind(f, _arg) {
    return f(_arg.fields[0]);
}

export function Identity$1_Return_1505(x) {
    return new Identity$1(x);
}

export function Identity$1_Pure_1505(x) {
    return new Identity$1(x);
}

export function Identity$1_Lift2_Z4AAC7AFB(f, _arg, _arg_1) {
    return new Identity$1(f(_arg.fields[0], _arg_1.fields[0]));
}

export function Identity$1_Lift3_205037C0(f, _arg, _arg_1, _arg_2) {
    return new Identity$1(f(_arg.fields[0], _arg_1.fields[0], _arg_2.fields[0]));
}

export function Identity$1_Map_Z7F07DB80(_arg, f) {
    return new Identity$1(f(_arg.fields[0]));
}

export function Identity$1_Map2_Z4AAC7AFB(f, _arg, _arg_1) {
    return new Identity$1(f(_arg.fields[0], _arg_1.fields[0]));
}

export function Identity$1_Map3_205037C0(f, _arg, _arg_1, _arg_2) {
    return new Identity$1(f(_arg.fields[0], _arg_1.fields[0], _arg_2.fields[0]));
}

export function Identity$1_Zip_Z4E48040(_arg, _arg_1) {
    return new Identity$1([_arg.fields[0], _arg_1.fields[0]]);
}

export function Identity$1_op_LessMultiplyGreater_22194EB5(_arg, _arg_1) {
    return new Identity$1(_arg.fields[0](_arg_1.fields[0]));
}

export function Identity$1_op_LessDotGreater_22194EB5(_arg, _arg_1) {
    return new Identity$1(_arg.fields[0](_arg_1.fields[0]));
}

export function Identity$1_op_GreaterGreaterEquals_Z408F5B6D(_arg, f) {
    return f(_arg.fields[0]);
}

/**
 * Composes left-to-right two Id functions (Kleisli composition).
 */
export function Identity$1_op_GreaterEqualsGreater_Z93460(f, g) {
    return (x) => Identity_bind(g, f(x));
}

