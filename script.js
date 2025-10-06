const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

let timeLeft = 1500; // 25 minutes
let isRunning = false;
let timer;
let isWorkSession = true;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.textContent = "Pause";

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      switchTimer();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  startBtn.textContent = "Start";
  clearInterval(timer);
}

function switchTimer() {
  document.body.style.backgroundColor = "#8ec07c"; // fade to green
  setTimeout(() => {
    isWorkSession = !isWorkSession;
    timeLeft = isWorkSession ? 1500 : 300; // 25 min or 5 min
    document.body.style.backgroundColor = "#1d2021"; // fade back to dark
    updateDisplay();
    startTimer(); // immediately start next timer
  }, 1500); // matches fade duration
}

startBtn.addEventListener("click", () => {
  if (isRunning) pauseTimer();
  else startTimer();
});

updateDisplay();
