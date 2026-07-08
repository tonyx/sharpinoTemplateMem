import { uncurry2, compare, toIterator, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { count, tryFindKey, findKey, tryFind, containsKey, map as map_1, forAll, exists, iterate, fold, foldBack, pick, tryPick, find, isEmpty as isEmpty_1, toArray, toSeq, toList, ofList, ofSeq, FSharpMap__TryGetValue, FSharpMap__TryFind, FSharpMap__ContainsKey, FSharpMap__get_Item, ofArray, add, FSharpMap__get_Count } from "../../fable-library.4.1.4/Map.js";
import { map as map_2, reduceBack, reduce, tail as tail_1, toList as toList_1, head } from "../../fable-library.4.1.4/Seq.js";
import { Record } from "../../fable-library.4.1.4/Types.js";
import { record_type, class_type } from "../../fable-library.4.1.4/Reflection.js";
import { tail, head as head_1, isEmpty, ofArray as ofArray_1, singleton } from "../../fable-library.4.1.4/List.js";
import { NonEmptyList_ofList } from "./NonEmptyList.fs.js";
import { NonEmptySeq_unsafeOfSeq } from "./NonEmptySeq.fs.js";
import { value as value_1 } from "../../fable-library.4.1.4/Option.js";

export class NonEmptyMap$2 extends Record {
    constructor(Value) {
        super();
        this.Value = Value;
    }
    "System.Collections.IEnumerable.GetEnumerator"() {
        const x = this;
        return getEnumerator(x.Value);
    }
    GetEnumerator() {
        const x = this;
        return getEnumerator(x.Value);
    }
    [Symbol.iterator]() {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.Generic.IReadOnlyCollection`1.get_Count"() {
        const x = this;
        return FSharpMap__get_Count(x.Value) | 0;
    }
    get First() {
        const x = this;
        return head(x.Value);
    }
    "System.Collections.Generic.IReadOnlyDictionary`2.get_Item2B595"(key) {
        const x = this;
        return NonEmptyMap$2__get_Item_2B595(x, key);
    }
    "System.Collections.Generic.IReadOnlyDictionary`2.get_Keys"() {
        const x = this;
        return x.Value.keys();
    }
    "System.Collections.Generic.IReadOnlyDictionary`2.TryGetValue6DC89625"(key, value) {
        const x = this;
        return NonEmptyMap$2__TryGetValue_6DC89625(x, key, value);
    }
    "System.Collections.Generic.IReadOnlyDictionary`2.get_Values"() {
        const x = this;
        return x.Value.values();
    }
    "System.Collections.Generic.IReadOnlyDictionary`2.ContainsKey2B595"(key) {
        const x = this;
        return NonEmptyMap$2__ContainsKey_2B595(x, key);
    }
}

export function NonEmptyMap$2_$reflection(gen0, gen1) {
    return record_type("FSharpPlus.Data.NonEmptyMap`2", [gen0, gen1], NonEmptyMap$2, () => [["Value", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [gen0, gen1])]]);
}

export function NonEmptyMap$2_Create_Z593388B5(_arg, ...rest) {
    return new NonEmptyMap$2(add(_arg[0], _arg[1], ofArray(rest, {
        Compare: compare,
    })));
}

export function NonEmptyMap$2__Add_5BDDA1(x, key, value) {
    return new NonEmptyMap$2(add(key, value, x.Value));
}

export function NonEmptyMap$2__get_Item_2B595(x, key) {
    return FSharpMap__get_Item(x.Value, key);
}

export function NonEmptyMap$2__ContainsKey_2B595(x, key) {
    return FSharpMap__ContainsKey(x.Value, key);
}

export function NonEmptyMap$2__TryFind_2B595(x, key) {
    return FSharpMap__TryFind(x.Value, key);
}

export function NonEmptyMap$2__TryGetValue_6DC89625(x, key, value) {
    return FSharpMap__TryGetValue(x.Value, key, value);
}

/**
 * Builds a non empty map.
 */
export function NonEmptyMap_create(k, v, rest) {
    return new NonEmptyMap$2(add(k, v, ofSeq(rest, {
        Compare: compare,
    })));
}

/**
 * Builds a non empty map with a single element.
 */
export function NonEmptyMap_singleton(key, value) {
    return new NonEmptyMap$2(ofList(singleton([key, value]), {
        Compare: compare,
    }));
}

/**
 * Returns a new map with the binding added to the given map.
 * If a binding with the given key already exists in the input map, the existing binding is replaced by the new binding in the result map.
 */
export function NonEmptyMap_add(key, value, table) {
    return new NonEmptyMap$2(add(key, value, table.Value));
}

/**
 * Builds a list from the given non empty map.
 */
export function NonEmptyMap_toList(_arg) {
    return toList(_arg.Value);
}

/**
 * Builds a non-empty list from the given non empty map.
 */
export function NonEmptyMap_toNonEmptyList(_arg) {
    return NonEmptyList_ofList(toList(_arg.Value));
}

/**
 * Builds a sequence from the given non empty map.
 */
export function NonEmptyMap_toSeq(_arg) {
    return toSeq(_arg.Value);
}

/**
 * Builds a non-empty sequence from the given non empty map.
 */
export function NonEmptyMap_toNonEmptySeq(_arg) {
    return NonEmptySeq_unsafeOfSeq(toSeq(_arg.Value));
}

/**
 * Builds an array from the given non empty map.
 */
export function NonEmptyMap_toArray(_arg) {
    return toArray(_arg.Value);
}

/**
 * Builds a map from the given non empty map.
 */
export function NonEmptyMap_toMap(_arg) {
    return _arg.Value;
}

/**
 * Builds a non empty map from the given array.
 */
export function NonEmptyMap_ofArray(array) {
    const matchValue = ofArray_1(array);
    if (!isEmpty(matchValue)) {
        const x = head_1(matchValue);
        return NonEmptyMap_create(x[0], x[1], tail(matchValue));
    }
    else {
        throw new Error("The input array was empty.\\nParameter name: array");
    }
}

/**
 * Builds a non empty map from the given list.
 */
export function NonEmptyMap_ofList(list) {
    if (!isEmpty(list)) {
        const x = head_1(list);
        return NonEmptyMap_create(x[0], x[1], tail(list));
    }
    else {
        throw new Error("The input list was empty.\\nParameter name: list");
    }
}

/**
 * Builds a non empty map from the given non-empty list.
 */
export function NonEmptyMap_ofNonEmptyList(list) {
    const tupledArg = list.Head;
    return NonEmptyMap_create(tupledArg[0], tupledArg[1], list.Tail);
}

/**
 * Builds a non empty map from the given sequence.
 */
export function NonEmptyMap_ofSeq(seq) {
    const matchValue = toList_1(seq);
    if (!isEmpty(matchValue)) {
        const x = head_1(matchValue);
        return NonEmptyMap_create(x[0], x[1], tail(matchValue));
    }
    else {
        throw new Error("The input sequence was empty.\\nParameter name: seq");
    }
}

/**
 * Builds a non empty map from the given non-empty sequence.
 */
export function NonEmptyMap_ofNonEmptySeq(source) {
    const tupledArg = source.First;
    return NonEmptyMap_create(tupledArg[0], tupledArg[1], tail_1(source));
}

/**
 * Builds a non empty map from the given map.
 */
export function NonEmptyMap_ofMap(map) {
    if (isEmpty_1(map)) {
        throw new Error("The input sequence was empty.\\nParameter name: seq");
    }
    else {
        return new NonEmptyMap$2(map);
    }
}

/**
 * Transforms a map to a NonEmptyMap, returning an option to signal when the original map was empty.
 */
export function NonEmptyMap_tryOfMap(map) {
    if (isEmpty_1(map)) {
        return void 0;
    }
    else {
        return new NonEmptyMap$2(map);
    }
}

/**
 * Lookup an element in the map, raising <c>KeyNotFoundException</c> if no binding
 * exists in the map.
 */
export function NonEmptyMap_find(key, table) {
    return find(key, table.Value);
}

/**
 * Searches the map looking for the first element where the given function returns a <c>Some</c> value.
 */
export function NonEmptyMap_tryPick(chooser, table) {
    return tryPick(chooser, table.Value);
}

/**
 * Searches the map looking for the first element where the given function returns a <c>Some</c> value
 */
export function NonEmptyMap_pick(chooser, table) {
    return pick(chooser, table.Value);
}

/**
 * Folds over the bindings in the map.
 */
export function NonEmptyMap_foldBack(folder, table, state) {
    return foldBack(folder, table.Value, state);
}

/**
 * Folds over the bindings in the map
 */
export function NonEmptyMap_fold(folder, state, table) {
    return fold(folder, state, table.Value);
}

/**
 * Applies the given function to each binding in the dictionary
 */
export function NonEmptyMap_iter(action, table) {
    iterate(action, table.Value);
}

/**
 * Returns true if the given predicate returns true for one of the
 * bindings in the map.
 */
export function NonEmptyMap_exists(predicate, table) {
    return exists(predicate, table.Value);
}

/**
 * Returns true if the given predicate returns true for all of the
 * bindings in the map.
 */
export function NonEmptyMap_forall(predicate, table) {
    return forAll(predicate, table.Value);
}

/**
 * Builds a new collection whose elements are the results of applying the given function
 * to each of the elements of the collection. The key passed to the
 * function indicates the key of element being transformed.
 */
export function NonEmptyMap_map(mapping, table) {
    return new NonEmptyMap$2(map_1(mapping, table.Value));
}

/**
 * Tests if an element is in the domain of the map.
 */
export function NonEmptyMap_containsKey(key, table) {
    return containsKey(key, table.Value);
}

/**
 * Lookup an element in the map, returning a <c>Some</c> value if the element is in the domain
 * of the map and <c>None</c> if not.
 */
export function NonEmptyMap_tryFind(key, table) {
    return tryFind(key, table.Value);
}

/**
 * Evaluates the function on each mapping in the collection. Returns the key for the first mapping
 * where the function returns 'true'. Raise <c>KeyNotFoundException</c> if no such element exists.
 */
export function NonEmptyMap_findKey(predicate, table) {
    return findKey(predicate, table.Value);
}

/**
 * Returns the key of the first mapping in the collection that satisfies the given predicate.
 * Returns 'None' if no such element exists.
 */
export function NonEmptyMap_tryFindKey(predicate, table) {
    return tryFindKey(predicate, table.Value);
}

/**
 * The number of bindings in the map.
 */
export function NonEmptyMap_count(table) {
    return count(table.Value);
}

export function NonEmptyMap_reduce(reduction, map) {
    return reduce(reduction, NonEmptyMap_toSeq(map));
}

export function NonEmptyMap_reduceBack(reduction, map) {
    return reduceBack(reduction, NonEmptyMap_toSeq(map));
}

export function NonEmptyMap_keys(source) {
    return map_2((_arg) => _arg[0], source);
}

export function NonEmptyMap_values(source) {
    return map_2((_arg) => _arg[1], source);
}

/**
 * Map values of the original Map.
 */
export function NonEmptyMap_mapValues(f, x) {
    return NonEmptyMap_map(uncurry2((_arg) => f), x);
}

export function NonEmptyMap_iterValues(f, x) {
    NonEmptyMap_iter(uncurry2((_arg) => f), x);
}

export function NonEmptyMap_unzip(source) {
    return [NonEmptyMap_mapValues((tuple) => tuple[0], source), NonEmptyMap_mapValues((tuple_1) => tuple_1[1], source)];
}

/**
 * Returns the union of two maps, using the combiner function for duplicate keys.
 */
export function NonEmptyMap_unionWith(combiner, source1, source2) {
    return NonEmptyMap_fold((m, k, v$0027) => {
        let matchValue;
        return NonEmptyMap_add(k, (matchValue = NonEmptyMap_tryFind(k, m), (matchValue == null) ? v$0027 : combiner(value_1(matchValue), v$0027)), m);
    }, source1, source2);
}

/**
 * Returns the union of two maps, preferring values from the first in case of duplicate keys.
 */
export function NonEmptyMap_union(source, altSource) {
    return NonEmptyMap_unionWith((x, _arg) => x, source, altSource);
}

export function NonEmptyMap$2_Iterate_6525A9D9(x, action) {
    NonEmptyMap_iterValues(action, x);
}

export function NonEmptyMap$2_Map_Z6433CB60(x, mapping) {
    return NonEmptyMap_mapValues(mapping, x);
}

export function NonEmptyMap$2_Unzip_Z19B9C384(x) {
    return NonEmptyMap_unzip(x);
}

