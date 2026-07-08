import { iterate, map as map_1, toArray } from "../../fable-library.4.1.4/Seq.js";

export function empty() {
    return [];
}

export function ofArray(source) {
    return source;
}

export function ofList(source) {
    return source;
}

export function ofSeq(source) {
    return Array.from(source);
}

export function map(mapping, source) {
    return toArray(map_1(mapping, source));
}

export function iter(mapping, source) {
    iterate(mapping, source);
}

export function isEmpty(source) {
    return source["System.Collections.Generic.IReadOnlyCollection`1.get_Count"]() === 0;
}

