import { studyDatabase, saveDatabase, escapeHtml } from './storage.js';

const syllabusForm = document.getElementById('syllabus-form');
if (syllabusForm) {
    syllabusForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskInput = document.getElementById('syllabus-task');
        const taskText = taskInput.value.trim();

        if (!taskText) return;

        studyDatabase.syllabus.push({
            title: taskText,
            completed: false
        });

        saveDatabase();
        this.reset();
        renderSyllabus();
    });
}

export function renderSyllabus() {
    const coreList = document.getElementById('syllabus-list');
    if (!coreList) return;

    coreList.innerHTML = '';

    if (studyDatabase.syllabus.length === 0) {
        coreList.innerHTML = '<li style="color: var(--text-muted); text-align: center; list-style: none;">Your syllabus timeline is empty.</li>';
        return;
    }

    studyDatabase.syllabus.forEach((item, index) => {
        const itemElement = document.createElement('li');
        itemElement.style.display = 'flex';
        itemElement.style.justifyContent = 'space-between';
        itemElement.style.alignItems = 'center';
        itemElement.style.marginBottom = '8px';

        itemElement.innerHTML = `
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; ${item.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">
                <input type="checkbox" class="task-toggle" data-index="${index}" ${item.completed ? 'checked' : ''}>
                <span>${escapeHtml(item.title)}</span>
            </label>
            <button class="task-remove" data-index="${index}" style="background:none; border:none; color:var(--danger); cursor:pointer;">&times;</button>
        `;
        coreList.appendChild(itemElement);
    });

    coreList.querySelectorAll('.task-toggle').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const idx = parseInt(this.getAttribute('data-index'), 10);
            studyDatabase.syllabus[idx].completed = this.checked;
            saveDatabase();
            renderSyllabus();
        });
    });

    coreList.querySelectorAll('.task-remove').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-index'), 10);
            studyDatabase.syllabus.splice(idx, 1);
            saveDatabase();
            renderSyllabus();
        });
    });
}
