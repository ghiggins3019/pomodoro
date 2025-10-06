// ==== Get HTML elements ====
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");

const workInput = document.getElementById("workTime");
const breakInput = document.getElementById("breakTime");

// ==== Load settings or use defaults ====
let workTime = parseInt(localStorage.getItem("workTime")) || 25;
let breakTime = parseInt(localStorage.getItem("breakTime")) || 5;
workInput.value = workTime;
breakInput.value = breakTime;

// ==== Timer state ====
let isWork = true;
let timeLeft = workTime * 60;
let timer = null;

// ==== Update the timer display ====
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// ==== Start timer ====
function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        // Switch between work and break automatically
        isWork = !isWork;
        timeLeft = (isWork ? workTime : breakTime) * 60;
        updateBackground();
        updateDisplay();
      }
    }, 1000);
  }
}

// ==== Pause timer ====
function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

// ==== Reset timer ====
function resetTimer() {
  pauseTimer();
  isWork = true;
  timeLeft = workTime * 60;
  updateBackground();
  updateDisplay();
}

// ==== Save settings ====
function saveSettings() {
  workTime = parseInt(workInput.value);
  breakTime = parseInt(breakInput.value);
  localStorage.setItem("workTime", workTime);
  localStorage.setItem("breakTime", breakTime);
  resetTimer();
}

// ==== Change background based on state ====
function updateBackground() {
  if (isWork) {
    document.body.style.backgroundColor = "#191919";
  } else {
    document.body.style.backgroundColor = "#8ec07c";
  }
}

// ==== Hook up button events ====
startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
saveBtn.onclick = saveSettings;

// ==== Initialize display and background ====
updateDisplay();
updateBackground();
