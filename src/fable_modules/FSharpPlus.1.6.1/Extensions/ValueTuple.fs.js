
export function ValueTuple2_mapItem1(f, _arg) {
    return [f(_arg[0]), _arg[1]];
}

export function ValueTuple2_mapItem2(f, _arg) {
    return [_arg[0], f(_arg[1])];
}

export function ValueTuple3_mapItem1(f, _arg) {
    return [f(_arg[0]), _arg[1], _arg[2]];
}

export function ValueTuple3_mapItem2(f, _arg) {
    return [_arg[0], f(_arg[1]), _arg[2]];
}

export function ValueTuple3_mapItem3(f, _arg) {
    return [_arg[0], _arg[1], f(_arg[2])];
}

