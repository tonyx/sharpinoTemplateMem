import { toList, singleton as singleton_1, empty as empty_1, enumerateWhile, enumerateUsing, delay, toArray, skip, take } from "../../fable-library.4.1.4/Seq.js";
import { skip as skip_1, take as take_1 } from "./List.fs.js";
import { empty, reverse, tail, cons, head, isEmpty, length } from "../../fable-library.4.1.4/List.js";
import { singleton } from "../../fable-library.4.1.4/AsyncBuilder.js";
import { fill } from "../../fable-library.4.1.4/Array.js";
import { rangeDouble } from "../../fable-library.4.1.4/Range.js";
import { FSharpChoice$2, FSharpResult$2 } from "../../fable-library.4.1.4/Choice.js";
import { getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { some, value } from "../../fable-library.4.1.4/Option.js";

export function System_Collections_Generic_IEnumerable$1__IEnumerable$1_get_GetSlice(this$) {
    return (_arg) => {
        let a_1, b_1, a, b;
        return (_arg[0] != null) ? ((_arg[1] != null) ? ((a_1 = (_arg[0] | 0), (b_1 = (_arg[1] | 0), take((b_1 - a_1) + 1, skip(a_1, this$))))) : ((a = (_arg[0] | 0), skip(a, this$)))) : ((_arg[1] != null) ? ((b = (_arg[1] | 0), take(b, this$))) : this$);
    };
}

export function Microsoft_FSharp_Collections_FSharpList$1__List$1_get_GetSlice(this$) {
    return (_arg) => {
        let a_2, a_3, b_2, b_3;
        if (_arg[0] != null) {
            if (_arg[1] != null) {
                if ((_arg[0] >= 0) && (_arg[1] >= 0)) {
                    const a_4 = _arg[0] | 0;
                    const b_4 = _arg[1] | 0;
                    return take_1(b_4, skip_1(a_4, this$));
                }
                else {
                    const a_5 = _arg[0] | 0;
                    const b_5 = _arg[1] | 0;
                    const l = length(this$) | 0;
                    const f = (i) => {
                        if (i < 0) {
                            return (l + i) | 0;
                        }
                        else {
                            return i | 0;
                        }
                    };
                    const a_6 = f(a_5) | 0;
                    const list_7 = skip_1(a_6, this$);
                    return take_1((f(b_5) - a_6) + 1, list_7);
                }
            }
            else {
                return (_arg[0] < 0) ? ((a_2 = (_arg[0] | 0), skip_1(length(this$) + a_2, this$))) : ((a_3 = (_arg[0] | 0), skip_1(a_3, this$)));
            }
        }
        else {
            return (_arg[1] != null) ? ((_arg[1] < 0) ? ((b_2 = (_arg[1] | 0), take_1(length(this$) + b_2, this$))) : ((b_3 = (_arg[1] | 0), take_1(b_3, this$)))) : this$;
        }
    };
}

export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Map_Static(f, x) {
    return singleton.Bind(x, (arg_1) => {
        const arg = f(arg_1);
        return singleton.Return(arg);
    });
}

/**
 * Combine all asyncs in one, chaining them in sequence order.
 */
export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_Z713F5053(t) {
    const loop = (acc, _arg) => {
        if (!isEmpty(_arg)) {
            return singleton.Bind(head(_arg), (x_1) => loop(cons(x_1, acc), tail(_arg)));
        }
        else {
            return singleton.Return(reverse(acc));
        }
    };
    return loop(empty(), t);
}

export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequence_Static_Z713F5053(t) {
    return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_Z713F5053(t);
}

/**
 * Combine all asyncs in one, chaining them in sequence order.
 */
export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_Z5C7190BC(t) {
    return singleton.Delay(() => {
        const siz = t.length | 0;
        const arr = fill(new Array(siz), 0, siz, null);
        return singleton.Combine(singleton.For(rangeDouble(0, 1, siz - 1), (_arg) => {
            const i = _arg | 0;
            return singleton.Bind(t[i], (_arg_1) => {
                arr[i] = _arg_1;
                return singleton.Zero();
            });
        }), singleton.Delay(() => singleton.Return(arr)));
    });
}

export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequence_Static_Z5C7190BC(t) {
    return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_Z5C7190BC(t);
}

/**
 * Creates an async Result from a Result where the Ok case is async.
 */
export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_Z67E12721(t) {
    if (t.tag === 1) {
        return singleton.Return(new FSharpResult$2(1, [t.fields[0]]));
    }
    else {
        return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Map_Static((arg_2) => (new FSharpResult$2(0, [arg_2])), t.fields[0]);
    }
}

export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequence_Static_Z67E12721(t) {
    return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_Z67E12721(t);
}

/**
 * Creates an async Choice from a Choice where the Choice1Of2 case is async.
 */
export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_2E08425D(t) {
    if (t.tag === 1) {
        return singleton.Return(new FSharpChoice$2(1, [t.fields[0]]));
    }
    else {
        return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Map_Static((arg_2) => (new FSharpChoice$2(0, [arg_2])), t.fields[0]);
    }
}

export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequence_Static_2E08425D(t) {
    return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Sequential_Static_2E08425D(t);
}

/**
 * Creates an async Result from a Result where both cases are async.
 */
export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Bisequential_Static_7500DAD5(t) {
    if (t.tag === 1) {
        return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Map_Static((arg_5) => (new FSharpResult$2(1, [arg_5])), t.fields[0]);
    }
    else {
        return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Map_Static((arg_2) => (new FSharpResult$2(0, [arg_2])), t.fields[0]);
    }
}

export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Bisequence_Static_7500DAD5(t) {
    return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Bisequential_Static_7500DAD5(t);
}

/**
 * Creates an async Choice from a Choice where both cases are async.
 */
export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Bisequential_Static_Z74BE3629(t) {
    if (t.tag === 1) {
        return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Map_Static((arg_5) => (new FSharpChoice$2(1, [arg_5])), t.fields[0]);
    }
    else {
        return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Map_Static((arg_2) => (new FSharpChoice$2(0, [arg_2])), t.fields[0]);
    }
}

export function Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Bisequence_Static_Z74BE3629(t) {
    return Microsoft_FSharp_Control_FSharpAsync$1__Async$1_Bisequential_Static_Z74BE3629(t);
}

/**
 * Returns None if it contains a None element, otherwise a list of all elements.
 */
export function Microsoft_FSharp_Core_FSharpOption$1__Option$1_Sequential_Static_4CFFB589(t) {
    let ok = true;
    const res = toArray(delay(() => enumerateUsing(getEnumerator(t), (e) => enumerateWhile(() => (e["System.Collections.IEnumerator.MoveNext"]() && ok), delay(() => {
        const matchValue = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
        if (matchValue == null) {
            ok = false;
            return empty_1();
        }
        else {
            return singleton_1(value(matchValue));
        }
    })))));
    if (ok) {
        return res;
    }
    else {
        return void 0;
    }
}

export function Microsoft_FSharp_Core_FSharpOption$1__Option$1_Sequence_Static_4CFFB589(t) {
    return Microsoft_FSharp_Core_FSharpOption$1__Option$1_Sequential_Static_4CFFB589(t);
}

/**
 * Returns None if it contains a None element, otherwise a list of all elements.
 */
export function Microsoft_FSharp_Core_FSharpValueOption$1__ValueOption$1_Sequential_Static_Z20C26F42(t) {
    let ok = true;
    const res = toArray(delay(() => enumerateUsing(getEnumerator(t), (e) => enumerateWhile(() => (e["System.Collections.IEnumerator.MoveNext"]() && ok), delay(() => {
        const matchValue = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
        if (matchValue == null) {
            ok = false;
            return empty_1();
        }
        else {
            return singleton_1(value(matchValue));
        }
    })))));
    if (ok) {
        return res;
    }
    else {
        return void 0;
    }
}

export function Microsoft_FSharp_Core_FSharpValueOption$1__ValueOption$1_Sequence_Static_Z20C26F42(t) {
    return Microsoft_FSharp_Core_FSharpValueOption$1__ValueOption$1_Sequential_Static_Z20C26F42(t);
}

/**
 * Returns the first Choice2Of2 if it contains a Choice2Of2 element, otherwise a list of all Choice1Of2 elements.
 */
export function Microsoft_FSharp_Core_FSharpChoice$2__Choice$2_Sequential_Static_Z296C4148(t) {
    let error = void 0;
    const res = toArray(delay(() => enumerateUsing(getEnumerator(t), (e) => enumerateWhile(() => (e["System.Collections.IEnumerator.MoveNext"]() && (error == null)), delay(() => {
        const matchValue = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
        if (matchValue.tag === 1) {
            error = some(matchValue.fields[0]);
            return empty_1();
        }
        else {
            return singleton_1(matchValue.fields[0]);
        }
    })))));
    if (error != null) {
        return new FSharpChoice$2(1, [value(error)]);
    }
    else {
        return new FSharpChoice$2(0, [res]);
    }
}

export function Microsoft_FSharp_Core_FSharpChoice$2__Choice$2_Sequence_Static_Z296C4148(t) {
    return Microsoft_FSharp_Core_FSharpChoice$2__Choice$2_Sequential_Static_Z296C4148(t);
}

/**
 * Returns all Choice2Of2's combined, otherwise a sequence of all Choice1Of2 elements.
 */
export function Microsoft_FSharp_Core_FSharpChoice$2__Choice$2_Parallel_Static_Z2F23AE3(choice2Combiner, t) {
    let error = void 0;
    const res = toArray(delay(() => enumerateUsing(getEnumerator(t), (e) => enumerateWhile(() => e["System.Collections.IEnumerator.MoveNext"](), delay(() => {
        const matchValue = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
        const error_1 = error;
        if (matchValue.tag === 1) {
            const copyOfStruct = error_1;
            if (copyOfStruct != null) {
                const x = value(copyOfStruct);
                error = some(choice2Combiner(x, matchValue.fields[0]));
                return empty_1();
            }
            else {
                error = some(matchValue.fields[0]);
                return empty_1();
            }
        }
        else if (error_1 == null) {
            return singleton_1(matchValue.fields[0]);
        }
        else {
            return empty_1();
        }
    })))));
    if (error != null) {
        return new FSharpChoice$2(1, [value(error)]);
    }
    else {
        return new FSharpChoice$2(0, [res]);
    }
}

/**
 * Returns the first Error if it contains an Error element, otherwise a sequence of all elements.
 */
export function Microsoft_FSharp_Core_FSharpResult$2__Result$2_Sequential_Static_Z6B515306(t) {
    let error = void 0;
    const res = toArray(delay(() => enumerateUsing(getEnumerator(t), (e) => enumerateWhile(() => (e["System.Collections.IEnumerator.MoveNext"]() && (error == null)), delay(() => {
        const matchValue = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
        if (matchValue.tag === 1) {
            error = some(matchValue.fields[0]);
            return empty_1();
        }
        else {
            return singleton_1(matchValue.fields[0]);
        }
    })))));
    if (error != null) {
        return new FSharpResult$2(1, [value(error)]);
    }
    else {
        return new FSharpResult$2(0, [res]);
    }
}

export function Microsoft_FSharp_Core_FSharpResult$2__Result$2_Sequence_Static_Z6B515306(t) {
    return Microsoft_FSharp_Core_FSharpResult$2__Result$2_Sequential_Static_Z6B515306(t);
}

/**
 * Returns all Errors combined, otherwise a sequence of all elements.
 */
export function Microsoft_FSharp_Core_FSharpResult$2__Result$2_Parallel_Static_Z40CF28A1(errorCombiner, t) {
    let error = void 0;
    const res = toArray(delay(() => enumerateUsing(getEnumerator(t), (e) => enumerateWhile(() => e["System.Collections.IEnumerator.MoveNext"](), delay(() => {
        const matchValue = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
        const error_1 = error;
        const copyOfStruct = matchValue;
        if (copyOfStruct.tag === 1) {
            const copyOfStruct_1 = error_1;
            if (copyOfStruct_1 != null) {
                const x = value(copyOfStruct_1);
                error = some(errorCombiner(x, copyOfStruct.fields[0]));
                return empty_1();
            }
            else {
                error = some(copyOfStruct.fields[0]);
                return empty_1();
            }
        }
        else if (error_1 == null) {
            return singleton_1(copyOfStruct.fields[0]);
        }
        else {
            return empty_1();
        }
    })))));
    if (error != null) {
        return new FSharpResult$2(1, [value(error)]);
    }
    else {
        return new FSharpResult$2(0, [res]);
    }
}

/**
 * Returns the first Error if it contains an Error element, otherwise a list of all elements.
 */
export function Microsoft_FSharp_Core_FSharpResult$2__Result$2_Sequential_Static_Z67BE8B89(t) {
    let error = void 0;
    const res = toList(delay(() => enumerateUsing(getEnumerator(t), (e) => enumerateWhile(() => (e["System.Collections.IEnumerator.MoveNext"]() && (error == null)), delay(() => {
        const matchValue = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
        if (matchValue.tag === 1) {
            error = some(matchValue.fields[0]);
            return empty_1();
        }
        else {
            return singleton_1(matchValue.fields[0]);
        }
    })))));
    if (error != null) {
        return new FSharpResult$2(1, [value(error)]);
    }
    else {
        return new FSharpResult$2(0, [res]);
    }
}

/**
 * Returns the Error if it contains an Error element, otherwise the option inside an Ok.
 */
export function Microsoft_FSharp_Core_FSharpResult$2__Result$2_Sequential_Static_Z5452BBEA(t) {
    if (t == null) {
        return new FSharpResult$2(0, [void 0]);
    }
    else {
        const copyOfStruct = t;
        if (copyOfStruct.tag === 1) {
            return new FSharpResult$2(1, [copyOfStruct.fields[0]]);
        }
        else {
            return new FSharpResult$2(0, [some(copyOfStruct.fields[0])]);
        }
    }
}

/**
 * Returns the Error if it contains an Error element, otherwise the voption inside an Ok.
 */
export function Microsoft_FSharp_Core_FSharpResult$2__Result$2_Sequential_Static_BFA02E1(t) {
    if (t == null) {
        return new FSharpResult$2(0, [void 0]);
    }
    else {
        const copyOfStruct = t;
        if (copyOfStruct.tag === 1) {
            return new FSharpResult$2(1, [copyOfStruct.fields[0]]);
        }
        else {
            return new FSharpResult$2(0, [some(copyOfStruct.fields[0])]);
        }
    }
}

