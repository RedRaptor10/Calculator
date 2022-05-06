let num1, num2, operator, preButton;
num1 = num2 = operator = preButton = null;
let result = '';
const displayLength = 24;
const decimal = 9;
let displayChain = document.getElementById('displayChain');
let display = document.getElementById('displayResult');
const numberButtons = document.querySelectorAll('.numberButtons');
const operationButtons = document.querySelectorAll('.operationButtons');
const equalButton = document.getElementById('equalButton');
const deleteButton = document.getElementById('deleteButton');
const clearButton = document.getElementById('clearButton');

function calculator() {
	document.addEventListener('keydown', (KeyboardEvent) => {
		let input = KeyboardEvent.key;

		switch(input) {
			case '1': case '2': case '3':
			case '4': case '5': case '6':
			case '7': case '8': case '9':
			case '.': case '0':
				inputNumber(input);
				break;
			case '+': case '-': case '*':
			case '/':
				inputOperator(input);
				break;
			case '=': case 'Enter':
				inputEqual();
				break;
			case 'Backspace':
				backspace();
				break;
			case 'c': case 'x':
				reset();
				break;
			default:
				break;
		}
	});

	numberButtons.forEach((button) => {
		button.addEventListener('click', () => {
			inputNumber(button.innerHTML);
		});
	});

	operationButtons.forEach((button) => {
		button.addEventListener('click', () => {
			inputOperator(button.innerHTML);
		});
	});

	equalButton.addEventListener('click', () => {
		inputEqual();
	});

	deleteButton.addEventListener('click', () => {
		backspace();
	});

	clearButton.addEventListener('click', () => {
		reset();
	});
}

function inputNumber(input) {
	// If finished calculating, reset display
	if (preButton == 'equal') {
		reset();
	}

	// If previous button is empty, an operator or equal, clear display
	if (preButton == null || preButton == 'operator' || preButton == 'equal') {
		display.innerHTML = '';
	}

	// If button is decimal
	if (input == '.') {
		// If display number does not already include a decimal
		if (!display.innerHTML.includes('.') && display.innerHTML.length < displayLength) {
			display.innerHTML += input; // Add number to display
		}
	} else {
		if (display.innerHTML.length < displayLength) {
			display.innerHTML += input; // Add number to display
		}
	}

	// Set previous button
	if (input == '.') {
		preButton = 'decimal';
	} else {
		preButton = 'number';
	}
}

function inputOperator(input) {
	// If num1 is empty, set num1
	if (num1 == null) {
		/*	parseFloat converts string to number
			toFixed converts number to string, rounded to fixed
			parseFloat converts string to number again */
		num1 = parseFloat(parseFloat(display.innerHTML).toFixed(decimal));
		displayChain.innerHTML += num1 + ' ' + input + ' ';
	} else {
		// If num1 is not empty, set num2 and calculate
		// If previous button is not an operator and is not equal
		if (preButton != 'operator' && preButton != 'equal') {
			num2 = parseFloat(parseFloat(display.innerHTML).toFixed(decimal));
			displayChain.innerHTML += num2 + ' ' + input + ' ';
			result = operate(num1, num2, operator);
			num1 = result; // Set num1 to new result
			display.innerHTML = result;
		}
	}

	operator = input;
	preButton = 'operator';
}

function inputEqual() {
	// If num1 is not empty, calculate
	if (num1 != null) {
		// If num2 is empty or previous button is not equal, set num2
		if (num2 == null || preButton != 'equal') {
			num2 = parseFloat(parseFloat(display.innerHTML).toFixed(9));
		}

		displayChain.innerHTML = num1 + ' ' + operator + ' ' + num2;
		result = operate(num1, num2, operator);
		num1 = result; // Set num1 to new result
		display.innerHTML = result;

		preButton = 'equal';
	}
}

function backspace() {
	let length = display.innerHTML.length;

	// If display number has 1 digit, set to 0
	if (length == 1) {
		display.innerHTML = '0';
	} else {
		// Remove last digit from display number
		let newNum = display.innerHTML.substring(0,length - 1);
		display.innerHTML = newNum;
	}
}

function reset() {
	displayChain.innerHTML = '';
	display.innerHTML = '0';
	num1 = null;
	num2 = null;
	operator = null;
	preButton = null;
	result = '';
}

function operate(num1, num2, operator) {
	switch (operator) {
		case '+':
			return add(num1, num2);
		case '-':
			return subtract(num1, num2);

		case '*':
			return multiply(num1, num2);
		case '/':
			if (num2 == 0) {
				return 'Cannot divide by zero';
			}
			return divide(num1, num2);
		default:
			break;
	}
}

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

calculator();