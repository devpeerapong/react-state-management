// import { Context } from "./Context_optimize";
// import { ContextSelector } from "./counter/ContextSelector";
// import { Elf } from "./Elf";
// import { Jotai } from "./Jotai";
// import { Mobx } from "./Mobx";
// import { Pojo } from "./Pojo";
// import { Recoil } from "./Recoil_optimize";
// import { Recoil } from "./Recoil";
// import { ReduxToolkit } from "./ReduxToolkit_no-react-redux";
// import { ReduxToolkit } from "./ReduxToolkit";
// import { State } from "./State_optimize";
// import { XState } from "./Xstate";
// import { Zustand } from "./Zustand";
import { Context } from "./todos/Context";
import { Context as ContextOptimize } from "./todos/Context_optimize";
import { ContextSelector } from "./todos/ContextSelector";
import { State } from "./todos/State";
import { State as StateOptimize } from "./todos/State_optimize";
import { Pojo } from "./todos/Pojo";

// import { Zustand } from "./todos/Zustand";

import { useState } from "react";
import clsx from "clsx";

const routes = {
	State,
	StateOptimize,
	Context,
	ContextOptimize,
	ContextSelector,
	Pojo,
};

function App() {
	const [route, setRoute] = useState("State");
	const Route = routes[route];

	return (
		<div className="max-w-screen-md mx-auto p-8">
			<div className="join pb-2 mb-8 border-b w-full">
				{Object.keys(routes).map((key) => (
					<button
						key={key}
						className={clsx("join-item btn btn-sm", key === route ? "btn-primary" : "btn-ghost")}
						onClick={() => setRoute(key)}
					>
						{key}
					</button>
				))}
			</div>
			<Route />
		</div>
	);
}

export default App;
