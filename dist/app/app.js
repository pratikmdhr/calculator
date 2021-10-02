const calculator = document.querySelector('.calculator');
const primaryDisplay = document.querySelector('.display__primary');

let curVal = '0';
let result = 0;
let curDisp = '0';
let lastVal = null;
let operation;

calculator.addEventListener('click', calculate);

// Show the Primary Display
const showPrimaryDisplay = (value) => {
  if (primaryDisplay.textContent.length === 12) return;
  primaryDisplay.textContent = value;
};

// All clear
const clearDisplay = () => {
  curVal = curDisp = '0';
  lastVal = null;
  result = 0;
  primaryDisplay.textContent = curVal;
};

// Backspace
const backspace = () => {
  if (
    primaryDisplay.textContent.length === 1 ||
    primaryDisplay.textContent === '0'
  ) {
    curVal = '0';
    showPrimaryDisplay(curVal);
    return;
  }
  primaryDisplay.textContent = primaryDisplay.textContent.slice(0, -1);
  curVal = primaryDisplay.textContent;
};

// OPERATIONS
const operate = {
  add() {
    operation = 'add';
    lastVal = parseFloat(curVal) + parseFloat(lastVal ?? '0');
    showPrimaryDisplay(lastVal);
    this.reset();
  },
  sub() {
    operation = 'sub';
    lastVal = parseFloat(curVal) - parseFloat(lastVal ?? '0');
    showPrimaryDisplay(lastVal);
    this.reset();
  },
  mult() {
    operation = 'mult';
    lastVal = parseFloat(curVal) * parseFloat(lastVal ?? '1');
    showPrimaryDisplay(lastVal);
    this.reset();
  },
  div() {
    operation = 'div';
    lastVal = parseFloat(curVal) / parseFloat(lastVal ?? '1');
    showPrimaryDisplay(lastVal);
    this.reset();
  },
  reset() {
    curVal = '0';
    curDisp = '0';
  },
};

function calculate(e) {
  const target = e.target.closest('button');
  if (!target) return;

  // All clear button
  if (target.classList.contains('allClear')) clearDisplay();
  // Backspace button
  if (target.classList.contains('backspace')) backspace();
  // Number buttons
  if (target.classList.contains('num')) {
    curDisp = curDisp === '0' ? '' : primaryDisplay.textContent;
    curDisp += target.textContent;
    showPrimaryDisplay(curDisp);
    curVal = curDisp;
  }

  // Operations
  if (target.classList.contains('plus')) operate.add();
  if (target.classList.contains('minus')) operate.sub();
  if (target.classList.contains('multiply')) operate.mult();
  if (target.classList.contains('divide')) operate.div();

  // Equals
  if (target.classList.contains('equal')) {
    switch (operation) {
      case 'add':
        result = parseFloat(curVal) + parseFloat(lastVal);
        break;
      case 'sub':
        result = parseFloat(lastVal) - parseFloat(curVal);
        break;
      case 'mult':
        result = parseFloat(curVal) * parseFloat(lastVal);
        break;
      case 'div':
        result = parseFloat(lastVal) / parseFloat(curVal);
        break;
    }
    showPrimaryDisplay(result);
    curDisp = '0';
    curVal = result;
    lastVal = null;
    operation = '';
  }
}
