import { studyDatabase, saveDatabase, escapeHtml, setCurrentAverage } from './storage.js';

let gradingTrendChartInstance = null;

// Initialize Form Submission
const form = document.getElementById('assignment-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const sub = document.getElementById('assign-subject');
        const score = document.getElementById('assign-score');
        const total = document.getElementById('assign-total');

        const scoredVal = parseFloat(score.value);
        const totalVal = parseFloat(total.value);

        if (scoredVal > totalVal) {
            alert("Scored marks value cannot overflow maximum boundaries limits.");
            return;
        }

        studyDatabase.assignments.push({
            name: sub.value.trim(),
            scored: scoredVal,
            total: totalVal
        });

        saveDatabase();
        this.reset();
        renderGradebook();
    });
}

export function renderGradebook() {
    const tableBody = document.getElementById('grades-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    let aggregateScored = 0;
    let aggregateTotal = 0;

    if (studyDatabase.assignments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="color: var(--text-muted); text-align: center;">No recorded tests found.</td></tr>';
    } else {
        studyDatabase.assignments.forEach((item, index) => {
            aggregateScored += item.scored;
            aggregateTotal += item.total;

            const row = document.createElement('tr');
            const percent = ((item.scored / item.total) * 100).toFixed(1);

            row.innerHTML = `
                <td><strong>${escapeHtml(item.name)}</strong></td>
                <td>${item.scored}</td>
                <td>${item.total}</td>
                <td style="color: var(--accent-success); font-weight:600;">${percent}%</td>
                <td style="text-align: right;">
                    <button class="delete-btn" data-index="${index}" style="background:none; border:none; color:var(--danger); cursor:pointer; font-weight:500;">Remove</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        tableBody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const targetIndex = parseInt(this.getAttribute('data-index'), 10);
                studyDatabase.assignments.splice(targetIndex, 1);
                saveDatabase();
                renderGradebook();
            });
        });
    }

    const finalAvg = aggregateTotal > 0 ? (aggregateScored / aggregateTotal) * 100 : 0;
    setCurrentAverage(finalAvg);

    document.getElementById('total-items').innerText = studyDatabase.assignments.length;
    document.getElementById('overall-gpa').innerText = `${finalAvg.toFixed(1)}%`;
    document.getElementById('predict-current-gpa').innerText = `${finalAvg.toFixed(1)}%`;

    updateChartGraphics();
}
function updateChartGraphics() {
    const ctx = document.getElementById('gradeTrendChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (gradingTrendChartInstance) {
        gradingTrendChartInstance.destroy();
    }

    const hasData = studyDatabase.assignments.length > 0;
    const labels = hasData ? studyDatabase.assignments.map(i => i.name) : ["No Data"];
    
    // FIX: Added the fallback empty array [] after the colon
    const dataPoints = hasData ? studyDatabase.assignments.map(i => parseFloat(((i.scored / i.total) * 100).toFixed(1))) : [];

    gradingTrendChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: dataPoints,
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
