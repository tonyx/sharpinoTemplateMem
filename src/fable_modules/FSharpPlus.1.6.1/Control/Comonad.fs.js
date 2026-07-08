import { class_type } from "../../fable-library.4.1.4/Reflection.js";
import { runSynchronously } from "../../fable-library.4.1.4/Async.js";
import { singleton } from "../../fable-library.4.1.4/AsyncBuilder.js";
import { Lazy } from "../../fable-library.4.1.4/Util.js";
import { ofArray, toArray, map } from "../../fable-library.4.1.4/List.js";
import { tails } from "../Extensions/List.fs.js";
import { map as map_1 } from "../../fable-library.4.1.4/Array.js";
import { toList, map as map_2 } from "../../fable-library.4.1.4/Seq.js";

export class Extract {
    constructor() {
    }
}

export function Extract_$reflection() {
    return class_type("FSharpPlus.Control.Extract", void 0, Extract);
}

export function Extract_Extract_ZD4A93B1(x) {
    return runSynchronously(x);
}

export function Extract_Extract_4BBBD111(x) {
    return x.Value;
}

export function Extract_Extract_B8627CF(_arg) {
    return _arg[1];
}

export function Extract_Extract_Z37BDAE28(_arg) {
    return _arg[1];
}

export function Extract_Extract_Z24B99AB7(f) {
    return f;
}

export class Extend {
    constructor() {
    }
}

export function Extend_$reflection() {
    return class_type("FSharpPlus.Control.Extend", void 0, Extend);
}

export function Extend_op_EqualsGreaterGreater_Z5B93BE4D(g, f) {
    return singleton.Return(f(g));
}

export function Extend_op_EqualsGreaterGreater_Z4494000D(g, f) {
    return new Lazy(() => f(g));
}

export function Extend_op_EqualsGreaterGreater_529A12B3(_arg, f) {
    const w = _arg[0];
    return [w, f([w, _arg[1]])];
}

export function Extend_op_EqualsGreaterGreater_32D4E353(_arg, f) {
    const w = _arg[0];
    return [w, f([w, _arg[1]])];
}

export function Extend_op_EqualsGreaterGreater_7314B173(g, f) {
    return f(g);
}

export function Extend_op_EqualsGreaterGreater_Z5216DA0D(s, g) {
    return map(g, tails(s));
}

export function Extend_op_EqualsGreaterGreater_Z4C9866D(s, g) {
    return map_1(g, map_1(toArray, toArray(tails(ofArray(s)))));
}

export function Extend_op_EqualsGreaterGreater_5247CF53(s, g) {
    return map_2(g, map_2((list_2) => list_2, tails(toList(s))));
}

