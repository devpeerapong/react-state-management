import { atom, useAtom } from "jotai";

import { RerenderCount } from "./RerenderCount";

const countAtom = atom(0);
const incrementAtom = atom(null, (get, set) => set(countAtom, get(countAtom) + 1));
const decrementAtom = atom(null, (get, set) => set(countAtom, get(countAtom) - 1));

function DecrementButton() {
	const [, decrement] = useAtom(decrementAtom);

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const [, increment] = useAtom(incrementAtom);

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const [count] = useAtom(countAtom);

	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function Jotai() {
	return (
		<div className="grid grid-cols-3 items-center">
			<DecrementButton />
			<Count />
			<IncrementButton />
		</div>
	);
}
