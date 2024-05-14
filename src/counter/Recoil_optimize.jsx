import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";

import { RerenderCount } from "../RerenderCount";

const countAtom = atom({
	key: "count",
	default: 0,
});

function DecrementButton() {
	const setCount = useSetRecoilState(countAtom);
	const decrement = () => setCount((count) => count - 1);

	return (
		<button className="btn btn-warning relative" onClick={decrement}>
			Decrement
			<RerenderCount />
		</button>
	);
}

function IncrementButton() {
	const setCount = useSetRecoilState(countAtom);
	const increment = () => setCount((count) => count + 1);

	return (
		<button className="btn btn-primary relative" onClick={increment}>
			Increment
			<RerenderCount />
		</button>
	);
}

function Count() {
	const count = useRecoilValue(countAtom);

	return (
		<div className="text-2xl text-center">
			<span className="relative">
				{count}
				<RerenderCount />
			</span>
		</div>
	);
}

export function Recoil() {
	return (
		<RecoilRoot>
			<div className="grid grid-cols-3 items-center">
				<DecrementButton />
				<Count />
				<IncrementButton />
			</div>
		</RecoilRoot>
	);
}
