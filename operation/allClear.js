import { state, initialState } from "../state.js";

function allClear() {
	document.querySelector(".display").textContent = "0";
	Object.assign(state, initialState);
	return;
}

export { allClear };
