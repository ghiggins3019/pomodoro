const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");

let workTime = 25 * 60;  // default work time in seconds
let breakTime = 5 * 60;  // default break time in seconds
let timeLeft = workTime;
let isWork = true;       // start in work period
let timer = null;
let running = false;

// Format seconds to mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// Update timer display
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  updateBackground();
}

// Change background based on period
function updateBackground() {
  if (isWork) {
    document.body.style.backgroundColor = "#191919"; // work period
  } else {
    document.body.style.backgroundColor = "#8ec07c"; // break period
  }
}

// Start timer
function startTimer() {
  if (running) return;
  running = true;
  startPauseBtn.textContent = "Pause";

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      // Switch periods automatically
      isWork = !isWork;
      timeLeft = isWork ? workTime : breakTime;
      updateDisplay();
    }
  }, 1000);
}

// Pause timer
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

// Click timer to set work and break times
timerDisplay.addEventListener("click", () => {
  pauseTimer(); // pause while editing
  const workInput = prompt("Set work time (minutes):", Math.floor(workTime / 60));
  const breakInput = prompt("Set break time (minutes):", Math.floor(breakTime / 60));

  const workMinutes = parseInt(workInput);
  const breakMinutes = parseInt(breakInput);

  if (!isNaN(workMinutes) && workMinutes > 0) workTime = workMinutes * 60;
  if (!isNaN(breakMinutes) && breakMinutes > 0) breakTime = breakMinutes * 60;

  // Reset current period to work
  isWork = true;
  timeLeft = workTime;
  updateDisplay();
});

// Initialize display
updateDisplay();
