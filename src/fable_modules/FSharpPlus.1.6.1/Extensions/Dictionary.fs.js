import { disposeSafe, getEnumerator, structuralHash, equals, defaultOf } from "../../fable-library.4.1.4/Util.js";
import { addToDict, tryGetValue as tryGetValue_1 } from "../../fable-library.4.1.4/MapUtil.js";
import { FSharpRef } from "../../fable-library.4.1.4/Types.js";
import { value, some } from "../../fable-library.4.1.4/Option.js";
import { map as map_1 } from "../../fable-library.4.1.4/Seq.js";
import { Dictionary } from "../../fable-library.4.1.4/MutableMap.js";

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
 * Does the dictionary contain the given key?
 */
export function containsKey(key, source) {
    return source.has(key);
}

/**
 * Returns the keys of the given dictionary.
 */
export function keys(source) {
    return map_1((_arg) => _arg[0], source);
}

/**
 * Returns the values of the given dictionary.
 */
export function values(source) {
    return map_1((_arg) => _arg[1], source);
}

/**
 * Maps the given function over each value in the dictionary.
 */
export function map(mapping, source) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    let enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            addToDict(dct, activePatternResult[0], mapping(activePatternResult[1]));
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Creates a Dictionary value from a pair of Dictionaries, using a function to combine them.
 */
export function map2(mapping, source1, source2) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const f = mapping;
    let enumerator = getEnumerator(source1);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            const matchValue = tryGetValue(k, source2);
            if (matchValue == null) {
            }
            else {
                addToDict(dct, k, f(activePatternResult[1], value(matchValue)));
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Combines values from three Dictionaries using mapping function.
 */
export function map3(mapping, source1, source2, source3) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const f = mapping;
    let enumerator = getEnumerator(source1);
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
                    vy = value(matchValue);
                    vz = value(matchValue_1);
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
 * Applies given function to each value of the given dictionary.
 */
export function chooseValues(mapper, source) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const enumerator = getEnumerator(source);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const matchValue = mapper(activePatternResult[1]);
            if (matchValue == null) {
            }
            else {
                addToDict(dct, activePatternResult[0], value(matchValue));
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Tuples values of two dictionaries.
 */
export function zip(source1, source2) {
    const dct = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    let enumerator = getEnumerator(source1);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const k = activePatternResult[0];
            const matchValue = tryGetValue(k, source2);
            if (matchValue == null) {
            }
            else {
                addToDict(dct, k, [activePatternResult[1], value(matchValue)]);
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

/**
 * Splits a dictionary with tuple pair values to two separate dictionaries.
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
    let enumerator = getEnumerator(source);
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
 * Returns the union of two dictionaries, using the combiner function for duplicate keys.
 */
export function unionWith(combiner, source1, source2) {
    let matchValue, outArg;
    const d = new Dictionary([], {
        Equals: equals,
        GetHashCode: structuralHash,
    });
    const f = combiner;
    let enumerator = getEnumerator(source1);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            d.set(activePatternResult[0], activePatternResult[1]);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    let enumerator_1 = getEnumerator(source2);
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

/**
 * Same as chooseValues but with access to the key.
 */
export function choosei(chooser, source) {
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
                addToDict(dct, k, value(matchValue));
            }
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return dct;
}

