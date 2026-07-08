import { FSharpResult$2 } from "../fable-library.4.1.4/Choice.js";

/**
 * Takes two results and returns a tuple of the pair
 * 
 * Documentation is found here: <href>https://demystifyfp.gitbook.io/fstoolkit-errorhandling/fstoolkit.errorhandling/result/zip</href>
 */
export function zip(left, right) {
    const copyOfStruct = left;
    if (copyOfStruct.tag === 1) {
        return new FSharpResult$2(1, [copyOfStruct.fields[0]]);
    }
    else {
        const copyOfStruct_1 = right;
        if (copyOfStruct_1.tag === 1) {
            return new FSharpResult$2(1, [copyOfStruct_1.fields[0]]);
        }
        else {
            return new FSharpResult$2(0, [[copyOfStruct.fields[0], copyOfStruct_1.fields[0]]]);
        }
    }
}

/**
 * Takes two results and returns a tuple of the error pair
 * 
 * Documentation is found here: <href>https://demystifyfp.gitbook.io/fstoolkit-errorhandling/fstoolkit.errorhandling/result/ziperror</href>
 */
export function zipError(left, right) {
    const copyOfStruct = left;
    if (copyOfStruct.tag === 0) {
        return new FSharpResult$2(0, [copyOfStruct.fields[0]]);
    }
    else {
        const copyOfStruct_1 = right;
        if (copyOfStruct_1.tag === 0) {
            return new FSharpResult$2(0, [copyOfStruct_1.fields[0]]);
        }
        else {
            return new FSharpResult$2(1, [[copyOfStruct.fields[0], copyOfStruct_1.fields[0]]]);
        }
    }
}

