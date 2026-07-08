import { Attribute, Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { union_type, list_type, class_type, lambda_type, unit_type, string_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { printf, toFail } from "./fable_modules/fable-library.4.1.4/String.js";
import { disposeSafe, isDisposable, getEnumerator } from "./fable_modules/fable-library.4.1.4/Util.js";

export class Test extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["TestCase", "TestCaseTask", "TestList"];
    }
}

export function Test_$reflection() {
    return union_type("Expecto.Test", [], Test, () => [[["Item1", string_type], ["Item2", lambda_type(unit_type, unit_type)]], [["Item1", string_type], ["Item2", lambda_type(unit_type, class_type("Microsoft.FSharp.Control.FSharpAsync`1", [unit_type]))]], [["Item1", string_type], ["Item2", list_type(Test_$reflection())]]]);
}

export function Expect_isOk(res, msg) {
    if (res.tag === 1) {
        toFail(printf("%s: Expected Ok, but got Error: %A"))(msg)(res.fields[0]);
    }
}

export function Expect_isTrue(cond, msg) {
    if (!cond) {
        throw new Error(msg);
    }
}

export function Expect_hasLength(s, len, msg) {
    let count = 0;
    const enumerator = getEnumerator(s);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const forLoopVar = enumerator["System.Collections.IEnumerator.get_Current"]();
            count = ((count + 1) | 0);
        }
    }
    finally {
        if (isDisposable(enumerator)) {
            disposeSafe(enumerator);
        }
    }
    if (count !== len) {
        const arg_2 = count | 0;
        toFail(printf("%s: Expected length %d, but got %d"))(msg)(len)(arg_2);
    }
}

export function TestDsl_testList(name, tests) {
    return new Test(2, [name, tests]);
}

export function TestDsl_testCase(name, f) {
    return new Test(0, [name, f]);
}

export function TestDsl_testCaseTask(name, f) {
    return new Test(1, [name, f]);
}

export function TestDsl_testSequenced(test) {
    return test;
}

export class TestsAttribute extends Attribute {
    constructor() {
        super();
    }
}

export function TestsAttribute_$reflection() {
    return class_type("Expecto.TestsAttribute", void 0, TestsAttribute, class_type("System.Attribute"));
}

export function TestsAttribute_$ctor() {
    return new TestsAttribute();
}

