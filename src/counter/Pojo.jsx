import { useSyncExternalStore } from "react";
import { RerenderCount } from "./RerenderCount";

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
}

const counter = {
	count: 0,
	increment() {
		counter.count++;
		notify();
	},
	decrement() {
		counter.count--;
		notify();
	},
};

function useCount(selector) {
	return useSyncExternalStore(subscribe, () => selector(counter));
}

function DecrementButton() {
	const decrement = useCount(({ decrement }) => decrement);

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const increment = useCount(({ increment }) => increment);

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const count = useCount(({ count }) => count);

	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function Pojo() {
	return (
		<div className="grid grid-cols-3 items-center">
			<DecrementButton />
			<Count />
			<IncrementButton />
		</div>
	);
}
