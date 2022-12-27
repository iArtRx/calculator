/*
Still things to do:
Add keyboard input
Fix decimal logic
Negative numbers
Fix large number logic
*/

//DOM Selectors
const body = document.body;
const main = document.main;
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector("#decimal");
const allClear = document.querySelector("#all-clear");
const clear = document.querySelector("#clear");
const percent = document.querySelector("#percent");
const buttons = document.querySelectorAll("button")


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

            if (currentInput == "") {
                currentInput = 0;
            }
            
            // Ensuring equal button doesn't work if selected first
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

                if(currentInput.length == 11 && currentInput.includes(".")){
                    disable();
                    return;
                }

                if(e.target.textContent == "=") {
                    document.querySelector(".previous-input").innerHTML = tempPrevious + " " + currentOperator + " " + previousInput + " =";
                    currentOperator = "";
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
        enable();
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



displayCurrent(currentInput);
displayPrevious(previousInput);


//// Helper Functions

// Calculates given the inputs
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

// Reinitialises all variables to default
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

// Converts number to String
numberToString = (number) => {
    numberString = number.toString();
    
    if (number > 99999999999) {
        numberString = numberString.substring(0,1) + "." + numberString.substring(1, 10)
    }
   
    
    return numberString
}

// Disable and enable buttons depending on output 
disable = () => {
    for (let button of buttons) {
        if (button.id == "all-clear") {
            button.disabled = false;
        }
        else {
            button.disabled = true;
        }
         
    }
}

enable = () => {
    for (let button of buttons) {
        button.disabled = false;
    }
}



