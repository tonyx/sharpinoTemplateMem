import { indexed, choose, toList, singleton, empty, enumerateWhile, append, enumerateUsing, delay, toArray, allPairs, map, collect } from "../../fable-library.4.1.4/Seq.js";
import { addRangeInPlace, foldBack as foldBack_1 } from "../../fable-library.4.1.4/Array.js";
import { clear, comparePrimitives, equals, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { exists, item as item_1, filter, length, map as map_1, max, isEmpty } from "../../fable-library.4.1.4/List.js";

/**
 * Applies the given function to each element of the sequence and concatenates the results.
 */
export function bind(mapping, source) {
    return collect(mapping, source);
}

/**
 * Applies a sequence of functions to a sequence of values and concatenates them.
 */
export function apply(f, x) {
    return bind((f_1) => map(f_1, x), f);
}

/**
 * Combines all values from the first seq with the second, using the supplied mapping function.
 */
export function lift2(f, x1, x2) {
    return map((tupledArg) => f(tupledArg[0], tupledArg[1]), allPairs(x1, x2));
}

/**
 * Combines values from three seq and calls a mapping function on this combination.
 */
export function lift3(f, x1, x2, x3) {
    return map((tupledArg) => f(tupledArg[0], tupledArg[1], tupledArg[2]), map((x) => [x[1][0], x[1][1], x[0]], allPairs(x1, allPairs(x2, x3))));
}

/**
 * Applies a function to each element of the collection, starting from the end, threading an accumulator argument
 * through the computation. If the input function is <c>f</c> and the elements are <c>i0...iN</c>
 * then computes <c>f i0 (... (f iN s)...)</c>
 */
export function foldBack(folder, source, state) {
    return foldBack_1(folder, toArray(source), state);
}

/**
 * Chunks the seq up into groups with the same projected key by applying
 * the key-generating projection function to each element and yielding a sequence of
 * keys tupled with values.
 */
export function chunkBy(projection, source) {
    return delay(() => enumerateUsing(getEnumerator(source), (e) => {
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
            let g = projection(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
            let members = [];
            void (members.push(e["System.Collections.Generic.IEnumerator`1.get_Current"]()));
            return append(enumerateWhile(() => e["System.Collections.IEnumerator.MoveNext"](), delay(() => {
                const key = projection(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
                if (equals(g, key)) {
                    void (members.push(e["System.Collections.Generic.IEnumerator`1.get_Current"]()));
                    return empty();
                }
                else {
                    return append(singleton([g, members]), delay(() => {
                        g = key;
                        members = [];
                        void (members.push(e["System.Collections.Generic.IEnumerator`1.get_Current"]()));
                        return empty();
                    }));
                }
            })), delay(() => singleton([g, members])));
        }
        else {
            return empty();
        }
    }));
}

/**
 * Inserts a separator element between each element in the source seq.
 * http://codebetter.com/matthewpodwysocki/2009/05/06/functionally-implementing-intersperse/
 */
export function intersperse(sep, list) {
    return delay(() => {
        let notFirst = false;
        return collect((element) => append(notFirst ? singleton(sep) : empty(), delay(() => append(singleton(element), delay(() => {
            notFirst = true;
            return empty();
        })))), list);
    });
}

/**
 * Inserts a separator between each element in the source sequence.
 */
export function intercalate(separator, source) {
    return delay(() => {
        let notFirst = false;
        return collect((element) => append(notFirst ? separator : empty(), delay(() => append(element, delay(() => {
            notFirst = true;
            return empty();
        })))), source);
    });
}

/**
 * Creates a sequence of sequences by splitting the source sequence on any of the given separators.
 */
export function split(separators, source) {
    return delay(() => {
        const matchValue = toList(map(toList, separators));
        if (isEmpty(matchValue)) {
            return singleton(source);
        }
        else {
            const separators_1 = matchValue;
            const buffer = [];
            let candidate;
            const arg = max(map_1(length, separators_1), {
                Compare: comparePrimitives,
            }) | 0;
            candidate = [];
            let i = 0;
            return append(collect((item) => {
                void (candidate.push(item));
                const matchValue_1 = filter((sep) => {
                    if (length(sep) > i) {
                        return equals(item, item_1(i, sep));
                    }
                    else {
                        return false;
                    }
                }, separators_1);
                if (isEmpty(matchValue_1)) {
                    i = 0;
                    addRangeInPlace(candidate, buffer);
                    clear(candidate);
                    return empty();
                }
                else if (exists((sep_1) => (length(sep_1) === (i + 1)), matchValue_1)) {
                    i = 0;
                    return append(singleton(buffer.slice()), delay(() => {
                        clear(buffer);
                        clear(candidate);
                        return empty();
                    }));
                }
                else {
                    i = ((i + 1) | 0);
                    return empty();
                }
            }, source), delay(() => append((candidate.length > 0) ? ((addRangeInPlace(candidate, buffer), empty())) : empty(), delay(() => singleton(buffer)))));
        }
    });
}

/**
 * Replaces a subsequence of the source seq with the given replacement seq.
 */
export function replace(oldValue, newValue, source) {
    return delay(() => {
        const old = toList(oldValue);
        if (length(old) === 0) {
            return source;
        }
        else {
            const candidate = [];
            let sindex = 0;
            return append(collect((item) => {
                void (candidate.push(item));
                if (equals(item, item_1(sindex, old))) {
                    sindex = ((sindex + 1) | 0);
                    if (sindex >= length(old)) {
                        sindex = 0;
                        return append(newValue, delay(() => {
                            clear(candidate);
                            return empty();
                        }));
                    }
                    else {
                        return empty();
                    }
                }
                else {
                    sindex = 0;
                    return append(candidate, delay(() => {
                        clear(candidate);
                        return empty();
                    }));
                }
            }, source), delay(() => candidate));
        }
    });
}

/**
 * Returns a sequence that drops N elements of the original sequence and then yields the
 * remaining elements of the sequence.
 */
export function drop(count, source) {
    return delay(() => {
        let i = count;
        return collect((x) => {
            if (i > 0) {
                i = ((i - 1) | 0);
                return empty();
            }
            else {
                return singleton(x);
            }
        }, source);
    });
}

/**
 * Choose with access to the index
 */
export function choosei(mapping, source) {
    return choose((tupledArg) => mapping(tupledArg[0], tupledArg[1]), indexed(source));
}

