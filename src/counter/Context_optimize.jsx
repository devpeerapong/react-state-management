import { useState, createContext, useContext, useMemo } from "react";
import { RerenderCount } from "../RerenderCount";

const CountStateContext = createContext();
const CountActionContext = createContext();
CountStateContext.displayName = "CountState";
CountActionContext.displayName = "CountAction";

function CountProvider({ children }) {
	const [count, setCount] = useState(0);
	const decrement = () => setCount((c) => c - 1);
	const increment = () => setCount((c) => c + 1);
	const action = useMemo(() => ({ decrement, increment }), []);

	return (
		<CountStateContext.Provider value={count}>
			<CountActionContext.Provider value={action}>{children}</CountActionContext.Provider>
		</CountStateContext.Provider>
	);
}
function useCountState() {
	return useContext(CountStateContext);
}
function useCountAction() {
	return useContext(CountActionContext);
}

function DecrementButton() {
	const { decrement } = useCountAction();

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const { increment } = useCountAction();

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const count = useCountState();

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
