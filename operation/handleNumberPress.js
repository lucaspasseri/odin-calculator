import { state } from "../state.js";
import { getOperandsFromDisplay } from "../util/getOperandsFromDisplay.js";

function handleNumberPress(keyPressed) {
	const display = document.querySelector(".display");

	if (state.isOperationComplete) {
		state.isOperationComplete = false;
		display.textContent = `${keyPressed}`;
		return;
	}

	if (state.numberOfOperands === 0) {
		if (keyPressed === "0") return;
		display.textContent = `${keyPressed}`;
		state.numberOfOperands += 1;
		return;
	}

	if (state.numberOfOperands === 2) {
		display.textContent = `${display.textContent} ${keyPressed}`;
		state.numberOfOperands = 3;
		return;
	}

	const operands = getOperandsFromDisplay();

	if (keyPressed === "0") {
		const hasLeadingZeros = Array.from(operands.at(-1)).every(
			digit => digit === "0"
		);
		if (hasLeadingZeros) return;
	}

	if (display.textContent === "0") {
		display.textContent = `${keyPressed}`;
		return;
	}

	if (operands.at(-1) === "0") {
		display.textContent = `${operands[0]} ${operands[1]} ${keyPressed}`;
		return;
	}

	display.textContent = `${display.textContent}${keyPressed}`;
}

export { handleNumberPress };
