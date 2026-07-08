import { Record, Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { list_type, record_type, union_type, string_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { filter, length, map, collect, singleton } from "./fable_modules/fable-library.4.1.4/List.js";
import { printf, toText, isNullOrEmpty } from "./fable_modules/fable-library.4.1.4/String.js";
import { singleton as singleton_1 } from "./fable_modules/fable-library.4.1.4/AsyncBuilder.js";
import { startImmediate, awaitPromise } from "./fable_modules/fable-library.4.1.4/Async.js";
import * as react from "react";
import { keyValueList } from "./fable_modules/fable-library.4.1.4/MapUtil.js";
import { createAtom, int32ToString } from "./fable_modules/fable-library.4.1.4/Util.js";
import { tests } from "./Tests.js";
import { DOMAttr } from "./fable_modules/Fable.React.9.3.0/Fable.React.Props.fs.js";
import * as react_dom from "react-dom";

export class TestStatus extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Pending", "Running", "Passed", "Failed"];
    }
}

export function TestStatus_$reflection() {
    return union_type("App.TestStatus", [], TestStatus, () => [[], [], [], [["Item", string_type]]]);
}

export class TestResult extends Record {
    constructor(Name, Status) {
        super();
        this.Name = Name;
        this.Status = Status;
    }
}

export function TestResult_$reflection() {
    return record_type("App.TestResult", [], TestResult, () => [["Name", string_type], ["Status", TestStatus_$reflection()]]);
}

export function flattenTests(test, prefix) {
    switch (test.tag) {
        case 1:
            return singleton(new TestResult(prefix + test.fields[0], new TestStatus(0, [])));
        case 2: {
            const name_2 = test.fields[0];
            const newPrefix = isNullOrEmpty(prefix) ? (name_2 + " > ") : ((prefix + name_2) + " > ");
            return collect((t) => flattenTests(t, newPrefix), test.fields[1]);
        }
        default:
            return singleton(new TestResult(prefix + test.fields[0], new TestStatus(0, [])));
    }
}

export function runTestByName(test, targetName, prefix) {
    return singleton_1.Delay(() => {
        let matchResult, f_2, name_2, f_3, name_3, list, name_4;
        switch (test.tag) {
            case 1: {
                if ((prefix + test.fields[0]) === targetName) {
                    matchResult = 1;
                    f_3 = test.fields[1];
                    name_3 = test.fields[0];
                }
                else {
                    matchResult = 3;
                }
                break;
            }
            case 2: {
                matchResult = 2;
                list = test.fields[1];
                name_4 = test.fields[0];
                break;
            }
            default:
                if ((prefix + test.fields[0]) === targetName) {
                    matchResult = 0;
                    f_2 = test.fields[1];
                    name_2 = test.fields[0];
                }
                else {
                    matchResult = 3;
                }
        }
        switch (matchResult) {
            case 0:
                return singleton_1.TryWith(singleton_1.Delay(() => {
                    f_2();
                    return singleton_1.Zero();
                }), (_arg) => {
                    throw new Error(_arg.message);
                    return singleton_1.Zero();
                });
            case 1:
                return singleton_1.TryWith(singleton_1.Delay(() => {
                    let x_1;
                    return singleton_1.Bind((x_1 = f_3(), (typeof singleton(x_1).then === 'function') ? awaitPromise(x_1) : x_1), (_arg_1) => {
                        return singleton_1.Zero();
                    });
                }), (_arg_2) => {
                    throw new Error(_arg_2.message);
                    return singleton_1.Zero();
                });
            case 2: {
                const newPrefix = isNullOrEmpty(prefix) ? (name_4 + " > ") : ((prefix + name_4) + " > ");
                return singleton_1.For(list, (_arg_3) => singleton_1.Bind(runTestByName(_arg_3, targetName, newPrefix), () => singleton_1.Return(void 0)));
            }
            default: {
                return singleton_1.Zero();
            }
        }
    });
}

export class State extends Record {
    constructor(Results) {
        super();
        this.Results = Results;
    }
}

export function State_$reflection() {
    return record_type("App.State", [], State, () => [["Results", list_type(TestResult_$reflection())]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["RunTests", "UpdateStatus"];
    }
}

export function Msg_$reflection() {
    return union_type("App.Msg", [], Msg, () => [[], [["Item1", string_type], ["Item2", TestStatus_$reflection()]]]);
}

export function reducer(state_1, msg) {
    if (msg.tag === 1) {
        return new State(map((r) => {
            if (r.Name === msg.fields[0]) {
                return new TestResult(r.Name, msg.fields[1]);
            }
            else {
                return r;
            }
        }, state_1.Results));
    }
    else {
        return state_1;
    }
}

export function view(state_1, dispatch) {
    let props_42, children_42, props, props_24, children_24, props_6, children_6, props_2, props_4, children_4, props_12, children_12, props_8, props_10, children_10, props_18, children_18, props_14, props_16, children_16, props_22, children_22, props_20, props_40, children_40, props_26, props_38, children_38;
    const total = length(state_1.Results) | 0;
    const passed = length(filter((r) => {
        if (r.Status.tag === 2) {
            return true;
        }
        else {
            return false;
        }
    }, state_1.Results)) | 0;
    const failed = length(filter((r_1) => {
        if (r_1.Status.tag === 3) {
            return true;
        }
        else {
            return false;
        }
    }, state_1.Results)) | 0;
    const props_44 = [["style", {
        background: "#1e1e2e",
        color: "#cdd6f4",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        minHeight: "100vh",
        "box-sizing": "border-box",
    }]];
    const children_44 = [(props_42 = [["style", {
        maxWidth: "800px",
        margin: "0 auto",
    }]], (children_42 = [(props = [["style", {
        color: "#f5c2e7",
        marginBottom: "24px",
        fontSize: "2.2rem",
        fontWeight: "700",
    }]], react.createElement("h1", keyValueList(props, 1), "Sharpino In-Browser Test Runner")), (props_24 = [["style", {
        display: "flex",
        gap: "16px",
        background: "#313244",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "24px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }]], (children_24 = [(props_6 = [["style", {
        flex: "1",
    }]], (children_6 = [(props_2 = [["style", {
        fontSize: "0.9rem",
        color: "#a6adc8",
        marginBottom: "4px",
    }]], react.createElement("div", keyValueList(props_2, 1), "TOTAL TESTS")), (props_4 = [["style", {
        fontSize: "1.8rem",
        fontWeight: "bold",
    }]], (children_4 = [int32ToString(total)], react.createElement("div", keyValueList(props_4, 1), ...children_4)))], react.createElement("div", keyValueList(props_6, 1), ...children_6))), (props_12 = [["style", {
        flex: "1",
        color: "#a6e3a1",
    }]], (children_12 = [(props_8 = [["style", {
        fontSize: "0.9rem",
        color: "#a6adc8",
        marginBottom: "4px",
    }]], react.createElement("div", keyValueList(props_8, 1), "PASSED")), (props_10 = [["style", {
        fontSize: "1.8rem",
        fontWeight: "bold",
    }]], (children_10 = [int32ToString(passed)], react.createElement("div", keyValueList(props_10, 1), ...children_10)))], react.createElement("div", keyValueList(props_12, 1), ...children_12))), (props_18 = [["style", {
        flex: "1",
        color: "#f38ba8",
    }]], (children_18 = [(props_14 = [["style", {
        fontSize: "0.9rem",
        color: "#a6adc8",
        marginBottom: "4px",
    }]], react.createElement("div", keyValueList(props_14, 1), "FAILED")), (props_16 = [["style", {
        fontSize: "1.8rem",
        fontWeight: "bold",
    }]], (children_16 = [int32ToString(failed)], react.createElement("div", keyValueList(props_16, 1), ...children_16)))], react.createElement("div", keyValueList(props_18, 1), ...children_18))), (props_22 = [["style", {
        "align-self": "center",
    }]], (children_22 = [(props_20 = [new DOMAttr(40, [(_arg_3) => {
        startImmediate(singleton_1.Delay(() => singleton_1.For(state_1.Results, (_arg) => {
            const r_2 = _arg;
            dispatch(new Msg(1, [r_2.Name, new TestStatus(1, [])]));
            return singleton_1.TryWith(singleton_1.Delay(() => singleton_1.Bind(runTestByName(tests, r_2.Name, ""), () => {
                dispatch(new Msg(1, [r_2.Name, new TestStatus(2, [])]));
                return singleton_1.Zero();
            })), (_arg_2) => {
                dispatch(new Msg(1, [r_2.Name, new TestStatus(3, [_arg_2.message])]));
                return singleton_1.Zero();
            });
        })));
    }]), ["style", {
        background: "#89b4fa",
        color: "#11111b",
        border: "none",
        padding: "12px 24px",
        borderRadius: "8px",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background 0.2s",
    }]], react.createElement("button", keyValueList(props_20, 1), "Run All Tests"))], react.createElement("div", keyValueList(props_22, 1), ...children_22)))], react.createElement("div", keyValueList(props_24, 1), ...children_24))), (props_40 = [["style", {
        background: "#181825",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }]], (children_40 = [(props_26 = [["style", {
        fontSize: "1.2rem",
        marginBottom: "16px",
        color: "#bac2de",
    }]], react.createElement("h2", keyValueList(props_26, 1), "Test Cases")), (props_38 = [["style", {
        display: "flex",
        "flex-direction": "column",
        gap: "12px",
    }]], (children_38 = map((r_3) => {
        let children_30, props_28, props_34, children_34, props_32;
        let patternInput;
        const matchValue_2 = r_3.Status;
        patternInput = ((matchValue_2.tag === 1) ? ["#f9e2af", "Running...", "🟡"] : ((matchValue_2.tag === 2) ? ["#a6e3a1", "Passed", "✅"] : ((matchValue_2.tag === 3) ? ["#f38ba8", toText(printf("Failed: %s"))(matchValue_2.fields[0]), "❌"] : ["#585b70", "Pending", "⚪"])));
        const statusColor = patternInput[0];
        const props_36 = [["style", {
            display: "flex",
            "align-items": "center",
            "justify-content": "space-between",
            padding: "12px 16px",
            background: "#313244",
            borderRadius: "8px",
            borderLeft: toText(printf("4px solid %s"))(statusColor),
        }]];
        const children_36 = [(children_30 = [(props_28 = [["style", {
            fontSize: "1.1rem",
            fontWeight: "500",
        }]], react.createElement("span", keyValueList(props_28, 1), r_3.Name))], react.createElement("div", {}, ...children_30)), (props_34 = [["style", {
            color: statusColor,
            fontWeight: "bold",
            fontSize: "0.9rem",
        }]], (children_34 = [(props_32 = [["style", {
            marginRight: "8px",
        }]], react.createElement("span", keyValueList(props_32, 1), patternInput[2])), patternInput[1]], react.createElement("div", keyValueList(props_34, 1), ...children_34)))];
        return react.createElement("div", keyValueList(props_36, 1), ...children_36);
    }, state_1.Results), react.createElement("div", keyValueList(props_38, 1), ...children_38)))], react.createElement("div", keyValueList(props_40, 1), ...children_40)))], react.createElement("div", keyValueList(props_42, 1), ...children_42)))];
    return react.createElement("div", keyValueList(props_44, 1), ...children_44);
}

export const initialResults = flattenTests(tests, "");

export let state = createAtom(new State(initialResults));

export function render() {
    react_dom.render(view(state(), (msg) => {
        state(reducer(state(), msg));
        render();
    }), document.getElementById("root"));
}

render();

