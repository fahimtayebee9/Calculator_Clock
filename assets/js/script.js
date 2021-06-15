/*=============================================
            Clock SCRIPT
=============================================*/
const angle = 6;
const hrTick = document.querySelector('#hr');
const mnTick = document.querySelector('#mn');
const scTick = document.querySelector('#sc');

setInterval(()=>{
    let timeNow = new Date();
    let hour = timeNow.getHours() * 30;
    let min = timeNow.getMinutes() * angle;
    let sec = timeNow.getSeconds() * angle;

    hrTick.style.transform = `rotateZ(${(hour)+(min/12)}deg)`;
    mnTick.style.transform = `rotateZ(${min}deg)`;
    scTick.style.transform = `rotateZ(${sec}deg)`;
});

/*=============================================
            Calculator SCRIPT
=============================================*/
const result = document.querySelector('#result');
const previousValue = document.querySelector('.previousValue');
const buttons = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');
document.getElementById("result").readOnly = true;

// VARIABLES FOR OPERATION
let firstOperand = 0;
let operatorValue = '';
let nextinQueue = false;

// Operation Cases
const calcCases = {
    '+' : (firstOperand, secondNumber) => firstOperand + secondNumber,
    '-' : (firstOperand, secondNumber) => firstOperand - secondNumber,
    '*' : (firstOperand, secondNumber) => firstOperand * secondNumber,
    '/' : (firstOperand, secondNumber) => firstOperand / secondNumber,
    '%' : (firstOperand, secondNumber) => firstOperand % secondNumber,
    '=' : (firstOperand, secondNumber) => secondNumber,
}

// Reset Function
function reset(){
    result.textContent = '0';
    previousValue.textContent = '';
    firstOperand = 0;
    operatorValue = '';
    nextinQueue = false;
}

//DECIMAL CHECK
function decimalCheck(){
    if(!result.textContent.includes('.')){
        result.textContent = `${result.textContent}.`;
    }
}

// Display Function
function display(value){
    if(nextinQueue){
        result.textContent = value;
        nextinQueue = false;
    }
    else{
        const displayValue = result.textContent;
        result.innerHTML = displayValue == 0 ? value : displayValue + value;
    }
}

// Display Function
function displayPrevious(value, operator, curValue){
    if(operator != '='){
        previousValue.textContent = `${value}${operator}${curValue}`;
    }
}

//Extract Value From String After Any Operator is Pressed
function operator(operator){
    const currentValue = Number(result.textContent);
    if(!firstOperand){
        firstOperand = currentValue;
    }
    else{
        const calcCaseAns = calcCases[operatorValue](firstOperand,currentValue);
        result.textContent = calcCaseAns;
        displayPrevious(firstOperand, operatorValue,currentValue);
        firstOperand = calcCaseAns;
    }
    
    nextinQueue = true;
    operatorValue = operator;
}



// Event Listeners
buttons.forEach((inputBtn) => {
    if(inputBtn.classList.length == 0){
        inputBtn.addEventListener('click',() => display(inputBtn.value));
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => operator(inputBtn.value));
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => decimalCheck());
    }
});

// Clear Button Event Listener
clearBtn.addEventListener('click',reset);