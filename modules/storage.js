// Initialize database from localStorage or fall back to empty defaults
export const studyDatabase = JSON.parse(localStorage.getItem('study_db')) || {
    assignments: [],
    syllabus: [],
    stopwatchTime: 0
};

let currentAverage = 0;

// Save current application state to browser cache
export function saveDatabase() {
    localStorage.setItem('study_db', JSON.stringify(studyDatabase));
}

// Safely escape HTML characters to prevent XSS vulnerabilities
export function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Live state management for average scores
export function setCurrentAverage(val) {
    currentAverage = val;
}

export function getCurrentAverage() {
    return currentAverage;
}
