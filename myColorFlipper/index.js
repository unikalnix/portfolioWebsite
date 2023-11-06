const hex = [
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
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
const btn = document.getElementById("btn");
const copyBtn = document.getElementById("copy-btn");
const color = document.querySelector(".color");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById("clear-history");
const simpleBtn = document.getElementById("simple-btn");

btn.addEventListener("click", generateColor);
copyBtn.addEventListener("click", copyToClipboard);
clearHistoryButton.addEventListener("click", clearHistory);
simpleBtn.addEventListener("click", setDefaultColor);

// Load history from local storage
loadHistory();

function generateColor() {
  const hexColor = generateHexColor();
  color.textContent = hexColor;
  document.body.style.backgroundColor = hexColor;
  saveToHistory(hexColor);
}

function generateHexColor() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  return hexColor;
}

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

function copyToClipboard() {
  const text = color.textContent;
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function saveToHistory(hexColor) {
  const historyItems = getHistoryFromStorage();
  historyItems.push(hexColor);
  localStorage.setItem("colorHistory", JSON.stringify(historyItems));
  addToHistoryList(hexColor);
}

function loadHistory() {
  const historyItems = getHistoryFromStorage();
  historyItems.forEach((hexColor) => {
    addToHistoryList(hexColor);
  });
}

function getHistoryFromStorage() {
  const history = localStorage.getItem("colorHistory");
  return history ? JSON.parse(history) : [];
}

function addToHistoryList(hexColor) {
  const li = document.createElement("li");
  li.textContent = hexColor;

  const copyButton = document.createElement("button");
  // Remove the text content from the button
  copyButton.textContent = "Copy";
  copyButton.classList.add("copy-color-btn");
  copyButton.addEventListener("click", function () {
    copyToClipboard(hexColor);
  });

  li.appendChild(copyButton);
  historyList.appendChild(li);
}

function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function clearHistory() {
  localStorage.removeItem("colorHistory");
  historyList.innerHTML = ""; // Clear the displayed history
}

function setDefaultColor() {
  const defaultColor = "#f1f5f8";
  color.textContent = defaultColor;
  document.body.style.backgroundColor = defaultColor;
  clearHistory();
}
window.addEventListener("DOMContentLoaded", function () {
  historyList.style.display = "none";
});
btn.addEventListener("click", function () {
  historyList.style.display = "block";
});
clearHistoryButton.addEventListener("click", function () {
  historyList.style.display = "none";
});

const applyColorButton = document.getElementById("apply-color");
const colorInput = document.getElementById("color-input");

applyColorButton.addEventListener("click", applyUserColor);

function applyUserColor() {
  const userInputColor = colorInput.value;
  if (isValidColor(userInputColor)) {
    color.textContent = userInputColor;
    document.body.style.backgroundColor = userInputColor;
    saveToHistory(userInputColor);
    colorInput.value = ""; // Clear the input field
  } else {
    alert("Invalid color code or name. Please enter a valid color.");
  }
}

applyColorButton.addEventListener("click", applyUserColor);
colorInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    applyUserColor();
  }
});

function isValidColor(color) {
  const style = new Option().style;
  style.color = color;
  return style.color !== "";
}

const facebookShareButton = document.getElementById("facebook-share");
const twitterShareButton = document.getElementById("twitter-share");

// Define the URLs you want to share
const shareUrl = "https://your-website.com"; // Replace with your website URL

// Share on Facebook
facebookShareButton.addEventListener("click", () => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  window.open(facebookUrl, "_blank");
});

// Share on Twitter
twitterShareButton.addEventListener("click", () => {
  const tweetText = "Check out this cool color: " + color.textContent; // Customize the text
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}&url=${encodeURIComponent(shareUrl)}`;
  window.open(twitterUrl, "_blank");
});

copyBtn.addEventListener("click", () => {
  copyToClipboard();
  copyBtn.classList.add("copy-animation"); // Add the animation class

  // Remove the animation class after a certain time (1s in this case)
  setTimeout(() => {
    copyBtn.classList.remove("copy-animation");
  }, 1000); // Adjust the time to match your animation duration
});

const autoColorChangeButton = document.getElementById("auto-color-change");
let autoColorChangeInterval;

autoColorChangeButton.addEventListener("click", () => {
  if (autoColorChangeInterval) {
    clearInterval(autoColorChangeInterval);
    autoColorChangeInterval = null;
    autoColorChangeButton.textContent = "Auto Change Color";
  } else {
    autoColorChangeInterval = setInterval(generateColor, 300); // Change color every 2 seconds
    autoColorChangeButton.textContent = "Stop Auto Change";
  }
});

// Function to generate and apply a random color
function generateColor() {
  const hexColor = generateHexColor();
  color.textContent = hexColor;
  document.body.style.backgroundColor = hexColor;
  saveToHistory(hexColor);
}
