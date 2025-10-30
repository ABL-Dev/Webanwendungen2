// DOM-Elemente
const addNoteBtn = document.getElementById("addNoteBtn");
const addNoteModal = new bootstrap.Modal(document.getElementById("addNoteModal"));
const saveNewNoteBtn = document.getElementById("saveNewNoteBtn");
const addNoteTextarea = document.getElementById("addNoteTextarea");
const notesList = document.getElementById("notesList");

const editNoteModalEl = document.getElementById("editNoteModal");
const editNoteModal = new bootstrap.Modal(editNoteModalEl);
const editNoteTextarea = document.getElementById("editNoteTextarea");
const saveEditNoteBtn = document.getElementById("saveEditNoteBtn");

const confirmDeleteAllModalEl = document.getElementById("confirmDeleteAllModal");
const confirmDeleteAllModal = new bootstrap.Modal(confirmDeleteAllModalEl);
const confirmDeleteAllBtn = document.getElementById("confirmDeleteAllBtn");

const clearNotesBtn = document.getElementById("clearNotesBtn");

// Notizen-Array
let notes = [];
let currentEditIndex = null;

// Funktion: Notiz rendern
function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-secondary";

        li.innerHTML = `
            <span>${note}</span>
            <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary edit-btn" title="Bearbeiten">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-outline-danger delete-btn" title="Löschen">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        `;

        // Edit-Button
        li.querySelector(".edit-btn").addEventListener("click", () => {
            currentEditIndex = index;
            editNoteTextarea.value = notes[index];
            editNoteModal.show();
        });

        // Delete-Button
        li.querySelector(".delete-btn").addEventListener("click", () => {
            notes.splice(index, 1);
            renderNotes();
        });

        notesList.appendChild(li);
    });
}

// + Notiz hinzufügen öffnen
addNoteBtn.addEventListener("click", () => {
    addNoteTextarea.value = "";
    addNoteModal.show();
});

// Neue Notiz speichern
saveNewNoteBtn.addEventListener("click", () => {
    const noteText = addNoteTextarea.value.trim();
    if(noteText) {
        notes.push(noteText);
        renderNotes();
        addNoteModal.hide();
    }
});

// Notiz bearbeiten speichern
saveEditNoteBtn.addEventListener("click", () => {
    const noteText = editNoteTextarea.value.trim();
    if(noteText && currentEditIndex !== null) {
        notes[currentEditIndex] = noteText;
        renderNotes();
        editNoteModal.hide();
    }
});

// Alle Notizen löschen
clearNotesBtn.addEventListener("click", () => {
    confirmDeleteAllModal.show();
});

confirmDeleteAllBtn.addEventListener("click", () => {
    notes = [];
    renderNotes();
    confirmDeleteAllModal.hide();
});

// Initial render
renderNotes();
