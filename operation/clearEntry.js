import { state } from "../state.js";
import { getOperandsFromDisplay } from "../util/getOperandsFromDisplay.js";

function clearEntry() {
	const display = document.querySelector(".display");

	switch (state.numberOfOperands) {
		case 0:
			return;
		case 1:
			if (display.textContent.length === 1) {
				allClear();
				return;
			}

			display.textContent = document
				.querySelector(".display")
				.textContent.slice(0, -1);
			return;

		case 3:
			if (getOperandsFromDisplay().at(-1).length === 1) {
				display.textContent = document
					.querySelector(".display")
					.textContent.slice(0, -2);
				state.numberOfOperands = 2;
				return;
			}

			display.textContent = document
				.querySelector(".display")
				.textContent.slice(0, -1);
			return;

		case 2:
			console.log(`|${display.textContent}|`, state.numberOfOperands);
			display.textContent = display.textContent.slice(0, -3);

			state.numberOfOperands = 1;
			console.log(`|${display.textContent}|`, state.numberOfOperands);
			return;
		default:
			throw Error;
	}
}

export { clearEntry };
