import { useState, createContext, useContext } from "react";
import { RerenderCount } from "./RerenderCount";

const CountContext = createContext();
function CountProvider({ children }) {
	const [count, setCount] = useState(0);
	const decrement = () => setCount((c) => c - 1);
	const increment = () => setCount((c) => c + 1);

	const value = { count, increment, decrement };

	return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
}
function useCount() {
	return useContext(CountContext);
}

function DecrementButton() {
	const { decrement } = useCount();

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const { increment } = useCount();

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const { count } = useCount();

	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function Context() {
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
