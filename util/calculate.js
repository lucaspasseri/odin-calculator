import { state } from "../state.js";
import { getOperandsFromDisplay } from "./getOperandsFromDisplay.js";
import { chooseOperation } from "../operation/basicOperations.js";

function calculate() {
	const operands = getOperandsFromDisplay();
	if (operands.length < 3) return null;

	const [a, operation, b] = operands;

	if (operation === "/" && Number(b) === 0) {
		state.numberOfOperands = -1;
		document.querySelector(".display").textContent = "Sry, not today!";
		return null;
	}

	return chooseOperation(operation, a, b);
}

export { calculate };
