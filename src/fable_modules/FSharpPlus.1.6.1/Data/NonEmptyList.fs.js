import { compare, structuralHash, equals, toIterator, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { concat, foldBack, fold, singleton as singleton_1, collect, append as append_1, ofSeq, minBy, min, maxBy, max, reduceBack, reduce, zip, unzip, mapIndexed, map, tail, head, isEmpty, ofArray, toArray, empty, getSlice, item as item_1, length, cons } from "../../fable-library.4.1.4/List.js";
import { Record } from "../../fable-library.4.1.4/Types.js";
import { class_type, record_type, list_type } from "../../fable-library.4.1.4/Reflection.js";
import { map as map_1, tail as tail_1, toList, singleton, append, delay } from "../../fable-library.4.1.4/Seq.js";
import { lift3, lift2, cycle, apply, zipShortest, map3Shortest, map2Shortest } from "../Extensions/List.fs.js";
import { distinct } from "../../fable-library.4.1.4/Seq2.js";
import { Errors_exnUnreachable } from "../Internals.fs.js";

export class NonEmptyList$1 extends Record {
    constructor(Head, Tail) {
        super();
        this.Head = Head;
        this.Tail = Tail;
    }
    GetEnumerator() {
        const x = this;
        return getEnumerator(cons(x.Head, x.Tail));
    }
    [Symbol.iterator]() {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"() {
        const x = this;
        return getEnumerator(cons(x.Head, x.Tail));
    }
    "System.Collections.Generic.IReadOnlyCollection`1.get_Count"() {
        const s = this;
        return (1 + length(s.Tail)) | 0;
    }
    "System.Collections.Generic.IReadOnlyList`1.get_ItemZ524259A4"(index) {
        const s = this;
        return NonEmptyList$1__get_Item(s)(index);
    }
    get First() {
        const s = this;
        return s.Head;
    }
}

export function NonEmptyList$1_$reflection(gen0) {
    return record_type("FSharpPlus.Data.NonEmptyList`1", [gen0], NonEmptyList$1, () => [["Head", gen0], ["Tail", list_type(gen0)]]);
}

export function NonEmptyList$1__get_head(this$) {
    return this$.Head;
}

export function NonEmptyList$1__get_tail(this$) {
    return this$.Tail;
}

export function NonEmptyList$1__get_Item(this$) {
    return (_arg) => ((_arg === 0) ? this$.Head : item_1(_arg - 1, this$.Tail));
}

export function NonEmptyList$1__get_GetSlice(this$) {
    return (_arg) => {
        let matchResult, a, b, a_1, b_1;
        if (_arg[0] != null) {
            if (_arg[0] === 0) {
                if (_arg[1] != null) {
                    if (_arg[1] === 0) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 2;
                        b = _arg[1];
                    }
                }
                else {
                    matchResult = 0;
                }
            }
            else if (_arg[1] != null) {
                matchResult = 3;
                a_1 = _arg[0];
                b_1 = _arg[1];
            }
            else {
                matchResult = 1;
                a = _arg[0];
            }
        }
        else if (_arg[1] != null) {
            matchResult = 2;
            b = _arg[1];
        }
        else {
            matchResult = 0;
        }
        switch (matchResult) {
            case 0:
                return this$;
            case 1: {
                const xs = this$.Tail;
                return new NonEmptyList$1(item_1(a - 1, xs), getSlice(a, void 0, xs));
            }
            case 2:
                return new NonEmptyList$1(this$.Head, getSlice(void 0, b - 1, this$.Tail));
            default: {
                const xs_2 = this$.Tail;
                return new NonEmptyList$1(item_1(a_1 - 1, xs_2), getSlice(a_1, b_1 - 1, xs_2));
            }
        }
    };
}

export function NonEmptyList$1__get_Length(this$) {
    return 1 + length(this$.Tail);
}

/**
 * Builds a non empty list.
 */
export function NonEmptyList_create(x, xs) {
    return new NonEmptyList$1(x, xs);
}

/**
 * Builds a non empty list with a single element.
 */
export function NonEmptyList_singleton(x) {
    return new NonEmptyList$1(x, empty());
}

/**
 * Builds a list from the given non empty list.
 */
export function NonEmptyList_toList(_arg) {
    return cons(_arg.Head, _arg.Tail);
}

/**
 * Builds a sequence from the given non empty list.
 */
export function NonEmptyList_toSeq(_arg) {
    return delay(() => append(singleton(_arg.Head), delay(() => _arg.Tail)));
}

/**
 * Builds an array from the given non empty list.
 */
export function NonEmptyList_toArray(nel) {
    return toArray(NonEmptyList_toList(nel));
}

/**
 * Builds a non empty list from the given array.
 */
export function NonEmptyList_ofArray(array) {
    const matchValue = ofArray(array);
    if (!isEmpty(matchValue)) {
        return NonEmptyList_create(head(matchValue), tail(matchValue));
    }
    else {
        throw new Error("The input array was empty.\\nParameter name: array");
    }
}

/**
 * Builds a non empty list from the given list.
 */
export function NonEmptyList_ofList(list) {
    if (!isEmpty(list)) {
        return NonEmptyList_create(head(list), tail(list));
    }
    else {
        throw new Error("The input list was empty.\\nParameter name: list");
    }
}

/**
 * Builds a non empty list from the given sequence.
 */
export function NonEmptyList_ofSeq(seq) {
    const matchValue = toList(seq);
    if (!isEmpty(matchValue)) {
        return NonEmptyList_create(head(matchValue), tail(matchValue));
    }
    else {
        throw new Error("The input sequence was empty.\\nParameter name: seq");
    }
}

/**
 * Returns the length of a non empty list. You can also use property nel.Length.
 */
export function NonEmptyList_length(nel) {
    return NonEmptyList$1__get_Length(nel);
}

/**
 * Build a new non empty list whose elements are the results of applying the given function
 * to each of the elements of the non empty list.
 */
export function NonEmptyList_map(f, _arg) {
    return new NonEmptyList$1(f(_arg.Head), map(f, _arg.Tail));
}

/**
 * Safely build a new non empty list whose elements are the results of applying the given function
 * to each of the elements of the two non empty list pairwise.
 */
export function NonEmptyList_map2Shortest(f, l1, l2) {
    return new NonEmptyList$1(f(l1.Head, l2.Head), map2Shortest(f, l1.Tail, l2.Tail));
}

/**
 * Safely build a new non empty list whose elements are the results of applying the given function
 * to each of the elements of the three non empty list pointwise.
 */
export function NonEmptyList_map3Shortest(f, l1, l2, l3) {
    return new NonEmptyList$1(f(l1.Head, l2.Head, l3.Head), map3Shortest(f, l1.Tail, l2.Tail, l3.Tail));
}

/**
 * Build a new non empty list whose elements are the results of applying the given function with index
 * to each of the elements of the non empty list.
 */
export function NonEmptyList_mapi(f, _arg) {
    return new NonEmptyList$1(f(0, _arg.Head), mapIndexed((i, item) => f(i + 1, item), _arg.Tail));
}

/**
 * Splits a list of pairs into two lists.
 */
export function NonEmptyList_unzip(list) {
    const patternInput = unzip(list.Tail);
    return [new NonEmptyList$1(list.Head[0], patternInput[0]), new NonEmptyList$1(list.Head[1], patternInput[1])];
}

/**
 * Combines the two lists into a list of pairs. The two lists must have equal lengths.
 */
export function NonEmptyList_zip(list1, list2) {
    return new NonEmptyList$1([list1.Head, list2.Head], zip(list1.Tail, list2.Tail));
}

/**
 * Zip safely two lists. If one list is shorter, excess elements are discarded from the right end of the longer list.
 */
export function NonEmptyList_zipShortest(list1, list2) {
    return new NonEmptyList$1([list1.Head, list2.Head], zipShortest(list1.Tail, list2.Tail));
}

/**
 * Returns a new NonEmptyList with the element added to the beginning.
 */
export function NonEmptyList_cons(e, _arg) {
    return new NonEmptyList$1(e, cons(_arg.Head, _arg.Tail));
}

/**
 * Returns the first element of a new non empty list. You can also use property nel.Head.
 */
export function NonEmptyList_head(_arg) {
    return _arg.Head;
}

/**
 * Returns a new NonEmptyList of the elements trailing the first element.
 */
export function NonEmptyList_tail(_arg) {
    return NonEmptyList_ofList(_arg.Tail);
}

export function NonEmptyList_tails(s) {
    const xs = s.Tail;
    if (!isEmpty(xs)) {
        return NonEmptyList_cons(s, NonEmptyList_tails(new NonEmptyList$1(head(xs), tail(xs))));
    }
    else {
        return new NonEmptyList$1(s, empty());
    }
}

/**
 * Returns a list that contains no duplicate entries according to the generic hash and equality comparisons
 * on the keys returned by the given key-generating function.
 * If an element occurs multiple times in the list then the later occurrences are discarded.
 */
export function NonEmptyList_distinct(list) {
    return NonEmptyList_ofSeq(distinct(list, {
        Equals: equals,
        GetHashCode: structuralHash,
    }));
}

/**
 * Applies a function to each element of the list, threading an accumulator argument
 * through the computation. Apply the function to the first two elements of the list.
 * Then feed this result into the function along with the third element and so on.
 * Return the final result. If the input function is <c>f</c> and the elements are <c>i0...iN</c> then computes
 * <c>f (... (f i0 i1) i2 ...) iN</c>.
 */
export function NonEmptyList_reduce(reduction, list) {
    return reduce(reduction, cons(list.Head, list.Tail));
}

/**
 * Applies a function to each element of the list, starting from the end, threading an accumulator argument
 * through the computation. If the input function is <c>f</c> and the elements are <c>i0...iN</c> then computes
 * <c>f i0 (...(f iN-1 iN))</c>.
 */
export function NonEmptyList_reduceBack(reduction, list) {
    return reduceBack(reduction, cons(list.Head, list.Tail));
}

/**
 * Returns the greatest of all elements of the list, compared via Operators.max.
 */
export function NonEmptyList_max(list) {
    return max(cons(list.Head, list.Tail), {
        Compare: compare,
    });
}

/**
 * Returns the greatest of all elements of the list, compared via Operators.max on the function result.
 */
export function NonEmptyList_maxBy(projection, list) {
    return maxBy(projection, cons(list.Head, list.Tail), {
        Compare: compare,
    });
}

/**
 * Returns the lowest of all elements of the list, compared via Operators.min.
 */
export function NonEmptyList_min(list) {
    return min(cons(list.Head, list.Tail), {
        Compare: compare,
    });
}

/**
 * Returns the lowest of all elements of the list, compared via Operators.min on the function result
 */
export function NonEmptyList_minBy(projection, list) {
    return minBy(projection, cons(list.Head, list.Tail), {
        Compare: compare,
    });
}

/**
 * Transforms a list to a NonEmptyList, returning an option to signal when the original list was empty.
 */
export function NonEmptyList_tryOfList(s) {
    if (!isEmpty(s)) {
        return NonEmptyList_create(head(s), tail(s));
    }
    else {
        return void 0;
    }
}

export function NonEmptyList_ofNonEmptySeq(s) {
    return NonEmptyList_create(s.First, ofSeq(tail_1(s)));
}

export function NonEmptyList_toNonEmptySeq(list) {
    return list;
}

export function NonEmptyList$1_Map_3AE9B50E(x, f) {
    return NonEmptyList_map(f, x);
}

export function NonEmptyList$1_MapIndexed_Z4814B77C(x, f) {
    return NonEmptyList_mapi(f, x);
}

export function NonEmptyList$1_Unzip_Z2D90BC8C(s) {
    return NonEmptyList_unzip(s);
}

export function NonEmptyList$1_Zip_38E04500(x, y) {
    return NonEmptyList_zipShortest(x, y);
}

export function NonEmptyList$1_op_GreaterGreaterEquals_631FF593(_arg, f) {
    const patternInput = f(_arg.Head);
    return new NonEmptyList$1(patternInput.Head, append_1(patternInput.Tail, collect((arg) => NonEmptyList_toList(f(arg)), _arg.Tail)));
}

export function NonEmptyList$1_Return_1505(x) {
    return new NonEmptyList$1(x, empty());
}

export function NonEmptyList$1_op_LessMultiplyGreater_558831F5(f, x) {
    let x_1;
    const r = ((x_1 = NonEmptyList_toList(f), (func) => func(x_1)))(((x_1_1) => ((y) => apply(y, x_1_1)))(NonEmptyList_toList(x)));
    return new NonEmptyList$1(head(r), tail(r));
}

export function NonEmptyList$1_Pure_1505(x) {
    return new NonEmptyList$1(x, cycle(singleton_1(x)));
}

export function NonEmptyList$1_op_LessDotGreater_558831F5(f, x) {
    return NonEmptyList_map2Shortest((func, arg) => func(arg), f, x);
}

export function NonEmptyList$1_Lift2_6F2FABC5(f, x, y) {
    return NonEmptyList_ofList(lift2(f, NonEmptyList_toList(x), NonEmptyList_toList(y)));
}

export function NonEmptyList$1_Lift3_Z33B439B2(f, x, y, z) {
    return NonEmptyList_ofList(lift3(f, NonEmptyList_toList(x), NonEmptyList_toList(y), NonEmptyList_toList(z)));
}

export function NonEmptyList$1_Map2_6F2FABC5(f, x, y) {
    return NonEmptyList_map2Shortest(f, x, y);
}

export function NonEmptyList$1_Map3_Z33B439B2(f, x, y, z) {
    return NonEmptyList_map3Shortest(f, x, y, z);
}

export function NonEmptyList$1_Extract_7A32E36E(_arg) {
    return _arg.Head;
}

export function NonEmptyList$1_op_EqualsGreaterGreater_Z79925CAD(s, g) {
    return NonEmptyList_map(g, NonEmptyList_tails(s));
}

export function NonEmptyList$1_op_Addition_38E04500(_arg, x) {
    return new NonEmptyList$1(_arg.Head, append_1(_arg.Tail, NonEmptyList_toList(x)));
}

export function NonEmptyList$1_Fold_35CE0A78(_arg, f, z) {
    return fold(f, z, cons(_arg.Head, _arg.Tail));
}

export function NonEmptyList$1_FoldBack_35CE0A78(_arg, f, z) {
    return foldBack(f, cons(_arg.Head, _arg.Tail), z);
}

export function NonEmptyList$1_Sum_236CAC97(source) {
    return NonEmptyList_ofList(concat(map_1(NonEmptyList_toList, source)));
}

export class NonEmptyListBuilder_NelBuilder {
    constructor() {
    }
}

export function NonEmptyListBuilder_NelBuilder_$reflection() {
    return class_type("FSharpPlus.Data.NonEmptyListBuilder.NelBuilder", void 0, NonEmptyListBuilder_NelBuilder);
}

export function NonEmptyListBuilder_NelBuilder_$ctor() {
    return new NonEmptyListBuilder_NelBuilder();
}

export function NonEmptyListBuilder_NelBuilder__Zero(_) {
    throw Errors_exnUnreachable;
}

export function NonEmptyListBuilder_NelBuilder__Combine_7E40487D(_, a, _arg) {
    return new NonEmptyList$1(a, cons(_arg.Head, _arg.Tail));
}

export function NonEmptyListBuilder_NelBuilder__Yield_1505(_, x) {
    return x;
}

export function NonEmptyListBuilder_NelBuilder__Delay_FCFD9EF(_, expr) {
    return expr();
}

export function NonEmptyListBuilder_NelBuilder__Run_7E42FDD8(_, x) {
    return x;
}

export const NonEmptyListBuilder_nel = NonEmptyListBuilder_NelBuilder_$ctor();

export const NonEmptyListBuilder_nelist = NonEmptyListBuilder_NelBuilder_$ctor();

export function FSharpPlus_Data_NonEmptyListBuilder_NelBuilder__NelBuilder_Combine_2A0A0(_, a, b) {
    return new NonEmptyList$1(a, singleton_1(b));
}

export function FSharpPlus_Data_NonEmptyListBuilder_NelBuilder__NelBuilder_Run_1505(_, x) {
    return new NonEmptyList$1(x, empty());
}

