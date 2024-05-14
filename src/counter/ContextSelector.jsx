import { useState, useCallback } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { RerenderCount } from "../RerenderCount";

const CountContext = createContext();
function CountProvider({ children }) {
	const [count, setCount] = useState(0);
	const decrement = useCallback(() => setCount((c) => c - 1), []);
	const increment = useCallback(() => setCount((c) => c + 1), []);

	const value = { count, increment, decrement };

	return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
}
function useCount(selector) {
	return useContextSelector(CountContext, selector);
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

export function ContextSelector() {
	return (
		<CountProvider>
			<div className="grid grid-cols-3 items-center">
				<DecrementButton />
				<Count />
				<IncrementButton />
			</div>
		</CountProvider>
	);
}
