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

document.addEventListener("DOMContentLoaded", () => {
    
    for (operand of operands) {
    
        operand.addEventListener("click", (e) => {
            number = e.target.textContent;

            if (operatorSelected == true) {
                previousInput = currentInput + " " + currentOperator;
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
            currentOperator = e.target.textContent;
            
            if (operatorSelected == false) {
                operatorSelected = true;
            }
            else if (operatorSelected == true) {
                operatorSelected = false
                
                currentInput = "";
            }

            displayPrevious();
            displayCurrent();

            
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
    })

})

displayCurrent = () => {
    document.querySelector(".current-input").innerHTML = currentInput;
}

displayPrevious = () => {
    document.querySelector(".previous-input").innerHTML = previousInput;
}

reset = () => {
    currentInput = "";
    previousInput = "";
    operatorSelected = "";
    floatInput = false;
}

displayCurrent(currentInput);
displayPrevious(previousInput);

operate = (a, b, op) => {
    return op === '+' ? a + b
    : op === '-' ? a - b
    : op === '*' ? a * b
    : op === '/' ? a / b
    : "invalid"
}

