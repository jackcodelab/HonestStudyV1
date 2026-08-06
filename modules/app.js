import { renderGradebook } from './components/gradebook.js';
import { initializeStopwatch } from './components/stopwatch.js';
import { renderSyllabus } from './components/syllabus.js';
import './components/predictor.js'; 

document.addEventListener('DOMContentLoaded', () => {
    renderGradebook();
    initializeStopwatch();
    renderSyllabus();
    console.log("🚀 HonestStudy initialized successfully!");
});
