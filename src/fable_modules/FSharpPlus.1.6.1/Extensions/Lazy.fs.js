import { Lazy } from "../../fable-library.4.1.4/Util.js";

/**
 * Creates a Lazy value from another Lazy value, mapping through a function.
 */
export function map(mapping, x) {
    return new Lazy(() => mapping(x.Value));
}

/**
 * Creates a Lazy value from a pair of Lazy values, using a mapping function to combine them.
 */
export function map2(mapping, x, y) {
    return new Lazy(() => mapping(x.Value, y.Value));
}

/**
 * Creates a Lazy value from three Lazy values, using a function to combine them.
 */
export function map3(mapping, x, y, z) {
    return new Lazy(() => mapping(x.Value, y.Value, z.Value));
}

/**
 * Applies a Lazy value to a Lazy function.
 */
export function apply(f, x) {
    return new Lazy(() => f.Value(x.Value));
}

