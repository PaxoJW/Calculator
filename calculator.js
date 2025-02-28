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

function operate (a, b, operator) {
    let result;
    a = a * 1;
    b = b * 1;
    if (operator === '+') {
        result = sum(a, b);
    } else if (operator === '-'){
        result = subtraction(a, b);
    } else if (operator === '*') {
        result = multiply(a, b);
    } else {
        result = divide(a, b);
    };
    return result;
};

const operation = document.querySelector(".operation");
const lastPressed = document.querySelector(".lastPressed");
const btns = document.querySelectorAll('button');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.op-btn');
const eqBtn = document.querySelector('.eq-btn');
const clearBtn = document.querySelector('.clear-btn');

function display(input) {
    lastPressed.innerHTML = `${input}`;
    operation.innerHTML = `${operators.firstNum}`+`${operators.operator}`+`${operators.secondNum}`;
};

const operators = {
    firstNum: "",
    secondNum: "",
    operator: ""
};

numBtns.forEach((btn) => {
    btn.addEventListener("click", e => {
        operators.operator === "" ? operators.firstNum += `${e.target.textContent}` : operators.secondNum += `${e.target.textContent}`;
        display(e.target.textContent);
    });
});

opBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        
        display(e.target.textContent);
        if (operators.firstNum === "") {
            operators.firstNum = 0;
            operators.operator = e.target.textContent;
        } else if (operators.secondNum != "") {
            let result = operate(operators.firstNum, operators.secondNum, operators.operator);
            lastPressed.innerHTML = result;
            operators.operator = "";
            operators.firstNum = `${result}`;
            operators.secondNum = "";
        };
        operators.operator = e.target.textContent;
    });
});

eqBtn.addEventListener("click", e => {
    if (operators.secondNum != "") {
        let result = operate(operators.firstNum, operators.secondNum, operators.operator);
        lastPressed.innerHTML = result;
        [operators.firstNum, operators.secondNum, operators.operator]= ["", "", ""];
    };
});
clearBtn.addEventListener("click", () => {
    [operators.firstNum, operators.secondNum, operators.operator]= ["", "", ""];
    operation.innerHTML = "";
    lastPressed.innerHTML = "";
});




