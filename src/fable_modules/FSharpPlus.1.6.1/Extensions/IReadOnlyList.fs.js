import { some } from "../../fable-library.4.1.4/Option.js";
import { iterate } from "../../fable-library.4.1.4/Seq.js";

export function toArray(source) {
    return Array.from(source);
}

export function tryItem(i, source) {
    if ((0 <= i) && (i < source["System.Collections.Generic.IReadOnlyCollection`1.get_Count"]())) {
        return some(source["System.Collections.Generic.IReadOnlyList`1.get_ItemZ524259A4"](i));
    }
    else {
        return void 0;
    }
}

export function iter(mapping, source) {
    iterate(mapping, source);
}

