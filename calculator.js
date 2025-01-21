function sum(a, b) {
    return a + b;
};

function subtraction(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

const a = 0;
const b = 0;
const operator = '+';

function operate (a, b, operator) {
    if (operator == '+') {
        sum(a, b);
    } else if (operator == '-'){
        subtraction(a, b);
    } else if (operator == '*') {
        multiply(a, b);
    } else {
        divide(a, b);
    };
};

const screen = document.querySelector(".screen");
const btns = document.querySelectorAll('button');
const numBtns = document.querySelectorAll('num-btn');
const opBtns = document.querySelectorAll('op-btn');
const eqBtn = document.querySelector('eq-btn');
const clearBtn = document.querySelector('clear-btn');

function display(input) {
    screen.innerHTML += `${input}`;
};

btns.forEach((btn) => {
    btn.addEventListener("click", e => display(e.target.textContent));
});

clearBtn.addEventListener("click", firstNum, secondNum = 0, 0);
eqBtn.addEventListener("click", operate(firstNum, secondNum, operation));



