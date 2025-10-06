const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");

let timeLeft = 25 * 60; // default 25 minutes
let timer = null;
let running = false;

// Convert seconds to mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// Update display
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
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
      // Timer ends → auto-stop
      pauseTimer();
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

// Make timer editable on click
timerDisplay.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const parts = timerDisplay.textContent.split(":").map(Number);

    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      timeLeft = parts[0] * 60 + parts[1];
      updateDisplay();
    } else {
      // Reset if invalid input
      updateDisplay();
    }
    timerDisplay.blur(); // remove focus
  }
});

// Initialize
updateDisplay();
