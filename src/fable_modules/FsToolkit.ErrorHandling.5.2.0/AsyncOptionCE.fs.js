import { class_type } from "../fable-library.4.1.4/Reflection.js";
import { singleton } from "../fable-library.4.1.4/AsyncBuilder.js";
import { value as value_1, some } from "../fable-library.4.1.4/Option.js";

export class AsyncOptionCE_AsyncOptionBuilder {
    constructor() {
    }
}

export function AsyncOptionCE_AsyncOptionBuilder_$reflection() {
    return class_type("FsToolkit.ErrorHandling.AsyncOptionCE.AsyncOptionBuilder", void 0, AsyncOptionCE_AsyncOptionBuilder);
}

export function AsyncOptionCE_AsyncOptionBuilder_$ctor() {
    return new AsyncOptionCE_AsyncOptionBuilder();
}

export function AsyncOptionCE_AsyncOptionBuilder__While_78DDE493(this$, guard, computation) {
    if (!guard()) {
        return singleton.Return(some(void 0));
    }
    else {
        return singleton.Bind(computation, (x) => {
            if (x == null) {
                return singleton.Return(void 0);
            }
            else {
                const unitVar_1 = value_1(x);
                return AsyncOptionCE_AsyncOptionBuilder__While_78DDE493(this$, guard, computation);
            }
        });
    }
}

export const AsyncOptionCE_asyncOption = AsyncOptionCE_AsyncOptionBuilder_$ctor();

