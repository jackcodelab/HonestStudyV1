import { studyDatabase, saveDatabase } from '../storage.js';

let timerInterval = null;
let totalSeconds = studyDatabase.stopwatchTime || 0;

const timeDisplay = document.getElementById('stopwatch-display');
const startBtn = document.getElementById('stopwatch-start');
const stopBtn = document.getElementById('stopwatch-stop');
const resetBtn = document.getElementById('stopwatch-reset');

function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
    if (timeDisplay) {
        timeDisplay.innerText = formatTime(totalSeconds);
    }
}

if (startBtn && stopBtn && resetBtn) {
    startBtn.addEventListener('click', () => {
        if (timerInterval) return; 
        
        timerInterval = setInterval(() => {
            totalSeconds++;
            studyDatabase.stopwatchTime = totalSeconds;
            saveDatabase();
            updateDisplay();
        }, 1000);
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        totalSeconds = 0;
        studyDatabase.stopwatchTime = 0;
        saveDatabase();
        updateDisplay();
    });
}

export function initializeStopwatch() {
    updateDisplay();
}
