//DOM Selectors
const body = document.body;
const main = document.main;
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector("#decimal");
const allClear = document.querySelector("#all-clear");
const clear = document.querySelector("#clear");
const percent = document.querySelector("percent");

let currentInput = "";
let previousInput = "";
let currentOperator = "";
let operatorSelected = false;
let floatInput = false;
let repeatedOperator = 0;

document.addEventListener("DOMContentLoaded", () => {
    
    for (operand of operands) {

        operand.addEventListener("click", (e) => {
            number = e.target.textContent;

            repeatedOperator = 0;

            if (operatorSelected == true) {
                previousInput = currentInput;
                displayPrevious();
                displayCurrent();
                currentInput = "";
                operatorSelected = false
            }
            // Limits the number allowed to be input
            if (currentInput.length < 11) {
                currentInput += number;
                displayCurrent();
            }
            
            
        });
    }

    for (operator of operators) {
        
        operator.addEventListener("click", (e) => {
            
            operatorSelected = true;
            
  
            if (currentOperator.length == 0) {
                
                if (e.target.textContent == "=") {
                    operatorSelected = false;
                    return;
                }
               
                currentOperator = e.target.textContent;
                displayPrevious(); 
                displayCurrent();
            }
            else if (currentOperator.length == 1) {

                if (repeatedOperator > 0) {
                    return;
                }

                tempPrevious = previousInput;
                previousInput = currentInput;
                currentInput = operate(tempPrevious, previousInput, currentOperator)
                displayCurrent();

                if(e.target.textContent == "=") {
                    document.querySelector(".previous-input").innerHTML = tempPrevious + " " + currentOperator + " " + previousInput + " =";
                    currentOperator = "";
                    reset()
                    return;
                }
                
                displayPrevious()
                currentOperator = e.target.textContent;
                repeatedOperator ++;
                
            }

            
        
        })
    }

    decimal.addEventListener("click", (e) => {
        // Makes sure that only one decimal point can be input
        if (floatInput == false) {
            currentInput += ".";
        }
        floatInput = true;
    })
    
    allClear.addEventListener("click", () => {
        reset();
        displayCurrent();
        displayPrevious();
    })

    clear.addEventListener("click", () => {
        currentInput = currentInput.slice(0, -1);
        displayCurrent();
        displayPrevious();
    })

})

displayCurrent = () => {
    document.querySelector(".current-input").innerHTML = currentInput;
}

displayPrevious = () => {
    document.querySelector(".previous-input").innerHTML = currentInput + " " + currentOperator;
}

reset = () => {
    currentInput = "";
    previousInput = "";
    currentOperator = "";
    operatorSelected = false;
    floatInput = false;
    repeatedOperator = 0;
}

// Check to see if string contains decimal point
intOrFloat = (anInput) => {
    
    if (anInput.includes(".")) {
        return parseFloat(anInput);
    }
    else {
        return parseInt(anInput);
    }
}

displayCurrent(currentInput);
displayPrevious(previousInput);

operate = (tempPrevious, previousInput, currentOperator) => {
    // Convert string inputs to an integer or float
    let first = intOrFloat(tempPrevious);
    let second = intOrFloat(previousInput);
    let result = 0;

    if (currentOperator == "+") {
        result = first + second;
    }
    else if (currentOperator == "-") {
        result = first - second;
    }
    else if (currentOperator == "*") {
        result = first * second;
    }
    else if (currentOperator == "/") {
        result = first / second;
    }

    // Convert result back to a string
    return numberToString(result);

}

numberToString = (number) => {
    numberString = number.toString();

    if (numberString.length > 10) {
        return numberString.slice(0,10);
    }

    return numberString
}


/*
operate = (a, b, op) => {
    return op === '+' ? a + b
    : op === '-' ? a - b
    : op === '*' ? a * b
    : op === '/' ? a / b
    : "invalid"
}
*/
