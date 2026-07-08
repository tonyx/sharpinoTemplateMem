import { ofSeq, add as add_1 } from "../../fable-library.4.1.4/Map.js";
import { foldBack2, fold2, filter, map as map_1 } from "../../fable-library.4.1.4/Seq.js";
import { disposeSafe, getEnumerator, structuralHash, defaultOf, equals, compare } from "../../fable-library.4.1.4/Util.js";
import { addToDict, tryGetValue as tryGetValue_1 } from "../../fable-library.4.1.4/MapUtil.js";
import { FSharpRef } from "../../fable-library.4.1.4/Types.js";
import { value as value_1, some } from "../../fable-library.4.1.4/Option.js";
import { Dictionary } from "../../fable-library.4.1.4/MutableMap.js";

/**
 * Replaces or sets the item associated with a specified key with the specified value.
 */
export function add(key, value, source) {
    return add_1(key, value, ofSeq(map_1((keyValuePair) => keyValuePair, source), {
        Compare: compare,
    }));
}

/**
 * Removes the given key from the read-only dictionary.
 */
export function remove(key, source) {
    return ofSeq(map_1((keyValuePair) => keyValuePair, filter((t) => !equals(t[0], key), source)), {
        Compare: compare,
    });
}

/**
 * Tries to get the value of the given key.
 */
export function tryGetValue(key, source) {
    let matchValue;
    let outArg = defaultOf();
    matchValue = [tryGetValue_1(source, key, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    if (matchValue[0]) {
        return some(matchValue[1]);
    }
    else {
        return void 0;
    }
}

/**
 * Does the read-only dictionary contain the given key?
 */
export function containsKey(key, source) {
    return source.has(key);
}

/**
 * Returns the keys of the given read-only dictionary.
 */
export function keys(source) {
    return map_1((_arg) => _arg[0], source);
}

/**
 * Returns the values of the given read-only dictionary.
 */
export function values(source) {
    return map_1((_arg) => _arg[1], source);
}

/**
 * Maps the given function over each value in the read-only dictionary.
 */
export function mapValues(mapper, source) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            addToDict(dct, activePatternResult[0], mapper(activePatternResult[1]));
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

export function map(f, x) {
    return mapValues(f, x);
}

/**
 * Creates a read-only dictionary value from a pair of read-only dictionaries,
 * using a function to combine them.
 */
export function map2(mapper, source1, source2) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const f = mapper;
    const enumerator = getEnumerator(source1);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            const matchValue = tryGetValue(k, source2);
            if (matchValue == null) {
            }
            else {
                addToDict(dct, k, f(activePatternResult[1], value_1(matchValue)));
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Combines values from three read-only dictionaries using mapping function.
 */
export function map3(mapping, source1, source2, source3) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const f = mapping;
    const enumerator = getEnumerator(source1);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            const matchValue = tryGetValue(k, source2);
            const matchValue_1 = tryGetValue(k, source3);
            let matchResult, vy, vz;
            if (matchValue != null) {
                if (matchValue_1 != null) {
                    matchResult = 0;
                    vy = value_1(matchValue);
                    vz = value_1(matchValue_1);
                }
                else {
                    matchResult = 1;
                }
            }
            else {
                matchResult = 1;
            }
            switch (matchResult) {
                case 0: {
                    addToDict(dct, k, f(activePatternResult[1], vy, vz));
                    break;
                }
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Maps the given function over each key and value in the read-only dictionary.
 */
export function mapi(mapper, source) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            addToDict(dct, k, mapper(k, activePatternResult[1]));
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Applies the given action over each key and value in the read-only dictionary.
 */
export function iter(action, source) {
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            action(activePatternResult[0], activePatternResult[1]);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
}

/**
 * Applies a function to each value in a read-only dictionary and then returns
 * a read-only dictionary of entries <c>v</c> where the applied function returned <c>Some(v)</c>.
 * 
 * Returns an empty read-only dictionary when the input read-only dictionary is empty or when the applied chooser function
 * returns <c>None</c> for all elements.
 */
export function chooseValues(chooser, source) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const matchValue = chooser(activePatternResult[1]);
            if (matchValue == null) {
            }
            else {
                addToDict(dct, activePatternResult[0], value_1(matchValue));
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Applies a function to each key and value in a read-only dictionary and then returns
 * a read-only dictionary of entries <c>v</c> where the applied function returned <c>Some(v)</c>.
 * 
 * Returns an empty read-only dictionary when the input read-only dictionary is empty or when the applied chooser function
 * returns <c>None</c> for all elements.
 */
export function choose(chooser, source) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            const matchValue = chooser(k, activePatternResult[1]);
            if (matchValue == null) {
            }
            else {
                addToDict(dct, k, value_1(matchValue));
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Tuples values of two read-only dictionaries.
 */
export function zip(x, y) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const enumerator = getEnumerator(x);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            const matchValue = tryGetValue(k, y);
            if (matchValue == null) {
            }
            else {
                addToDict(dct, k, [activePatternResult[1], value_1(matchValue)]);
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Splits a read-only dictionary with tuple pair values to two separate read-only dictionaries.
 */
export function unzip(source) {
    const dct1 = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const dct2 = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            addToDict(dct1, k, activePatternResult[1][0]);
            addToDict(dct2, k, activePatternResult[1][1]);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return [dct1, dct2];
}

/**
 * Returns the union of two read-only dictionaries, using the combiner function for duplicate keys.
 */
export function unionWith(combiner, source1, source2) {
    let matchValue, outArg;
    const d = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const f = combiner;
    const enumerator = getEnumerator(source1);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            d.set(activePatternResult[0], activePatternResult[1]);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    const enumerator_1 = getEnumerator(source2);
    try {
        while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult_1 = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const v$0027 = activePatternResult_1[1];
            const k_1 = activePatternResult_1[0];
            d.set(k_1, (matchValue = ((outArg = defaultOf(), [tryGetValue_1(d, k_1, new FSharpRef(() => outArg, (v_1) => {
                outArg = v_1;
            })), outArg])), matchValue[0] ? f(matchValue[1], v$0027) : v$0027));
        }
    }
    finally {
        disposeSafe(enumerator_1);
    }
    return d;
}

export function empty() {
    return new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
}

/**
 * Converts a read-only dictionary to a ResizeArray.
 */
export function toResizeArray(source) {
    const arr = [];
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            void (arr.push([activePatternResult[0], activePatternResult[1]]));
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return arr;
}

/**
 * Converts a read-only dictionary to a sequence.
 */
export function toSeq(source) {
    return toResizeArray(source);
}

/**
 * Folds over the bindings in the Dictionary
 */
export function fold(folder, state, source) {
    let tupledArg;
    const source_1 = map_1((keyValuePair) => keyValuePair, toSeq(source));
    tupledArg = [map_1((tuple) => tuple[0], source_1), map_1((tuple_1) => tuple_1[1], source_1)];
    return fold2(folder, state, tupledArg[0], tupledArg[1]);
}

/**
 * Folds over the bindings in the Dictionary
 */
export function foldBack(folder, source, state) {
    let tupledArg, source_1;
    return ((tupledArg = ((source_1 = map_1((keyValuePair) => keyValuePair, toSeq(source)), [map_1((tuple) => tuple[0], source_1), map_1((tuple_1) => tuple_1[1], source_1)])), (state_1) => foldBack2(folder, tupledArg[0], tupledArg[1], state_1)))(state);
}

