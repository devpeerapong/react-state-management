import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { RerenderCount } from "./RerenderCount";

class Counter {
	counter = 0;

	constructor() {
		makeAutoObservable(this);
	}

	increment() {
		this.counter = this.counter + 1;
	}

	decrement() {
		this.counter = this.counter - 1;
	}
}

const store = new Counter();

function DecrementButton() {
	const decrement = () => store.decrement();

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const increment = () => store.increment();

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

const Count = observer(function Count({ store }) {
	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{store.counter}
				<RerenderCount />
			</span>
		</div>
	);
});

export function Mobx() {
	return (
		<div className="grid grid-cols-3 items-center">
			<DecrementButton />
			<Count store={store} />
			<IncrementButton />
		</div>
	);
}
