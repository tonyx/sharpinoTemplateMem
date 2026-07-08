
export function IsResult(_arg) {
    if (_arg.tag === 0) {
        return true;
    }
    else {
        return false;
    }
}

export function IsException(_arg) {
    if (_arg.tag === 1) {
        return true;
    }
    else {
        return false;
    }
}

export function Result(_arg) {
    if (_arg.tag === 1) {
        throw _arg.fields[0];
    }
    else {
        return _arg.fields[0];
    }
}

export function Exception(_arg) {
    if (_arg.tag === 1) {
        return _arg.fields[0];
    }
    else {
        return new Error();
    }
}

