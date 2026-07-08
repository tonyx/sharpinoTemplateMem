import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type, lambda_type } from "../../fable-library.4.1.4/Reflection.js";
import { dispose } from "../Operators.fs.js";

export class Reader$2 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Reader"];
    }
}

export function Reader$2_$reflection(gen0, gen1) {
    return union_type("FSharpPlus.Data.Reader`2", [gen0, gen1], Reader$2, () => [[["Item", lambda_type(gen0, gen1)]]]);
}

export function Reader_run(_arg) {
    return _arg.fields[0];
}

export function Reader_map(f, _arg) {
    return new Reader$2((arg) => f(_arg.fields[0](arg)));
}

export function Reader_bind(f, _arg) {
    return new Reader$2((r) => Reader_run(f(_arg.fields[0](r)))(r));
}

export function Reader_apply(_arg, _arg_1) {
    return new Reader$2((a) => _arg.fields[0](a)(_arg_1.fields[0](a)));
}

/**
 * Combines two Readers into one by applying a mapping function.
 */
export function Reader_map2(mapping, _arg, _arg_1) {
    return new Reader$2((r) => mapping(_arg.fields[0](r), _arg_1.fields[0](r)));
}

/**
 * Combines three Readers into one by applying a mapping function.
 */
export function Reader_map3(mapping, _arg, _arg_1, _arg_2) {
    return new Reader$2((r) => mapping(_arg.fields[0](r), _arg_1.fields[0](r), _arg_2.fields[0](r)));
}

/**
 * Zips two Readers into one.
 */
export function Reader_zip(x, y) {
    return Reader_map2((t, t_1) => [t, t_1], x, y);
}

/**
 * Retrieves the monad environment.
 */
export function Reader_ask() {
    return new Reader$2((x) => x);
}

/**
 * Executes a computation in a modified environment.
 */
export function Reader_local(f, m) {
    return new Reader$2((arg) => m.fields[0](f(arg)));
}

export function Reader$2_Map_Z6244AF86(x, f) {
    return Reader_map(f, x);
}

/**
 * Lifts a function into a Reader. Same as map.
 * To be used in Applicative Style expressions, combined with <*>
 */
export function Reader$2_op_LessBangGreater_Z43166F46(f, x) {
    return Reader_map(f, x);
}

export function Reader$2_Return_1505(x) {
    return new Reader$2((_arg) => x);
}

export function Reader$2_op_GreaterGreaterEquals_Z2A846D4D(x, f) {
    return Reader_bind(f, x);
}

export function Reader$2_op_LessMultiplyGreater_ZB6E4A2D(f, x) {
    return Reader_apply(f, x);
}

/**
 * Sequences two Readers left-to-right, discarding the value of the first argument.
 */
export function Reader$2_op_MultiplyGreater_58B50580(x, y) {
    let x_4;
    return ((x_4 = ((func) => func((_arg) => ((k) => k)))(((x_1_1) => ((y_1) => Reader_map(y_1, x_1_1)))(x)), (func_1) => func_1(x_4)))(((x_1_2) => ((y_3) => Reader_apply(y_3, x_1_2)))(y));
}

/**
 * Sequences two Readers left-to-right, discarding the value of the second argument.
 */
export function Reader$2_op_LessMultiply_58B50580(x, y) {
    let x_4;
    return ((x_4 = ((func) => func((k) => ((_arg) => k)))(((x_1_1) => ((y_1) => Reader_map(y_1, x_1_1)))(x)), (func_1) => func_1(x_4)))(((x_1_2) => ((y_3) => Reader_apply(y_3, x_1_2)))(y));
}

export function Reader$2_Lift2_577ACC85(f, x, y) {
    return Reader_map2(f, x, y);
}

export function Reader$2_Lift3_Z5F811746(f, x, y, z) {
    return Reader_map3(f, x, y, z);
}

export function Reader$2_get_Ask() {
    return Reader_ask();
}

export function Reader$2_Local_Z6244AF86(m, f) {
    return Reader_local(f, m);
}

export function Reader$2_TryWith_Z59FAB7F1(_arg, h) {
    return new Reader$2((s) => {
        try {
            return _arg.fields[0](s);
        }
        catch (e) {
            return Reader_run(h(e))(s);
        }
    });
}

export function Reader$2_TryFinally_Z2454C606(_arg, f) {
    return new Reader$2((s) => {
        try {
            return _arg.fields[0](s);
        }
        finally {
            f();
        }
    });
}

export function Reader$2_Using_46148FA(resource, f) {
    return Reader$2_TryFinally_Z2454C606(f(resource), () => {
        dispose(resource);
    });
}

export function Reader$2_Delay_Z4FE11C3A(body) {
    return new Reader$2((s) => Reader_run(body())(s));
}

