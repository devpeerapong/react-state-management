import { createStore, select, withProps, setProp } from "@ngneat/elf";
import { useObservable } from "@ngneat/use-observable";

import { RerenderCount } from "./RerenderCount";

const store = createStore({ name: "count" }, withProps({ count: 0 }));
const increment = () => store.update(setProp("count", (c) => c + 1));
const decrement = () => store.update(setProp("count", (c) => c - 1));
const count$ = store.pipe(select(({ count }) => count));

function DecrementButton() {
	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const count = useObservable(count$);

	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function Elf() {
	return (
		<div className="grid grid-cols-3 items-center">
			<DecrementButton />
			<Count />
			<IncrementButton />
		</div>
	);
}
