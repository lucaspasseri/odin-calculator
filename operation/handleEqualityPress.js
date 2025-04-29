import { state } from "../state.js";
import { getOperandsFromDisplay } from "../util/getOperandsFromDisplay.js";
import { calculate } from "../util/calculate.js";

function handleEqualityPress() {
	const display = document.querySelector(".display");

	const operands = getOperandsFromDisplay();
	if (operands.length < 3) return;

	const result = calculate();

	if (result !== null) {
		display.textContent = `${result}`;
		state.numberOfOperands = 1;
		state.isOperationComplete = true;
		return;
	}

	return;
}

export { handleEqualityPress };
