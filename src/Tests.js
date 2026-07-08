import { EventBroker_MessageSenders, Cache_DetailsCache_get_Instance, Cache_DetailsCache__Clear, Cache_AggregateCache3_get_Instance, Cache_AggregateCache3__Clear, MemoryStorage_MemoryStorage__Reset, MemoryStorage_MemoryStorage_$ctor } from "./SharpinoCoreShim.js";
import { Todo_New_Z721C83C5, Todo_get_StorageName, Todo_get_Version } from "./Models/Todo/Todo.js";
import { Sharpino_Template_TaskShim_task, Sharpino_Template_TaskShim_TaskBuilder__Zero, Sharpino_Template_TaskShim_TaskBuilder__Bind_7A510B33, Sharpino_Template_TaskShim_TaskBuilder__Delay_Z5276B41B, Sharpino_Template_TaskShim_TaskBuilder__Run_ZD4A93B1, FsToolkit_ErrorHandling_Result_get, Sharpino_CommandHandler_GlobalState_getAggregateStorageFreshStateViewer } from "./SharpinoHandlerShim.js";
import { TestDsl_testCaseTask, Expect_isTrue, Expect_hasLength, Expect_isOk, TestDsl_testCase, TestDsl_testList, TestDsl_testSequenced } from "./ExpectoShim.js";
import { TodoManager__GetTodosAsync_Z38F9059F, TodoManager__GetTodo_401790A8, TodoManager__AddTodo_5AC33647, TodoManager_$ctor_Z5EE5FDB5 } from "./TodoManager.js";
import { ofArray, exists, singleton } from "./fable_modules/fable-library.4.1.4/List.js";
import { startImmediate, awaitPromise } from "./fable_modules/fable-library.4.1.4/Async.js";
import { singleton as singleton_1 } from "./fable_modules/fable-library.4.1.4/AsyncBuilder.js";
import { value as value_1 } from "./fable_modules/fable-library.4.1.4/Option.js";
import { equals } from "./fable_modules/fable-library.4.1.4/Util.js";

export const memEventStore = MemoryStorage_MemoryStorage_$ctor();

export function setUp() {
    const value = MemoryStorage_MemoryStorage__Reset(memEventStore, Todo_get_Version(), Todo_get_StorageName());
    Cache_AggregateCache3__Clear(Cache_AggregateCache3_get_Instance());
    Cache_DetailsCache__Clear(Cache_DetailsCache_get_Instance());
}

export const memTodoViewer = (id) => Sharpino_CommandHandler_GlobalState_getAggregateStorageFreshStateViewer(memEventStore, id);

export const tests = TestDsl_testSequenced(TestDsl_testList("todos tests", ofArray([TestDsl_testCase("add and retrieve a todo", () => {
    setUp();
    const todoManager = TodoManager_$ctor_Z5EE5FDB5(new EventBroker_MessageSenders(), memEventStore, memTodoViewer);
    const learnFSharp = Todo_New_Z721C83C5("Learn F#");
    Expect_isOk(TodoManager__AddTodo_5AC33647(todoManager, learnFSharp), "error in adding todo");
    Expect_isOk(TodoManager__GetTodo_401790A8(todoManager, learnFSharp.TodoId), "error in retrieving todo");
}), TestDsl_testCase("add two todos and retrieve all todos", () => {
    let x_2, x_1, result;
    setUp();
    const todoManager_1 = TodoManager_$ctor_Z5EE5FDB5(new EventBroker_MessageSenders(), memEventStore, memTodoViewer);
    const learnFSharp_1 = Todo_New_Z721C83C5("Learn F#");
    const learnRust = Todo_New_Z721C83C5("Learn Rust");
    const addLearnFSharp_1 = TodoManager__AddTodo_5AC33647(todoManager_1, learnFSharp_1);
    const addLearnRust = TodoManager__AddTodo_5AC33647(todoManager_1, learnRust);
    Expect_isOk(addLearnFSharp_1, "error in adding todo");
    Expect_isOk(addLearnRust, "error in adding todo");
    const retrievedTodos = FsToolkit_ErrorHandling_Result_get((x_2 = ((x_1 = TodoManager__GetTodosAsync_Z38F9059F(todoManager_1), (typeof singleton(x_1).then === 'function') ? awaitPromise(x_1) : x_1)), (result = void 0, (startImmediate(singleton_1.Delay(() => singleton_1.Bind(x_2, (_arg_2) => {
        result = _arg_2;
        return singleton_1.Zero();
    }))), value_1(result)))));
    Expect_hasLength(retrievedTodos, 2, "error in retrieving todos");
    Expect_isTrue(exists((x_4) => equals(x_4, learnFSharp_1), retrievedTodos), "error in retrieving todos");
    Expect_isTrue(exists((x_5) => equals(x_5, learnRust), retrievedTodos), "error in retrieving todos");
}), TestDsl_testCaseTask("add two todos and retrieve all todos using task", () => Sharpino_Template_TaskShim_TaskBuilder__Run_ZD4A93B1(Sharpino_Template_TaskShim_task, Sharpino_Template_TaskShim_TaskBuilder__Delay_Z5276B41B(Sharpino_Template_TaskShim_task, () => {
    setUp();
    const todoManager_2 = TodoManager_$ctor_Z5EE5FDB5(new EventBroker_MessageSenders(), memEventStore, memTodoViewer);
    const learnFSharp_2 = Todo_New_Z721C83C5("Learn F#");
    const learnRust_1 = Todo_New_Z721C83C5("Learn Rust");
    const addLearnFSharp_2 = TodoManager__AddTodo_5AC33647(todoManager_2, learnFSharp_2);
    const addLearnRust_1 = TodoManager__AddTodo_5AC33647(todoManager_2, learnRust_1);
    Expect_isOk(addLearnFSharp_2, "error in adding todo");
    Expect_isOk(addLearnRust_1, "error in adding todo");
    return Sharpino_Template_TaskShim_TaskBuilder__Bind_7A510B33(Sharpino_Template_TaskShim_task, TodoManager__GetTodosAsync_Z38F9059F(todoManager_2), (_arg_5) => {
        const retrievedTodos_2 = FsToolkit_ErrorHandling_Result_get(_arg_5);
        Expect_hasLength(retrievedTodos_2, 2, "error in retrieving todos");
        Expect_isTrue(exists((x_6) => equals(x_6, learnFSharp_2), retrievedTodos_2), "error in retrieving todos");
        Expect_isTrue(exists((x_7) => equals(x_7, learnRust_1), retrievedTodos_2), "error in retrieving todos");
        return Sharpino_Template_TaskShim_TaskBuilder__Zero(Sharpino_Template_TaskShim_task);
    });
}))), TestDsl_testCaseTask("fail test", () => Sharpino_Template_TaskShim_TaskBuilder__Run_ZD4A93B1(Sharpino_Template_TaskShim_task, Sharpino_Template_TaskShim_TaskBuilder__Delay_Z5276B41B(Sharpino_Template_TaskShim_task, () => {
    Expect_isTrue(false, "will fail");
    return Sharpino_Template_TaskShim_TaskBuilder__Zero(Sharpino_Template_TaskShim_task);
})))])));

