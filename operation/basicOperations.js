function round(num) {
	return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

function add(a, b) {
	const num = Number(a) + Number(b);
	return round(num);
}

function subtraction(a, b) {
	const num = Number(a) - Number(b);
	return round(num);
}

function multiplication(a, b) {
	const num = Number(a) * Number(b);
	return round(num);
}

function division(a, b) {
	const num = Number(a) / Number(b);
	return round(num);
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

export { chooseOperation };
