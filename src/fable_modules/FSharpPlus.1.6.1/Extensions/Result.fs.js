import { FSharpChoice$2, FSharpResult$2 } from "../../fable-library.4.1.4/Choice.js";
import { toString, isException } from "../../fable-library.4.1.4/Types.js";
import { reverse, empty, cons, head, tail, isEmpty } from "../../fable-library.4.1.4/List.js";

/**
 * Creates an Ok with the supplied value.
 */
export function result(value) {
    return new FSharpResult$2(0, [value]);
}

/**
 * Creates an Error With the supplied value.
 */
export function throw$(value) {
    return new FSharpResult$2(1, [value]);
}

/**
 * Applies the wrapped value to the wrapped function when both are Ok and returns a wrapped result or the first Error.
 * <param name="f">The function wrapped in an Ok or an Error.</param>
 * <param name="x">The value wrapped in an Ok or an Error.</param>
 * <returns>An Ok of the function applied to the value, or the first <c>Error</c> if either the function or the value is <c>Error</c>.</returns>
 */
export function apply(f, x) {
    let matchResult, a, b, e;
    const copyOfStruct = f;
    if (copyOfStruct.tag === 1) {
        matchResult = 1;
        e = copyOfStruct.fields[0];
    }
    else {
        const copyOfStruct_1 = x;
        if (copyOfStruct_1.tag === 1) {
            matchResult = 1;
            e = copyOfStruct_1.fields[0];
        }
        else {
            matchResult = 0;
            a = copyOfStruct.fields[0];
            b = copyOfStruct_1.fields[0];
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [a(b)]);
        default:
            return new FSharpResult$2(1, [e]);
    }
}

/**
 * If value is Ok, returns both of them tupled. Otherwise it returns the Error value twice in a tuple.
 */
export function unzip(source) {
    if (source.tag === 1) {
        const e = source.fields[0];
        return [new FSharpResult$2(1, [e]), new FSharpResult$2(1, [e])];
    }
    else {
        return [new FSharpResult$2(0, [source.fields[0][0]]), new FSharpResult$2(0, [source.fields[0][1]])];
    }
}

/**
 * Creates a Result value from a pair of Result values.
 */
export function zip(x, y) {
    let matchResult, a, b, e;
    const copyOfStruct = x;
    if (copyOfStruct.tag === 1) {
        matchResult = 1;
        e = copyOfStruct.fields[0];
    }
    else {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1.tag === 1) {
            matchResult = 1;
            e = copyOfStruct_1.fields[0];
        }
        else {
            matchResult = 0;
            a = copyOfStruct.fields[0];
            b = copyOfStruct_1.fields[0];
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [[a, b]]);
        default:
            return new FSharpResult$2(1, [e]);
    }
}

/**
 * Creates a Result value from a three Result values.
 */
export function zip3(x, y, z) {
    let matchResult, a, b, c, e;
    const copyOfStruct = x;
    if (copyOfStruct.tag === 1) {
        matchResult = 1;
        e = copyOfStruct.fields[0];
    }
    else {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1.tag === 1) {
            matchResult = 1;
            e = copyOfStruct_1.fields[0];
        }
        else {
            const copyOfStruct_2 = z;
            if (copyOfStruct_2.tag === 1) {
                matchResult = 1;
                e = copyOfStruct_2.fields[0];
            }
            else {
                matchResult = 0;
                a = copyOfStruct.fields[0];
                b = copyOfStruct_1.fields[0];
                c = copyOfStruct_2.fields[0];
            }
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [[a, b, c]]);
        default:
            return new FSharpResult$2(1, [e]);
    }
}

/**
 * Creates a Result value from a pair of Result values, using a function to combine them.
 */
export function map2(f, x, y) {
    let matchResult, a, b, e;
    const copyOfStruct = x;
    if (copyOfStruct.tag === 1) {
        matchResult = 1;
        e = copyOfStruct.fields[0];
    }
    else {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1.tag === 1) {
            matchResult = 1;
            e = copyOfStruct_1.fields[0];
        }
        else {
            matchResult = 0;
            a = copyOfStruct.fields[0];
            b = copyOfStruct_1.fields[0];
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [f(a, b)]);
        default:
            return new FSharpResult$2(1, [e]);
    }
}

/**
 * Creates a Result value from three Result values, using a function to combine them.
 */
export function map3(f, x, y, z) {
    let matchResult, a, b, c, e;
    const copyOfStruct = x;
    if (copyOfStruct.tag === 1) {
        matchResult = 1;
        e = copyOfStruct.fields[0];
    }
    else {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1.tag === 1) {
            matchResult = 1;
            e = copyOfStruct_1.fields[0];
        }
        else {
            const copyOfStruct_2 = z;
            if (copyOfStruct_2.tag === 1) {
                matchResult = 1;
                e = copyOfStruct_2.fields[0];
            }
            else {
                matchResult = 0;
                a = copyOfStruct.fields[0];
                b = copyOfStruct_1.fields[0];
                c = copyOfStruct_2.fields[0];
            }
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [f(a, b, c)]);
        default:
            return new FSharpResult$2(1, [e]);
    }
}

/**
 * Maps both Ok and Error of a Result.
 */
export function bimap(errorMapper, okMapper, source) {
    if (source.tag === 0) {
        return new FSharpResult$2(0, [okMapper(source.fields[0])]);
    }
    else {
        return new FSharpResult$2(1, [errorMapper(source.fields[0])]);
    }
}

/**
 * Flattens two nested Results.
 */
export function flatten(source) {
    let matchResult, v, e;
    if (source.tag === 1) {
        matchResult = 1;
        e = source.fields[0];
    }
    else {
        const copyOfStruct = source.fields[0];
        if (copyOfStruct.tag === 1) {
            matchResult = 1;
            e = copyOfStruct.fields[0];
        }
        else {
            matchResult = 0;
            v = copyOfStruct.fields[0];
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [v]);
        default:
            return new FSharpResult$2(1, [e]);
    }
}

/**
 * Creates a safe version of the supplied function, which returns a Result<'U,exn> instead of throwing exceptions.
 */
export function protect(f, x) {
    try {
        return new FSharpResult$2(0, [f(x)]);
    }
    catch (e) {
        return new FSharpResult$2(1, [e]);
    }
}

/**
 * Gets the 'Ok' value. If it's an 'Error' this function will throw an exception.
 */
export function get$(source) {
    if (source.tag === 1) {
        const matchValue = source.fields[0];
        if (isException(matchValue)) {
            const e_1 = matchValue;
            throw new Error("Result value was Error", "source", e_1);
        }
        else {
            throw new Error((("Result value was Error: " + toString(matchValue)) + "\\nParameter name: ") + "source");
        }
    }
    else {
        return source.fields[0];
    }
}

/**
 * Gets the value of the result if the result is <c>Ok</c>, otherwise returns the specified default value.
 */
export function defaultValue(value, result_1) {
    if (result_1.tag === 0) {
        return result_1.fields[0];
    }
    else {
        return value;
    }
}

/**
 * Gets the value of the result if the result is <c>Ok</c>, otherwise evaluates <paramref name="defThunk"/> and returns the result.
 */
export function defaultWith(defThunk, result_1) {
    if (result_1.tag === 1) {
        return defThunk(result_1.fields[0]);
    }
    else {
        return result_1.fields[0];
    }
}

/**
 * Converts a Result<'T,'Error> to a Choice<'T,'Error>.
 */
export function toChoice(source) {
    if (source.tag === 1) {
        return new FSharpChoice$2(1, [source.fields[0]]);
    }
    else {
        return new FSharpChoice$2(0, [source.fields[0]]);
    }
}

/**
 * Creates a Result<'T,'Error> from a Choice<'T,'Error>.
 */
export function ofChoice(source) {
    if (source.tag === 1) {
        return new FSharpResult$2(1, [source.fields[0]]);
    }
    else {
        return new FSharpResult$2(0, [source.fields[0]]);
    }
}

/**
 * Creates two lists by classifying the values depending on whether they were wrapped with Ok or Error.
 */
export function partition(source) {
    const loop = (acc) => {
        const acc_1 = acc;
        const acc2 = acc_1[1];
        const acc1 = acc_1[0];
        return (_arg) => {
            if (!isEmpty(_arg)) {
                const xs = tail(_arg);
                const x = head(_arg);
                return (x.tag === 1) ? loop([acc1, cons(x.fields[0], acc2)])(xs) : loop([cons(x.fields[0], acc1), acc2])(xs);
            }
            else {
                return acc_1;
            }
        };
    };
    return loop([empty(), empty()])(reverse(source));
}

export function apply2With(combiner, f, x, y) {
    let matchResult, a, b, e, e1, e2;
    const copyOfStruct = x;
    if (copyOfStruct.tag === 1) {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1.tag === 1) {
            matchResult = 2;
            e1 = copyOfStruct.fields[0];
            e2 = copyOfStruct_1.fields[0];
        }
        else {
            matchResult = 1;
            e = copyOfStruct.fields[0];
        }
    }
    else {
        const copyOfStruct_2 = y;
        if (copyOfStruct_2.tag === 1) {
            matchResult = 1;
            e = copyOfStruct_2.fields[0];
        }
        else {
            matchResult = 0;
            a = copyOfStruct.fields[0];
            b = copyOfStruct_2.fields[0];
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [f(a, b)]);
        case 1:
            return new FSharpResult$2(1, [e]);
        default:
            return new FSharpResult$2(1, [combiner(e1, e2)]);
    }
}

export function apply3With(combiner, f, x, y, z) {
    let matchResult, a, b, c, e, e1, e2, e1_1, e2_1, e3;
    const copyOfStruct = x;
    if (copyOfStruct.tag === 1) {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1.tag === 1) {
            const copyOfStruct_2 = z;
            if (copyOfStruct_2.tag === 1) {
                matchResult = 3;
                e1_1 = copyOfStruct.fields[0];
                e2_1 = copyOfStruct_1.fields[0];
                e3 = copyOfStruct_2.fields[0];
            }
            else {
                matchResult = 2;
                e1 = copyOfStruct.fields[0];
                e2 = copyOfStruct_1.fields[0];
            }
        }
        else {
            const copyOfStruct_3 = z;
            if (copyOfStruct_3.tag === 1) {
                matchResult = 2;
                e1 = copyOfStruct.fields[0];
                e2 = copyOfStruct_3.fields[0];
            }
            else {
                matchResult = 1;
                e = copyOfStruct.fields[0];
            }
        }
    }
    else {
        const copyOfStruct_4 = y;
        if (copyOfStruct_4.tag === 1) {
            const copyOfStruct_5 = z;
            if (copyOfStruct_5.tag === 1) {
                matchResult = 2;
                e1 = copyOfStruct_4.fields[0];
                e2 = copyOfStruct_5.fields[0];
            }
            else {
                matchResult = 1;
                e = copyOfStruct_4.fields[0];
            }
        }
        else {
            const copyOfStruct_6 = z;
            if (copyOfStruct_6.tag === 1) {
                matchResult = 1;
                e = copyOfStruct_6.fields[0];
            }
            else {
                matchResult = 0;
                a = copyOfStruct.fields[0];
                b = copyOfStruct_4.fields[0];
                c = copyOfStruct_6.fields[0];
            }
        }
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [f(a, b, c)]);
        case 1:
            return new FSharpResult$2(1, [e]);
        case 2:
            return new FSharpResult$2(1, [combiner(e1, e2)]);
        default:
            return new FSharpResult$2(1, [combiner(combiner(e1_1, e2_1), e3)]);
    }
}

