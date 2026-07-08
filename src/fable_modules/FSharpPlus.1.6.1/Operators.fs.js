import { disposeSafe, defaultOf, equals } from "../fable-library.4.1.4/Util.js";

/**
 * Executes a side-effect function and returns the original input value.
 */
export function tap(f, x) {
    f(x);
    return x;
}

/**
 * Safely dispose a resource (includes null-checking).
 */
export function dispose(resource) {
    if (equals(resource, defaultOf())) {
    }
    else {
        disposeSafe(resource);
    }
}

