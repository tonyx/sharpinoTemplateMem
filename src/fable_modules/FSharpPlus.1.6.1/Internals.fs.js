import { union_type, class_type } from "../fable-library.4.1.4/Reflection.js";
import { disposeSafe, getEnumerator, sign } from "../fable-library.4.1.4/Util.js";
import { fromZero, op_Multiply, fromOne, toInt32, pow, fromInt32, op_Subtraction, abs, compare, op_Division, op_Addition, op_RightShift, toFloat64 } from "../fable-library.4.1.4/BigInt.js";
import { FSharpResult$2 } from "../fable-library.4.1.4/Choice.js";
import { FSharpException, Record, Union } from "../fable-library.4.1.4/Types.js";
import { fill, singleton } from "../fable-library.4.1.4/Array.js";
import { Operators_NullArg } from "../fable-library.4.1.4/FSharp.Core.js";
import { rangeDouble } from "../fable-library.4.1.4/Range.js";

export class Default6 {
    constructor() {
    }
}

export function Default6_$reflection() {
    return class_type("FSharpPlus.Internals.Default6", void 0, Default6);
}

export class Default5 {
    constructor() {
    }
}

export function Default5_$reflection() {
    return class_type("FSharpPlus.Internals.Default5", void 0, Default5, Default6_$reflection());
}

export class Default4 {
    constructor() {
    }
}

export function Default4_$reflection() {
    return class_type("FSharpPlus.Internals.Default4", void 0, Default4, Default5_$reflection());
}

export class Default3 {
    constructor() {
    }
}

export function Default3_$reflection() {
    return class_type("FSharpPlus.Internals.Default3", void 0, Default3, Default4_$reflection());
}

export class Default2 {
    constructor() {
    }
}

export function Default2_$reflection() {
    return class_type("FSharpPlus.Internals.Default2", void 0, Default2, Default3_$reflection());
}

export class Default1 {
    constructor() {
    }
}

export function Default1_$reflection() {
    return class_type("FSharpPlus.Internals.Default1", void 0, Default1, Default2_$reflection());
}

export const Errors_exnDivByZero = new Error();

export const Errors_exnNoDivision = new Error("These numbers are not divisible in this domain.");

export const Errors_exnSqrtOfNegative = new Error("Cannot calculate square root of a negative number");

export const Errors_exnNoSqrt = new Error("No square root defined for this value in this domain.");

export const Errors_exnNoSubtraction = new Error("No subtraction defined for these values in this domain.");

export const Errors_exnUnreachable = new Error("This execution path is unreachable.");

export function BigInteger_trySqrtRem(x) {
    if (sign(toFloat64(x)) === -1) {
        return new FSharpResult$2(1, [Errors_exnSqrtOfNegative]);
    }
    else {
        const loop = (previous_mut) => {
            loop:
            while (true) {
                const previous = previous_mut;
                const current = op_RightShift(op_Addition(previous, op_Division(x, previous)), 1);
                if (compare(abs(op_Subtraction(previous, current)), fromInt32(2)) < 0) {
                    return current;
                }
                else {
                    previous_mut = current;
                    continue loop;
                }
                break;
            }
        };
        const r = loop(pow(fromInt32(10), (~~toInt32(op_Addition(x, fromOne())) + 1) >> 1));
        const r2 = op_Multiply(r, r);
        const matchValue = compare(r2, x) | 0;
        switch (matchValue) {
            case 0:
                return new FSharpResult$2(0, [[r, fromZero()]]);
            case 1: {
                const root = op_Subtraction(r, fromOne());
                return new FSharpResult$2(0, [[root, op_Subtraction(x, op_Multiply(root, root))]]);
            }
            default:
                return new FSharpResult$2(0, [[r, op_Subtraction(x, r2)]]);
        }
    }
}

export class Id$1 {
    constructor(v) {
        this.value = v;
    }
}

export function Id$1_$reflection(gen0) {
    return class_type("FSharpPlus.Internals.Id`1", [gen0], Id$1);
}

export function Id$1_$ctor_2B595(v) {
    return new Id$1(v);
}

export function Id$1__get_getValue(_) {
    return _.value;
}

export function Id_run(x) {
    return Id$1__get_getValue(x);
}

export function Id_map(f, x) {
    return Id$1_$ctor_2B595(f(Id$1__get_getValue(x)));
}

export function Id_create(x) {
    return Id$1_$ctor_2B595(x);
}

export class Id0 {
    constructor(v) {
        this.value = v;
    }
}

export function Id0_$reflection() {
    return class_type("FSharpPlus.Internals.Id0", void 0, Id0);
}

export function Id0_$ctor_Z721C83C5(v) {
    return new Id0(v);
}

export function Id0__get_getValue(_) {
    return _.value;
}

export class Either$2 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Left", "Right"];
    }
}

export function Either$2_$reflection(gen0, gen1) {
    return union_type("FSharpPlus.Internals.Either`2", [gen0, gen1], Either$2, () => [[["Item", gen0]], [["Item", gen1]]]);
}

export class DmStruct extends Record {
    constructor() {
        super();
    }
}

export function DmStruct_$reflection() {
    return class_type("FSharpPlus.Internals.DmStruct", void 0, DmStruct, class_type("System.ValueType"));
}

export class DmStruct1$1 extends Record {
    constructor() {
        super();
    }
}

export function DmStruct1$1_$reflection(gen0) {
    return class_type("FSharpPlus.Internals.DmStruct1`1", [gen0], DmStruct1$1, class_type("System.ValueType"));
}

export class KeyValuePair2$2 extends Record {
    constructor(Key, Value) {
        super();
        this.Key = Key;
        this.Value = Value;
    }
}

export function KeyValuePair2$2_$reflection(gen0, gen1) {
    return class_type("FSharpPlus.Internals.KeyValuePair2`2", [gen0, gen1], KeyValuePair2$2, class_type("System.ValueType"));
}

export function KeyValuePair2$2_$ctor_5BDDA1(key, value) {
    return new KeyValuePair2$2(key, value);
}

export class Set2$1 {
    constructor() {
    }
}

export function Set2$1_$reflection(gen0) {
    return class_type("FSharpPlus.Internals.Set2`1", [gen0], Set2$1);
}

export function Set2$1_$ctor() {
    return new Set2$1();
}

export class BitConverter {
    constructor() {
    }
}

export function BitConverter_$reflection() {
    return class_type("FSharpPlus.Internals.BitConverter", void 0, BitConverter);
}

/**
 * Converts a byte into an array of bytes with length one.
 */
export function BitConverter_GetBytes_Z1FBCCD16(value) {
    return singleton(value ? 1 : 0, Uint8Array);
}

function BitConverter_GetHexValue_Z524259A4(i) {
    if (i < 10) {
        return String.fromCharCode(String.fromCharCode(i).charCodeAt(0) + 48);
    }
    else {
        return String.fromCharCode(String.fromCharCode(i - 10).charCodeAt(0) + 65);
    }
}

/**
 * Converts an array of bytes into a String.
 */
export function BitConverter_ToString_Z1C12B71(value, startIndex, length) {
    if (value == null) {
        Operators_NullArg("value");
    }
    const arrayLen = value.length | 0;
    if (startIndex >= value.length) {
        throw new Error("startIndex", "ArgumentOutOfRange_StartIndex");
    }
    const realLength = length | 0;
    if (realLength < 0) {
        throw new Error("length", "ArgumentOutOfRange_GenericPositive");
    }
    if (startIndex > (arrayLen - realLength)) {
        throw new Error("Arg_ArrayPlusOffTooSmall");
    }
    if (realLength === 0) {
        return "";
    }
    else {
        const chArray = fill(new Array(realLength * 3), 0, realLength * 3, "");
        let index = startIndex;
        const enumerator = getEnumerator(rangeDouble(0, 3, (3 * realLength) - 1));
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const i = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]() | 0;
                const b = ~~value[index] | 0;
                index = ((index + 1) | 0);
                chArray[i] = BitConverter_GetHexValue_Z524259A4(~~(b / 16));
                chArray[i + 1] = BitConverter_GetHexValue_Z524259A4(b % 16);
                chArray[i + 2] = "-";
            }
        }
        finally {
            disposeSafe(enumerator);
        }
        return chArray.join('').substr(0, (chArray.length - 1));
    }
}

/**
 * Converts an array of bytes into a String.
 */
export function BitConverter_ToString_Z3F6BC7B1(value) {
    if (value == null) {
        Operators_NullArg("value");
    }
    return BitConverter_ToString_Z1C12B71(value, 0, value.length);
}

/**
 * Converts an array of bytes into a String.
 */
export function BitConverter_ToString_7EA6E473(value, startIndex) {
    if (value == null) {
        Operators_NullArg("value");
    }
    return BitConverter_ToString_Z1C12B71(value, startIndex, value.length - startIndex);
}

export class AggregateException extends FSharpException {
    constructor(Data0) {
        super();
        this.Data0 = Data0;
    }
}

export function AggregateException_$reflection() {
    return class_type("FSharpPlus.Internals.AggregateException", void 0, AggregateException, class_type("System.Exception"));
}

