import { memo } from "react";
import { create } from "zustand";
import { produce } from "immer";
import { RerenderCount } from "../RerenderCount";
import { useSyncExternalStore } from "react";

const listeners = [];
function subscribe(callback) {
	listeners.push(callback);

	return () => {
		listeners.splice(listeners.indexOf(callback), 1);
	};
}
function notify() {
	for (const listener of listeners) {
		listener();
	}

	Todos.visibleTodos = Todos.todos.filter((item) => {
		if (Todos.filter === "All") return true;
		if (Todos.filter === "Active") return !item.done;
		return item.done;
	});
}

const Todos = {
	todos: [{ id: Date.now(), title: "Learn React", done: false }],
	newTodo: "",
	filter: "All",
	error: "",
	visibleTodos: [{ id: Date.now(), title: "Learn React", done: false }],
	addTodo: () => {
		if (Todos.newTodo === "") {
			Todos.error = "New todo is required.";
			return;
		}

		Todos.error = "";
		Todos.todos.push({ id: Date.now(), title: Todos.newTodo, done: false });
		Todos.newTodo = "";
		notify();
	},
	changeNewTodo: (n) => {
		Todos.newTodo = n;
		notify();
	},
	clearTodos: () => {
		Todos.todos = [];
		notify();
	},
	changeFilter: (f) => {
		Todos.filter = f;
		notify();
	},
	toggleDone: (id) => {
		const index = Todos.todos.findIndex((item) => item.id === id);
		const todo = Todos.todos[index];
		todo.done = !todo.done;
		notify();
	},
};

function useTodos(selector) {
	return useSyncExternalStore(subscribe, () => selector(Todos));
}

window.useTodos = useTodos;
function ClearButton() {
	const onClick = useTodos(({ clearTodos }) => clearTodos);

	return (
		<button className="btn btn-sm btn-error relative" onClick={onClick}>
			<RerenderCount name="ClearButton" />
			Clear
		</button>
	);
}

function RemainingItems() {
	const todos = useTodos(({ todos }) => todos);
	const filter = useTodos(({ filter }) => filter);
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
}

const Filters = function Filters() {
	const value = useTodos(({ filter }) => filter);
	const onChange = useTodos(({ changeFilter }) => changeFilter);

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
};

function Todo({ id, title, done, onToggleDone }) {
	return (
		<div className="flex items-center gap-4 py-4 relative border-b">
			<RerenderCount name="Todo" />
			<input type="checkbox" className="checkbox" checked={done} value={id} onChange={() => onToggleDone(id)} />
			{title}
		</div>
	);
}

function TodoList() {
	const onToggleDone = useTodos(({ toggleDone }) => toggleDone);
	const value = useTodos(({ visibleTodos }) => visibleTodos);

	return (
		<div className="flex flex-col justify-start relative">
			<RerenderCount name="TodoList" />

			{value.length === 0 && <div className="text-center font-bold p-4">No Result</div>}
			{value.map((item) => (
				<Todo key={item.id} id={item.id} title={item.title} done={item.done} onToggleDone={onToggleDone} />
			))}
		</div>
	);
}

function Footer() {
	return (
		<div className="flex gap-4 items-center relative">
			<RerenderCount name="Footer" />
			<RemainingItems />
			<ClearButton />
		</div>
	);
}

function NewTodo() {
	const value = useTodos(({ newTodo }) => newTodo);
	const onChange = useTodos(({ changeNewTodo }) => changeNewTodo);
	const onSubmit = useTodos(({ addTodo }) => addTodo);

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
}

function Error() {
	const message = useTodos(({ error }) => error);

	if (!message) {
		return null;
	}

	return (
		<div className="alert alert-error my-2 relative">
			<RerenderCount name="Error" />
			{message}
		</div>
	);
}

export function Pojo() {
	return (
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
	);
}
