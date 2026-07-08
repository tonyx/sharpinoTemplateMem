import { singleton } from "../../fable-library.4.1.4/AsyncBuilder.js";
import { fromContinuations } from "../../fable-library.4.1.4/Async.js";

/**
 * Creates an async workflow from another workflow 'x', mapping its result with 'f'.
 */
export function map(f, x) {
    return singleton.Bind(x, (arg_1) => {
        const arg = f(arg_1);
        return singleton.Return(arg);
    });
}

/**
 * Creates an async workflow from two workflows 'x' and 'y', mapping its results with 'f'.
 */
export function lift2(f, x, y) {
    return singleton.Delay(() => singleton.Bind(x, (_arg) => singleton.Bind(y, (_arg_1) => singleton.Return(f(_arg, _arg_1)))));
}

/**
 * Creates an async workflow from three workflows 'x', 'y' and 'z', mapping its results with 'f'.
 */
export function lift3(f, x, y, z) {
    return singleton.Delay(() => singleton.Bind(x, (_arg) => singleton.Bind(y, (_arg_1) => singleton.Bind(z, (_arg_2) => singleton.Return(f(_arg, _arg_1, _arg_2))))));
}

/**
 * Creates an async workflow from two workflows, mapping its results with a specified function.
 */
export function map2(mapper, async1, async2) {
    return lift2(mapper, async1, async2);
}

/**
 * Creates an async workflow from three workflows, mapping its results with a specified function.
 */
export function map3(mapper, async1, async2, async3) {
    return lift3(mapper, async1, async2, async3);
}

/**
 * Creates an async workflow from two workflows 'x' and 'y', tupling its results.
 */
export function zipSequentially(x, y) {
    return singleton.Delay(() => singleton.Bind(x, (_arg) => singleton.Bind(y, (_arg_1) => singleton.Return([_arg, _arg_1]))));
}

/**
 * Creates an async workflow from two workflows, tupling its results.
 */
export function zip(async1, async2) {
    return map2((x, y) => [x, y], async1, async2);
}

/**
 * Creates an async workflow from three workflows, tupling its results.
 */
export function zip3(async1, async2, async3) {
    return map3((x, y, z) => [x, y, z], async1, async2, async3);
}

/**
 * Flatten two nested asyncs into one.
 */
export function join(x) {
    return singleton.Bind(x, (x_1) => x_1);
}

/**
 * Creates an async workflow that is the result of applying the resulting function of
 * an async workflow to the resulting value of another async workflow.
 */
export function apply(f, x) {
    return singleton.Bind(f, (x1) => singleton.Bind(x, (x2) => singleton.Delay(() => singleton.Return(x1(x2)))));
}

/**
 * Raises an exception in the async workflow
 */
export function raise(ex) {
    return fromContinuations((tupledArg) => {
        tupledArg[1](ex);
    });
}

