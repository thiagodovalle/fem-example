let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".operation");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = 0;
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "Random":
      if (previousOperator === null) {
        buffer = Math.floor(Math.random() * 10);
        console.log(buffer);
        break;
      }
    default:
      handleMath(value);
      break;
  }
}

function getRandomInterger() {
  return parseInt(Math.floor(Math.random() * previousOperator));
}
function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "/") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "/") {
    runningTotal /= intBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}
