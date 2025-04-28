function getOperandsFromDisplay() {
	const display = document.querySelector(".display");
	const displayText = display.textContent;
	const operands = displayText.split(" ").filter(part => part !== "");
	return operands;
}

export { getOperandsFromDisplay };
