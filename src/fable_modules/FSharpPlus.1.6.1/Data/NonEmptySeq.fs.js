import { reduce, zip3, zip, empty, tail, sortByDescending, sortDescending, sortBy, sortWith, sort, scanBack, scan, reverse, readOnly, permute, pairwise, isEmpty, mapIndexed2, mapIndexed, map3, mapFoldBack, mapFold, map2, map, initializeInfinite, indexed, concat, collect, cache, allPairs, singleton, append, delay, head as head_1 } from "../../fable-library.4.1.4/Seq.js";
import { structuralHash, equals, compare, toIterator, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { rangeDouble } from "../../fable-library.4.1.4/Range.js";
import { isEmpty as isEmpty_1 } from "../../fable-library.4.1.4/List.js";
import { replace } from "../Extensions/Seq.fs.js";
import { distinct } from "../../fable-library.4.1.4/Seq2.js";
import { class_type } from "../../fable-library.4.1.4/Reflection.js";
import { Errors_exnUnreachable } from "../Internals.fs.js";

/**
 * Builds a non empty sequence from the given sequence.
 */
export function NonEmptySeq_unsafeOfSeq(seq) {
    return new (class {
        get First() {
            return head_1(seq);
        }
        GetEnumerator() {
            return getEnumerator(seq);
        }
        [Symbol.iterator]() {
            return toIterator(getEnumerator(this));
        }
        "System.Collections.IEnumerable.GetEnumerator"() {
            return getEnumerator(seq);
        }
    }
    )();
}

export function NonEmptySeq_unsafeOfArray(x) {
    return new (class {
        get First() {
            return x[0];
        }
        GetEnumerator() {
            return getEnumerator(x);
        }
        [Symbol.iterator]() {
            return toIterator(getEnumerator(this));
        }
        "System.Collections.IEnumerable.GetEnumerator"() {
            return getEnumerator(x);
        }
    }
    )();
}

/**
 * Builds a non empty sequence.
 */
export function NonEmptySeq_create(x, xs) {
    return NonEmptySeq_unsafeOfSeq(delay(() => append(singleton(x), delay(() => xs))));
}

/**
 * Creates a NonEmptySeq range, containing at least the first element of the range
 */
export function NonEmptySeq_op_BarDotDot(starting, ending) {
    return NonEmptySeq_unsafeOfSeq((starting < ending) ? rangeDouble(starting, 1, ending) : singleton(starting));
}

/**
 * Creates a NonEmptySeq range, containing at least the last element of the range
 */
export function NonEmptySeq_op_DotDotBar(starting, ending) {
    return NonEmptySeq_unsafeOfSeq((starting < ending) ? rangeDouble(starting, 1, ending) : singleton(ending));
}

/**
 * Returns a new sequence that contains all pairings of elements from the first and second sequences.
 */
export function NonEmptySeq_allPairs(source1, source2) {
    return NonEmptySeq_unsafeOfSeq(allPairs(source1, source2));
}

/**
 * Wraps the two given enumerations as a single concatenated
 * enumeration.
 */
export function NonEmptySeq_append(source1, source2) {
    return NonEmptySeq_unsafeOfSeq(append(source1, source2));
}

export function NonEmptySeq_appendSeq(source, seq) {
    return NonEmptySeq_unsafeOfSeq(append(source, seq));
}

export function NonEmptySeq_appendSeqBack(seq, source) {
    return NonEmptySeq_unsafeOfSeq(append(seq, source));
}

/**
 * Returns a sequence that corresponds to a cached version of the input sequence.
 * This result sequence will have the same elements as the input sequence. The result
 * can be enumerated multiple times. The input sequence will be enumerated at most
 * once and only as far as is necessary.    Caching a sequence is typically useful when repeatedly
 * evaluating items in the original sequence is computationally expensive or if
 * iterating the sequence causes side-effects that the user does not want to be
 * repeated multiple times.
 * 
 * Enumeration of the result sequence is thread safe in the sense that multiple independent IEnumerator
 * values may be used simultaneously from different threads (accesses to
 * the internal lookaside table are thread safe). Each individual IEnumerator
 * is not typically thread safe and should not be accessed concurrently.
 */
export function NonEmptySeq_cache(source) {
    return NonEmptySeq_unsafeOfSeq(cache(source));
}

/**
 * Applies the given function to each element of the sequence and concatenates all the
 * results.
 */
export function NonEmptySeq_collect(mapping, source) {
    return NonEmptySeq_unsafeOfSeq(collect(mapping, source));
}

/**
 * Combines the given enumeration-of-enumerations as a single concatenated
 * enumeration.
 */
export function NonEmptySeq_concat(sources) {
    return NonEmptySeq_unsafeOfSeq(concat(sources));
}

/**
 * Returns a sequence that is built from the given delayed specification of a
 * sequence.
 */
export function NonEmptySeq_delay(generator) {
    return NonEmptySeq_unsafeOfSeq(delay(generator));
}

/**
 * Returns the first element of the sequence.
 */
export function NonEmptySeq_head(source) {
    return source.First;
}

/**
 * Builds a new collection whose elements are the corresponding elements of the input collection
 * paired with the integer index (from 0) of each element.
 */
export function NonEmptySeq_indexed(source) {
    return NonEmptySeq_unsafeOfSeq(indexed(source));
}

/**
 * Generates a new sequence which, when iterated, will return successive
 * elements by calling the given function.    The results of calling the function
 * will not be saved, that is the function will be reapplied as necessary to
 * regenerate the elements.    The function is passed the index of the item being
 * generated.
 */
export function NonEmptySeq_initInfinite(initializer) {
    return NonEmptySeq_unsafeOfSeq(initializeInfinite(initializer));
}

/**
 * Builds a new collection whose elements are the results of applying the given function
 * to each of the elements of the collection.    The given function will be applied
 * as elements are demanded using the <c>MoveNext</c> method on enumerators retrieved from the
 * object.
 */
export function NonEmptySeq_map(mapping, source) {
    return NonEmptySeq_unsafeOfSeq(map(mapping, source));
}

/**
 * Builds a new collection whose elements are the results of applying the given function
 * to the corresponding pairs of elements from the two sequences. If one input sequence is shorter than
 * the other then the remaining elements of the longer sequence are ignored.
 */
export function NonEmptySeq_map2(mapping, source1, source2) {
    return NonEmptySeq_unsafeOfSeq(map2(mapping, source1, source2));
}

/**
 * Combines map and fold. Builds a new collection whose elements are the results of applying the given function
 * to each of the elements of the collection. The function is also used to accumulate a final value.
 */
export function NonEmptySeq_mapFold(mapping, state, source) {
    const patternInput = mapFold(mapping, state, source);
    return [NonEmptySeq_unsafeOfSeq(patternInput[0]), patternInput[1]];
}

/**
 * Combines map and foldBack. Builds a new collection whose elements are the results of applying the given function
 * to each of the elements of the collection. The function is also used to accumulate a final value.
 */
export function NonEmptySeq_mapFoldBack(mapping, source, state) {
    const patternInput = mapFoldBack(mapping, source, state);
    return [NonEmptySeq_unsafeOfSeq(patternInput[0]), patternInput[1]];
}

/**
 * Builds a new collection whose elements are the results of applying the given function
 * to the corresponding triples of elements from the three sequences. If one input sequence if shorter than
 * the others then the remaining elements of the longer sequences are ignored.
 */
export function NonEmptySeq_map3(mapping, source1, source2, source3) {
    return NonEmptySeq_unsafeOfSeq(map3(mapping, source1, source2, source3));
}

/**
 * Builds a new collection whose elements are the results of applying the given function
 * to each of the elements of the collection. The integer index passed to the
 * function indicates the index (from 0) of element being transformed.
 */
export function NonEmptySeq_mapi(mapping, source) {
    return NonEmptySeq_unsafeOfSeq(mapIndexed(mapping, source));
}

/**
 * Builds a new collection whose elements are the results of applying the given function
 * to the corresponding pairs of elements from the two sequences. If one input sequence is shorter than
 * the other then the remaining elements of the longer sequence are ignored. The integer index passed to the
 * function indicates the index (from 0) of element being transformed.
 */
export function NonEmptySeq_mapi2(mapping, source1, source2) {
    return NonEmptySeq_unsafeOfSeq(mapIndexed2(mapping, source1, source2));
}

/**
 * Builds a non empty sequence from the given sequence.
 */
export function NonEmptySeq_ofSeq(seq) {
    if ((seq == null) ? true : isEmpty(seq)) {
        throw new Error("The input sequence was empty.\\nParameter name: seq");
    }
    else {
        return NonEmptySeq_unsafeOfSeq(seq);
    }
}

/**
 * Transforms a sequence to a NonEmptySeq, returning an option to signal when the original sequence was empty.
 */
export function NonEmptySeq_tryOfSeq(seq) {
    if ((seq == null) ? true : isEmpty(seq)) {
        return void 0;
    }
    else {
        return NonEmptySeq_unsafeOfSeq(seq);
    }
}

/**
 * Builds a non empty sequence from the given array.
 */
export function NonEmptySeq_ofArray(array) {
    if ((array == null) ? true : (array.length === 0)) {
        throw new Error("The input array was empty.\\nParameter name: array");
    }
    else {
        return NonEmptySeq_unsafeOfArray(array);
    }
}

/**
 * Transforms a array to a NonEmptySeq, returning an option to signal when the original array was empty.
 */
export function NonEmptySeq_tryOfArray(array) {
    if ((array == null) ? true : (array.length === 0)) {
        return void 0;
    }
    else {
        return NonEmptySeq_unsafeOfArray(array);
    }
}

/**
 * Builds a non empty sequence from the given list.
 */
export function NonEmptySeq_ofList(list) {
    if (isEmpty_1(list)) {
        throw new Error("The input list was empty.\\nParameter name: list");
    }
    else {
        return NonEmptySeq_unsafeOfSeq(list);
    }
}

/**
 * Transforms a list to a NonEmptySeq, returning an option to signal when the original list was empty.
 */
export function NonEmptySeq_tryOfList(list) {
    if (isEmpty_1(list)) {
        return void 0;
    }
    else {
        return NonEmptySeq_unsafeOfSeq(list);
    }
}

/**
 * Returns a sequence of each element in the input sequence and its predecessor, with the
 * exception of the first element which is only returned as the predecessor of the second element.
 */
export function NonEmptySeq_pairwise(source) {
    return NonEmptySeq_unsafeOfSeq(pairwise(source));
}

/**
 * Returns a sequence with all elements permuted according to the
 * specified permutation.
 */
export function NonEmptySeq_permute(indexMap, source) {
    return NonEmptySeq_unsafeOfSeq(permute(indexMap, source));
}

/**
 * Builds a new sequence object that delegates to the given sequence object. This ensures
 * the original sequence cannot be rediscovered and mutated by a type cast. For example,
 * if given an array the returned sequence will return the elements of the array, but
 * you cannot cast the returned sequence object to an array.
 */
export function NonEmptySeq_readonly(source) {
    return NonEmptySeq_unsafeOfSeq(readOnly(source));
}

/**
 * Returns a new sequence with the elements in reverse order.
 */
export function NonEmptySeq_rev(source) {
    return NonEmptySeq_unsafeOfSeq(reverse(source));
}

/**
 * Like fold, but computes on-demand and returns the sequence of intermediary and final results.
 */
export function NonEmptySeq_scan(folder, state, source) {
    return NonEmptySeq_unsafeOfSeq(scan(folder, state, source));
}

/**
 * Like <c>foldBack</c>, but returns the sequence of intermediary and final results.
 */
export function NonEmptySeq_scanBack(folder, source, state) {
    return NonEmptySeq_unsafeOfSeq(scanBack(folder, source, state));
}

/**
 * Returns a sequence that yields one item only.
 */
export function NonEmptySeq_singleton(value) {
    return NonEmptySeq_unsafeOfSeq(singleton(value));
}

/**
 * Yields a sequence ordered by keys.
 */
export function NonEmptySeq_sort(source) {
    return NonEmptySeq_unsafeOfSeq(sort(source, {
        Compare: compare,
    }));
}

/**
 * Yields a sequence ordered using the given comparison function.
 */
export function NonEmptySeq_sortWith(comparer, source) {
    return NonEmptySeq_unsafeOfSeq(sortWith(comparer, source));
}

/**
 * Applies a key-generating function to each element of a sequence and yield a sequence ordered
 * by keys.    The keys are compared using generic comparison as implemented by <c>Operators.compare</c>.
 */
export function NonEmptySeq_sortBy(projection, source) {
    return NonEmptySeq_unsafeOfSeq(sortBy(projection, source, {
        Compare: compare,
    }));
}

/**
 * Yields a sequence ordered descending by keys.
 */
export function NonEmptySeq_sortDescending(source) {
    return NonEmptySeq_unsafeOfSeq(sortDescending(source, {
        Compare: compare,
    }));
}

/**
 * Applies a key-generating function to each element of a sequence and yield a sequence ordered
 * descending by keys.    The keys are compared using generic comparison as implemented by <c>Operators.compare</c>.
 */
export function NonEmptySeq_sortByDescending(projection, source) {
    return NonEmptySeq_unsafeOfSeq(sortByDescending(projection, source, {
        Compare: compare,
    }));
}

/**
 * Returns a sequence that skips 1 element of the underlying sequence and then yields the
 * remaining elements of the sequence.
 */
export function NonEmptySeq_tail(source) {
    return tail(source);
}

export function NonEmptySeq_unfold(generator, head, state) {
    const go = (item, state_1) => delay(() => append(singleton(item), delay(() => {
        const matchValue = generator(item, state_1);
        if (matchValue != null) {
            return go(matchValue[0], matchValue[1]);
        }
        else {
            return empty();
        }
    })));
    return NonEmptySeq_unsafeOfSeq(go(head, state));
}

/**
 * Combines the two sequences into a sequence of pairs. The two sequences need not have equal lengths:
 * when one sequence is exhausted any remaining elements in the other
 * sequence are ignored.
 */
export function NonEmptySeq_zip(source1, source2) {
    return NonEmptySeq_unsafeOfSeq(zip(source1, source2));
}

/**
 * Combines the three sequences into a sequence of triples. The sequences need not have equal lengths:
 * when one sequence is exhausted any remaining elements in the other
 * sequences are ignored.
 */
export function NonEmptySeq_zip3(source1, source2, source3) {
    return NonEmptySeq_unsafeOfSeq(zip3(source1, source2, source3));
}

/**
 * Applies the given function to each element of the NonEmptySequence and concatenates all the
 * results.
 */
export function NonEmptySeq_bind(mapping, source) {
    return NonEmptySeq_collect(mapping, source);
}

export function NonEmptySeq_apply(f, x) {
    return NonEmptySeq_bind((f_1) => NonEmptySeq_map(f_1, x), f);
}

export function NonEmptySeq_lift2(f, x1, x2) {
    return NonEmptySeq_map((tupledArg) => f(tupledArg[0], tupledArg[1]), NonEmptySeq_allPairs(x1, x2));
}

/**
 * Combines values from three NonEmptySeq and calls a mapping function on this combination.
 */
export function NonEmptySeq_lift3(f, x1, x2, x3) {
    return NonEmptySeq_map((tupledArg) => f(tupledArg[0], tupledArg[1], tupledArg[2]), NonEmptySeq_map((x) => [x[1][0], x[1][1], x[0]], NonEmptySeq_allPairs(x1, NonEmptySeq_allPairs(x2, x3))));
}

export function NonEmptySeq_replace(oldValue, newValue, source) {
    return NonEmptySeq_unsafeOfSeq(replace(oldValue, newValue, source));
}

/**
 * Returns a sequence that contains no duplicate entries according to the generic hash and equality comparisons
 * on the keys returned by the given key-generating function.
 * If an element occurs multiple times in the sequence then the later occurrences are discarded.
 */
export function NonEmptySeq_distinct(source) {
    return NonEmptySeq_ofSeq(distinct(source, {
        Equals: equals,
        GetHashCode: structuralHash,
    }));
}

/**
 * Applies a function to each element of the sequence, threading an accumulator argument
 * through the computation. Apply the function to the first two elements of the sequence.
 * Then feed this result into the function along with the third element and so on.
 * Return the final result. If the input function is <c>f</c> and the elements are <c>i0...iN</c> then computes
 * <c>f (... (f i0 i1) i2 ...) iN</c>.
 */
export function NonEmptySeq_reduce(reduction, source) {
    return reduce(reduction, source);
}

export class NonEmptySeqBuilder_NESeqBuilder {
    constructor() {
    }
}

export function NonEmptySeqBuilder_NESeqBuilder_$reflection() {
    return class_type("FSharpPlus.Data.NonEmptySeqBuilder.NESeqBuilder", void 0, NonEmptySeqBuilder_NESeqBuilder);
}

export function NonEmptySeqBuilder_NESeqBuilder_$ctor() {
    return new NonEmptySeqBuilder_NESeqBuilder();
}

export function NonEmptySeqBuilder_NESeqBuilder__Zero(_) {
    throw Errors_exnUnreachable;
}

export function NonEmptySeqBuilder_NESeqBuilder__Combine_306F64A0(_, a, b) {
    return NonEmptySeq_append(a, b);
}

export function NonEmptySeqBuilder_NESeqBuilder__Yield_1505(_, x) {
    return NonEmptySeq_singleton(x);
}

export function NonEmptySeqBuilder_NESeqBuilder__Delay_Z26AEE889(_, expr) {
    return expr();
}

export const NonEmptySeqBuilder_neseq = NonEmptySeqBuilder_NESeqBuilder_$ctor();

