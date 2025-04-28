import { allClear } from "./operation/allClear.js";
import { clearEntry } from "./operation/clearEntry.js";
import { getOperandsFromDisplay } from "./util/getOperandsFromDisplay.js";
import { state } from "./state.js";

function add(a, b) {
	return Number(a) + Number(b);
}

function subtraction(a, b) {
	return Number(a) - Number(b);
}

function multiplication(a, b) {
	return Number(a) * Number(b);
}

function division(a, b) {
	return Number(a) / Number(b);
}

function chooseOperation(operation, a, b) {
	switch (operation) {
		case "+":
			return add(a, b);
		case "-":
			return subtraction(a, b);
		case "x":
			return multiplication(a, b);
		case "/":
			return division(a, b);
		default:
			return "Error!";
	}
}

const keypad = document.querySelector(".keypad");
console.log(keypad);

const display = document.querySelector(".display");

keypad.addEventListener("click", e => {
	const keyPressed = e.target.id;
	if (!keyPressed) return;

	if (keyPressed === "allClear") {
		allClear();
		return;
	}

	if (keyPressed === "clearEntry") {
		clearEntry();
		return;
	}

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

	if (
		(state.numberOfOperands === 0 || state.numberOfOperands === 2) &&
		(operatorPressed || equalityPressed)
	) {
		return;
	}

	if (state.numberOfOperands === 0) {
		display.textContent = "";

		display.textContent = `${display.textContent}${keyPressed}`;
		state.numberOfOperands += 1;
		return;
	}

	if (operatorPressed) {
		if (state.numberOfOperands === 3) {
			const operands = getOperandsFromDisplay();
			if (operands.length < 3) throw Error;

			const a = operands[0];
			const operation = operands[1];
			const b = operands[2];

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

		if (state.numberOfOperands === 2) {
			display.textContent = `${display.textContent} ${keyPressed}`;
			state.numberOfOperands = 3;
			return;
		}
		console.log("oi");
		display.textContent = `${display.textContent}${keyPressed}`;
		return;
	}

	if (equalityPressed) {
		const operands = getOperandsFromDisplay();
		if (operands.length < 3) return;

		const a = operands[0];
		const operation = operands[1];
		const b = operands[2];

		const result = chooseOperation(operation, a, b);

		display.textContent = `${result}`;
		state.numberOfOperands = 1;
		state.isOperationComplete = true;
		return;
	}
});
