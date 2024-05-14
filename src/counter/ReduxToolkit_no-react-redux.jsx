import { configureStore, createSlice } from "@reduxjs/toolkit";
import { RerenderCount } from "./RerenderCount";
import { useSyncExternalStore } from "react";

const { reducer, actions } = createSlice({
	name: "count",
	initialState: { count: 0 },
	reducers: {
		increment: (state) => void state.count++,
		decrement: (state) => void state.count--,
	},
});

const store = configureStore({
	reducer: {
		counter: reducer,
	},
});
const dispatch = store.dispatch.bind(store);

function useSelector(selector) {
	return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
}

function DecrementButton() {
	const decrement = () => dispatch(actions.decrement());

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const increment = () => dispatch(actions.increment());

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const count = useSelector((state) => state.counter.count);

	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function ReduxToolkit() {
	return (
		<div className="grid grid-cols-3 items-center">
			<DecrementButton />
			<Count />
			<IncrementButton />
		</div>
	);
}
