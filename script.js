const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires practice and focus.",
  "JavaScript makes websites more interactive.",
  "Coding every day builds strong programming skills."
];

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");

let currentSentence = "";
let timer = 30;
let interval;
let correctChars = 0;
let totalTyped = 0;
let elapsed = 0;

function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function startTest() {
  currentSentence = getRandomSentence();
  sentenceEl.innerHTML = currentSentence
    .split("")
    .map(c => `<span>${c}</span>`)
    .join("");
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  timer = 30;
  elapsed = 0;
  correctChars = 0;
  totalTyped = 0;
  timeEl.textContent = 0; // reset shown time
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;

  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  elapsed++;
  if (elapsed <= 30) {
    timeEl.textContent = elapsed;
  } else {
    clearInterval(interval);
    inputEl.disabled = true;
  }
}

function updateTyping() {
  const inputText = inputEl.value;
  const spanArray = sentenceEl.querySelectorAll("span");
  totalTyped = inputText.length;

  correctChars = 0;
  spanArray.forEach((char, index) => {
    const typedChar = inputText[index];
    if (typedChar == null) {
      char.classList.remove("correct", "incorrect");
    } else if (typedChar === char.textContent) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
      correctChars++;
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
    }
  });

  // Calculate WPM (words = correctChars/5)
  let wpm = elapsed > 0 ? Math.round((correctChars / 5) / (elapsed / 60)) : 0;
  wpmEl.textContent = wpm;

  // Accuracy
  let accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
  accuracyEl.textContent = accuracy;

  // ✅ Stop when the user finishes the sentence
  if (inputText === currentSentence) {
    clearInterval(interval); // stop timer
    inputEl.disabled = true;
    // keep elapsed time as "time taken"
    timeEl.textContent = elapsed;
  }
}

inputEl.addEventListener("input", updateTyping);
startBtn.addEventListener("click", startTest);
