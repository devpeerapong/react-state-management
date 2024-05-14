import { createMachine, assign } from "xstate";
import { useSelector, useInterpret } from "@xstate/react";
import { RerenderCount } from "./RerenderCount";
import { createContext, useContext } from "react";

const machine = createMachine({
	initial: "active",
	context: {
		count: 0,
	},
	states: {
		active: {
			on: {
				INCREMENT: { actions: assign({ count: (context) => context.count + 1 }) },
				DECREMENT: { actions: assign({ count: (context) => context.count - 1 }) },
			},
		},
	},
});

export const CountMachineContext = createContext({});

function CountMachineProvider({ children }) {
	const value = useInterpret(machine);

	return <CountMachineContext.Provider value={value}>{children}</CountMachineContext.Provider>;
}

function useCountMachine() {
	return useContext(CountMachineContext);
}

function DecrementButton() {
	const countMachine = useCountMachine();
	const decrement = () => countMachine.send("DECREMENT");

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const countMachine = useCountMachine();
	const increment = () => countMachine.send("INCREMENT");

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const count = useSelector(useCountMachine(), (state) => state.context.count);

	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function XState() {
	return (
		<CountMachineProvider>
			<div className="grid grid-cols-3 items-center">
				<DecrementButton />
				<Count />
				<IncrementButton />
			</div>
		</CountMachineProvider>
	);
}
