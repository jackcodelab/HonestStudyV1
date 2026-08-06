export const studyDatabase = JSON.parse(localStorage.getItem('study_db')) || {
    assignments: [],
    syllabus: [],
    stopwatchTime: 0
};

let currentAverage = 0;

export function saveDatabase() {
    localStorage.setItem('study_db', JSON.stringify(studyDatabase));
}

export function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function setCurrentAverage(val) {
    currentAverage = val;
}

export function getCurrentAverage() {
    return currentAverage;
}
