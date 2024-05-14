import { create } from "zustand";
import { RerenderCount } from "./RerenderCount";

const useCount = create((set) => ({
	count: 0,
	increment: () => set((state) => ({ count: state.count + 1 })),
	decrement: () => set((state) => ({ count: state.count - 1 })),
}));

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

export function Zustand() {
	return (
		<div className="grid grid-cols-3 items-center">
			<DecrementButton />
			<Count />
			<IncrementButton />
		</div>
	);
}
