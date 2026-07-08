import * as react from "react";
import { equals, defaultOf, uncurry2 } from "../fable-library.4.1.4/Util.js";
import { choose, fold } from "../fable-library.4.1.4/Seq.js";
import { isNullOrEmpty } from "../fable-library.4.1.4/String.js";
import { HTMLAttr } from "./Fable.React.Props.fs.js";

/**
 * React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.
 * If your function component renders the same result given the same props, you can wrap it in a call to React.memo.
 * React will skip rendering the component, and reuse the last rendered result.
 * By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can use `memoWith`.
 */
export function ReactElementTypeModule_memo(render) {
    return react.memo(render, uncurry2(defaultOf()));
}

/**
 * React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.
 * If your function renders the same result given the "same" props (according to `areEqual`), you can wrap it in a call to React.memo.
 * React will skip rendering the component, and reuse the last rendered result.
 * By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can use `memoWith`.
 * This version allow you to control the comparison used instead of the default shallow one by provide a custom comparison function.
 */
export function ReactElementTypeModule_memoWith(areEqual, render) {
    return react.memo(render, areEqual);
}

/**
 * Normal structural F# comparison, but ignores top-level functions (e.g. Elmish dispatch).
 * Can be used e.g. with the `FunctionComponent.Of` `memoizeWith` parameter.
 */
export function Helpers_equalsButFunctions(x, y) {
    if (x === y) {
        return true;
    }
    else if ((typeof x === 'object' && !x[Symbol.iterator]) && !(y == null)) {
        const keys = Object.keys(x);
        const length = keys.length | 0;
        let i = 0;
        let result = true;
        while ((i < length) && result) {
            const key = keys[i];
            i = ((i + 1) | 0);
            const xValue = x[key];
            result = ((typeof xValue === 'function') ? true : equals(xValue, y[key]));
        }
        return result;
    }
    else {
        return equals(x, y);
    }
}

/**
 * Comparison similar to default React.memo, but ignores functions (e.g. Elmish dispatch).
 * Performs a memberwise comparison where value types and strings are compared by value,
 * and other types by reference.
 * Can be used e.g. with the `FunctionComponent.Of` `memoizeWith` parameter.
 */
export function Helpers_memoEqualsButFunctions(x, y) {
    if (x === y) {
        return true;
    }
    else if ((typeof x === 'object' && !x[Symbol.iterator]) && !(y == null)) {
        const keys = Object.keys(x);
        const length = keys.length | 0;
        let i = 0;
        let result = true;
        while ((i < length) && result) {
            const key = keys[i];
            i = ((i + 1) | 0);
            const xValue = x[key];
            result = ((typeof xValue === 'function') ? true : (xValue === y[key]));
        }
        return result;
    }
    else {
        return false;
    }
}

export function Helpers_memoBuilder(name, render) {
    render.displayName = name;
    const memoType = ReactElementTypeModule_memo(render);
    return (props) => react.createElement(memoType, props);
}

export function Helpers_memoBuilderWith(name, areEqual, render) {
    render.displayName = name;
    const memoType = ReactElementTypeModule_memoWith(areEqual, render);
    return (props) => react.createElement(memoType, props);
}

export function Helpers_opt(o) {
    const o_1 = o;
    if (o_1 == null) {
        return defaultOf();
    }
    else {
        return o_1;
    }
}

export const Helpers_nothing = defaultOf();

export function Helpers_classBaseList(baseClass, classes) {
    return new HTMLAttr(64, [fold((state, name_1) => ((state + " ") + name_1), baseClass, choose((tupledArg) => {
        const name = tupledArg[0];
        if (tupledArg[1] && !isNullOrEmpty(name)) {
            return name;
        }
        else {
            return void 0;
        }
    }, classes))]);
}

export function Helpers_classList(classes) {
    return Helpers_classBaseList("", classes);
}

