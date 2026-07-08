import { class_type } from "../fable-library.4.1.4/Reflection.js";
import { FSharpResult$2 } from "../fable-library.4.1.4/Choice.js";

export class ResultCE_ResultBuilder {
    constructor() {
    }
}

export function ResultCE_ResultBuilder_$reflection() {
    return class_type("FsToolkit.ErrorHandling.ResultCE.ResultBuilder", void 0, ResultCE_ResultBuilder);
}

export function ResultCE_ResultBuilder_$ctor() {
    return new ResultCE_ResultBuilder();
}

export function ResultCE_ResultBuilder__Zero(this$) {
    return new FSharpResult$2(0, [void 0]);
}

export const ResultCE_result = ResultCE_ResultBuilder_$ctor();

