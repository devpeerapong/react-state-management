import { useState } from "react";
import { RerenderCount } from "./RerenderCount";

function DecrementButton({ onClick }) {
	return (
		<button className="btn btn-warning relative" onClick={onClick}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton({ onClick }) {
	return (
		<button className="btn btn-primary relative" onClick={onClick}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count({ count }) {
	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function State() {
	const [count, setCount] = useState(0);
	const decrement = () => setCount((c) => c - 1);
	const increment = () => setCount((c) => c + 1);

	return (
		<div className="grid grid-cols-3 items-center">
			<DecrementButton onClick={decrement} />
			<Count count={count} />
			<IncrementButton onClick={increment} />
		</div>
	);
}
