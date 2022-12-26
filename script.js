//DOM Selectors
const body = document.body;
const main = document.main;
const display = document.querySelector(".display")

operate = (a, b, op) => {
    return op === '+' ? a + b
    : op === '-' ? a - b
    : op === '*' ? a * b
    : op === '/' ? a / b
    : "invalid"
}



