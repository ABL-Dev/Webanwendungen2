// DOM-Elemente
const addNoteBtn = document.getElementById("addNoteBtn");
const addNoteModalEl = document.getElementById("addNoteModal");
const addNoteModal = new bootstrap.Modal(addNoteModalEl);
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// API Block
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function apiLoadNotes() {
    const res = await fetch('http://localhost:8000/api/todo/loadAll');
    if (!res.ok) throw new Error('Fehler beim Laden der Notizen vom Server');
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Serverfehler');
    
    notes = json.data.map(r => ({ id: r.id ?? r.todo_id, text: r.note, checked: !!r.is_done }));
}

async function apiCreateNote(text) {
    const res = await fetch('http://localhost:8000/api/todo/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: text })
    });
    if (!res.ok) throw new Error('Fehler beim Erstellen der Notiz');
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Serverfehler beim Erstellen');
    const d = json.data;
    return { id: d.id ?? d.todo_id, text: d.note, checked: !!d.is_done };
}

async function apiUpdateNote(id, text, checked) {
    const res = await fetch('http://localhost:8000/api/todo/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo_id: id, note: text, is_done: !!checked })
    });
    if (!res.ok) throw new Error('Fehler beim Aktualisieren der Notiz');
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Serverfehler beim Update');
    const d = json.data;
    return { id: d.id ?? d.todo_id, text: d.note, checked: !!d.is_done };
}


async function apiDeleteNote(id) {
    const res = await fetch(`http://localhost:8000/api/todo/delete/${id}`, { method: 'DELETE' });
    if (res.status === 204) return true;
    if (!res.ok) throw new Error('Fehler beim Löschen der Notiz');
    return true;
}

async function apiToggleNote(id, checked) {
    const res = await fetch(`http://localhost:8000/api/todo/toggle/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_done: !!checked })
    });
    if (!res.ok) throw new Error('Fehler beim Umschalten');
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Serverfehler beim Toggle');
    const d = json.data;
    return { id: d.id ?? d.todo_id, text: d.note, checked: !!d.is_done };
}

async function apiDeleteAll() {
    const res = await fetch('http://localhost:8000/api/todo/deleteAll', { method: 'DELETE' });
    if (!res.ok) throw new Error('Fehler beim Löschen aller Einträge');
    return true;
}

//------------------------------------------------------------------------------------------------------------------------------
//ENDE API Block
//--------------------------------------------------------------------------------------------------------------------------


// Rendern der Notizen
function renderNotes() {
    notesList.innerHTML = "";

    // Für jede neue Notiz werden die Buttons und eine Checkbox erstellt
    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-primary";

        const editBtnStyle = note.checked ? 'visibility: hidden; pointer-events: none;' : '';
        const editBtnDisabled = note.checked ? 'disabled' : '';
        
        li.innerHTML = `
            <div class="form-check d-flex align-items-center flex-grow-1">
                <input class="form-check-input me-2" type="checkbox" id="note-${index}" ${note.checked ? "checked" : ""}>
                <label class="form-check-label flex-grow-1 ${note.checked ? "text-decoration-line-through opacity-75" : ""}" for="note-${index}">
                    ${note.text}
                </label>
            </div>
            <div class="btn-group-sm">
                <button class="btn btn-outline-primary edit-btn mx-2" title="Bearbeiten" style="${editBtnStyle}" ${editBtnDisabled}>
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-outline-danger delete-btn" title="Löschen">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        `;

        // Checkbox-Klick
        li.querySelector("input").addEventListener("change", async (e) => {
            const checked = e.target.checked;
            // Wenn es eine DB-id gibt -> nur den Boolean an die API senden.
            if (note.id) {
                try {
                    const res = await fetch(`http://localhost:8000/api/todo/toggle/${note.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ is_done: !!checked })
                    });
                    if (!res.ok) {
                        const txt = await res.text().catch(()=>null);
                        throw new Error(txt || 'Serverfehler beim Toggle');
                    }
                    const json = await res.json().catch(()=>({ success: true, data: { is_done: !!checked } }));
                    if (!json.success) throw new Error(json.error || 'Serverfehler beim Toggle');
                    // Nur checked aktualisieren — NICHT den Text anfassen.
                    notes[index].checked = !!json.data.is_done;
                } catch (err) {
                    alert('Konnte Status nicht speichern: ' + err.message);
                    // revert UI
                    e.target.checked = !checked;
                    return;
                }
            } else {
                // Kein ID (lokal) -> nur lokal setzen (kein Server-Call)
                note.checked = !!checked;
            }
            // Render aktualisierte UI (Text bleibt unverändert)
            renderNotes();
        });

        // Bearbeiten 
        li.querySelector(".edit-btn").addEventListener("click",  () => {           
            currentEditIndex = index;
            editNoteTextarea.value = note.text;
            editNoteModal.show();
        });

        // Löschen
        li.querySelector(".delete-btn").addEventListener("click", async () => {
           try{
                await apiDeleteNote(note.id);
                notes.splice(index, 1);
                renderNotes();
            } catch (err) {
                alert('Löschen fehlgeschlagen: ' + err.message);
            }
            
        });

        notesList.appendChild(li);
    });
}
// Neue Notiz hinzufügen
addNoteBtn.addEventListener("click", () => {
    addNoteTextarea.value = "";
    addNoteModal.show();
});

// Neue Notiz speichern
saveNewNoteBtn.addEventListener("click", async ()   => {
    const noteText = addNoteTextarea.value.trim();
    if (!noteText) {
        // Fehlermeldung anzeigen wenn leer
        addNoteTextarea.classList.add("is-invalid");
    } else {
        // Fehlermeldung entfernen wenn etwas drin steht und speichern
        addNoteTextarea.classList.remove("is-invalid");
        try {
            const created = await apiCreateNote(noteText);
            notes.push(created);
            renderNotes();
            addNoteModal.hide();
        } catch (err) {
            alert('Konnte Notiz nicht speichern: ' + err.message);
        }
    }
});

// Bearbeiten speichern
saveEditNoteBtn.addEventListener("click", async () => {
    const noteText = editNoteTextarea.value.trim();
    if (!noteText) {
        editNoteTextarea.classList.add("is-invalid");
    } else if (currentEditIndex !== null) {
        editNoteTextarea.classList.remove("is-invalid");
        try {
            const note = notes[currentEditIndex];
            const updated = await apiUpdateNote(note.id, noteText, note.checked);
            notes[currentEditIndex] = updated;
            renderNotes();
            editNoteModal.hide();
        } catch (err) {
            alert('Konnte Notiz nicht aktualisieren: ' + err.message);
        }
    }
});

// Alle Notizen löschen
clearNotesBtn.addEventListener("click", () => {
    confirmDeleteAllModal.show();
});

confirmDeleteAllBtn.addEventListener("click", async () => {
   try {
        await apiDeleteAll();
        notes = [];
        renderNotes();
        confirmDeleteAllModal.hide();
    } catch (err) {
        alert('Konnte nicht alle Einträge löschen: ' + err.message);
    }
    //confirmDeleteAllModal.hide();
});

// Formulare zurücksetzen beim Schließen
function setupModalReset(modalEl, textarea) {
    modalEl.addEventListener('hidden.bs.modal', function () {
        const form = this.querySelector('form');
        if (textarea) {
            textarea.classList.remove("is-invalid");
            textarea.classList.remove("is-valid");
        }
    });
}

setupModalReset(addNoteModalEl, addNoteTextarea);
setupModalReset(editNoteModalEl, editNoteTextarea);

// Fehlermeldung ausblenden beim Tippen
addNoteTextarea.addEventListener("input", () => {
    addNoteTextarea.classList.remove("is-invalid");
    addNoteTextarea.classList.add("is-valid");
});

(async function init() {
    try {
        await apiLoadNotes();
        renderNotes();
    } catch (err) {
        console.error('Konnte Notizen laden:', err);
        alert('Fehler beim Laden der Notizen vom Server: ' + err.message);
    }
})();