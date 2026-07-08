import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type, lambda_type, tuple_type } from "../../fable-library.4.1.4/Reflection.js";
import { Tuple2_mapItem1 } from "../Extensions/Tuple.fs.js";
import { curry3, curry2 } from "../../fable-library.4.1.4/Util.js";
import { dispose } from "../Operators.fs.js";

export class State$2 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["State"];
    }
}

export function State$2_$reflection(gen0, gen1) {
    return union_type("FSharpPlus.Data.State`2", [gen0, gen1], State$2, () => [[["Item", lambda_type(gen0, tuple_type(gen1, gen0))]]]);
}

/**
 * Runs the state with an inital state to get back the result and the new state.
 */
export function State_run(_arg) {
    return _arg.fields[0];
}

export function State_map(f, _arg) {
    return new State$2((s) => {
        const patternInput = _arg.fields[0](s);
        return [f(patternInput[0]), patternInput[1]];
    });
}

/**
 * Combines two States into one by applying a mapping function.
 */
export function State_map2(f, _arg, _arg_1) {
    return new State$2((s) => {
        let patternInput;
        const tupledArg = _arg.fields[0](s);
        patternInput = Tuple2_mapItem1(curry2(f), tupledArg[0], tupledArg[1]);
        const tupledArg_1 = _arg_1.fields[0](patternInput[1]);
        return Tuple2_mapItem1(patternInput[0], tupledArg_1[0], tupledArg_1[1]);
    });
}

/**
 * Combines three States into one by applying a mapping function.
 */
export function State_map3(f, _arg, _arg_1, _arg_2) {
    return new State$2((s) => {
        let patternInput;
        const tupledArg = _arg.fields[0](s);
        patternInput = Tuple2_mapItem1(curry3(f), tupledArg[0], tupledArg[1]);
        let patternInput_1;
        const tupledArg_1 = _arg_1.fields[0](patternInput[1]);
        patternInput_1 = Tuple2_mapItem1(patternInput[0], tupledArg_1[0], tupledArg_1[1]);
        const tupledArg_2 = _arg_2.fields[0](patternInput_1[1]);
        return Tuple2_mapItem1(patternInput_1[0], tupledArg_2[0], tupledArg_2[1]);
    });
}

export function State_bind(f, _arg) {
    return new State$2((s) => {
        const patternInput = _arg.fields[0](s);
        return State_run(f(patternInput[0]))(patternInput[1]);
    });
}

export function State_apply(_arg, _arg_1) {
    return new State$2((s) => {
        const patternInput = _arg.fields[0](s);
        const patternInput_1 = _arg_1.fields[0](patternInput[1]);
        return [patternInput[0](patternInput_1[0]), patternInput_1[1]];
    });
}

/**
 * Evaluates a <paramref name="sa">state computation</paramref> with the <paramref name="s">initial value</paramref> and return only the result value of the computation. Ignore the final state.
 */
export function State_eval(_arg, s) {
    return _arg.fields[0](s)[0];
}

/**
 * Evaluates a <paramref name="sa">state computation</paramref> with the <paramref name="s">initial value</paramref> and return only the final state of the computation. Ignore the result value.
 */
export function State_exec(_arg, s) {
    return _arg.fields[0](s)[1];
}

/**
 * Return the state from the internals of the monad.
 */
export function State_get() {
    return new State$2((s) => [s, s]);
}

/**
 * Get a value which depends on the current state.
 */
export function State_gets(f) {
    return new State$2((s) => [f(s), s]);
}

/**
 * Replace the state inside the monad.
 */
export function State_put(x) {
    return new State$2((_arg) => [void 0, x]);
}

/**
 * Modify the state inside the monad by applying a function.
 */
export function State_modify(f) {
    return new State$2((s) => [void 0, f(s)]);
}

/**
 * Zips two States into one.
 */
export function State_zip(x, y) {
    return State_map2((t, t_1) => [t, t_1], x, y);
}

export function State$2_Map_Z17288698(x, f) {
    return State_map(f, x);
}

/**
 * Lifts a function into a State. Same as map.
 * To be used in Applicative Style expressions, combined with <*>
 */
export function State$2_op_LessBangGreater_Z7232E398(f, x) {
    return State_map(f, x);
}

export function State$2_Lift2_Z546BB1BB(f, x, y) {
    return State_map2(f, x, y);
}

export function State$2_Lift3_Z1E4CCD58(f, x, y, z) {
    return State_map3(f, x, y, z);
}

export function State$2_Return_1505(a) {
    return new State$2((s) => [a, s]);
}

export function State$2_op_GreaterGreaterEquals_Z5DD85EAD(x, f) {
    return State_bind(f, x);
}

/**
 * Composes left-to-right two State functions (Kleisli composition).
 */
export function State$2_op_GreaterEqualsGreater_388D4660(f, g) {
    return (x) => State_bind(g, f(x));
}

export function State$2_op_LessMultiplyGreater_2AB19493(f, x) {
    return State_apply(f, x);
}

/**
 * Sequences two States left-to-right, discarding the value of the first argument.
 */
export function State$2_op_MultiplyGreater_1CFDA040(x, y) {
    let x_4;
    return ((x_4 = ((func) => func((_arg) => ((k) => k)))(((x_1_1) => ((y_1) => State_map(y_1, x_1_1)))(x)), (func_1) => func_1(x_4)))(((x_1_2) => ((y_3) => State_apply(y_3, x_1_2)))(y));
}

/**
 * Sequences two States left-to-right, discarding the value of the second argument.
 */
export function State$2_op_LessMultiply_1CFDA040(x, y) {
    let x_4;
    return ((x_4 = ((func) => func((k) => ((_arg) => k)))(((x_1_1) => ((y_1) => State_map(y_1, x_1_1)))(x)), (func_1) => func_1(x_4)))(((x_1_2) => ((y_3) => State_apply(y_3, x_1_2)))(y));
}

export function State$2_get_Get() {
    return State_get();
}

export function State$2_Put_1505(x) {
    return State_put(x);
}

export function State$2_TryWith_54DAD86F(_arg, h) {
    return new State$2((s) => {
        try {
            return _arg.fields[0](s);
        }
        catch (e) {
            return State_run(h(e))(s);
        }
    });
}

export function State$2_TryFinally_Z5138EF18(_arg, f) {
    return new State$2((s) => {
        try {
            return _arg.fields[0](s);
        }
        finally {
            f();
        }
    });
}

export function State$2_Using_46C027C8(resource, f) {
    return State$2_TryFinally_Z5138EF18(f(resource), () => {
        dispose(resource);
    });
}

export function State$2_Delay_1DC57C14(body) {
    return new State$2((s) => State_run(body())(s));
}

