// ==========================================================================
// HIGH-LEVEL ROUTER ENGINE STARTER
// ==========================================================================
import { renderGradebook } from './components/gradebook.js';
import { renderStopwatchHistory } from './components/stopwatch.js';
import { renderSyllabus } from './components/syllabus.js';

export var studyDatabase = { 
    assignments: [], 
    totalSecondsLogged: 0, 
    sessionLogs: [], 
    syllabus: [] 
};

// Shared current-average value, computed by gradebook.js and read by predictor.js
export var currentAverage = 0;
export function setCurrentAverage(value) {
    currentAverage = value;
}

document.addEventListener('DOMContentLoaded', () => {
    initTabSystem();
    pullFromLocalCache();
    initBackupButtons();
});

function initTabSystem() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(this.getAttribute('data-target')).classList.add('active');
            this.classList.add('active');
        });
    });
}

export function saveDatabase() {
    localStorage.setItem('honestStudy_standalone_db', JSON.stringify(studyDatabase));
    refreshAllComponents();
}

export function pullFromLocalCache() {
    var savedData = localStorage.getItem('honestStudy_standalone_db');
    if (savedData) {
        try {
            var parsed = JSON.parse(savedData);
            studyDatabase.assignments = parsed.assignments || [];
            studyDatabase.totalSecondsLogged = parsed.totalSecondsLogged || 0;
            studyDatabase.sessionLogs = parsed.sessionLogs || [];
            studyDatabase.syllabus = parsed.syllabus || [];
        } catch (e) {
            console.error("Cache parsing mismatch:", e);
        }
    }
    refreshAllComponents();
}

function refreshAllComponents() {
    renderGradebook();
    renderStopwatchHistory();
    renderSyllabus();
    runMayCountdown();
}

function initBackupButtons() {
    document.getElementById('export-btn').addEventListener('click', () => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(studyDatabase, null, 2));
        var dl = document.createElement('a');
        dl.setAttribute("href", dataStr);
        dl.setAttribute("download", "honeststudy_standalone_backup.json");
        dl.click();
    });

    document.getElementById('import-input').addEventListener('change', (e) => {
        var file = e.target.files[0];
        if (!file) return;
        var r = new FileReader();
        r.onload = function (evt) {
            try {
                var tempDb = JSON.parse(evt.target.result);
                if (tempDb.assignments && tempDb.syllabus) {
                    studyDatabase.assignments = tempDb.assignments;
                    studyDatabase.totalSecondsLogged = tempDb.totalSecondsLogged || 0;
                    studyDatabase.sessionLogs = tempDb.sessionLogs || [];
                    studyDatabase.syllabus = tempDb.syllabus;
                    saveDatabase();
                    alert("Database file backup sync success!");
                }
            } catch (err) { alert("Invalid structure markup format template rejected."); }
        };
        r.readAsText(file);
    });
}

function runMayCountdown() {
    var diffMs = new Date('May 1, 2027 00:00:00') - new Date();
    var banner = document.getElementById('countdown-banner');
    if (!banner) return;
    if (diffMs <= 0) {
        banner.innerText = "Welcome to 10th Grade!";
        return;
    }
    var totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    banner.innerHTML = `⏳ <strong>${Math.floor(totalDays / 7)} weeks</strong> and <strong>${totalDays % 7} days</strong> left until your May 2027 transition milestone.`;
}

export function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
