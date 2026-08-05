// ==========================================================================
// FEATURE COMPONENT MODULE: RUNTIME FOCUS TIMER STOPWATCH
// ==========================================================================
import { studyDatabase, saveDatabase, escapeHtml } from '../storage.js';

var clockInterval = null;
var currentSessionSeconds = 0;
var startBtn = document.getElementById('start-btn');
var stopBtn = document.getElementById('stop-btn');

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    clockInterval = setInterval(() => {
        currentSessionSeconds++;
        document.getElementById('tracked-hours').innerText = formatTime(studyDatabase.totalSecondsLogged + currentSessionSeconds);
        document.getElementById('clock-face').innerText = formatTime(currentSessionSeconds);
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(clockInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;

    var timestampStr = new Date().toLocaleDateString() + ' @ ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    studyDatabase.totalSecondsLogged += currentSessionSeconds;
    studyDatabase.sessionLogs.unshift({ time: timestampStr, duration: formatTime(currentSessionSeconds) });
    
    currentSessionSeconds = 0;
    document.getElementById('clock-face').innerText = "00:00:00";
    saveDatabase();
});

export function renderStopwatchHistory() {
    var tbody = document.getElementById('session-log-table');
    tbody.innerHTML = '';
    if (studyDatabase.sessionLogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" style="color: var(--text-muted); text-align: center;">No focus sessions saved yet.</td></tr>';
    } else {
        studyDatabase.sessionLogs.forEach(log => {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${escapeHtml(log.time)}</td><td style="text-align: right; color: var(--accent); font-weight: 600;">${escapeHtml(log.duration)}</td>`;
            tbody.appendChild(row);
        });
    }
    document.getElementById('tracked-hours').innerText = formatTime(studyDatabase.totalSecondsLogged);
}

function formatTime(totalSecs) {
    var hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    var mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    var secs = String(totalSecs % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}
