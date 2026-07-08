import { Union } from "../../fable-library.4.1.4/Types.js";
import { class_type, union_type } from "../../fable-library.4.1.4/Reflection.js";
import { uncurry2, toIterator, equals, safeHash, structuralHash, disposeSafe, getEnumerator } from "../../fable-library.4.1.4/Util.js";
import { toArray, empty as empty_1, singleton, append, delay, fold, forAll2 } from "../../fable-library.4.1.4/Seq.js";
import { empty, head, tail, isEmpty, cons as cons_1 } from "../../fable-library.4.1.4/List.js";
import { value as value_1, some } from "../../fable-library.4.1.4/Option.js";
import { cons as cons_2 } from "../Extensions/List.fs.js";
import { FSharpChoice$2 } from "../../fable-library.4.1.4/Choice.js";

export class DListData$1 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Nil", "Unit", "Join"];
    }
}

export function DListData$1_$reflection(gen0) {
    return union_type("FSharpPlus.Data.DListData`1", [gen0], DListData$1, () => [[], [["Item", gen0]], [["Item1", DListData$1_$reflection(gen0)], ["Item2", DListData$1_$reflection(gen0)]]]);
}

export class DList$1 {
    constructor(length, data) {
        this.length = (length | 0);
        this.data = data;
        this.hashCode = void 0;
    }
    GetHashCode() {
        const this$ = this;
        const matchValue = this$.hashCode;
        if (matchValue != null) {
            return matchValue | 0;
        }
        else {
            let hash = 1;
            const enumerator = getEnumerator(this$);
            try {
                while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                    const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    hash = (((31 * hash) + structuralHash(x)) | 0);
                }
            }
            finally {
                disposeSafe(enumerator);
            }
            this$.hashCode = hash;
            return hash | 0;
        }
    }
    Equals(other) {
        let y;
        const this$ = this;
        return (other instanceof DList$1) && ((y = other, this$["System.IEquatable`1.Equals2B595"](y)));
    }
    "System.IEquatable`1.Equals2B595"(y) {
        const this$ = this;
        return (DList$1__get_Length(this$) !== DList$1__get_Length(y)) ? false : ((safeHash(this$) !== safeHash(y)) ? false : forAll2(equals, this$, y));
    }
    "System.Collections.Generic.IReadOnlyList`1.get_ItemZ524259A4"(index) {
        const s = this;
        return DList$1__get_Item_Z524259A4(s, index);
    }
    "System.Collections.Generic.IReadOnlyCollection`1.get_Count"() {
        const s = this;
        return DList$1__get_Length(s) | 0;
    }
    GetEnumerator() {
        const s = this;
        return DList$1__toSeq(s);
    }
    [Symbol.iterator]() {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"() {
        const s = this;
        return DList$1__toSeq(s);
    }
}

export function DList$1_$reflection(gen0) {
    return class_type("FSharpPlus.Data.DList`1", [gen0], DList$1);
}

export function DList$1_$ctor_Z2E394EE4(length, data) {
    return new DList$1(length, data);
}

export function DList$1__get_dc(this$) {
    return this$.data;
}

export function DList$1_ofSeq_BB573A(s) {
    const tupledArg = fold((tupledArg_1, x) => {
        const state = tupledArg_1[1];
        return [tupledArg_1[0] + 1, (state.tag === 1) ? (new DListData$1(2, [state, new DListData$1(1, [x])])) : ((state.tag === 2) ? (new DListData$1(2, [state, new DListData$1(1, [x])])) : (new DListData$1(1, [x])))];
    }, [0, new DListData$1(0, [])], s);
    return DList$1_$ctor_Z2E394EE4(tupledArg[0], tupledArg[1]);
}

/**
 * O(1). Returns the count of elememts.
 */
export function DList$1__get_Length(_) {
    return _.length;
}

export function DList$1_foldBack(f, l, state) {
    const f_1 = f;
    const walk = (lefts) => ((l_1) => ((xs) => ((l_1.tag === 1) ? finish(lefts)(f_1(l_1.fields[0], xs)) : ((l_1.tag === 2) ? walk(cons_1(l_1.fields[0], lefts))(l_1.fields[1])(xs) : finish(lefts)(xs)))));
    const finish = (lefts_1) => ((xs_1) => (!isEmpty(lefts_1) ? walk(tail(lefts_1))(head(lefts_1))(xs_1) : xs_1));
    return walk(empty())(DList$1__get_dc(l))(state);
}

export function DList$1_fold(f, state, l) {
    const f_1 = f;
    const walk = (rights) => ((l_1) => ((xs) => ((l_1.tag === 1) ? finish(rights)(f_1(xs, l_1.fields[0])) : ((l_1.tag === 2) ? walk(cons_1(l_1.fields[1], rights))(l_1.fields[0])(xs) : finish(rights)(xs)))));
    const finish = (rights_1) => ((xs_1) => (!isEmpty(rights_1) ? walk(tail(rights_1))(head(rights_1))(xs_1) : xs_1));
    return walk(empty())(DList$1__get_dc(l))(state);
}

function DList$1_tryFindi(f, l) {
    const f_1 = f;
    const walk = (rights) => ((l_1) => ((i) => {
        switch (l_1.tag) {
            case 1: {
                const x = l_1.fields[0];
                return f_1(i, x) ? some(x) : finish(rights)(i + 1);
            }
            case 2:
                return walk(cons_1(l_1.fields[1], rights))(l_1.fields[0])(i);
            default:
                return finish(rights)(i);
        }
    }));
    const finish = (rights_1) => ((xs) => (!isEmpty(rights_1) ? walk(tail(rights_1))(head(rights_1))(xs) : void 0));
    return walk(empty())(DList$1__get_dc(l))(0);
}

function DList$1_findi(f, l) {
    const matchValue = DList$1_tryFindi(f, l);
    if (matchValue == null) {
        throw new Error();
    }
    else {
        return value_1(matchValue);
    }
}

export function DList$1_append_Z5A626040(left, right) {
    if (left.tag === 0) {
        return right;
    }
    else if (right.tag === 0) {
        return left;
    }
    else {
        return new DListData$1(2, [left, right]);
    }
}

export function DList$1_appendLists_Z6B15200(left, right) {
    return DList$1_$ctor_Z2E394EE4(DList$1__get_Length(left) + DList$1__get_Length(right), DList$1_append_Z5A626040(DList$1__get_dc(left), DList$1__get_dc(right)));
}

export function DList$1_head_Z2B1B5B4A(data_mut) {
    DList$1_head_Z2B1B5B4A:
    while (true) {
        const data = data_mut;
        switch (data.tag) {
            case 1:
                return data.fields[0];
            case 2: {
                data_mut = data.fields[0];
                continue DList$1_head_Z2B1B5B4A;
            }
            default:
                throw new Error("DList.head: empty DList");
        }
        break;
    }
}

export function DList$1_tryHead_Z2B1B5B4A(data_mut) {
    DList$1_tryHead_Z2B1B5B4A:
    while (true) {
        const data = data_mut;
        switch (data.tag) {
            case 1:
                return some(data.fields[0]);
            case 2: {
                data_mut = data.fields[0];
                continue DList$1_tryHead_Z2B1B5B4A;
            }
            default:
                return void 0;
        }
        break;
    }
}

/**
 * O(1). Returns a new DList with the element added to the front.
 */
export function DList$1__Cons_2B595(_, hd) {
    if (_.data.tag === 0) {
        return DList$1_$ctor_Z2E394EE4(1, new DListData$1(1, [hd]));
    }
    else {
        return DList$1_$ctor_Z2E394EE4(_.length + 1, new DListData$1(2, [new DListData$1(1, [hd]), _.data]));
    }
}

/**
 * O(log n). Returns the first element.
 */
export function DList$1__get_Head(_) {
    return DList$1_head_Z2B1B5B4A(_.data);
}

/**
 * O(log n). Returns option first element
 */
export function DList$1__get_TryHead(_) {
    return DList$1_tryHead_Z2B1B5B4A(_.data);
}

/**
 * O(1). Returns true if the DList has no elements.
 */
export function DList$1__get_IsEmpty(_) {
    if (_.data.tag === 0) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * O(1). Returns a new DList with the element added to the end.
 */
export function DList$1__Add_2B595(_, x) {
    return DList$1_$ctor_Z2E394EE4(_.length + 1, DList$1_append_Z5A626040(_.data, new DListData$1(1, [x])));
}

/**
 * O(log n). Returns a new DList of the elements trailing the first element.
 */
export function DList$1__get_Tail(this$) {
    const step = (xs_mut, acc_mut) => {
        step:
        while (true) {
            const xs = xs_mut, acc = acc_mut;
            switch (xs.tag) {
                case 2: {
                    xs_mut = xs.fields[0];
                    acc_mut = DList$1_append_Z5A626040(xs.fields[1], acc);
                    continue step;
                }
                default:
                    return acc;
            }
            break;
        }
    };
    if (DList$1__get_IsEmpty(this$)) {
        throw new Error("DList.tail: empty DList");
    }
    else {
        return DList$1_$ctor_Z2E394EE4(this$.length - 1, step(this$.data, new DListData$1(0, [])));
    }
}

/**
 * O(log n). Returns option DList of the elements trailing the first element.
 */
export function DList$1__get_TryTail(this$) {
    const step = (xs_mut, acc_mut) => {
        step:
        while (true) {
            const xs = xs_mut, acc = acc_mut;
            switch (xs.tag) {
                case 2: {
                    xs_mut = xs.fields[0];
                    acc_mut = DList$1_append_Z5A626040(xs.fields[1], acc);
                    continue step;
                }
                default:
                    return acc;
            }
            break;
        }
    };
    if (DList$1__get_IsEmpty(this$)) {
        return void 0;
    }
    else {
        return DList$1_$ctor_Z2E394EE4(this$.length - 1, step(this$.data, new DListData$1(0, [])));
    }
}

/**
 * O(log n). Returns the first element and tail.
 */
export function DList$1__get_Uncons(this$) {
    return [DList$1_head_Z2B1B5B4A(this$.data), DList$1__get_Tail(this$)];
}

/**
 * O(log n). Returns option first element and tail.
 */
export function DList$1__get_TryUncons(this$) {
    const matchValue = DList$1_tryHead_Z2B1B5B4A(this$.data);
    if (matchValue == null) {
        return void 0;
    }
    else {
        return [value_1(matchValue), DList$1__get_Tail(this$)];
    }
}

export function DList$1__get_Item_Z524259A4(s, index) {
    if ((index < 0) ? true : (index >= DList$1__get_Length(s))) {
        throw new Error();
    }
    return DList$1_findi((i, _arg) => (i === index), s);
}

export function DList$1__toSeq(_) {
    const walk = (rights, l) => delay(() => {
        switch (l.tag) {
            case 1:
                return append(singleton(l.fields[0]), delay(() => {
                    const matchValue_1 = rights;
                    if (!isEmpty(matchValue_1)) {
                        return walk(tail(matchValue_1), head(matchValue_1));
                    }
                    else {
                        return empty_1();
                    }
                }));
            case 2:
                return walk(cons_1(l.fields[1], rights), l.fields[0]);
            default: {
                const matchValue = rights;
                if (!isEmpty(matchValue)) {
                    return walk(tail(matchValue), head(matchValue));
                }
                else {
                    return empty_1();
                }
            }
        }
    });
    return getEnumerator(walk(empty(), _.data));
}

/**
 * O(1). Returns a new DList of two lists.
 */
export function DList_append(left, right) {
    return DList$1_appendLists_Z6B15200(left, right);
}

/**
 * O(1). Returns a new DList with the element added to the beginning.
 */
export function DList_cons(hd, l) {
    if (DList$1__get_Length(l) === 0) {
        return DList$1_$ctor_Z2E394EE4(1, new DListData$1(1, [hd]));
    }
    else {
        return DList$1_$ctor_Z2E394EE4(DList$1__get_Length(l) + 1, new DListData$1(2, [new DListData$1(1, [hd]), DList$1__get_dc(l)]));
    }
}

/**
 * O(1). Returns DList of no elements.
 */
export function DList_empty() {
    return DList$1_$ctor_Z2E394EE4(0, new DListData$1(0, []));
}

/**
 * Fold walks the DList using constant stack space.
 */
export function DList_foldBack(f, l, state) {
    return DList$1_foldBack(f, l, state);
}

export function DList_fold(f, state, l) {
    return DList$1_fold(f, state, l);
}

/**
 * O(1). Returns DList of one elements.
 */
export function DList_singleton(x) {
    return DList$1_$ctor_Z2E394EE4(1, new DListData$1(1, [x]));
}

/**
 * Returns a DList of the seq.
 */
export function DList_ofSeq(s) {
    return DList$1_ofSeq_BB573A(s);
}

/**
 * Iterates over each element of the list.
 */
export function DList_iter(action, source) {
    const walk = (rights_mut, _arg_mut) => {
        walk:
        while (true) {
            const rights = rights_mut, _arg = _arg_mut;
            switch (_arg.tag) {
                case 1: {
                    action(_arg.fields[0]);
                    if (!isEmpty(rights)) {
                        rights_mut = tail(rights);
                        _arg_mut = head(rights);
                        continue walk;
                    }
                    break;
                }
                case 2: {
                    rights_mut = cons_1(_arg.fields[1], rights);
                    _arg_mut = _arg.fields[0];
                    continue walk;
                    break;
                }
                default:
                    if (!isEmpty(rights)) {
                        rights_mut = tail(rights);
                        _arg_mut = head(rights);
                        continue walk;
                    }
            }
            break;
        }
    };
    walk(empty(), DList$1__get_dc(source));
}

/**
 * Returns a list of the DList elements.
 */
export function DList_toList(source) {
    return DList$1_foldBack(cons_2, source, empty());
}

/**
 * Returns an array of the DList elements.
 */
export function DList_toArray(source) {
    return toArray(source);
}

export function DList_pairwise(source) {
    let activePatternResult_2, activePatternResult_3;
    const $007CCons$007CNil$007C = (l) => {
        const matchValue = DList$1__get_TryUncons(l);
        if (matchValue == null) {
            return new FSharpChoice$2(1, [void 0]);
        }
        else {
            return new FSharpChoice$2(0, [[matchValue[0], matchValue[1]]]);
        }
    };
    const pairWiseDListData = (cons_mut, lastvalue_mut, _arg_mut) => {
        pairWiseDListData:
        while (true) {
            const cons = cons_mut, lastvalue = lastvalue_mut, _arg = _arg_mut;
            const activePatternResult = $007CCons$007CNil$007C(_arg);
            if (activePatternResult.tag === 0) {
                if ($007CCons$007CNil$007C(activePatternResult.fields[0][1]).tag === 1) {
                    return new DListData$1(2, [cons, new DListData$1(1, [[lastvalue, activePatternResult.fields[0][0]]])]);
                }
                else {
                    cons_mut = (new DListData$1(2, [cons, new DListData$1(1, [[lastvalue, activePatternResult.fields[0][0]]])]));
                    lastvalue_mut = activePatternResult.fields[0][0];
                    _arg_mut = activePatternResult.fields[0][1];
                    continue pairWiseDListData;
                }
            }
            else {
                return cons;
            }
            break;
        }
    };
    const dlistData = (activePatternResult_2 = $007CCons$007CNil$007C(source), (activePatternResult_2.tag === 0) ? ((activePatternResult_3 = $007CCons$007CNil$007C(activePatternResult_2.fields[0][1]), (activePatternResult_3.tag === 0) ? pairWiseDListData(new DListData$1(1, [[activePatternResult_2.fields[0][0], activePatternResult_3.fields[0][0]]]), activePatternResult_3.fields[0][0], activePatternResult_3.fields[0][1]) : (new DListData$1(0, [])))) : (new DListData$1(0, [])));
    if (DList$1__get_Length(source) === 0) {
        return DList$1_$ctor_Z2E394EE4(0, new DListData$1(0, []));
    }
    else {
        return DList$1_$ctor_Z2E394EE4(DList$1__get_Length(source) - 1, dlistData);
    }
}

export function DList_concat(x) {
    return DList$1_fold(DList_append, DList_empty(), x);
}

export function DList$1_get_Zero() {
    return DList$1_$ctor_Z2E394EE4(0, new DListData$1(0, []));
}

export function DList$1_op_Addition_6E8B3740(x, y) {
    return DList_append(x, y);
}

export function DList$1_get_Empty() {
    return DList$1_$ctor_Z2E394EE4(0, new DListData$1(0, []));
}

export function DList$1_op_LessBarGreater_6E8B3740(x, y) {
    return DList_append(x, y);
}

export function DList$1_ToSeq_38EBA746(x) {
    return x;
}

export function DList$1_ToList_38EBA746(x) {
    return DList_toList(x);
}

export function DList$1_OfSeq_404FCA0C(x) {
    return DList_ofSeq(x);
}

export function DList$1_Fold_138425E6(x, f, z) {
    return DList_fold(f, x, z);
}

export function DList$1_Return_1505(x) {
    return DList_singleton(x);
}

export function DList$1_Map_2A2B9DD0(x, f) {
    return DList$1_foldBack(uncurry2((arg) => {
        const hd = f(arg);
        return (l) => DList_cons(hd, l);
    }), x, DList_empty());
}

export function DList$1_op_LessMultiplyGreater_315A85B5(f, x) {
    return DList_concat(DList$1_foldBack(uncurry2((arg_3) => {
        const hd_1 = DList$1_foldBack(uncurry2((arg) => {
            const hd = arg(arg_3);
            return (l) => DList_cons(hd, l);
        }), f, DList_empty());
        return (l_1) => DList_cons(hd_1, l_1);
    }), x, DList_empty()));
}

export function DList$1_op_GreaterGreaterEquals_247C51B3(x, f) {
    return DList$1_foldBack(uncurry2((arg) => {
        const left = f(arg);
        return (right) => DList_append(left, right);
    }), DList_empty(), x);
}

