import { Operators_NullArg } from "../../fable-library.4.1.4/FSharp.Core.js";
import { choose, equalsWith, map, initialize } from "../../fable-library.4.1.4/Array.js";
import { divRem } from "../../fable-library.4.1.4/Int32.js";
import { FSharpRef } from "../../fable-library.4.1.4/Types.js";
import { map as map_1, toArray } from "../../fable-library.4.1.4/Seq.js";
import { replace as replace_1, split as split_1, intercalate as intercalate_1 } from "./Seq.fs.js";
import { defaultOf, equals } from "../../fable-library.4.1.4/Util.js";
import { min } from "../../fable-library.4.1.4/Double.js";

/**
 * Applies an array of functions to an array of values and concatenates them.
 */
export function apply(f, x) {
    if (x == null) {
        Operators_NullArg("x");
    }
    const matchValue = f.length | 0;
    const lenx = x.length | 0;
    return initialize(matchValue * lenx, (i) => {
        let patternInput_1;
        let outArg = 0;
        patternInput_1 = [divRem(i, lenx, new FSharpRef(() => outArg, (v) => {
            outArg = (v | 0);
        })), outArg];
        return f[patternInput_1[0]](x[patternInput_1[1]]);
    });
}

/**
 * Combines all values from the first array with the second, using the supplied mapping function.
 */
export function lift2(f, x, y) {
    if (x == null) {
        Operators_NullArg("x");
    }
    if (y == null) {
        Operators_NullArg("y");
    }
    const matchValue = x.length | 0;
    const leny = y.length | 0;
    return initialize(matchValue * leny, (i) => {
        let patternInput_1;
        let outArg = 0;
        patternInput_1 = [divRem(i, leny, new FSharpRef(() => outArg, (v) => {
            outArg = (v | 0);
        })), outArg];
        return f(x[patternInput_1[0]], y[patternInput_1[1]]);
    });
}

/**
 * Combines all values from three arrays and calls a mapping function on this combination.
 */
export function lift3(mapping, list1, list2, list3) {
    if (list1 == null) {
        Operators_NullArg("list1");
    }
    if (list2 == null) {
        Operators_NullArg("list2");
    }
    if (list3 == null) {
        Operators_NullArg("list3");
    }
    const matchValue = list1.length | 0;
    const matchValue_1 = list2.length | 0;
    const lenz = list3.length | 0;
    const leny = matchValue_1 | 0;
    const lenx = matchValue | 0;
    const combinedFirstTwo = initialize(lenx * leny, (i) => {
        let patternInput_1;
        let outArg = 0;
        patternInput_1 = [divRem(i, leny, new FSharpRef(() => outArg, (v) => {
            outArg = (v | 0);
        })), outArg];
        return [list1[patternInput_1[0]], list2[patternInput_1[1]]];
    });
    return map((x) => mapping(x[0][0], x[0][1], x[1]), initialize((lenx * leny) * lenz, (i_1) => {
        let patternInput_2;
        let outArg_1 = 0;
        patternInput_2 = [divRem(i_1, lenz, new FSharpRef(() => outArg_1, (v_1) => {
            outArg_1 = (v_1 | 0);
        })), outArg_1];
        return [combinedFirstTwo[patternInput_2[0]], list3[patternInput_2[1]]];
    }));
}

/**
 * Concatenates all elements, using the specified separator between each element.
 */
export function intercalate(separator, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return toArray(intercalate_1(separator, source));
}

/**
 * Inserts a separator element between each element in the source array.
 */
export function intersperse(element, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (!equalsWith(equals, source, defaultOf()) && (source.length === 0)) {
        return [];
    }
    else {
        return initialize((source.length * 2) - 1, (i) => {
            const matchValue = divRem(i, 2);
            return (matchValue[1] === 0) ? source[matchValue[0]] : element;
        });
    }
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
    if (newValue == null) {
        Operators_NullArg("newValue");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return toArray(replace_1(oldValue, newValue, source));
}

/**
 * Returns the index of the first occurrence of the specified slice in the source.
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
 * Safely build a new array whose elements are the results of applying the given function
 * to each of the elements of the two arrays pairwise.
 */
export function map2Shortest(f, a1, a2) {
    if (a1 == null) {
        Operators_NullArg("a1");
    }
    if (a2 == null) {
        Operators_NullArg("a2");
    }
    return initialize(min(a1.length, a2.length), (i) => f(a1[i], a2[i]));
}

/**
 * Safely build a new array whose elements are the results of applying the given function
 * to each of the elements of the three arrays pairwise.
 */
export function map3Shortest(f, a1, a2, a3) {
    let e_1;
    if (a1 == null) {
        Operators_NullArg("a1");
    }
    if (a2 == null) {
        Operators_NullArg("a2");
    }
    if (a3 == null) {
        Operators_NullArg("a3");
    }
    return initialize((e_1 = (min(a1.length, a2.length) | 0), min(a3.length, e_1)), (i) => f(a1[i], a2[i], a3[i]));
}

/**
 * Zip safely two arrays. If one array is shorter, excess elements are discarded from the right end of the longer array.
 */
export function zipShortest(a1, a2) {
    if (a1 == null) {
        Operators_NullArg("a1");
    }
    if (a2 == null) {
        Operators_NullArg("a2");
    }
    return initialize(min(a1.length, a2.length), (i) => [a1[i], a2[i]]);
}

/**
 * Zip safely three arrays. If one array is shorter, excess elements are discarded from the right end of the longer array.
 */
export function zip3Shortest(a1, a2, a3) {
    let e_1;
    if (a1 == null) {
        Operators_NullArg("a1");
    }
    if (a2 == null) {
        Operators_NullArg("a2");
    }
    if (a3 == null) {
        Operators_NullArg("a3");
    }
    return initialize((e_1 = (min(a1.length, a2.length) | 0), min(a3.length, e_1)), (i) => [a1[i], a2[i], a3[i]]);
}

/**
 * Same as choose but with access to the index.
 */
export function choosei(mapping, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    let i = new FSharpRef(-1);
    return choose((x) => {
        i.contents = ((i.contents + 1) | 0);
        return mapping(i.contents, x);
    }, source);
}

