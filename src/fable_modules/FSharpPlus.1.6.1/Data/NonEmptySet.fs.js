import { compare, toIterator, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { foldBack, fold, maxElement, minElement, iterate, unionMany, union, forAll, map, exists, isProperSuperset, isSuperset, isProperSubset, isSubset, contains, count, isEmpty as isEmpty_1, toArray, toSeq, toList, singleton, ofSeq, FSharpSet__get_MaximumElement, FSharpSet__get_MinimumElement, FSharpSet__IsProperSupersetOf, FSharpSet__IsSupersetOf, FSharpSet__IsProperSubsetOf, FSharpSet__IsSubsetOf, FSharpSet__Contains, ofArray, add, FSharpSet__get_Count } from "../../fable-library.4.1.4/Set.js";
import { reduce, map as map_1, tail as tail_1, toList as toList_1, head } from "../../fable-library.4.1.4/Seq.js";
import { Record } from "../../fable-library.4.1.4/Types.js";
import { record_type, class_type } from "../../fable-library.4.1.4/Reflection.js";
import { NonEmptyList_toSeq, NonEmptyList_ofSeq } from "./NonEmptyList.fs.js";
import { tail, head as head_1, isEmpty, ofArray as ofArray_1 } from "../../fable-library.4.1.4/List.js";

export class NonEmptySet$1 extends Record {
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
        return FSharpSet__get_Count(x.Value) | 0;
    }
    get First() {
        const x = this;
        return head(x.Value);
    }
}

export function NonEmptySet$1_$reflection(gen0) {
    return record_type("FSharpPlus.Data.NonEmptySet`1", [gen0], NonEmptySet$1, () => [["Value", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [gen0])]]);
}

export function NonEmptySet$1_Create_377932B(first, ...rest) {
    return new NonEmptySet$1(add(first, ofArray(rest, {
        Compare: compare,
    })));
}

export function NonEmptySet$1__Add_2B595(x, value) {
    return new NonEmptySet$1(add(value, x.Value));
}

export function NonEmptySet$1__get_Count(x) {
    return FSharpSet__get_Count(x.Value);
}

export function NonEmptySet$1__Contains_2B595(x, value) {
    return FSharpSet__Contains(x.Value, value);
}

export function NonEmptySet$1__IsSubsetOf_Z7F096892(x, other) {
    return FSharpSet__IsSubsetOf(x.Value, other.Value);
}

export function NonEmptySet$1__IsProperSubsetOf_Z7F096892(x, other) {
    return FSharpSet__IsProperSubsetOf(x.Value, other.Value);
}

export function NonEmptySet$1__IsSupersetOf_Z7F096892(x, other) {
    return FSharpSet__IsSupersetOf(x.Value, other.Value);
}

export function NonEmptySet$1__IsProperSupersetOf_Z7F096892(x, other) {
    return FSharpSet__IsProperSupersetOf(x.Value, other.Value);
}

export function NonEmptySet$1__get_MinimumElement(x) {
    return FSharpSet__get_MinimumElement(x.Value);
}

export function NonEmptySet$1__get_MaximumElement(x) {
    return FSharpSet__get_MaximumElement(x.Value);
}

/**
 * Builds a non empty set.
 */
export function NonEmptySet_create(x, xs) {
    return new NonEmptySet$1(add(x, ofSeq(xs, {
        Compare: compare,
    })));
}

/**
 * Builds a non empty set with a single element.
 */
export function NonEmptySet_singleton(x) {
    return new NonEmptySet$1(singleton(x, {
        Compare: compare,
    }));
}

/**
 * Builds a list from the given non empty set.
 */
export function NonEmptySet_toList(_arg) {
    return toList(_arg.Value);
}

/**
 * Builds a sequence from the given non empty set.
 */
export function NonEmptySet_toSeq(_arg) {
    return toSeq(_arg.Value);
}

/**
 * Builds an array from the given non empty set.
 */
export function NonEmptySet_toArray(_arg) {
    return toArray(_arg.Value);
}

/**
 * Builds a set from the given non empty set.
 */
export function NonEmptySet_toSet(_arg) {
    return _arg.Value;
}

/**
 * Builds a non-empty list from the given non empty set.
 */
export function NonEmptySet_toNonEmptyList(_arg) {
    return NonEmptyList_ofSeq(_arg.Value);
}

/**
 * Builds a non-empty sequence from the given non empty set.
 */
export function NonEmptySet_toNonEmptySeq(set$) {
    return set$;
}

/**
 * Builds a non empty set from the given array.
 */
export function NonEmptySet_ofArray(array) {
    const matchValue = ofArray_1(array);
    if (!isEmpty(matchValue)) {
        return NonEmptySet_create(head_1(matchValue), tail(matchValue));
    }
    else {
        throw new Error("The input array was empty.\\nParameter name: array");
    }
}

/**
 * Builds a non empty set from the given list.
 */
export function NonEmptySet_ofList(list) {
    if (!isEmpty(list)) {
        return NonEmptySet_create(head_1(list), tail(list));
    }
    else {
        throw new Error("The input list was empty.\\nParameter name: list");
    }
}

/**
 * Builds a non empty set from the given non-empty list.
 */
export function NonEmptySet_ofNonEmptyList(list) {
    return NonEmptySet_create(list.Head, list.Tail);
}

/**
 * Builds a non empty set from the given sequence.
 */
export function NonEmptySet_ofSeq(seq) {
    const matchValue = toList_1(seq);
    if (!isEmpty(matchValue)) {
        return NonEmptySet_create(head_1(matchValue), tail(matchValue));
    }
    else {
        throw new Error("The input sequence was empty.\\nParameter name: seq");
    }
}

/**
 * Builds a non empty set from the given non-empty sequence.
 */
export function NonEmptySet_ofNonEmptySeq(source) {
    return NonEmptySet_create(source.First, tail_1(source));
}

/**
 * Builds a non empty set from the given set.
 */
export function NonEmptySet_ofSet(set$) {
    if (isEmpty_1(set$)) {
        throw new Error("The input sequence was empty.\\nParameter name: seq");
    }
    else {
        return new NonEmptySet$1(set$);
    }
}

/**
 * Transforms a set to a NonEmptySet, returning an option to signal when the original set was empty.
 */
export function NonEmptySet_tryOfSet(set$) {
    if (isEmpty_1(set$)) {
        return void 0;
    }
    else {
        return new NonEmptySet$1(set$);
    }
}

/**
 * Returns the count of a non empty set. You can also use property nes.Count
 */
export function NonEmptySet_count(nes) {
    return count(nes.Value);
}

/**
 * Returns a new set with an element added to the set. No exception is raised if
 * the set already contains the given element.
 */
export function NonEmptySet_add(value, source) {
    return new NonEmptySet$1(add(value, source.Value));
}

/**
 * Evaluates to "true" if the given element is in the given set.
 */
export function NonEmptySet_contains(element, source) {
    return contains(element, source.Value);
}

/**
 * Evaluates to "true" if all elements of the first set are in the second
 */
export function NonEmptySet_isSubset(set1, set2) {
    return isSubset(set1.Value, set2.Value);
}

/**
 * Evaluates to "true" if all elements of the first set are in the second, and at least
 * one element of the second is not in the first.
 */
export function NonEmptySet_isProperSubset(set1, set2) {
    return isProperSubset(set1.Value, set2.Value);
}

/**
 * Evaluates to "true" if all elements of the second set are in the first.
 */
export function NonEmptySet_isSuperset(set1, set2) {
    return isSuperset(set1.Value, set2.Value);
}

/**
 * Evaluates to "true" if all elements of the second set are in the first, and at least
 * one element of the first is not in the second.
 */
export function NonEmptySet_isProperSuperset(set1, set2) {
    return isProperSuperset(set1.Value, set2.Value);
}

/**
 * Tests if any element of the collection satisfies the given predicate.
 * If the input function is <c>predicate</c> and the elements are <c>i0...iN</c>
 * then computes <c>p i0 or ... or p iN</c>.
 */
export function NonEmptySet_exists(predicate, set$) {
    return exists(predicate, set$.Value);
}

/**
 * Returns a new collection containing the results of applying the
 * given function to each element of the input set.
 */
export function NonEmptySet_map(mapping, set$) {
    return new NonEmptySet$1(map(mapping, set$.Value, {
        Compare: compare,
    }));
}

/**
 * Tests if all elements of the collection satisfy the given predicate.
 * If the input function is <c>f</c> and the elements are <c>i0...iN</c> and "j0...jN"
 * then computes <c>p i0 && ... && p iN</c>.
 */
export function NonEmptySet_forall(predicate, set$) {
    return forAll(predicate, set$.Value);
}

/**
 * Computes the union of the two sets.
 */
export function NonEmptySet_union(set1, set2) {
    return new NonEmptySet$1(union(set1.Value, set2.Value));
}

/**
 * Computes the union of a non empty list of sets.
 */
export function NonEmptySet_unionMany(sets) {
    return new NonEmptySet$1(unionMany(map_1(NonEmptySet_toSet, NonEmptyList_toSeq(sets)), {
        Compare: compare,
    }));
}

/**
 * Applies the given function to each element of the set, in order according
 * to the comparison function.
 */
export function NonEmptySet_iter(action, set$) {
    iterate(action, set$.Value);
}

/**
 * Returns the lowest element in the set according to the ordering being used for the set.
 */
export function NonEmptySet_minElement(set$) {
    return minElement(set$.Value);
}

/**
 * Returns the highest element in the set according to the ordering being used for the set.
 */
export function NonEmptySet_maxElement(set$) {
    return maxElement(set$.Value);
}

/**
 * Applies the given accumulating function to all the elements of the set
 */
export function NonEmptySet_fold(folder, state, set$) {
    return fold(folder, state, set$.Value);
}

/**
 * Applies the given accumulating function to all the elements of the set.
 */
export function NonEmptySet_foldBack(folder, set$, state) {
    return foldBack(folder, set$.Value, state);
}

export function NonEmptySet_reduce(reduction, set$) {
    return reduce(reduction, NonEmptySet_toSeq(set$));
}

export function NonEmptySet$1_Map_6A6D7851(x, f) {
    return NonEmptySet_map(f, x);
}

export function NonEmptySet$1_Return_2B595(x) {
    return NonEmptySet_singleton(x);
}

export function NonEmptySet$1_op_Addition_1F3F1240(set1, set2) {
    return NonEmptySet_union(set1, set2);
}

export function NonEmptySet$1_FoldBack_1629831E(set$, f, z) {
    return foldBack(f, set$.Value, z);
}

