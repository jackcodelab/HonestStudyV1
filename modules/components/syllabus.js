// ==========================================================================
// FEATURE COMPONENT MODULE: TEXTBOOK SYLLABUS REGISTRY
// ==========================================================================
import { studyDatabase, saveDatabase, escapeHtml } from '../storage.js';

document.getElementById('syllabus-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var sub = document.getElementById('syll-subject');
    var ch = document.getElementById('syll-chapters');

    studyDatabase.syllabus.push({ name: sub.value.trim(), chapters: parseInt(ch.value, 10) });
    saveDatabase();
    this.reset();
});

export function renderSyllabus() {
    var tbody = document.getElementById('syllabus-table-body');
    tbody.innerHTML = '';

    if (studyDatabase.syllabus.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="color: var(--text-muted); text-align: center;">No tracking entries logged yet.</td></tr>';
    } else {
        studyDatabase.syllabus.forEach((item, index) => {
            var row = document.createElement('tr');
            row.innerHTML = `<td><strong>${escapeHtml(item.name)}</strong></td><td><span style="color:#f59e0b; font-weight:600;">${item.chapters} left</span></td><td style="text-align:right; display:flex; gap:0.5rem; justify-content:flex-end;"><button class="done-ch-btn" data-index="${index}" style="background:#1e293b; color:var(--accent-success); border:1px solid var(--border); padding:0.3rem 0.6rem; border-radius:4px; cursor:pointer; font-size:0.8rem; font-weight:600;">📖 Finish 1 Ch</button><button class="del-syll-btn" data-index="${index}" style="background:none; border:none; color:var(--danger); cursor:pointer;">Remove</button></td>`;
            tbody.appendChild(row);
        });

        tbody.querySelectorAll('.done-ch-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-index'));
                if (studyDatabase.syllabus[idx].chapters > 0) {
                    studyDatabase.syllabus[idx].chapters--;
                    saveDatabase();
                }
            });
        });

        tbody.querySelectorAll('.del-syll-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                studyDatabase.syllabus.splice(parseInt(this.getAttribute('data-index')), 1);
                saveDatabase();
            });
        });
    }
}
