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

function operate(operation, a, b) {
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
	console.log(keyPressed);

	if (!state.isKeypadDirty) {
		display.textContent = "";
		state.isKeypadDirty = true;
	}

	switch (keyPressed) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			if (state.isOperationComplete) {
				display.textContent = "";
				state.isOperationComplete = false;
			}
			display.textContent = `${display.textContent}${keyPressed}`;
			break;
		case "+":
		case "-":
		case "x":
		case "/":
			if (state.isOperationComplete) {
				state.isOperationComplete = false;
			}
			display.textContent = `${display.textContent} ${keyPressed} `;
			break;
		case "=":
			const currentText = display.textContent;

			console.log(currentText);

			const operationParts = currentText.split(" ").filter(part => part !== "");

			console.log(currentText, operationParts);

			if (operationParts < 3) return;

			const a = operationParts[0];
			const operation = operationParts[1];
			const b = operationParts[2];

			console.log(a, operation, b);

			const result = operate(operation, a, b);

			console.log(result);

			display.textContent = `${result}`;
			state.isOperationComplete = true;

			break;
		default:
			console.log("What key is that?");
	}
});
