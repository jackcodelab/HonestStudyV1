import { studyDatabase } from '../storage.js';

let gradingTrendChartInstance = null;

export function updateChartGraphics() {
    const ctx = document.getElementById('gradeTrendChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (gradingTrendChartInstance) {
        gradingTrendChartInstance.destroy();
    }

    const hasData = studyDatabase.assignments.length > 0;
    const labels = hasData ? studyDatabase.assignments.map(i => i.name) : ["No Data"];
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
