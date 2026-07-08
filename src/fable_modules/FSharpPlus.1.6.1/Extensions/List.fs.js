import { getSlice, append, choose, reverse, head, item, length, skip as skip_1, take as take_1, empty, tail, isEmpty, allPairs, map, collect, cons as cons_1, singleton as singleton_1 } from "../../fable-library.4.1.4/List.js";
import { map as map_1, toList } from "../../fable-library.4.1.4/Seq.js";
import { chunkBy as chunkBy_1, replace as replace_1, split as split_1, intersperse as intersperse_1, intercalate as intercalate_1 } from "./Seq.fs.js";
import { toIterator, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { FSharpRef } from "../../fable-library.4.1.4/Types.js";

/**
 * Returns a list that contains one item only.
 */
export function singleton(value) {
    return singleton_1(value);
}

/**
 * Adds an element to the beginning of the given list
 */
export function cons(value, list) {
    return cons_1(value, list);
}

/**
 * Applies a list of functions to a list of values and concatenates them
 */
export function apply(f, x) {
    return collect((f_1) => map(f_1, x), f);
}

/**
 * Combines all values from the first list with the second, using the supplied mapping function.
 */
export function lift2(f, x1, x2) {
    return map((tupledArg) => f(tupledArg[0], tupledArg[1]), allPairs(x1, x2));
}

/**
 * Combines values from three list and calls a mapping function on this combination.
 */
export function lift3(f, x1, x2, x3) {
    return map((tupledArg) => f(tupledArg[2], tupledArg[0], tupledArg[1]), map((x) => [x[1][0], x[1][1], x[0]], allPairs(x1, allPairs(x2, x3))));
}

/**
 * Returns a list with all possible tails of the source list.
 */
export function tails(list) {
    const loop = (_arg) => {
        if (!isEmpty(_arg)) {
            return cons_1(_arg, loop(tail(_arg)));
        }
        else {
            return empty();
        }
    };
    return loop(list);
}

/**
 * Returns the first N elements of the list.
 */
export function take(count, list) {
    return take_1(count, list);
}

/**
 * Returns the list after removing the first N elements.
 */
export function skip(count, list) {
    return skip_1(count, list);
}

/**
 * Returns a list that drops N elements of the original list and then yields the
 * remaining elements of the list.
 */
export function drop(count, source) {
    const loop = (i_mut, lst_mut) => {
        loop:
        while (true) {
            const i = i_mut, lst = lst_mut;
            let matchResult, x;
            if (isEmpty(lst)) {
                matchResult = 0;
                x = lst;
            }
            else if (i === 0) {
                matchResult = 0;
                x = lst;
            }
            else {
                matchResult = 1;
            }
            switch (matchResult) {
                case 0:
                    return x;
                default: {
                    i_mut = (i - 1);
                    lst_mut = tail(lst);
                    continue loop;
                }
            }
            break;
        }
    };
    if (count > 0) {
        return loop(count, source);
    }
    else {
        return source;
    }
}

/**
 * Concatenates all elements, using the specified separator between each element.
 */
export function intercalate(separator, source) {
    return toList(intercalate_1(separator, source));
}

/**
 * Inserts a separator element between each element in the source list.
 */
export function intersperse(separator, source) {
    return toList(intersperse_1(separator, source));
}

/**
 * Creates a sequence of lists by splitting the source list on any of the given separators.
 */
export function split(separators, source) {
    return map_1(toList, split_1(separators, source));
}

/**
 * Replaces a subsequence of the source list with the given replacement list.
 */
export function replace(oldValue, newValue, source) {
    return toList(replace_1(oldValue, newValue, source));
}

/**
 * Converts a list to an IReadOnlyList (from System.Collections.Generic).
 */
export function toIReadOnlyList(source) {
    return {
        "System.Collections.Generic.IReadOnlyCollection`1.get_Count"() {
            return length(source);
        },
        "System.Collections.Generic.IReadOnlyList`1.get_ItemZ524259A4"(index) {
            return item(index, source);
        },
        GetEnumerator() {
            return getEnumerator(source);
        },
        [Symbol.iterator]() {
            return toIterator(getEnumerator(this));
        },
        "System.Collections.IEnumerable.GetEnumerator"() {
            return getEnumerator(source);
        },
    };
}

/**
 * Creates two lists by applying the mapping function to each element in the list
 * and classifying the transformed values depending on whether they were wrapped with Choice1Of2 or Choice2Of2.
 */
export function partitionMap(mapping, source) {
    const loop = (acc) => {
        const acc_1 = acc;
        const acc2 = acc_1[1];
        const acc1 = acc_1[0];
        return (_arg) => {
            if (!isEmpty(_arg)) {
                const xs = tail(_arg);
                const matchValue = mapping(head(_arg));
                return (matchValue.tag === 1) ? loop([acc1, cons_1(matchValue.fields[0], acc2)])(xs) : loop([cons_1(matchValue.fields[0], acc1), acc2])(xs);
            }
            else {
                return acc_1;
            }
        };
    };
    return loop([empty(), empty()])(reverse(source));
}

/**
 * Safely build a new list whose elements are the results of applying the given function
 * to each of the elements of the two lists pairwise.
 */
export function map2Shortest(mapping, list1, list2) {
    const loop = (acc_mut, _arg_mut) => {
        loop:
        while (true) {
            const acc = acc_mut, _arg = _arg_mut;
            let matchResult, l, ls, r, rs;
            if (!isEmpty(_arg[0])) {
                if (!isEmpty(_arg[1])) {
                    matchResult = 0;
                    l = head(_arg[0]);
                    ls = tail(_arg[0]);
                    r = head(_arg[1]);
                    rs = tail(_arg[1]);
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
                    acc_mut = cons_1(mapping(l, r), acc);
                    _arg_mut = [ls, rs];
                    continue loop;
                }
                default:
                    return acc;
            }
            break;
        }
    };
    return reverse(loop(empty(), [list1, list2]));
}

export function map3Shortest(mapping, list1, list2, list3) {
    const loop = (acc_mut, _arg_mut) => {
        loop:
        while (true) {
            const acc = acc_mut, _arg = _arg_mut;
            let matchResult, l1, l1s, l2, l2s, l3, l3s;
            if (!isEmpty(_arg[0])) {
                if (!isEmpty(_arg[1])) {
                    if (!isEmpty(_arg[2])) {
                        matchResult = 0;
                        l1 = head(_arg[0]);
                        l1s = tail(_arg[0]);
                        l2 = head(_arg[1]);
                        l2s = tail(_arg[1]);
                        l3 = head(_arg[2]);
                        l3s = tail(_arg[2]);
                    }
                    else {
                        matchResult = 1;
                    }
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
                    acc_mut = cons_1(mapping(l1, l2, l3), acc);
                    _arg_mut = [l1s, l2s, l3s];
                    continue loop;
                }
                default:
                    return acc;
            }
            break;
        }
    };
    return reverse(loop(empty(), [list1, list2, list3]));
}

/**
 * Zip safely two lists. If one list is shorter, excess elements are discarded from the right end of the longer list.
 */
export function zipShortest(list1, list2) {
    const loop = (acc_mut, _arg_mut) => {
        loop:
        while (true) {
            const acc = acc_mut, _arg = _arg_mut;
            let matchResult, l, ls, r, rs;
            if (!isEmpty(_arg[0])) {
                if (!isEmpty(_arg[1])) {
                    matchResult = 0;
                    l = head(_arg[0]);
                    ls = tail(_arg[0]);
                    r = head(_arg[1]);
                    rs = tail(_arg[1]);
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
                    acc_mut = cons_1([l, r], acc);
                    _arg_mut = [ls, rs];
                    continue loop;
                }
                default:
                    return acc;
            }
            break;
        }
    };
    return reverse(loop(empty(), [list1, list2]));
}

/**
 * Chunks the list up into groups with the same projected key by applying
 * the key-generating projection function to each element and yielding a list of
 * keys tupled with values.
 */
export function chunkBy(projection, source) {
    return toList(map_1((tupledArg) => [tupledArg[0], toList(tupledArg[1])], chunkBy_1(projection, source)));
}

/**
 * Same as choose but with access to the index.
 */
export function choosei(mapping, source) {
    let i = new FSharpRef(-1);
    return choose((x) => {
        i.contents = ((i.contents + 1) | 0);
        return mapping(i.contents, x);
    }, source);
}

/**
 * Attempts to remove an item from a list.
 */
export function deleteAt(i, lst) {
    if (length(lst) > i) {
        return append(getSlice(0, i - 1, lst), getSlice(i + 1, void 0, lst));
    }
    else {
        return lst;
    }
}

export function removeAt(i, lst) {
    return deleteAt(i, lst);
}

/**
 * Updates the value of an item in a list
 */
export function setAt(i, x, lst) {
    if ((length(lst) > i) && (i >= 0)) {
        return append(getSlice(0, i - 1, lst), cons_1(x, getSlice(i + 1, void 0, lst)));
    }
    else {
        return lst;
    }
}

export function cycle(lst) {
    return lst;
}

