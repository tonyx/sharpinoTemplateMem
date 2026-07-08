import { toArray } from "../../fable-library.4.1.4/List.js";
import { iterate, map as map_1, toArray as toArray_1 } from "../../fable-library.4.1.4/Seq.js";

export function ofArray(source) {
    return source;
}

export function ofList(source) {
    return toArray(source);
}

export function ofSeq(source) {
    return Array.from(source);
}

export function map(mapping, source) {
    return toArray_1(map_1(mapping, source));
}

export function iter(mapping, source) {
    iterate(mapping, source);
}

