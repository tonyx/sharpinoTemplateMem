import { Operators_NullArg } from "../../fable-library.4.1.4/FSharp.Core.js";
import { toArray, map as map_1 } from "../../fable-library.4.1.4/Seq.js";
import { replace as replace_1, split as split_1, intersperse as intersperse_1, intercalate as intercalate_1, lift3 as lift3_1, lift2 as lift2_1, apply as apply_1 } from "./Seq.fs.js";
import { min } from "../../fable-library.4.1.4/Double.js";

/**
 * Builds a new ResizeArray whose elements are the results of applying the given function
 * to each of the elements of the ResizeArray.
 */
export function map(mapping, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return Array.from(map_1(mapping, source));
}

/**
 * Applies a ResizeArray of functions to a ResizeArray of values and concatenates them.
 */
export function apply(f, ra) {
    if (ra == null) {
        Operators_NullArg("ra");
    }
    return Array.from(apply_1(f, ra));
}

/**
 * Combines all values from the first ResizeArray with the second, using the supplied mapping function.
 */
export function lift2(mapping, ra1, ra2) {
    if (ra1 == null) {
        Operators_NullArg("ra1");
    }
    if (ra2 == null) {
        Operators_NullArg("ra2");
    }
    return Array.from(lift2_1(mapping, ra1, ra2));
}

/**
 * Combines values from three ResizeArrays and calls a mapping function on this combination.
 */
export function lift3(mapping, ra1, ra2, ra3) {
    if (ra1 == null) {
        Operators_NullArg("ra1");
    }
    if (ra2 == null) {
        Operators_NullArg("ra2");
    }
    if (ra3 == null) {
        Operators_NullArg("ra3");
    }
    return Array.from(lift3_1(mapping, ra1, ra2, ra3));
}

/**
 * Concatenates all elements, using the specified separator between each element.
 */
export function intercalate(separator, source) {
    if (separator == null) {
        Operators_NullArg("separator");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return toArray(intercalate_1(separator, source));
}

/**
 * Inserts a separator element between each element in the source ResizeArray.
 */
export function intersperse(element, source) {
    if (element == null) {
        Operators_NullArg("element");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return toArray(intersperse_1(element, source));
}

/**
 * Creates a sequence of arrays by splitting the source array on any of the given separators.
 */
export function split(separators, source) {
    if (separators == null) {
        Operators_NullArg("separators");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return map_1(toArray, split_1(separators, source));
}

/**
 * Replaces a subsequence of the source array with the given replacement array.
 */
export function replace(oldValue, newValue, source) {
    if (oldValue == null) {
        Operators_NullArg("oldValue");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return toArray(replace_1(oldValue, newValue, source));
}

/**
 * Creates two arrays by applying the mapper function to each element in the array
 * and classifying the transformed values depending on whether they were wrapped with Choice1Of2 or Choice2Of2.
 */
export function partitionMap(mapper, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    const y = [];
    const x = [];
    source.forEach((arg) => {
        const _arg = mapper(arg);
        if (_arg.tag === 1) {
            void (y.push(_arg.fields[0]));
        }
        else {
            void (x.push(_arg.fields[0]));
        }
    });
    return [x.slice(), y.slice()];
}

/**
 * Safely build a new ResizeArray whose elements are the results of applying the given function
 * to each of the elements of the two ResizeArrays pairwise.
 */
export function map2Shortest(f, a1, a2) {
    if (a1 == null) {
        Operators_NullArg("a1");
    }
    if (a2 == null) {
        Operators_NullArg("a2");
    }
    const len = min(a1.length, a2.length) | 0;
    const ra = [];
    for (let i = 0; i <= (len - 1); i++) {
        void (ra.push(f(a1[i], a2[i])));
    }
    return ra;
}

/**
 * Safely build a new ResizeArray whose elements are the results of applying the given function
 * to each of the elements of the three ResizeArrays pairwise.
 */
export function map3Shortest(f, a1, a2, a3) {
    let len;
    const e_1 = min(a1.length, a2.length) | 0;
    len = min(a3.length, e_1);
    const ra = [];
    for (let i = 0; i <= (len - 1); i++) {
        void (ra.push(f(a1[i], a2[i], a3[i])));
    }
    return ra;
}

/**
 * Zip safely two ResizeArrays. If one ResizeArray is shorter, excess elements are discarded from the right end of the longer ResizeArray.
 */
export function zipShortest(a1, a2) {
    if (a1 == null) {
        Operators_NullArg("a1");
    }
    if (a2 == null) {
        Operators_NullArg("a2");
    }
    const len = min(a1.length, a2.length) | 0;
    const ra = [];
    for (let i = 0; i <= (len - 1); i++) {
        void (ra.push([a1[i], a2[i]]));
    }
    return ra;
}

/**
 * Zip safely three ResizeArrays. If one ResizeArray is shorter, excess elements are discarded from the right end of the longer ResizeArray.
 */
export function zip3Shortest(a1, a2, a3) {
    let len;
    const e_1 = min(a1.length, a2.length) | 0;
    len = min(a3.length, e_1);
    const ra = [];
    for (let i = 0; i <= (len - 1); i++) {
        void (ra.push([a1[i], a2[i], a3[i]]));
    }
    return ra;
}

