import { state } from "../state.js";
import { calculate } from "../util/calculate.js";

function handleOperatorPress(keyPressed) {
	const display = document.querySelector(".display");

	if (state.numberOfOperands === 0) return;

	if (state.numberOfOperands === 2) {
		if (display.textContent.at(-2) === keyPressed) return;
		display.textContent = `${display.textContent.slice(0, -2)}${keyPressed} `;
		return;
	}

	if (state.numberOfOperands === 3) {
		const result = calculate();

		if (result !== null) {
			display.textContent = `${result} ${keyPressed} `;
			state.numberOfOperands = 2;
			return;
		}
		return;
	}

	display.textContent = `${display.textContent} ${keyPressed} `;
	state.numberOfOperands += 1;
	state.isOperationComplete = false;
}

export { handleOperatorPress };
