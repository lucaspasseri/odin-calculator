import { state } from "../state.js";
import { getOperandsFromDisplay } from "../util/getOperandsFromDisplay.js";

function dot() {
	const display = document.querySelector(".display");
	if (state.numberOfOperands === 0) {
		display.textContent = "0.";
		state.numberOfOperands += 1;
		return;
	}

	if (state.numberOfOperands === 1 || state.numberOfOperands === 3) {
		const lastOperand = getOperandsFromDisplay().at(-1);
		const hasDot = Array.from(lastOperand).find(letter => letter === ".");

		if (hasDot) return;

		display.textContent = `${display.textContent}.`;
	}

	if (state.numberOfOperands === 2) {
		display.textContent = `${display.textContent}0.`;
		state.numberOfOperands += 1;
		return;
	}
}

export { dot };
