// List of valid keys for the calculator
const validKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "%",
  "Escape",
  "Delete",
  "Backspace",
  //   "Alt",
  //   "Shift",
  //   "Meta",
  //   "CapsLock",
];
const validOrangeKeys = ["+", "-", "*", "/", "Enter"];

// Function to show a warning message for invalid keys
function showWarningMessage(wrongkey) {
  const warningMessage = document.querySelector(".message");
  if (warningMessage) {
    warningMessage.classList.remove("d-none");
    warningMessage.textContent = `The key '${wrongkey}' is not allowed in calculator.`;
    setTimeout(() => warningMessage.classList.add("d-none"), 3000);
  }
}

// Function to handle the hover effect on calculator keys (normal and operators)
function showHoverEffect(key, isActive) {
  const keyClasses = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    ".": "point",
    Backspace: "backspace",
    Escape: "clear",
    Delete: "clear",
    "%": "percentage",
    "/": "divide",
    "*": "multiply",
    "-": "minus",
    "+": "plus",
    Enter: "equal",
  };

  const element = document.getElementsByClassName(keyClasses[key]);
  Array.from(element).forEach((el) => {
    if (isActive) {
      el.style.color =
        key === "+" || key === "-" || key === "*" || key === "/"
          ? "#fff"
          : "#fff";
      el.style.backgroundColor =
        key === "+" || key === "-" || key === "*" || key === "/"
          ? "#cc7a00"
          : "#000";
    } else {
      el.style.color =
        key === "+" || key === "-" || key === "*" || key === "/"
          ? "#fff"
          : "#000";
      el.style.backgroundColor =
        key === "+" || key === "-" || key === "*" || key === "/"
          ? "#ff9500"
          : "#fff";
    }
  });
}

// Event listener for keydown event to check key validity and show hover effects
document.addEventListener("keydown", (event) => {
  if (!validKeys.includes(event.key) && !validOrangeKeys.includes(event.key)) {
    showWarningMessage(event.key);
  } else {
    showHoverEffect(event.key, true);
    updateDataonBasesofkeyEntered(event.key);
  }
});

// Event listener for keyup event to hide hover effects
document.addEventListener("keyup", (event) => {
  showHoverEffect(event.key, false);
});

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    keyValue = button.dataset.value;
    updateDataonBasesofkeyEntered(keyValue);
  });
});

function showDisplay(va) {
  let element = document.getElementById("display");
  element.value = va;
}

function updateDataonBasesofkeyEntered(key) {
  let element = document.getElementById("display");
  let currentValue = element.value;
  let operators = ["+", "-", "*", "/", "%"];
  let lastChar = currentValue.charAt(currentValue.length - 1);

  if (currentValue.length >= 10) {
    return;
  }

  if (currentValue === "0") {
    currentValue = "";
  }

  // Handle backspace key
  if (key === "Backspace") {
    if (currentValue === "0" || currentValue.length === 1) {
      showDisplay("0");
      return;
    }
    currentValue = currentValue.slice(0, -1);
    showDisplay(currentValue);
    return;
  }

  // Handle delete, escape, or clear key
  if (key === "Delete" || key === "Escape" || key === "clear") {
    showDisplay("0");
    return;
  }

  // Ensure no operator is added if no number exists
  if (operators.includes(key) && currentValue === "") {
    return; // Do nothing if no number is present
  }

  // Prevent adding an operator if the last character is already an operator
  if (operators.includes(lastChar)) {
    if (operators.includes(key)) {
      if (lastChar !== key) {
        // Replace the last operator with the new one
        currentValue = currentValue.slice(0, -1) + key;
        showDisplay(currentValue);
      }
      return; // Do nothing if the same operator is pressed
    }
  }

  // Handle enter or equals key
  if (key === "Enter" || key === "=") {
    if (!operators.some((operator) => currentValue.includes(operator))) {
      return;
    }
    if (operators.includes(lastChar)) {
      return;
    } else {
      try {
        currentValue = eval(currentValue); // Evaluate the expression
        showDisplay(currentValue);
      } catch (error) {
        showDisplay("Error");
      }
      return;
    }
  }

  // Append the key to the current value and display it
  currentValue += key;
  showDisplay(currentValue);
}
