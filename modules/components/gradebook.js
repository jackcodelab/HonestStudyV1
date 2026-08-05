// ==========================================================================
// FEATURE COMPONENT MODULE: GRADEBOOK LOGS & TREND CANVASES
// ==========================================================================
import { studyDatabase, saveDatabase, escapeHtml, setCurrentAverage } from '../storage.js';

var gradingTrendChartInstance = null;

document.getElementById('assignment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var sub = document.getElementById('assign-subject');
    var score = document.getElementById('assign-score');
    var total = document.getElementById('assign-total');

    var scoredVal = parseFloat(score.value);
    var totalVal = parseFloat(total.value);

    if (scoredVal > totalVal) {
        alert("Scored marks value cannot overflow maximum boundaries limits.");
        return;
    }

    studyDatabase.assignments.push({ name: sub.value.trim(), scored: scoredVal, total: totalVal });
    saveDatabase();
    this.reset();
});

export function renderGradebook() {
    var tableBody = document.getElementById('grades-table-body');
    tableBody.innerHTML = '';
    var aggregateScored = 0, aggregateTotal = 0;

    if (studyDatabase.assignments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="color: var(--text-muted); text-align: center;">No recorded tests found.</td></tr>';
    } else {
        studyDatabase.assignments.forEach((item, index) => {
            aggregateScored += item.scored;
            aggregateTotal += item.total;
            var row = document.createElement('tr');
            row.innerHTML = `<td><strong>${escapeHtml(item.name)}</strong></td><td>${item.scored}</td><td>${item.total}</td><td style="color: var(--accent-success); font-weight:600;">${((item.scored / item.total) * 100).toFixed(1)}%</td><td style="text-align: right;"><button class="delete-btn" data-index="${index}" style="background:none; border:none; color:var(--danger); cursor:pointer; font-weight:500;">Remove</button></td>`;
            tableBody.appendChild(row);
        });

        tableBody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                studyDatabase.assignments.splice(parseInt(this.getAttribute('data-index')), 1);
                saveDatabase();
            });
        });
    }

    var finalAvg = aggregateTotal > 0 ? (aggregateScored / aggregateTotal) * 100 : 0;
    setCurrentAverage(finalAvg);
    
    document.getElementById('total-items').innerText = studyDatabase.assignments.length;
    document.getElementById('overall-gpa').innerText = `${finalAvg.toFixed(1)}%`;
    document.getElementById('predict-current-gpa').innerText = `${finalAvg.toFixed(1)}%`;

    updateChartGraphics();
}

function updateChartGraphics() {
    var ctx = document.getElementById('gradeTrendChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (gradingTrendChartInstance) gradingTrendChartInstance.destroy();

    gradingTrendChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: studyDatabase.assignments.map(i => i.name).length > 0 ? studyDatabase.assignments.map(i => i.name) : ["No Data"],
            datasets: [{
                data: studyDatabase.assignments.map(i => parseFloat(((i.scored / i.total) * 100).toFixed(1))),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                borderWidth: 3,
                tension: 0.25,
                pointBackgroundColor: '#10b981',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 0, max: 100, grid: { color: '#1e293b' }, ticks: { color: '#64748b' } },
                x: { grid: { display: false }, ticks: { color: '#64748b' } }
            }
        }
    });
}