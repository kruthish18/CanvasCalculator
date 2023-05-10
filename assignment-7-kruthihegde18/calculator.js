// Create a canvas element 
const canvas = document.getElementById("calculator");
// get the context of the canvas element 
const ctx = canvas.getContext("2d");

// Set the display and button dimensions
const displayWidth = 575;
const displayHeight = 180;
const buttonHeight = 100;
const padding = 0;
const canvasWidth = displayWidth + (padding * 2);
const canvasHeight = displayHeight + (padding * 4) + (buttonHeight * 5);

// Set the dimensions of the canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;



canvas.style.position = "absolute";
canvas.style.borderRadius = "10px";
canvas.style.left = "375px";
canvas.style.top = "50px";


// Draw the top display
ctx.fillStyle = "#4c4f50";
ctx.fillRect(padding, padding, displayWidth, displayHeight);
ctx.strokeRect(padding, padding, displayWidth, displayHeight);


// Draw the circle buttons
const buttonRadius = 10;
const buttonMargin = 8;
const closeButtonX = padding + buttonMargin + buttonRadius;
const closeButtonY = padding + buttonMargin + buttonRadius;
const minimizeButtonX = closeButtonX + (buttonRadius * 2) + buttonMargin;
const minimizeButtonY = closeButtonY;
const maximizeButtonX = minimizeButtonX + (buttonRadius * 2) + buttonMargin;
const maximizeButtonY = minimizeButtonY;

// Draw the close button
ctx.beginPath();
ctx.arc(closeButtonX, closeButtonY, buttonRadius, 0, 2 * Math.PI);
ctx.fillStyle = "#FF3B30"; // red
ctx.fill();

// Draw the minimize button
ctx.beginPath();
ctx.arc(minimizeButtonX, minimizeButtonY, buttonRadius, 0, 2 * Math.PI);
ctx.fillStyle = "#FFCC00"; // yellow
ctx.fill();

// Draw the maximize button
ctx.beginPath();
ctx.arc(maximizeButtonX, maximizeButtonY, buttonRadius, 0, 2 * Math.PI);
ctx.fillStyle = "#4CD964"; // green
ctx.fill();



// Initialize variables
let hasDecimal = false;
let hasNegative = false;
let previousNumber = null;
let operator = null;

// Set the width of the buttons
const buttonWidth = 115;

// Draw the buttons
const buttonRows = [
    [
        " ", " ", " ", "%", "/"
    ],
    [
        "(", "7", "8", "9", "*"
    ],
    [
        ")", "4", "5", "6", "-"
    ],
    [
        "Back", "1", "2", "3", "+"
    ],
    [
        "0", "0", "0", ".", "="
    ],
];


// Set the font size for the text on the buttons
ctx.font = "32px Arial";

// Initialize a variable to keep track of whether "0" has already been written
let zeroWritten = false;

// Loop through the rows of buttons
for (let row = 0; row < buttonRows.length; row++) {
    // Loop through the columns of buttons
    for (let col = 0; col < buttonRows[row].length; col++) {
        // Get the current button and calculate its x and y position
        const button = buttonRows[row][col];
        const x = padding + (buttonWidth * col) + (padding * col);
        const y = padding + displayHeight + (padding * 2) + (buttonHeight * row) + (padding * row);


        // Set the fill style based on the button's position
        if (col === buttonRows[row].length - 1) {
            ctx.fillStyle = "#FFA500"; //orange
        } else if (row === 0) {
            ctx.fillStyle = "#5f6065";  //gray
        } else {
            ctx.fillStyle = "#787a7e";  //light gray for the remaining buttons
        }

        // Check if the current button is '0' and hasn't been written yet
        if (button === "0" && !zeroWritten) {
            console.log(buttonWidth * 3);
            ctx.fillRect(x, y, (buttonWidth * 3) + (padding * 2) + buttonMargin, buttonHeight);
            ctx.strokeRect(x, y, buttonWidth * 3, buttonHeight);
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(button, x + ((3 * buttonWidth) / 2) - 12, y + (buttonHeight / 2) + 12);
            zeroWritten = true;
        }
        if (button === "0" && zeroWritten) {

        }
        else {
            // Draw a filled rectangle for non-'0' buttons
            ctx.fillRect(x, y, buttonWidth, buttonHeight);
            // Draw a stroke rectangle around the button
            ctx.strokeRect(x, y, buttonWidth, buttonHeight);
            ctx.fillStyle = "#FFFFFF";
            // If the button is 'Back'
            if (button === 'Back') {
                ctx.fillText(button, x + (buttonWidth / 2) - 35, y + (buttonHeight / 3) + 30);
            }
            else {
                ctx.fillText(button, x + (buttonWidth / 2) - 12, y + (buttonHeight / 2) + 12);
            }
        }


    }
}





// Initialize display value and operands
let displayValue = "";
let leftOperand = null;
let rightOperand = null;




// Handle clicks on calculator buttons
const handleClick = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    // Loop through each button and check if it was clicked
    for (let row = 0; row < buttonRows.length; row++) {
        for (let col = 0; col < buttonRows[row].length; col++) {
            const button = buttonRows[row][col];
            const buttonX = padding + (buttonWidth * col) + (padding * col);
            const buttonY = padding + displayHeight + (padding * 2) + (buttonHeight * row) + (padding * row);

            // If the button was clicked, handle the button press
            if (x >= buttonX && x < buttonX + buttonWidth && y >= buttonY && y < buttonY + buttonHeight) {
                handleButtonPress(button);
                return;
            }
        }
    }
}



// Handle button presses
const handleButtonPress = (button) => {

    // If a digit or decimal point is pressed, handle it
    if ((button >= "0" && button <= "9") || button === ".") {
        handleDigitPress(button);
    }
    // else if (button === "C") {
    //     handleClearPress();
    // } 

    // If an operator button is pressed, handle it
    else if (button === "+" || button === "-" || button === "*" || button === "÷" || button === '%' || button === "/") {
        handleOperatorPress(button);
    }

    // If a parenthesis button is pressed, handle it
    else if (button === "(" || button === ")") {
        handleParenthesisPress(button);
    }
    else if (button === "Back") {
        backButton();
    }
    else if (button === "=") {
        handleEqualsPress();
    }
}

// Set up event listeners for mouse clicks
canvas.addEventListener("click", handleClick);


// Define a function to handle digit button presses
const handleDigitPress = (value) => {


    // Set the text color to white
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(displayValue, padding + 20, padding + 50);


    // If the pressed button is a decimal point
    if (value === '.') {
        // If the display value already has a decimal point, return without doing anything
        if (hasDecimal) {
            return;
        }
        if (displayValue === '') {
            displayValue += '0';
        }

        // if (!displayValue.match(/[+\-*/%0-9]/)) {
        //     displayValue += '0';
        // }
        // if (displayValue.match(/[+\-*/%]/)) {
        //     displayValue += '0';
        // }

        // Add the decimal point to the display value and set hasDecimal to true
        displayValue += value;
        // hasDecimal = true;
    }

    // If the pressed button is a minus sign
    else if (value === '-') {
        // If the display value already has a negative sign, return without doing anything
        if (hasNegative) {
            return;
        }
        // Otherwise, set the display value to the minus sign and set hasNegative to true
        displayValue = value;
        hasNegative = true;
    }
    // If the pressed button is a left parenthesis
    else if (value === '(') {
        // If the display value is zero, set it to the left parenthesis
        if (displayValue === '0') {
            displayValue = value;
        }
        // Otherwise, append the left parenthesis to the display value
        else {
            displayValue += value;
        }
    }


    else if (value === ')') {
        if (displayValue === '0') {
            displayValue = value;
        } else {
            displayValue += value;
        }
    }
    // If the pressed button is a digit
    else {
        // If the display value is zero, set it to the digit
        if (displayValue === '0') {
            displayValue = value;
        } else {
            displayValue += value;
        }
    }

    // Update the display with the new value
    updateDisplay(false, displayValue);
}


// handle operator button presses
const handleOperatorPress = (expression) => {
    // Append the operator to the display value
    displayValue += expression;
    // clear hasDecimal and hasNegative
    hasDecimal = false;
    hasNegative = false;
    updateDisplay(false, displayValue);
}


//  handle parenthesis button presses
const handleParenthesisPress = (value) => {
    // If the pressed button is a left parenthesis
    if (value === '(') {
        // If the display value is zero, set it to the left parenthesis
        displayValue = (displayValue === '0') ? value : displayValue + value;
    }
    // If the pressed button is a right parenthesis
    else if (value === ')') {
        // If the display value is zero, set it to the right parenthesis
        displayValue = (displayValue === '0') ? value : displayValue + value;
    }
    updateDisplay(false, displayValue);
}




const handleEqualsPress = () => {


    let expression = displayValue;
    displayValue = evaluate();
    if (!isNaN(parseInt(displayValue))) {
        if (displayValue % 1 !== 0) { // check if the result has decimal points
            displayValue = parseFloat(displayValue).toFixed(6); // restrict to 6 decimal points only if it has more than 6 decimal points
            displayValue = parseFloat(displayValue); // remove trailing 0s
        }
    }
    updateDisplay(true, expression);


    displayValue = "";
    leftOperand = null;
    rightOperand = null;


};




const evaluate = () => {
    const input = displayValue;

    // Validate input using regex pattern
    //const validInputPattern = /^[\d()+\-*/%.]+\s*(?:[\+\-*/%]\s*[\d()+\-*/%.]+\s*)*$/;
    // if (!validInputPattern.test(input)) {
    //     return 'Invalid';
    // }

    // Check brackets using stack
    const checkBrackets = (input) => {
        const stack = [];
        for (let i = 0; i < input.length; i++) {
            if (input[i] === "(") {
                stack.push(input[i]);
            } else if (input[i] === ")") {
                if (stack.length === 0) {
                    return false;
                }
                stack.pop();
            }
        }
        if (stack.length !== 0) {
            return false;
        }
        return true;
    };
    if (!checkBrackets(input)) {
        return 'Invalid';
    }

    // Parse input into tokens using parseInput() function
    const tokens = parseInput(input);
    console.log(tokens);
    // Evaluate expression using evaluateExpression() function
    try {
        const result = evaluateExpression(tokens);


        console.log(result);

        if (isNaN(result)) {
            return "Invalid";
        }
        else if (result === 'Infinity') {
            return "NOT A NUMBER";
        }
        else {
            return result;
        }
    }
    catch (error) {
        return "Error";
    }

};




// This function takes an array of tokens as input and evaluates the expression.
const evaluateExpression = (tokens) => {
    // Initialize two empty arrays to hold the operands and operators.
    const operands = [];
    const operators = [];


    // Define the precedence of the operators.
    const precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "%": 2,
    };


    // Loop through each token in the input array.
    tokens.forEach((token) => {

        // If the token is a number, push it onto the operands array.
        if (!isNaN(token)) {
            operands.push(parseFloat(token));
        }

        // If the token is an operator, evaluate any operators of higher precedence and then push it onto the operators array.
        else if (isOperator(token)) {
            while (
                operators.length > 0 &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                const operator = operators.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                const result = applyOperator(operand1, operand2, operator);
                operands.push(result);
            }
            operators.push(token);
        }

        // If the token is an opening parenthesis, push it onto the operators array.
        else if (token === "(") {
            operators.push(token);
        }

        // If the token is a closing parenthesis, evaluate any operators until the matching opening parenthesis is found.
        else if (token === ")") {
            while (operators.length > 0 && operators[operators.length - 1] !== "(") {
                const operator = operators.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                const result = applyOperator(operand1, operand2, operator);
                operands.push(result);
            }
            if (operators.length === 0 || operators[operators.length - 1] !== "(") {
                throw new Error("Invalid expression: unmatched closing parenthesis");
            }
            operators.pop(); // Pop the "("
        }

        // If the token is not a number, operator, or parenthesis, throw an error.
        else {
            throw new Error("Invalid expression: unknown token " + token);
        }
    });

    // Evaluate any remaining operators.
    while (operators.length > 0) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        const result = applyOperator(operand1, operand2, operator);
        operands.push(result);
    }


    // If there is only one operand remaining, return it as the result
    if (operands.length === 1) {
        return operands[0];
    }
    // If there are multiple operands remaining, throw an error
    else {
        throw new Error("Invalid expression: too many operands");
    }
};



//  checks if a given token is an operator.
const isOperator = (token) => {
    if ("+-*/%".indexOf(token) !== -1) {
        return true;
    }
    else if (token === "-" && (operands.length === 0 || operators[operators.length - 1] === "(")) {
        return true;
    }
    else {
        return false;
    }
};





// This function applies the given operator to the two operands and returns the result.
const applyOperator = (operand1, operand2, operator) => {

    switch (operator) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            if (operand2 == 0) {
                throw new Error("Error");
            }
            else {
                return operand1 / operand2;
            }

        case "%":
            return operand1 % operand2;
        default:
            throw new Error("Invalid operator " + operator);
    }
};



const parseInput = (input) => {
    const tokens = [];
    let i = 0;

    while (i < input.length) {
        let c = input.charAt(i);

        if (/\d/.test(c) || c === '.') {  // digit or decimal point
            let num = '';

            while (/\d/.test(c) || c === '.') {
                num += c;
                i++;
                c = input.charAt(i);
            }

            tokens.push(num);
        } else if (/\+|\-|\*|\/|\%|\(|\)/.test(c)) {  // operator or bracket
            if (c === '-' && (i === 0 || /[\+\-\*\/%\(]/.test(input.charAt(i - 1)))) {
                // Negative sign
                let num = '-';
                i++;
                c = input.charAt(i);

                while (/\d/.test(c) || c === '.') {
                    num += c;
                    i++;
                    c = input.charAt(i);
                }

                tokens.push(num);
            } else {
                // Operator or bracket
                tokens.push(c);
                i++;
            }
        } else if (/\s/.test(c)) {  // whitespace
            i++;
        } else {  // unrecognized character
            return null;
        }
    }

    return tokens;
};






// to update the display
const updateDisplay = (isResult, expression) => {
    // clear the display
    ctx.clearRect(padding, padding, displayWidth, displayHeight);

    //  draw the top display background
    ctx.fillStyle = "#4c4f50";
    ctx.fillRect(padding, padding, displayWidth, displayHeight);
    ctx.strokeRect(padding, padding, displayWidth, displayHeight);

    // set the text color and alignment
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";


    // if the expression is a result
    if (isResult) {
        // draw the expression in smaller font above the main display
        ctx.font = "36px Arial";
        ctx.fillText(expression, padding + displayWidth - 20, padding + displayHeight * 0.35);

        // draw the main display value in larger font
        ctx.font = "48px Arial";
        ctx.fillText(displayValue, padding + displayWidth - 20, padding + displayHeight * 0.75);
    }

    // if the expression is not a result
    else {
        // draw the main display value in smaller font
        ctx.font = "36px Arial";
        ctx.fillText(displayValue, padding + displayWidth - 20, padding + displayHeight * 0.35);
    }

    // draw the close button as a red circle
    ctx.beginPath();
    ctx.arc(closeButtonX, closeButtonY, buttonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF3B30"; // red
    ctx.fill();

    // draw the minimize button as a yellow circle
    ctx.beginPath();
    ctx.arc(minimizeButtonX, minimizeButtonY, buttonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFCC00"; // yellow
    ctx.fill();

    // draw the maximize button as a green circle
    ctx.beginPath();
    ctx.arc(maximizeButtonX, maximizeButtonY, buttonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#4CD964"; // green
    ctx.fill();

}

const backButton = () => {
    if (displayValue === 'Invalid') {
        displayValue = '';
    } else {
        displayValue = displayValue.toString().slice(0, -1);
    }
    updateDisplay(false, displayValue);
}


