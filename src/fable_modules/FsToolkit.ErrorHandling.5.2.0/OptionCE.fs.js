import { class_type } from "../fable-library.4.1.4/Reflection.js";

export class OptionBuilderBase {
    constructor() {
    }
}

export function OptionBuilderBase_$reflection() {
    return class_type("FsToolkit.ErrorHandling.OptionCE.OptionBuilderBase", void 0, OptionBuilderBase);
}

export function OptionBuilderBase_$ctor() {
    return new OptionBuilderBase();
}

export class OptionBuilder extends OptionBuilderBase {
    constructor() {
        super();
    }
}

export function OptionBuilder_$reflection() {
    return class_type("FsToolkit.ErrorHandling.OptionCE.OptionBuilder", void 0, OptionBuilder, OptionBuilderBase_$reflection());
}

export function OptionBuilder_$ctor() {
    return new OptionBuilder();
}

export class ValueOptionBuilder extends OptionBuilderBase {
    constructor() {
        super();
    }
}

export function ValueOptionBuilder_$reflection() {
    return class_type("FsToolkit.ErrorHandling.OptionCE.ValueOptionBuilder", void 0, ValueOptionBuilder, OptionBuilderBase_$reflection());
}

export function ValueOptionBuilder_$ctor() {
    return new ValueOptionBuilder();
}

export const OptionCEExtensions_option = OptionBuilder_$ctor();

export const OptionCEExtensions_voption = ValueOptionBuilder_$ctor();

