import { fromContinuations, cancellationToken, startWithContinuations } from "../fable-library.4.1.4/Async.js";
import { FSharpChoice$3 } from "../fable-library.4.1.4/Choice.js";
import { singleton } from "../fable-library.4.1.4/AsyncBuilder.js";

export function Microsoft_FSharp_Control_FSharpAsync__Async_TryFinallyAsync_Static_Z753D11A1(comp, deferred) {
    const finish = (tupledArg, tupledArg_1) => {
        const compResult = tupledArg[0];
        const deferredResult = tupledArg[1];
        const econt = tupledArg_1[1];
        let matchResult, x, compExn, compExn_1, deferredExn, compExn_2, deferredExn_1, compExn_3, deferredExn_2, deferredExn_3;
        switch (compResult.tag) {
            case 1: {
                switch (deferredResult.tag) {
                    case 1: {
                        matchResult = 4;
                        compExn_2 = compResult.fields[0];
                        deferredExn_1 = deferredResult.fields[0];
                        break;
                    }
                    case 2: {
                        matchResult = 6;
                        deferredExn_3 = deferredResult.fields[0];
                        break;
                    }
                    default: {
                        matchResult = 1;
                        compExn = compResult.fields[0];
                    }
                }
                break;
            }
            case 2: {
                switch (deferredResult.tag) {
                    case 1: {
                        matchResult = 5;
                        compExn_3 = compResult.fields[0];
                        deferredExn_2 = deferredResult.fields[0];
                        break;
                    }
                    case 2: {
                        matchResult = 6;
                        deferredExn_3 = deferredResult.fields[0];
                        break;
                    }
                    default: {
                        matchResult = 2;
                        compExn_1 = compResult.fields[0];
                    }
                }
                break;
            }
            default:
                switch (deferredResult.tag) {
                    case 1: {
                        matchResult = 3;
                        deferredExn = deferredResult.fields[0];
                        break;
                    }
                    case 2: {
                        matchResult = 6;
                        deferredExn_3 = deferredResult.fields[0];
                        break;
                    }
                    default: {
                        matchResult = 0;
                        x = compResult.fields[0];
                    }
                }
        }
        switch (matchResult) {
            case 0: {
                tupledArg_1[0](x);
                break;
            }
            case 1: {
                econt(compExn);
                break;
            }
            case 2: {
                tupledArg_1[2](compExn_1);
                break;
            }
            case 3: {
                econt(deferredExn);
                break;
            }
            case 4: {
                econt(new Error([compExn_2, deferredExn_1]));
                break;
            }
            case 5: {
                econt(deferredExn_2);
                break;
            }
            case 6: {
                econt(new Error("Unexpected cancellation.", deferredExn_3));
                break;
            }
        }
    };
    const startDeferred = (compResult_1, tupledArg_2) => {
        const cont_1 = tupledArg_2[0];
        const econt_1 = tupledArg_2[1];
        const ccont_1 = tupledArg_2[2];
        startWithContinuations(deferred, () => {
            finish([compResult_1, new FSharpChoice$3(0, [void 0])], [cont_1, econt_1, ccont_1]);
        }, (exn) => {
            finish([compResult_1, new FSharpChoice$3(1, [exn])], [cont_1, econt_1, ccont_1]);
        }, (exn_1) => {
            finish([compResult_1, new FSharpChoice$3(2, [exn_1])], [cont_1, econt_1, ccont_1]);
        });
    };
    return singleton.Delay(() => singleton.Bind(cancellationToken(), (_arg) => singleton.ReturnFrom(fromContinuations((tupledArg_3) => {
        const cont_2 = tupledArg_3[0];
        const econt_2 = tupledArg_3[1];
        const ccont_2 = tupledArg_3[2];
        startWithContinuations(comp, (x_1) => {
            startDeferred(new FSharpChoice$3(0, [x_1]), [cont_2, econt_2, ccont_2]);
        }, (exn_2) => {
            startDeferred(new FSharpChoice$3(1, [exn_2]), [cont_2, econt_2, ccont_2]);
        }, (exn_3) => {
            startDeferred(new FSharpChoice$3(2, [exn_3]), [cont_2, econt_2, ccont_2]);
        }, _arg);
    }))));
}

