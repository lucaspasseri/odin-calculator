import { allClear } from "./operation/allClear.js";
import { clearEntry } from "./operation/clearEntry.js";
import { dot } from "./operation/dot.js";
import { getOperandsFromDisplay } from "./util/getOperandsFromDisplay.js";
import { state } from "./state.js";
import { chooseOperation } from "./operation/basicOperations.js";

const keypad = document.querySelector(".keypad");

const display = document.querySelector(".display");

keypad.addEventListener("click", e => {
	const keyPressed = e.target.id;
	if (!keyPressed) return;

	const equalityPressed = keyPressed === "equal";

	const operatorPressed =
		keyPressed === "+" ||
		keyPressed === "-" ||
		keyPressed === "x" ||
		keyPressed === "/";

	const numberPressed =
		keyPressed === "0" ||
		keyPressed === "1" ||
		keyPressed === "2" ||
		keyPressed === "3" ||
		keyPressed === "4" ||
		keyPressed === "5" ||
		keyPressed === "6" ||
		keyPressed === "7" ||
		keyPressed === "8" ||
		keyPressed === "9";

	if (state.numberOfOperands === -1) {
		if (numberPressed) {
			state.numberOfOperands = 1;
			display.textContent = keyPressed;
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
		if (state.numberOfOperands === 0) return;

		if (state.numberOfOperands === 2) {
			if (display.textContent.at(-2) === keyPressed) return;
			display.textContent = `${display.textContent.slice(0, -2)}${keyPressed} `;
			return;
		}

		if (state.numberOfOperands === 3) {
			const operands = getOperandsFromDisplay();
			if (operands.length < 3) throw Error;

			const a = operands[0];
			const operation = operands[1];
			const b = operands[2];

			if (operation === "/" && Number(b) === 0) {
				state.numberOfOperands = -1;
				display.textContent = "Sry, not today!";
				return;
			}

			const result = chooseOperation(operation, a, b);

			display.textContent = `${result} ${keyPressed} `;
			state.numberOfOperands = 2;
			return;
		}

		display.textContent = `${display.textContent} ${keyPressed} `;
		state.numberOfOperands += 1;
		state.isOperationComplete = false;
		return;
	}

	if (numberPressed) {
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

		if (keyPressed === "0") {
			const lastOperand = getOperandsFromDisplay().at(-1);
			const hasLeadingZeros = Array.from(lastOperand).every(
				digit => digit === "0"
			);
			if (hasLeadingZeros) return;
		}

		if (display.textContent === "0") {
			display.textContent = `${keyPressed}`;
			return;
		}

		display.textContent = `${display.textContent}${keyPressed}`;
		return;
	}

	if (equalityPressed) {
		const operands = getOperandsFromDisplay();
		if (operands.length < 3) return;

		const a = operands[0];
		const operation = operands[1];
		const b = operands[2];

		if (operation === "/" && Number(b) === 0) {
			state.numberOfOperands = -1;
			display.textContent = "Sry, not today!";
			return;
		}

		const result = chooseOperation(operation, a, b);

		display.textContent = `${result}`;
		state.numberOfOperands = 1;
		state.isOperationComplete = true;
		return;
	}
});
