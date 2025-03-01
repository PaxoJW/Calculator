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
        b === 0 ? alert("Cannot divide by 0!!!") : result = divide(a, b);
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
const backSpaceBtn = document.querySelector('.backspace-btn');

function display(input) {
    lastPressed.innerHTML = `${input}`;
    operation.innerHTML = `${operators.firstNum}`+`${operators.operator}`+`${operators.secondNum}`;
};

const operators = {
    firstNum: "",
    operator: "",
    secondNum: ""
};

numBtns.forEach((btn) => {
    btn.addEventListener("click", e => {
        operators.operator === "" ? operators.firstNum += `${e.target.textContent}` : operators.secondNum += `${e.target.textContent}`;
        display(e.target.textContent);
    });
});

opBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        
        
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
        operators.operator = `${e.target.textContent}`;
        display(e.target.textContent);
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



backSpaceBtn.addEventListener("click", () => {
    let lastEl = Object.values(operators).findLast(i => i != "");
    console.log(lastEl);
    let lastElKey = Object.keys(operators).find(key  => operators[key] === lastEl);
    console.log(Object.keys(operators));
    console.log(lastElKey);
    lastEl = lastEl.slice(0,-1);
    operators[lastElKey] = lastEl;
    display("");
});




