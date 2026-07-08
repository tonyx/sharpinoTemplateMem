
export function Tuple2_mapItem1(f, x, y) {
    return [f(x), y];
}

export function Tuple2_mapItem2(f, x, y) {
    return [x, f(y)];
}

export function Tuple3_mapItem1(f, x, y, z) {
    return [f(x), y, z];
}

export function Tuple3_mapItem2(f, x, y, z) {
    return [x, f(y), z];
}

export function Tuple3_mapItem3(f, x, y, z) {
    return [x, y, f(z)];
}

