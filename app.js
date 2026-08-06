import { renderGradebook } from './components/Gradebook.js';
import { initializeStopwatch } from './components/Stopwatch.js';
import { renderSyllabus } from './components/Syllabus.js';

// This runs the button click event listener code for the calculator automatically
import './components/Predictor.js'; 

// Wait for the browser HTML structure to fully load before initializing features
document.addEventListener('DOMContentLoaded', () => {
    renderGradebook();
    initializeStopwatch();
    renderSyllabus();
    console.log("🚀 HonestStudy Application successfully initialized!");
});