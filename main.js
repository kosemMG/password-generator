// DOM elements
const domElements = {
  result: document.getElementById("result"),
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
  generate: document.getElementById("generate"),
  clipboard: document.getElementById("clipboard")
};

domElements.generate.addEventListener("click", () => {
  const length = +domElements.length.value;
  const hasLower = domElements.lowercase.checked;
  const hasUppper = domElements.uppercase.checked;
  const hasNumbers = domElements.numbers.checked;
  const hasSymbols = domElements.symbols.checked;

  domElements.result.innerText = generatePassword(
    length,
    hasLower,
    hasUppper,
    hasNumbers,
    hasSymbols
  );
});

// Copy to clipboard
domElements.clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = domElements.result.innerText;

  if (!password) {
      return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password has been copied to clipboard!');
});


/**
 * Generates random password
 * @param {number} length 
 * @param {boolean} lower 
 * @param {boolean} upper 
 * @param {boolean} number 
 * @param {boolean} symbol 
 * @returns {string} random password
 */
function generatePassword(length, lower, upper, number, symbol) {
  let password = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const functionName = Object.keys(type)[0];
      password += randomFunction[functionName]();
    });
  }

  return password.slice(0, length);
}

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

function getRandomLower() {
  const letterCode = Math.floor(Math.random() * 26) + 97;
  return String.fromCharCode(letterCode);
}

function getRandomUpper() {
  const letterCode = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(letterCode);
}

function getRandomNumber() {
  const letterCode = Math.floor(Math.random() * 10) + 48;
  return String.fromCharCode(letterCode);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+-=[]{}<>?/.,|";
  const letterSymbol = Math.floor(Math.random() * symbols.length);
  return symbols[letterSymbol];
}
