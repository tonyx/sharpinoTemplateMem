import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type, lambda_type } from "../../fable-library.4.1.4/Reflection.js";
import { dispose } from "../Operators.fs.js";

export class Cont$2 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Cont"];
    }
}

export function Cont$2_$reflection(gen0, gen1) {
    return union_type("FSharpPlus.Data.Cont`2", [gen0, gen1], Cont$2, () => [[["Item", lambda_type(lambda_type(gen1, gen0), gen0)]]]);
}

/**
 * The result of running a CPS computation with a given final continuation.
 */
export function Cont_run(_arg) {
    return _arg.fields[0];
}

/**
 * The result of running a CPS computation with the identity function as the final continuation.
 */
export function Cont_eval(_arg) {
    return _arg.fields[0]((x_1) => x_1);
}

/**
 * (call-with-current-continuation) calls a function with the current continuation as its argument.
 */
export function Cont_callCC(f) {
    return new Cont$2((k) => Cont_run(f((a) => (new Cont$2((_arg) => k(a)))))(k));
}

export function Cont_map(f, _arg) {
    return new Cont$2((c) => _arg.fields[0]((arg) => c(f(arg))));
}

export function Cont_bind(f, _arg) {
    return new Cont$2((k) => _arg.fields[0]((a) => Cont_run(f(a))(k)));
}

export function Cont_apply(_arg, _arg_1) {
    return new Cont$2((k) => _arg.fields[0]((f$0027) => _arg_1.fields[0]((arg) => k(f$0027(arg)))));
}

export function Cont_map2(f, _arg, _arg_1) {
    return new Cont$2((k) => {
        let f1_1;
        return _arg.fields[0]((f1_1 = f, (arg_1) => {
            const k$0027 = f1_1;
            return _arg_1.fields[0]((arg) => k(k$0027(arg)));
        }));
    });
}

export function Cont_map3(f, _arg, _arg_1, _arg_2) {
    return new Cont$2((k) => {
        let f1_2;
        return _arg.fields[0]((f1_2 = f, (arg_2) => {
            const k$0027 = f1_2;
            return _arg_1.fields[0]((arg_1) => {
                const k$0027$0027 = k$0027(arg_1);
                return _arg_2.fields[0]((arg) => k(k$0027$0027(arg)));
            });
        }));
    });
}

export function Cont$2_Return_1505(n) {
    return new Cont$2((k) => k(n));
}

export function Cont$2_Map_2D351509(x, f) {
    return Cont_map(f, x);
}

/**
 * Lifts a function into a Cont. Same as map.
 * To be used in Applicative Style expressions, combined with <*>
 */
export function Cont$2_op_LessBangGreater_Z67CDCF97(f, x) {
    return Cont_map(f, x);
}

export function Cont$2_op_LessMultiplyGreater_1FA4F473(f, x) {
    return Cont_apply(f, x);
}

/**
 * Sequences two Conts left-to-right, discarding the value of the first argument.
 */
export function Cont$2_op_MultiplyGreater_Z331F1FE0(x, y) {
    let x_4;
    return ((x_4 = ((func) => func((_arg) => ((k) => k)))(((x_1_1) => ((y_1) => Cont_map(y_1, x_1_1)))(x)), (func_1) => func_1(x_4)))(((x_1_2) => ((y_3) => Cont_apply(y_3, x_1_2)))(y));
}

/**
 * Sequences two Conts left-to-right, discarding the value of the second argument.
 */
export function Cont$2_op_LessMultiply_Z331F1FE0(x, y) {
    let x_4;
    return ((x_4 = ((func) => func((k) => ((_arg) => k)))(((x_1_1) => ((y_1) => Cont_map(y_1, x_1_1)))(x)), (func_1) => func_1(x_4)))(((x_1_2) => ((y_3) => Cont_apply(y_3, x_1_2)))(y));
}

export function Cont$2_op_GreaterGreaterEquals_ZBCE796D(x, f) {
    return Cont_bind(f, x);
}

/**
 * Composes left-to-right two Cont functions (Kleisli composition).
 */
export function Cont$2_op_GreaterEqualsGreater_Z15F30680(f, g) {
    return (x) => Cont_bind(g, f(x));
}

export function Cont$2_Delay_22F21795(f) {
    return new Cont$2((k) => Cont_run(f())(k));
}

export function Cont$2_TryWith_Z67A993D1(_arg, h) {
    return new Cont$2((k) => {
        try {
            return _arg.fields[0](k);
        }
        catch (e) {
            return Cont_run(h(e))(k);
        }
    });
}

export function Cont$2_TryFinally_6B257C89(_arg, h) {
    return new Cont$2((k) => {
        try {
            return _arg.fields[0](k);
        }
        finally {
            h();
        }
    });
}

export function Cont$2_Using_5DF6C129(resource, f) {
    return Cont$2_TryFinally_6B257C89(f(resource), () => {
        dispose(resource);
    });
}

export function Cont$2_CallCC_Z2A07D25B(f) {
    return Cont_callCC(f);
}

/**
 * The result of running a CPS computation with the identity function as the final continuation.
 */
export function ContT_run(_arg, continuation) {
    return _arg.fields[0](continuation);
}

