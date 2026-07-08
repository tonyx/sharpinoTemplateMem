import { FSharpChoice$2 } from "../../fable-library.4.1.4/Choice.js";

/**
 * Creates a Choice1Of2 with the supplied value.
 */
export function result(x) {
    return new FSharpChoice$2(0, [x]);
}

/**
 * Creates a Choice2Of2 with the supplied value.
 */
export function throw$(x) {
    return new FSharpChoice$2(1, [x]);
}

/**
 * Applies the wrapped value to the wrapped function when both are Choice1Of2 and returns a wrapped result or the first Choice2Of2.
 * This is as if Choice1Of2 respresents a Success value and Choice2Of2 a Failure.
 * <param name="f">The function wrapped in a Choice1Of2 or a Choice2Of2.</param>
 * <param name="x">The value wrapped in a Choice1Of2 or a Choice2Of2.</param>
 * <returns>A Choice1Of2 of the function applied to the value, or the first <c>Choice2Of2</c> if either the function or the value is <c>Choice2Of2</c>.</returns>
 */
export function apply(f, x) {
    let matchResult, a, b, e;
    if (f.tag === 1) {
        matchResult = 1;
        e = f.fields[0];
    }
    else if (x.tag === 1) {
        matchResult = 1;
        e = x.fields[0];
    }
    else {
        matchResult = 0;
        a = f.fields[0];
        b = x.fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpChoice$2(0, [a(b)]);
        default:
            return new FSharpChoice$2(1, [e]);
    }
}

/**
 * Maps the value on the Choice1Of2 if any.
 */
export function map(mapping, source) {
    if (source.tag === 1) {
        return new FSharpChoice$2(1, [source.fields[0]]);
    }
    else {
        return new FSharpChoice$2(0, [mapping(source.fields[0])]);
    }
}

/**
 * Creates a Choice value from a pair of Choice values, using a function to combine the Choice1Of2 values.
 */
export function map2(mapping, x, y) {
    let matchResult, a, b, e;
    if (x.tag === 1) {
        matchResult = 1;
        e = x.fields[0];
    }
    else if (y.tag === 1) {
        matchResult = 1;
        e = y.fields[0];
    }
    else {
        matchResult = 0;
        a = x.fields[0];
        b = y.fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpChoice$2(0, [mapping(a, b)]);
        default:
            return new FSharpChoice$2(1, [e]);
    }
}

/**
 * Creates a Choice value from three of Choice values, using a function to combine the Choice1Of2 values.
 */
export function map3(mapping, x, y, z) {
    let matchResult, a, b, c, e;
    if (x.tag === 1) {
        matchResult = 1;
        e = x.fields[0];
    }
    else if (y.tag === 1) {
        matchResult = 1;
        e = y.fields[0];
    }
    else if (z.tag === 1) {
        matchResult = 1;
        e = z.fields[0];
    }
    else {
        matchResult = 0;
        a = x.fields[0];
        b = y.fields[0];
        c = z.fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpChoice$2(0, [mapping(a, b, c)]);
        default:
            return new FSharpChoice$2(1, [e]);
    }
}

/**
 * Flattens two nested Choice.
 */
export function flatten(source) {
    let matchResult, v, e;
    if (source.tag === 1) {
        matchResult = 1;
        e = source.fields[0];
    }
    else if (source.fields[0].tag === 1) {
        matchResult = 1;
        e = source.fields[0].fields[0];
    }
    else {
        matchResult = 0;
        v = source.fields[0].fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpChoice$2(0, [v]);
        default:
            return new FSharpChoice$2(1, [e]);
    }
}

/**
 * If the input value is a Choice2Of2 leaves it unchanged, otherwise maps the value on the Choice1Of2 and flattens the resulting nested Choice.
 */
export function bind(binder, source) {
    if (source.tag === 1) {
        return new FSharpChoice$2(1, [source.fields[0]]);
    }
    else {
        return binder(source.fields[0]);
    }
}

/**
 * If the input value is a Choice1Of2 leaves it unchanged, otherwise maps the value on the Choice2Of2 and flattens the resulting nested Choice.
 */
export function bindChoice2Of2(binder, source) {
    if (source.tag === 1) {
        return binder(source.fields[0]);
    }
    else {
        return new FSharpChoice$2(0, [source.fields[0]]);
    }
}

/**
 * Creates a safe version of the supplied function, which returns a Choice<'U,exn> instead of throwing exceptions.
 */
export function protect(f, x) {
    try {
        return new FSharpChoice$2(0, [f(x)]);
    }
    catch (e) {
        return new FSharpChoice$2(1, [e]);
    }
}

export function apply2With(combiner, f, x, y) {
    let matchResult, a, b, e, e1, e2;
    if (x.tag === 1) {
        if (y.tag === 1) {
            matchResult = 2;
            e1 = x.fields[0];
            e2 = y.fields[0];
        }
        else {
            matchResult = 1;
            e = x.fields[0];
        }
    }
    else if (y.tag === 1) {
        matchResult = 1;
        e = y.fields[0];
    }
    else {
        matchResult = 0;
        a = x.fields[0];
        b = y.fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpChoice$2(0, [f(a, b)]);
        case 1:
            return new FSharpChoice$2(1, [e]);
        default:
            return new FSharpChoice$2(1, [combiner(e1, e2)]);
    }
}

export function apply3With(combiner, f, x, y, z) {
    let matchResult, a, b, c, e, e1, e2, e1_1, e2_1, e3;
    if (x.tag === 1) {
        if (y.tag === 1) {
            if (z.tag === 1) {
                matchResult = 3;
                e1_1 = x.fields[0];
                e2_1 = y.fields[0];
                e3 = z.fields[0];
            }
            else {
                matchResult = 2;
                e1 = x.fields[0];
                e2 = y.fields[0];
            }
        }
        else if (z.tag === 1) {
            matchResult = 2;
            e1 = x.fields[0];
            e2 = z.fields[0];
        }
        else {
            matchResult = 1;
            e = x.fields[0];
        }
    }
    else if (y.tag === 1) {
        if (z.tag === 1) {
            matchResult = 2;
            e1 = y.fields[0];
            e2 = z.fields[0];
        }
        else {
            matchResult = 1;
            e = y.fields[0];
        }
    }
    else if (z.tag === 1) {
        matchResult = 1;
        e = z.fields[0];
    }
    else {
        matchResult = 0;
        a = x.fields[0];
        b = y.fields[0];
        c = z.fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpChoice$2(0, [f(a, b, c)]);
        case 1:
            return new FSharpChoice$2(1, [e]);
        case 2:
            return new FSharpChoice$2(1, [combiner(e1, e2)]);
        default:
            return new FSharpChoice$2(1, [combiner(combiner(e1_1, e2_1), e3)]);
    }
}

