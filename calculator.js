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
    
    switch (operator) {
        case '+':
            result = sum(a, b);
            break;
        case '-':
            result = subtraction(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            if (b === 0) {
                alert("Cannot divide by 0!!!");
                return "Error";
            }    
            result = divide(a, b);
            console.log(result % 1);
            break;
        default:
            console.error("Invalid operator:", operator);
            return null;
    }

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
        let operatorSymbol = e.currentTarget.dataset.op;
        
        if (operators.firstNum === "") {
            operators.firstNum = 0;
            operators.operator = operatorSymbol;
        } else if (operators.secondNum != "") {
            let result = operate(operators.firstNum, operators.secondNum, operators.operator);
            if (result % 1 !== 0 && result !== "Error") {
                result = result.toFixed(4);
            }
            if (result !== "Error") {
                lastPressed.innerHTML = result;
                operators.operator = "";
                operators.firstNum = `${result}`;
                operators.secondNum = "";
            } else {
                [operators.firstNum, operators.secondNum, operators.operator]= ["", "", ""]
            };
        };
        operators.operator = operatorSymbol;
        display(operatorSymbol);
    });
});

eqBtn.addEventListener("click", e => {
    if (operators.secondNum != "") {
        let result = operate(operators.firstNum, operators.secondNum, operators.operator);
        if (result % 1 !== 0 && result !== "Error") {
            result = result.toFixed(4);
        }
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

//keyboard support

// check if the input is a number
function isNumber(searchValue) {
    var found = searchValue.search(/^(\d*\.?\d+)$/);
    //Change to ^(\d*\.?\d+)$ if you don't want the number to end with a . such as 2.
    //Currently validates .2, 0.2, 2.0 and 2.
    if(found > -1) {
        return true;
    }
    else {
        return false;
    }
}

document.addEventListener("keydown", (e) => {
    console.log(e.keyCode);
    if (isNumber(e.key)) {
        operators.operator === "" ? operators.firstNum += `${e.key}` : operators.secondNum += `${e.key}`;
        display(e.key);
        console.log('1');
    } else if ((e.keyCode == 187 && e.shiftKey) || (e.keyCode == 107) || (e.keyCode == 61 && e.shiftKey)|| // +
    (e.keyCode == 189 && e.shiftKey == false) || e.keyCode == 109 || // -
    (e.keyCode == 56 && e.shiftKey) || e.keyCode == 106 || // *
    (e.keyCode == 191 && e.shiftKey == false|| e.keyCode == 111)) { // / https://www.toptal.com/developers/keycode; https://codepen.io/thecountgs/pen/JReGNR
        if (operators.firstNum === "") {
            operators.firstNum = 0;
            operators.operator = e.key;
        } else if (operators.secondNum != "") {
            let result = operate(operators.firstNum, operators.secondNum, operators.operator);
            if (result % 1 !== 0 && result !== "Error") {
                result = result.toFixed(4);
            }
            lastPressed.innerHTML = result;
            operators.operator = "";
            operators.firstNum = `${result}`;
            operators.secondNum = "";
        };
        operators.operator = `${e.key}`;
        display(e.key);
    } else if (e.keyCode == 13 || (e.keyCode == 187 && e.shiftKey == false)) { //enter or equal sign 
        if (operators.secondNum != "") {
            let result = operate(operators.firstNum, operators.secondNum, operators.operator);
            if (result % 1 !== 0 && result !== "Error") {
                result = result.toFixed(4);
            }
            lastPressed.innerHTML = result;
            [operators.firstNum, operators.secondNum, operators.operator]= ["", "", ""];
        };
    } else if (e.key == 'Delete') {
        [operators.firstNum, operators.secondNum, operators.operator]= ["", "", ""];
        operation.innerHTML = "";
        lastPressed.innerHTML = "";
    } else if (e.key == 'Backspace') {
        let lastEl = Object.values(operators).findLast(i => i != "");
        console.log(lastEl);
        let lastElKey = Object.keys(operators).find(key  => operators[key] === lastEl);
        console.log(Object.keys(operators));
        console.log(lastElKey);
        lastEl = lastEl.slice(0,-1);
        operators[lastElKey] = lastEl;
        display("");
    };
});




