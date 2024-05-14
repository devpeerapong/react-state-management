import { atom, useAtom } from "jotai";

import { RerenderCount } from "./RerenderCount";

const countAtom = atom(0);

function DecrementButton() {
	const [, decrement] = useAtom(countAtom);

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const [, increment] = useAtom(countAtom);

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
