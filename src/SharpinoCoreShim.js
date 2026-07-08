import { Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { class_type, union_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { comparePrimitives, createAtom } from "./fable_modules/fable-library.4.1.4/Util.js";
import { empty } from "./fable_modules/fable-library.4.1.4/Map.js";

export class Core_MessageSenders extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["NoSender"];
    }
}

export function Core_MessageSenders_$reflection() {
    return union_type("Sharpino.Core.MessageSenders", [], Core_MessageSenders, () => [[]]);
}

export class EventBroker_MessageSenders extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["NoSender"];
    }
}

export function EventBroker_MessageSenders_$reflection() {
    return union_type("Sharpino.EventBroker.MessageSenders", [], EventBroker_MessageSenders, () => [[]]);
}

export let Storage_GlobalStorageState_states = createAtom(empty({
    Compare: comparePrimitives,
}));

export let Storage_GlobalStorageState_events = createAtom(empty({
    Compare: comparePrimitives,
}));

export function Storage_GlobalStorageState_clear() {
    Storage_GlobalStorageState_states(empty({
        Compare: comparePrimitives,
    }));
    Storage_GlobalStorageState_events(empty({
        Compare: comparePrimitives,
    }));
}

export class MemoryStorage_MemoryStorage {
    constructor() {
    }
}

export function MemoryStorage_MemoryStorage_$reflection() {
    return class_type("Sharpino.MemoryStorage.MemoryStorage", void 0, MemoryStorage_MemoryStorage);
}

export function MemoryStorage_MemoryStorage_$ctor() {
    return new MemoryStorage_MemoryStorage();
}

export function MemoryStorage_MemoryStorage__Reset(this$, version, storageName) {
    Storage_GlobalStorageState_clear();
}

export class Cache_AggregateCache3 {
    constructor() {
    }
}

export function Cache_AggregateCache3_$reflection() {
    return class_type("Sharpino.Cache.AggregateCache3", void 0, Cache_AggregateCache3);
}

export function Cache_AggregateCache3_$ctor() {
    return new Cache_AggregateCache3();
}

export function Cache_AggregateCache3_get_Instance() {
    return Cache_AggregateCache3_$ctor();
}

export function Cache_AggregateCache3__Clear(this$) {
}

export class Cache_DetailsCache {
    constructor() {
    }
}

export function Cache_DetailsCache_$reflection() {
    return class_type("Sharpino.Cache.DetailsCache", void 0, Cache_DetailsCache);
}

export function Cache_DetailsCache_$ctor() {
    return new Cache_DetailsCache();
}

export function Cache_DetailsCache_get_Instance() {
    return Cache_DetailsCache_$ctor();
}

export function Cache_DetailsCache__Clear(this$) {
}

