import { Union } from "../../fable-library.4.1.4/Types.js";
import { union_type, class_type } from "../../fable-library.4.1.4/Reflection.js";
import { collect, append, delay, empty, isEmpty, initializeInfinite, zip, singleton, map3, map2, map, item } from "../../fable-library.4.1.4/Seq.js";
import { drop } from "../Extensions/Seq.fs.js";

export class ZipList$1 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["ZipList"];
    }
}

export function ZipList$1_$reflection(gen0) {
    return union_type("FSharpPlus.Data.ZipList`1", [gen0], ZipList$1, () => [[["Item", class_type("System.Collections.Generic.IEnumerable`1", [gen0])]]]);
}

export function ZipList$1__Item_Z524259A4(this$, n) {
    return item(n, this$.fields[0]);
}

export function ZipList_run(_arg) {
    return _arg.fields[0];
}

export function ZipList_map(f, _arg) {
    return new ZipList$1(map(f, _arg.fields[0]));
}

export function ZipList_map2(f, _arg, _arg_1) {
    return new ZipList$1(map2(f, _arg.fields[0], _arg_1.fields[0]));
}

export function ZipList_map3(f, _arg, _arg_1, _arg_2) {
    return new ZipList$1(map3(f, _arg.fields[0], _arg_1.fields[0], _arg_2.fields[0]));
}

export function ZipList_singleton(x) {
    return new ZipList$1(singleton(x));
}

/**
 * Combines the two lists into a list of pairs. The two lists need not have equal lengths:
 * when one list is exhausted any remaining elements in the other
 * list are ignored.
 */
export function ZipList_zip(list1, list2) {
    return new ZipList$1(zip(ZipList_run(list1), ZipList_run(list2)));
}

export function ZipList$1_Map_1935EA17(_arg, f) {
    return new ZipList$1(map(f, _arg.fields[0]));
}

export function ZipList$1_Return_1505(x) {
    return new ZipList$1(initializeInfinite((arg10$0040) => x));
}

export function ZipList$1_op_LessMultiplyGreater_181AD695(_arg, _arg_1) {
    return new ZipList$1(map((tupledArg) => tupledArg[0](tupledArg[1]), zip(_arg.fields[0], _arg_1.fields[0])));
}

export function ZipList$1_Lift2_Z722084DB(f, x, y) {
    return ZipList_map2(f, x, y);
}

export function ZipList$1_Lift3_Z2A394229(f, x, y, z) {
    return ZipList_map3(f, x, y, z);
}

export function ZipList$1_IsLeftZero_777073A1(_arg) {
    return isEmpty(_arg.fields[0]);
}

export function ZipList$1_get_Empty() {
    return new ZipList$1(empty());
}

export function ZipList$1_op_LessBarGreater_120E9460(_arg, _arg_1) {
    return new ZipList$1(delay(() => {
        let i = 0;
        return append(collect((e) => {
            i = ((i + 1) | 0);
            return singleton(e);
        }, _arg.fields[0]), delay(() => drop(i, _arg_1.fields[0])));
    }));
}

export function ZipList$1_Zip_120E9460(x, y) {
    return ZipList_zip(x, y);
}

export function ZipList$1_ToSeq_777073A1(_arg) {
    return _arg.fields[0];
}

