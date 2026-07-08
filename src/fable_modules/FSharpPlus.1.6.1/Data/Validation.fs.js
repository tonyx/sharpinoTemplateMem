import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type } from "../../fable-library.4.1.4/Reflection.js";
import { FSharpChoice$2, FSharpResult$2 } from "../../fable-library.4.1.4/Choice.js";
import { value as value_1 } from "../../fable-library.4.1.4/Option.js";
import { reverse, empty, cons, head, tail, isEmpty } from "../../fable-library.4.1.4/List.js";
import { partitionMap } from "../Extensions/Array.fs.js";

export class Validation$2 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Failure", "Success"];
    }
}

export function Validation$2_$reflection(gen0, gen1) {
    return union_type("FSharpPlus.Data.Validation`2", [gen0, gen1], Validation$2, () => [[["Item", gen0]], [["Item", gen1]]]);
}

export function Validation_map(f, source) {
    if (source.tag === 1) {
        return new Validation$2(1, [f(source.fields[0])]);
    }
    else {
        return new Validation$2(0, [source.fields[0]]);
    }
}

/**
 * Maps both success and failure of a Validation.
 */
export function Validation_bimap(failureMapper, successMapper, source) {
    if (source.tag === 1) {
        return new Validation$2(1, [successMapper(source.fields[0])]);
    }
    else {
        return new Validation$2(0, [failureMapper(source.fields[0])]);
    }
}

export function Validation_bifoldBack(f, g, source, state) {
    if (source.tag === 0) {
        return f(source.fields[0], state);
    }
    else {
        return g(source.fields[0], state);
    }
}

export function Validation_biFoldBack(f, g, state, x) {
    if (state.tag === 0) {
        return f(state.fields[0], x);
    }
    else {
        return g(state.fields[0], x);
    }
}

/**
 * Binds through a Validation, which is useful for
 * composing Validations sequentially. Note that despite having a bind
 * function of the correct type, Validation is not a monad.
 * The reason is, this bind does not accumulate errors, so it does not
 * agree with the Applicative instance.
 * 
 * There is nothing wrong with using this function, it just does not make a
 * valid Monad instance.
 */
export function Validation_bind(f, x) {
    if (x.tag === 1) {
        return f(x.fields[0]);
    }
    else {
        return new Validation$2(0, [x.fields[0]]);
    }
}

export function Validation_orElse(v, a) {
    if (v.tag === 1) {
        return v.fields[0];
    }
    else {
        return a;
    }
}

/**
 * Extracts the Success value or use the supplied default value when it's a Failure.
 */
export function Validation_defaultValue(value, source) {
    if (source.tag === 1) {
        return source.fields[0];
    }
    else {
        return value;
    }
}

/**
 * Extracts the Success value or applies the compensation function over the Failure.
 */
export function Validation_defaultWith(compensation, source) {
    if (source.tag === 0) {
        return compensation(source.fields[0]);
    }
    else {
        return source.fields[0];
    }
}

export function Validation_valueOr(ea, v) {
    if (v.tag === 1) {
        return v.fields[0];
    }
    else {
        return ea(v.fields[0]);
    }
}

/**
 * Converts a 'Result' to a 'Validation'
 * when the 'Error' of the 'Result' needs to be lifted into a 'Semigroup'.
 */
export function Validation_liftResult(f, _arg) {
    if (_arg.tag === 0) {
        return new Validation$2(1, [_arg.fields[0]]);
    }
    else {
        return new Validation$2(0, [f(_arg.fields[0])]);
    }
}

/**
 * Converting a 'Choice' to a 'Validation'
 * when the 'Choice2Of2' of the 'Choice' needs to be lifted into a 'Semigroup'.
 */
export function Validation_liftChoice(f) {
    return (source) => {
        const source_1 = source;
        return (source_1.tag === 1) ? (new Validation$2(1, [source_1.fields[0]])) : (new Validation$2(0, [f(source_1.fields[0])]));
    };
}

/**
 * Takes two Validations and returns the first Success.
 * If both are Failures it returns both Failures combined with the supplied function.
 */
export function Validation_appValidation(combine, e1$0027, e2$0027) {
    if (e1$0027.tag === 1) {
        if (e2$0027.tag === 1) {
            return new Validation$2(1, [e1$0027.fields[0]]);
        }
        else {
            return new Validation$2(1, [e1$0027.fields[0]]);
        }
    }
    else if (e2$0027.tag === 1) {
        return new Validation$2(1, [e2$0027.fields[0]]);
    }
    else {
        return new Validation$2(0, [combine(e1$0027.fields[0], e2$0027.fields[0])]);
    }
}

/**
 * Converts a Validation<'Error,'T> to a Result<'T,'Error>.
 */
export function Validation_toResult(x) {
    if (x.tag === 0) {
        return new FSharpResult$2(1, [x.fields[0]]);
    }
    else {
        return new FSharpResult$2(0, [x.fields[0]]);
    }
}

/**
 * Creates a Validation<'Error,'T> from a Result<'T,'Error>.
 */
export function Validation_ofResult(x) {
    if (x.tag === 1) {
        return new Validation$2(0, [x.fields[0]]);
    }
    else {
        return new Validation$2(1, [x.fields[0]]);
    }
}

/**
 * Converts a Validation<'Error,'T> to a Choice<'T,'Error>.
 */
export function Validation_toChoice(x) {
    if (x.tag === 0) {
        return new FSharpChoice$2(1, [x.fields[0]]);
    }
    else {
        return new FSharpChoice$2(0, [x.fields[0]]);
    }
}

/**
 * Creates a Validation<'Error,'T> from a Choice<'T,'Error>.
 */
export function Validation_ofChoice(x) {
    if (x.tag === 1) {
        return new Validation$2(0, [x.fields[0]]);
    }
    else {
        return new Validation$2(1, [x.fields[0]]);
    }
}

/**
 * Converts an option to a Validation.
 */
export function Validation_ofOptionWith(errorValue, source) {
    if (source == null) {
        return new Validation$2(0, [errorValue]);
    }
    else {
        return new Validation$2(1, [value_1(source)]);
    }
}

/**
 * Converts a voption to a Validation.
 */
export function Validation_ofValueOptionWith(errorValue, source) {
    if (source == null) {
        return new Validation$2(0, [errorValue]);
    }
    else {
        return new Validation$2(1, [value_1(source)]);
    }
}

/**
 * Extracts a value from either side of a Validation.
 */
export function Validation_either(failureMapper, successMapper, source) {
    if (source.tag === 0) {
        return failureMapper(source.fields[0]);
    }
    else {
        return successMapper(source.fields[0]);
    }
}

export function Validation_validate(e, p, a) {
    if (p(a)) {
        return new Validation$2(1, [a]);
    }
    else {
        return new Validation$2(0, [e]);
    }
}

export function Validation_ensure(e, p, _arg) {
    if (_arg.tag === 1) {
        return Validation_validate(e, p, _arg.fields[0]);
    }
    else {
        return new Validation$2(0, [_arg.fields[0]]);
    }
}

/**
 * Creates a safe version of the supplied function, which returns a Validation<exn, 'U> instead of throwing exceptions.
 */
export function Validation_protect(unsafeFunction, x) {
    try {
        return new Validation$2(1, [unsafeFunction(x)]);
    }
    catch (e) {
        return new Validation$2(0, [e]);
    }
}

/**
 * Creates two lists by classifying the values depending on whether they were wrapped with Success or Failure.
 */
export function Validation_partition(source) {
    const loop = (acc) => {
        const acc_1 = acc;
        const acc2 = acc_1[1];
        const acc1 = acc_1[0];
        return (_arg) => {
            if (!isEmpty(_arg)) {
                const xs = tail(_arg);
                const x = head(_arg);
                return (x.tag === 0) ? loop([acc1, cons(x.fields[0], acc2)])(xs) : loop([cons(x.fields[0], acc1), acc2])(xs);
            }
            else {
                return acc_1;
            }
        };
    };
    return loop([empty(), empty()])(reverse(source));
}

export function Validation$2_Return_1505(x) {
    return new Validation$2(1, [x]);
}

export function Validation$2_Pure_1505(x) {
    return new Validation$2(1, [x]);
}

export function Validation$2_Map_Z7917F16C(x, f) {
    return Validation_map(f, x);
}

/**
 * Lifts a function into a Validator. Same as map.
 * To be used in Applicative Style expressions, combined with <*>
 */
export function Validation$2_op_LessBangGreater_Z1A9D946C(f, x) {
    return Validation_map(f, x);
}

export function Validation$2_Bimap_1FA2ECC2(x, f, g) {
    return Validation_bimap(f, g, x);
}

/**
 * Creates a list with either all Success values or the Failure ones.
 */
export function Validation$2_SequenceBiApply_Z2E8C82C0(t) {
    const tupledArg = Validation_partition(t);
    const y = tupledArg[1];
    if (isEmpty(y)) {
        return new Validation$2(1, [tupledArg[0]]);
    }
    else {
        return new Validation$2(0, [y]);
    }
}

/**
 * Creates an array with either all Success values or the Failure ones.
 */
export function Validation$2_SequenceBiApply_Z30EE5677(t) {
    const tupledArg = partitionMap(Validation_toChoice, t);
    const y = tupledArg[1];
    if (y.length === 0) {
        return new Validation$2(1, [tupledArg[0]]);
    }
    else {
        return new Validation$2(0, [y]);
    }
}

