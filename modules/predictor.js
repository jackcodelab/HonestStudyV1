// ==========================================================================
// MODULE FILE: STANDALONE ANALYTICAL TARGET PREDICTOR
// ==========================================================================
import { currentAverage } from './storage.js';

document.getElementById('calculate-goal-btn').addEventListener('click', () => {
    var goalInput = document.getElementById('target-goal-input');
    var resultBox = document.getElementById('prediction-result');
    var targetValue = parseFloat(goalInput.value);

    var currentAvg = currentAverage;

    if (isNaN(targetValue) || targetValue <= 0 || targetValue > 100) {
        resultBox.innerHTML = "<span style='color:var(--danger)'>Enter a target between 1% and 100%.</span>";
        return;
    }
    if (currentAvg === 0) {
        resultBox.innerHTML = "Log some grades first inside your Grade Book to check your baseline gap.";
        return;
    }

    var performanceGap = targetValue - currentAvg;
    if (performanceGap <= 0) {
        resultBox.innerHTML = "<div style='color: var(--accent-success); font-weight:600;'>🎉 Goal Met!</div>Your verified average satisfies your target profile.";
    } else {
        resultBox.innerHTML = "<div style='color: #f59e0b; font-weight:600;'>⚠️ Behind by " + performanceGap.toFixed(1) + "%</div>You need higher future test results to reach your goal.";
    }
});
