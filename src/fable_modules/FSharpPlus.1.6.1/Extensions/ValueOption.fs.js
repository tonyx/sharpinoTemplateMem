import { value, some } from "../../fable-library.4.1.4/Option.js";
import { FSharpResult$2 } from "../../fable-library.4.1.4/Choice.js";

/**
 * Applies an option value to an option function.
 */
export function apply(f, x) {
    let matchResult, f_1, x_1;
    const copyOfStruct = f;
    if (copyOfStruct != null) {
        const copyOfStruct_1 = x;
        if (copyOfStruct_1 != null) {
            matchResult = 0;
            f_1 = copyOfStruct;
            x_1 = value(copyOfStruct_1);
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return some(f_1(x_1));
        default:
            return void 0;
    }
}

/**
 * If value is ValueSome, returns both of them tupled. Otherwise it returns ValueNone tupled.
 */
export function unzip(v) {
    if (v != null) {
        return [some(v[0]), some(v[1])];
    }
    else {
        return [void 0, void 0];
    }
}

/**
 * If both value are ValueSome, returns both of them tupled. Otherwise it returns ValueNone.
 */
export function zip(x, y) {
    let matchResult, x_1, y_1;
    const copyOfStruct = x;
    if (copyOfStruct != null) {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1 != null) {
            matchResult = 0;
            x_1 = value(copyOfStruct);
            y_1 = value(copyOfStruct_1);
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return [x_1, y_1];
        default:
            return void 0;
    }
}

/**
 * If all 3 value are ValueSome, returns them tupled. Otherwise it returns ValueNone.
 */
export function zip3(x, y, z) {
    let matchResult, x_1, y_1, z_1;
    const copyOfStruct = x;
    if (copyOfStruct != null) {
        const copyOfStruct_1 = y;
        if (copyOfStruct_1 != null) {
            const copyOfStruct_2 = z;
            if (copyOfStruct_2 != null) {
                matchResult = 0;
                x_1 = value(copyOfStruct);
                y_1 = value(copyOfStruct_1);
                z_1 = value(copyOfStruct_2);
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return [x_1, y_1, z_1];
        default:
            return void 0;
    }
}

/**
 * Converts an option to a Result.
 */
export function toResult(source) {
    if (source == null) {
        return new FSharpResult$2(1, [void 0]);
    }
    else {
        return new FSharpResult$2(0, [value(source)]);
    }
}

/**
 * Converts an option to a Result.
 */
export function toResultWith(errorValue, source) {
    if (source == null) {
        return new FSharpResult$2(1, [errorValue]);
    }
    else {
        return new FSharpResult$2(0, [value(source)]);
    }
}

/**
 * Converts a Result to an option.
 */
export function ofResult(source) {
    if (source.tag === 1) {
        return void 0;
    }
    else {
        return some(source.fields[0]);
    }
}

/**
 * Creates a safe version of the supplied function, which returns an voption<'U> instead of throwing exceptions.
 */
export function protect(f, x) {
    try {
        return some(f(x));
    }
    catch (matchValue) {
        return void 0;
    }
}

/**
 * Converts pair of bool and value to ValueOption.
 */
export function ofPair(pair_, pair__1) {
    const pair = [pair_, pair__1];
    if (pair[0]) {
        return some(pair[1]);
    }
    else {
        return void 0;
    }
}

/**
 * Converts a ValueOption to an Option.
 */
export function toOption(source) {
    if (source == null) {
        return void 0;
    }
    else {
        return some(value(source));
    }
}

/**
 * Converts an Option to a ValueOption.
 */
export function ofOption(source) {
    if (source == null) {
        return void 0;
    }
    else {
        return some(value(source));
    }
}

