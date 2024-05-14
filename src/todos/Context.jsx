import { useState, useMemo, useCallback, memo, createContext, useContext } from "react";
import { RerenderCount } from "../RerenderCount";
import { produce } from "immer";

const TodoContext = createContext();
TodoContext.displayName = "TodoContext";

function useTodoContext() {
	return useContext(TodoContext);
}

function TodoProvider({ children }) {
	const [{ todos, newTodo, filter, error }, setState] = useState({
		todos: [{ id: Date.now(), title: "Learn React", done: false }],
		newTodo: "",
		filter: "All",
		error: "",
	});
	const visibleTodos = useMemo(
		() =>
			todos.filter((item) => {
				if (filter === "All") return true;
				if (filter === "Active") return !item.done;
				return item.done;
			}),
		[todos, filter]
	);

	const addTodo = useCallback(
		() =>
			setState(
				produce((draft) => {
					if (draft.newTodo === "") {
						draft.error = "New todo is required.";
						return;
					}

					draft.error = "";
					draft.todos.push({ id: Date.now(), title: draft.newTodo, done: false });
					draft.newTodo = "";
				})
			),
		[]
	);
	const changeNewTodo = useCallback((n) => setState(produce((draft) => void (draft.newTodo = n))), []);
	const clearTodos = useCallback(() => setState(produce((draft) => void (draft.todos = []))), []);
	const changeFilter = useCallback((f) => setState(produce((draft) => void (draft.filter = f))), []);
	const toggleDone = useCallback(
		(id) =>
			setState(
				produce((draft) => {
					const index = draft.todos.findIndex((item) => item.id === id);
					const todo = draft.todos[index];
					todo.done = !todo.done;
				})
			),
		[]
	);

	const value = useMemo(
		() => ({
			todos,
			visibleTodos,
			newTodo,
			changeNewTodo,
			addTodo,
			error,
			clearTodos,
			filter,
			changeFilter,
			toggleDone,
		}),
		[todos, visibleTodos, newTodo, changeNewTodo, addTodo, error, clearTodos, filter, changeFilter, toggleDone]
	);

	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

const ClearButton = memo(function ClearButton() {
	const { clearTodos: onClick } = useTodoContext();

	return (
		<button className="btn btn-sm btn-error relative" onClick={onClick}>
			<RerenderCount name="ClearButton" />
			Clear
		</button>
	);
});

const RemainingItems = memo(function RemainingItems() {
	const { todos, filter } = useTodoContext();
	const numberOfRemaining = todos.reduce((memo, item) => {
		if (filter === "All") return memo + 1;
		if (filter === "Active" && !item.done) return memo + 1;
		if (filter === "Done" && item.done) return memo + 1;
		return memo;
	}, 0);

	return (
		<span className="relative">
			<RerenderCount name="RemainingItems" />
			{numberOfRemaining} item(s)
		</span>
	);
});

const Filters = memo(function Filters() {
	const { filter: value, changeFilter: onChange } = useTodoContext();

	return (
		<div className="join mb-1 relative">
			<RerenderCount name="Filters" />
			{["All", "Active", "Done"].map((filter) => (
				<input
					key={filter}
					className="join-item btn btn-sm"
					type="radio"
					name="filter"
					aria-label={filter}
					value={filter}
					checked={filter === value}
					onChange={() => onChange(filter)}
				/>
			))}
		</div>
	);
});

const Todo = memo(function Todo({ id, title, done, onToggleDone }) {
	return (
		<div className="flex items-center gap-4 py-4 border-b">
			<input type="checkbox" className="checkbox" checked={done} value={id} onChange={() => onToggleDone(id)} />
			<span className="relative">
				{title}
				<RerenderCount name="Todo" />
			</span>
		</div>
	);
});

const TodoList = memo(function TodoList() {
	const { visibleTodos: value, toggleDone: onToggleDone } = useTodoContext();

	return (
		<div className="flex flex-col justify-start relative">
			<RerenderCount name="TodoList" />

			{value.length === 0 && <div className="text-center font-bold p-4">No Result</div>}
			{value.map((item) => (
				<Todo key={item.id} id={item.id} title={item.title} done={item.done} onToggleDone={onToggleDone} />
			))}
		</div>
	);
});

const Footer = memo(function Footer() {
	return (
		<div className="flex gap-4 items-center relative">
			<RerenderCount name="Footer" />
			<RemainingItems />
			<ClearButton />
		</div>
	);
});

const NewTodo = memo(function NewTodo() {
	const { newTodo: value, changeNewTodo: onChange, addTodo: onSubmit } = useTodoContext();

	return (
		<div className="form-control">
			<label className="font-bold mb-1 relative w-fit">
				New Todo
				<RerenderCount name="NewTodo" />
			</label>
			<div className="input-group">
				<input
					name="new-todo"
					className="input input-bordered"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<button className="btn btn-square btn-success" onClick={onSubmit}>
					Add
				</button>
			</div>
		</div>
	);
});

const Error = memo(function Error() {
	const { error: message } = useTodoContext();

	if (!message) {
		return null;
	}

	return (
		<div className="alert alert-error my-2 relative">
			<RerenderCount name="Error" />
			{message}
		</div>
	);
});

export function Context() {
	return (
		<TodoProvider>
			<div className="grid grid-cols-1 gap-4 relative">
				<RerenderCount name="App" />
				<div className="mb-4">
					<NewTodo />
					<Error />
				</div>
				<div className="flex flex-col relative">
					<div className="flex gap-2 mb-2">
						<h4 className="text-2xl">Todos</h4>
						<Filters />
					</div>
					<TodoList />
				</div>
				<Footer />
			</div>
		</TodoProvider>
	);
}
