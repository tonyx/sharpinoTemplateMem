import { toList as toList_1, singleton, empty, collect, delay, map } from "../../fable-library.4.1.4/Seq.js";
import { find, ofList, toList, add, fold, tryFind, ofSeq, map as map_1 } from "../../fable-library.4.1.4/Map.js";
import { Lazy, compare, uncurry2 } from "../../fable-library.4.1.4/Util.js";
import { value } from "../../fable-library.4.1.4/Option.js";
import { ExtraTopLevelOperators_LazyPattern } from "../../fable-library.4.1.4/FSharp.Core.js";
import { intersect as intersect_1, ofSeq as ofSeq_1 } from "../../fable-library.4.1.4/Set.js";
import { map as map_2 } from "../../fable-library.4.1.4/List.js";

/**
 * Returns the keys of the given map.
 */
export function keys(source) {
    return map((_arg) => _arg[0], source);
}

/**
 * Returns the values of the given map.
 */
export function values(source) {
    return map((_arg) => _arg[1], source);
}

/**
 * Maps the values of the original Map.
 */
export function mapValues(f, x) {
    return map_1(uncurry2((_arg) => f), x);
}

/**
 * Maps values of two Maps.
 */
export function mapValues2(f, x, y) {
    return ofSeq(delay(() => {
        const f_1 = f;
        return collect((matchValue) => {
            const activePatternResult = matchValue;
            const k = activePatternResult[0];
            const matchValue_1 = tryFind(k, y);
            if (matchValue_1 == null) {
                return empty();
            }
            else {
                return singleton([k, f_1(activePatternResult[1], value(matchValue_1))]);
            }
        }, x);
    }), {
        Compare: compare,
    });
}

/**
 * Combines values from three maps using mapping function.
 */
export function mapValues3(mapping, x, y, z) {
    return ofSeq(delay(() => {
        const f = mapping;
        return collect((matchValue) => {
            const activePatternResult = matchValue;
            const k = activePatternResult[0];
            const matchValue_1 = tryFind(k, y);
            const matchValue_2 = new Lazy(() => tryFind(k, z));
            let matchResult, vy, vz;
            if (matchValue_1 != null) {
                const activePatternResult_1 = ExtraTopLevelOperators_LazyPattern(matchValue_2);
                if (activePatternResult_1 != null) {
                    matchResult = 0;
                    vy = value(matchValue_1);
                    vz = value(activePatternResult_1);
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
                    return singleton([k, f(activePatternResult[1], vy, vz)]);
                default: {
                    return empty();
                }
            }
        }, x);
    }), {
        Compare: compare,
    });
}

/**
 * Applies given function to each value of the given Map.
 */
export function chooseValues(mapping, source) {
    return ofSeq(delay(() => collect((matchValue) => {
        const activePatternResult = matchValue;
        const matchValue_1 = mapping(activePatternResult[1]);
        if (matchValue_1 == null) {
            return empty();
        }
        else {
            return singleton([activePatternResult[0], value(matchValue_1)]);
        }
    }, source)), {
        Compare: compare,
    });
}

/**
 * Tuples values of two Maps.
 */
export function zip(x, y) {
    return ofSeq(delay(() => collect((matchValue) => {
        const activePatternResult = matchValue;
        const k = activePatternResult[0];
        const matchValue_1 = tryFind(k, y);
        if (matchValue_1 == null) {
            return empty();
        }
        else {
            return singleton([k, [activePatternResult[1], value(matchValue_1)]]);
        }
    }, x)), {
        Compare: compare,
    });
}

/**
 * Splits a Map with tuple pair values to two separate Maps.
 */
export function unzip(source) {
    return [mapValues((tuple) => tuple[0], source), mapValues((tuple_1) => tuple_1[1], source)];
}

/**
 * Returns the union of two maps, using the combiner function for duplicate keys.
 */
export function unionWith(combiner, source1, source2) {
    return fold((m, k, v$0027) => {
        let matchValue;
        return add(k, (matchValue = tryFind(k, m), (matchValue == null) ? v$0027 : combiner(value(matchValue), v$0027)), m);
    }, source1, source2);
}

/**
 * Returns the union of two maps, preferring values from the first in case of duplicate keys.
 */
export function union(source, altSource) {
    return unionWith((x, _arg) => x, source, altSource);
}

/**
 * Returns the intersection of two maps, using the combiner function for duplicate keys.
 */
export function intersectWith(combiner, source1, source2) {
    const keysSetOf = (arg_1) => ofSeq_1(map_2((tuple) => tuple[0], toList(arg_1)), {
        Compare: compare,
    });
    const keyIntersection = intersect_1(keysSetOf(source1), keysSetOf(source2));
    return ofList(toList_1(delay(() => collect((key) => singleton([key, combiner(find(key, source1), find(key, source2))]), keyIntersection))), {
        Compare: compare,
    });
}

/**
 * Returns the intersection of two maps, preferring values from the first in case of duplicate keys.
 */
export function intersect(source1, source2) {
    return intersectWith((a, _arg) => a, source1, source2);
}

/**
 * Same as chooseValues but with access to the key.
 */
export function choosei(f, x) {
    return ofSeq(delay(() => collect((matchValue) => {
        const activePatternResult = matchValue;
        const k = activePatternResult[0];
        const matchValue_1 = f(k, activePatternResult[1]);
        if (matchValue_1 == null) {
            return empty();
        }
        else {
            return singleton([k, value(matchValue_1)]);
        }
    }, x)), {
        Compare: compare,
    });
}

