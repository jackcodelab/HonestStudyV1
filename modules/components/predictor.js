import { getCurrentAverage } from './storage.js';

const calcBtn = document.getElementById('calculate-goal-btn');
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const goalInput = document.getElementById('target-goal-input');
        const resultBox = document.getElementById('prediction-result');
        const targetValue = parseFloat(goalInput.value);
        const currentAvg = getCurrentAverage();

        if (isNaN(targetValue) || targetValue <= 0 || targetValue > 100) {
            resultBox.innerHTML = "<span style='color:var(--danger)'>Enter a target between 1% and 100%.</span>";
            return;
        }
        if (currentAvg === 0) {
            resultBox.innerHTML = "Log some grades first inside your Grade Book to check your baseline gap.";
            return;
        }

        const performanceGap = targetValue - currentAvg;
        if (performanceGap <= 0) {
            resultBox.innerHTML = "<div style='color: var(--accent-success); font-weight:600;'>🎉 Goal Met!</div>Your verified average satisfies your target profile.";
        } else {
            resultBox.innerHTML = `<div style='color: #f59e0b; font-weight:600;'>⚠️ Behind by ${performanceGap.toFixed(1)}%</div>You need higher future test results to reach your goal.`;
        }
    });
}
