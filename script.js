const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");

let workTime = 25 * 60; // seconds
let breakTime = 5 * 60; // seconds
let timeLeft = workTime;
let isWork = true;
let timer = null;
let running = false;

// Update the timer text
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Start the timer
function startTimer() {
  if (running) return;
  running = true;
  startPauseBtn.textContent = "Pause";

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      // Switch between work and break
      isWork = !isWork;
      timeLeft = isWork ? workTime : breakTime;
      updateDisplay();
      // Continue automatically
    }
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  running = false;
  startPauseBtn.textContent = "Start";
  clearInterval(timer);
}

// Toggle start/pause
startPauseBtn.addEventListener("click", () => {
  if (running) pauseTimer();
  else startTimer();
});

// Initialize display
updateDisplay();
