import { structuralHash, equals, compare, toIterator, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { toArray, toList, map as map_1, collect } from "../../fable-library.4.1.4/Seq.js";
import { cons, singleton, append, empty, map } from "../../fable-library.4.1.4/List.js";
import { add, ofSeq, ofList, tryFind, toSeq } from "../../fable-library.4.1.4/Map.js";
import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type, class_type, list_type } from "../../fable-library.4.1.4/Reflection.js";
import { mapValues, unionWith } from "../Extensions/Map.fs.js";
import { groupBy } from "../../fable-library.4.1.4/Seq2.js";

export class MultiMap$2 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["MMap"];
    }
    GetEnumerator() {
        const x = this;
        return getEnumerator(collect((tupledArg) => map((v_1) => [tupledArg[0], v_1], tupledArg[1]), toSeq(x.fields[0])));
    }
    [Symbol.iterator]() {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"() {
        const x = this;
        return getEnumerator(collect((tupledArg) => map((v_1) => [tupledArg[0], v_1], tupledArg[1]), toSeq(x.fields[0])));
    }
}

export function MultiMap$2_$reflection(gen0, gen1) {
    return union_type("FSharpPlus.Data.MultiMap`2", [gen0, gen1], MultiMap$2, () => [[["Item", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [gen0, list_type(gen1)])]]]);
}

export function MultiMap$2__get_Item_2B595(x, key) {
    const matchValue = tryFind(key, x.fields[0]);
    if (matchValue == null) {
        return empty();
    }
    else {
        return matchValue;
    }
}

export function MultiMap$2_get_Zero() {
    return new MultiMap$2(ofList(empty(), {
        Compare: compare,
    }));
}

export function MultiMap$2_op_Addition_Z75951F60(_arg, _arg_1) {
    return new MultiMap$2(unionWith(append, _arg.fields[0], _arg_1.fields[0]));
}

/**
 * Converts a seq of tuples to a multiMap.
 */
export function MultiMap_ofSeq(source) {
    return new MultiMap$2(ofSeq(map_1((tupledArg) => [tupledArg[0], toList(map_1((tuple_1) => tuple_1[1], tupledArg[1]))], groupBy((tuple) => tuple[0], source, {
        Equals: equals,
        GetHashCode: structuralHash,
    })), {
        Compare: compare,
    }));
}

/**
 * Converts a list of tuples to a multiMap.
 */
export function MultiMap_ofList(source) {
    return MultiMap_ofSeq(source);
}

/**
 * Converts an array of tuples to a multiMap.
 */
export function MultiMap_ofArray(source) {
    return MultiMap_ofSeq(source);
}

/**
 * Converts a multiMap to a seq of tuples.
 */
export function MultiMap_toSeq(_arg) {
    return collect((x_1) => map((v) => [x_1[0], v], x_1[1]), _arg.fields[0]);
}

/**
 * Converts a multiMap to a list of tuples.
 */
export function MultiMap_toList(source) {
    return toList(MultiMap_toSeq(source));
}

/**
 * Converts a multiMap to an array of tuples.
 */
export function MultiMap_toArray(source) {
    return toArray(MultiMap_toSeq(source));
}

/**
 * Returns a new multiMap with the new binding added to the given multiMap.
 */
export function MultiMap_add(key, value, source) {
    let matchValue;
    const x = source.fields[0];
    return new MultiMap$2(add(key, (matchValue = tryFind(key, x), (matchValue == null) ? singleton(value) : cons(value, matchValue)), x));
}

/**
 * Maps values of the original multiMap.
 */
export function MultiMap_mapValues(mapping, source) {
    return new MultiMap$2(mapValues((list) => map(mapping, list), source.fields[0]));
}

export function MultiMap$2_ToSeq_44EAD05(x) {
    return MultiMap_toSeq(x);
}

export function MultiMap$2_ToList_44EAD05(x) {
    return MultiMap_toList(x);
}

export function MultiMap$2_ToArray_44EAD05(x) {
    return MultiMap_toArray(x);
}

export function MultiMap$2_OfSeq_1CC02259(x) {
    return MultiMap_ofSeq(x);
}

export function MultiMap$2_OfList_Z5EB4DBAC(x) {
    return MultiMap_ofList(x);
}

export function MultiMap$2_OfArray_ZAB3C6E3(x) {
    return MultiMap_ofArray(x);
}

export function MultiMap$2_Map_ZD90BF8D(x, f) {
    return MultiMap_mapValues(f, x);
}

