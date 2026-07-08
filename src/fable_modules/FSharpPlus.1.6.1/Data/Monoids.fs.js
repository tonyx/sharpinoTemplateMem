import { Union } from "../../fable-library.4.1.4/Types.js";
import { option_type, bool_type, union_type, lambda_type } from "../../fable-library.4.1.4/Reflection.js";

export class Endo$1 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Endo"];
    }
}

export function Endo$1_$reflection(gen0) {
    return union_type("FSharpPlus.Data.Endo`1", [gen0], Endo$1, () => [[["Item", lambda_type(gen0, gen0)]]]);
}

export function Endo$1_get_Zero() {
    return new Endo$1((x) => x);
}

export function Endo$1_op_Addition_7D05C00(_arg, _arg_1) {
    return new Endo$1((arg) => _arg.fields[0](_arg_1.fields[0](arg)));
}

export function Endo_run(_arg) {
    return _arg.fields[0];
}

export class All extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["All"];
    }
}

export function All_$reflection() {
    return union_type("FSharpPlus.Data.All", [], All, () => [[["Item", bool_type]]]);
}

export function All_get_Zero() {
    return new All(true);
}

export function All_op_Addition_Z137E6A00(_arg, _arg_1) {
    return new All(_arg.fields[0] && _arg_1.fields[0]);
}

export class Any extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Any"];
    }
}

export function Any_$reflection() {
    return union_type("FSharpPlus.Data.Any", [], Any, () => [[["Item", bool_type]]]);
}

export function Any_get_Zero() {
    return new Any(false);
}

export function Any_op_Addition_Z137E76A0(_arg, _arg_1) {
    return new Any(_arg.fields[0] ? true : _arg_1.fields[0]);
}

export class First$1 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["First"];
    }
}

export function First$1_$reflection(gen0) {
    return union_type("FSharpPlus.Data.First`1", [gen0], First$1, () => [[["Item", option_type(gen0)]]]);
}

export function First$1_get_Zero() {
    return new First$1(void 0);
}

export function First$1_op_Addition_Z7D3A2180(x, y) {
    if (x.fields[0] == null) {
        return y;
    }
    else {
        return x;
    }
}

export function First$1_run_Z73EA2E14(_arg) {
    return _arg.fields[0];
}

export class Last$1 extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Last"];
    }
}

export function Last$1_$reflection(gen0) {
    return union_type("FSharpPlus.Data.Last`1", [gen0], Last$1, () => [[["Item", option_type(gen0)]]]);
}

export function Last$1_get_Zero() {
    return new Last$1(void 0);
}

export function Last$1_op_Addition_7A934480(x, y) {
    if (y.fields[0] == null) {
        return x;
    }
    else {
        return y;
    }
}

export function Last$1_run_Z12AC9A24(_arg) {
    return _arg.fields[0];
}

