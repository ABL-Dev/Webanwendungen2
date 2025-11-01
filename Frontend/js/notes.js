// // DOM-Elemente
// const addNoteBtn = document.getElementById("addNoteBtn");
// const addNoteModal = new bootstrap.Modal(document.getElementById("addNoteModal"));
// const saveNewNoteBtn = document.getElementById("saveNewNoteBtn");
// const addNoteTextarea = document.getElementById("addNoteTextarea");
// const notesList = document.getElementById("notesList");

// const editNoteModalEl = document.getElementById("editNoteModal");
// const editNoteModal = new bootstrap.Modal(editNoteModalEl);
// const editNoteTextarea = document.getElementById("editNoteTextarea");
// const saveEditNoteBtn = document.getElementById("saveEditNoteBtn");

// const confirmDeleteAllModalEl = document.getElementById("confirmDeleteAllModal");
// const confirmDeleteAllModal = new bootstrap.Modal(confirmDeleteAllModalEl);
// const confirmDeleteAllBtn = document.getElementById("confirmDeleteAllBtn");

// const clearNotesBtn = document.getElementById("clearNotesBtn");

// // Notizen-Array
// let notes = [];
// let currentEditIndex = null;

// // Funktion: Notiz rendern
// function renderNotes() {
//     notesList.innerHTML = "";
//     notes.forEach((note, index) => {
//         const li = document.createElement("li");
//         li.className = "list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-primary";

//         li.innerHTML = `
//             <span>${note}</span>
//             <div class="btn-group-sm">
//                 <button class="btn btn-outline-primary edit-btn mx-2" title="Bearbeiten">
//                     <i class="bi bi-pencil-fill"></i>
//                 </button>
//                 <button class="btn btn-outline-danger delete-btn" title="Löschen">
//                     <i class="bi bi-trash-fill"></i>
//                 </button>
//             </div>
//         `;

//         // Edit-Button
//         li.querySelector(".edit-btn").addEventListener("click", () => {
//             currentEditIndex = index;
//             editNoteTextarea.value = notes[index];
//             editNoteModal.show();
//         });

//         // Delete-Button
//         li.querySelector(".delete-btn").addEventListener("click", () => {
//             notes.splice(index, 1);
//             renderNotes();
//         });

//         notesList.appendChild(li);
//     });
// }

// // + Notiz hinzufügen öffnen
// addNoteBtn.addEventListener("click", () => {
//     addNoteTextarea.value = "";
//     addNoteModal.show();
// });

// // Neue Notiz speichern
// saveNewNoteBtn.addEventListener("click", () => {
//     const noteText = addNoteTextarea.value.trim();
//     if(noteText) {
//         notes.push(noteText);
//         renderNotes();
//         addNoteModal.hide();
//     }
// });

// // Notiz bearbeiten speichern
// saveEditNoteBtn.addEventListener("click", () => {
//     const noteText = editNoteTextarea.value.trim();
//     if(noteText && currentEditIndex !== null) {
//         notes[currentEditIndex] = noteText;
//         renderNotes();
//         editNoteModal.hide();
//     }
// });

// // Alle Notizen löschen
// clearNotesBtn.addEventListener("click", () => {
//     confirmDeleteAllModal.show();
// });

// confirmDeleteAllBtn.addEventListener("click", () => {
//     notes = [];
//     renderNotes();
//     confirmDeleteAllModal.hide();
// });

// // Initial render
// renderNotes();


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

// LocalStorage: laden
function loadNotes() {
    const saved = localStorage.getItem("notes");
    if (saved) {
        notes = JSON.parse(saved);
    }
}

// LocalStorage: speichern so wie die transactions.
// Storage sichtbar im Browser unter Tab "Application" > Local Storage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Rendern der Notizen
function renderNotes() {
    notesList.innerHTML = "";

    // Für jede neue Notiz werden die Buttons und eine Checkbox erstellt
    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-primary";

        li.innerHTML = `
            <div class="form-check d-flex align-items-center flex-grow-1">
                <input class="form-check-input me-2" type="checkbox" id="note-${index}" ${note.checked ? "checked" : ""}>
                <label class="form-check-label flex-grow-1 ${note.checked ? "text-decoration-line-through opacity-75" : ""}" for="note-${index}">
                    ${note.text}
                </label>
            </div>
            <div class="btn-group-sm">
                <button class="btn btn-outline-primary edit-btn mx-2" title="Bearbeiten">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-outline-danger delete-btn" title="Löschen">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        `;

        // Checkbox-Klick
        li.querySelector("input").addEventListener("change", (e) => {
            note.checked = e.target.checked;
            saveNotes();
            renderNotes();
        });

        // Bearbeiten
        li.querySelector(".edit-btn").addEventListener("click", () => {
            currentEditIndex = index;
            editNoteTextarea.value = note.text;
            editNoteModal.show();
        });

        // Löschen
        li.querySelector(".delete-btn").addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });

        notesList.appendChild(li);
    });
}

// Neue Notiz hinzufügen
addNoteBtn.addEventListener("click", () => {
    addNoteTextarea.value = "";
    addNoteModal.show();
});

saveNewNoteBtn.addEventListener("click", () => {
    const noteText = addNoteTextarea.value.trim();
    if (noteText) {
        notes.push({ text: noteText, checked: false });
        saveNotes();
        renderNotes();
        addNoteModal.hide();
    }
});

// Bearbeiten speichern
saveEditNoteBtn.addEventListener("click", () => {
    const noteText = editNoteTextarea.value.trim();
    if (noteText && currentEditIndex !== null) {
        notes[currentEditIndex].text = noteText;
        saveNotes();
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
    saveNotes();
    renderNotes();
    confirmDeleteAllModal.hide();
});

// Start: Laden & Rendern
loadNotes();
renderNotes();
