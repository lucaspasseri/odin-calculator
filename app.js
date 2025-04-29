import { allClear } from "./operation/allClear.js";
import { clearEntry } from "./operation/clearEntry.js";
import { dot } from "./operation/dot.js";
import { state } from "./state.js";
import { handleOperatorPress } from "./operation/handleOperatorPress.js";
import { handleNumberPress } from "./operation/handleNumberPress.js";
import { handleEqualityPress } from "./operation/handleEqualityPress.js";

const keypad = document.querySelector(".keypad");

keypad.addEventListener("click", e => {
	const keyPressed = e.target.id;
	if (!keyPressed) return;

	const equalityPressed = keyPressed === "equal";

	const operatorPressed = ["+", "-", "x", "/"].includes(keyPressed);

	const numberPressed = !isNaN(keyPressed);

	if (state.numberOfOperands === -1) {
		if (numberPressed) {
			state.numberOfOperands = 1;
			document.querySelector(".display").textContent = keyPressed;
			return;
		}

		allClear();
		return;
	}

	if (keyPressed === "allClear") {
		allClear();
		return;
	}

	if (keyPressed === "clearEntry") {
		clearEntry();
		return;
	}

	if (keyPressed === "dot") {
		dot();
		return;
	}

	if (operatorPressed) {
		handleOperatorPress(keyPressed);
		return;
	}

	if (numberPressed) {
		handleNumberPress(keyPressed);
		return;
	}

	if (equalityPressed) {
		handleEqualityPress();
		return;
	}
});
