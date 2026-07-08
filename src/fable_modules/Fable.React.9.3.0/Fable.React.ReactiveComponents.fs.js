import { Record } from "../fable-library.4.1.4/Types.js";
import { array_type, record_type, class_type, unit_type, lambda_type, string_type } from "../fable-library.4.1.4/Reflection.js";
import { Component } from "react";
import * as react from "react";

export class ReactiveComponents_Props$3 extends Record {
    constructor(key, props, update, view, init) {
        super();
        this.key = key;
        this.props = props;
        this.update = update;
        this.view = view;
        this.init = init;
    }
}

export function ReactiveComponents_Props$3_$reflection(gen0, gen1, gen2) {
    return record_type("Fable.React.ReactiveComponents.Props`3", [gen0, gen1, gen2], ReactiveComponents_Props$3, () => [["key", string_type], ["props", gen0], ["update", lambda_type(gen2, lambda_type(gen1, gen1))], ["view", lambda_type(ReactiveComponents_Model$2_$reflection(gen0, gen1), lambda_type(lambda_type(gen2, unit_type), class_type("Fable.React.ReactElement")))], ["init", lambda_type(gen0, gen1)]]);
}

export class ReactiveComponents_State$1 extends Record {
    constructor(value) {
        super();
        this.value = value;
    }
}

export function ReactiveComponents_State$1_$reflection(gen0) {
    return record_type("Fable.React.ReactiveComponents.State`1", [gen0], ReactiveComponents_State$1, () => [["value", gen0]]);
}

export class ReactiveComponents_Model$2 extends Record {
    constructor(props, state, children) {
        super();
        this.props = props;
        this.state = state;
        this.children = children;
    }
}

export function ReactiveComponents_Model$2_$reflection(gen0, gen1) {
    return record_type("Fable.React.ReactiveComponents.Model`2", [gen0, gen1], ReactiveComponents_Model$2, () => [["props", gen0], ["state", gen1], ["children", array_type(class_type("Fable.React.ReactElement"))]]);
}

export class ReactiveComponents_ReactiveCom$3 extends Component {
    constructor(initProps) {
        super(initProps);
        this.state = (new ReactiveComponents_State$1(initProps.init(initProps.props)));
    }
    render() {
        const this$ = this;
        const model = new ReactiveComponents_Model$2((this$.props).props, (this$.state).value, Array.prototype.concat(this$.props.children || []));
        return (this$.props).view(model, (msg) => {
            const newState = (this$.props).update(msg, (this$.state).value);
            this$.setState((_arg, _arg_1) => (new ReactiveComponents_State$1(newState)));
        });
    }
}

export function ReactiveComponents_ReactiveCom$3_$reflection(gen0, gen1, gen2) {
    return class_type("Fable.React.ReactiveComponents.ReactiveCom`3", [gen0, gen1, gen2], ReactiveComponents_ReactiveCom$3, class_type("Fable.React.Component`2", [ReactiveComponents_Props$3_$reflection(gen0, gen1, gen2), ReactiveComponents_State$1_$reflection(gen1)], Component));
}

export function ReactiveComponents_ReactiveCom$3_$ctor_79C32B49(initProps) {
    return new ReactiveComponents_ReactiveCom$3(initProps);
}

/**
 * Renders a stateful React component from functions similar to Elmish
 * * `init` - Initializes component state with given props
 * * `update` - Updates the state when `dispatch` is triggered
 * * `view` - Render function, receives a `ReactiveComponents.Model` object and a `dispatch` function
 * * `key` - The key is necessary to identify React elements in a list, an empty string can be passed otherwise
 * * `props` - External properties passed to the component each time it's rendered, usually from its parent
 * * `children` - A list of children React elements
 */
export function ReactiveComponentsHelpers_reactiveCom(init, update, view, key, props, children) {
    const props_1 = new ReactiveComponents_Props$3(key, props, update, view, init);
    return react.createElement(ReactiveComponents_ReactiveCom$3, props_1, ...children);
}

