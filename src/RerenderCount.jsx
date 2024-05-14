import { useEffect } from "react";
import { useRef } from "react";

export function RerenderCount({ name }) {
	const count = useRef(0);
	const ref = useRef();
	count.current++;

	useEffect(() => {
		const enterCallback = (e) => e.target.classList.add("tooltip-open");
		const leaveCallback = (e) => e.target.classList.remove("tooltip-open");

		ref.current?.addEventListener("mouseenter", enterCallback);
		ref.current?.addEventListener("mouseleave", leaveCallback);

		return () => {
			ref.current?.removeEventListener("mouseenter", enterCallback);
			ref.current?.removeEventListener("mouseleave", leaveCallback);
		};
	}, []);

	return (
		<div
			className="tooltip text-black absolute -right-4 -top-4 rounded-full w-6 h-6 text-xs font-normal bg-white flex items-center justify-center border border-error select-none"
			data-tip={name}
			ref={ref}
		>
			{count.current}
		</div>
	);
}
