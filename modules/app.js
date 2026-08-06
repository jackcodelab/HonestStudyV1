import { renderGradebook } from './components/Gradebook.js';
import { initializeStopwatch } from './components/Stopwatch.js';
import { renderSyllabus } from './components/Syllabus.js';
import './predictor.js'; 

document.addEventListener('DOMContentLoaded', () => {
    renderGradebook();
    initializeStopwatch();
    renderSyllabus();
    console.log("🚀 HonestStudy initialized successfully!");
});
