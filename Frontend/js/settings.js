const AUSGABEN_KATEGORIEN = [
    { id: 6, name: "Wohnen" },
    { id: 7, name: "Versicherungen" },
    { id: 8, name: "Mobilität (Fix)" },
    { id: 9, name: "Kommunikation/Medien" },
    { id: 10, name: "Finanzen/Sparen (Fix)" },
    { id: 11, name: "Abonnements/Mitgliedschaften" },
    { id: 12, name: "Lebensmittel & Haushalt" },
    { id: 13, name: "Mobilität (Variabel)" },
    { id: 14, name: "Kleidung & Körperpflege" },
    { id: 15, name: "Gesundheit" },
    { id: 16, name: "Freizeit & Unterhaltung" },
    { id: 17, name: "Kinder/Haustiere" },
    { id: 18, name: "Urlaub & Reisen" },
    { id: 19, name: "Geschenke & Spenden" },
    { id: 20, name: "Sonstiges" }
];

let currentSettings = { slots: [] };

document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById("settingsModal");
    if (!modalElement) return;
    
    modalElement.addEventListener('show.bs.modal', loadSettingsFromBackend);
    setupSaveButton();
    setupCategoryDropdowns();
});

async function loadSettingsFromBackend() {
    try {
        const response = await fetch('http://localhost:8000/api/settings/load');
        const result = await response.json();
        
        if (!result.success) throw new Error(result.error || "Fehler beim Laden");
        
        currentSettings = result.data;
        
        renderAllDropdowns();
        renderBudgetFields();
    } catch (error) {
        console.error(error);
    }
}

function renderAllDropdowns() {
    for (let i = 0; i < 5; i++) {
        const selectElement = document.getElementById(`categorySelect${i + 1}`);
        if (!selectElement) continue;
        
        const selectedName = currentSettings[i]?.kategorie_name || null;
        const alreadySelected = currentSettings
            .filter((_, idx) => idx !== i)
            .map(slot => slot.kategorie_name)
            .filter(name => name != null);
        
        selectElement.innerHTML = '';
        
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.selected = !selectedName;
        placeholder.textContent = "Kategorie wählen";
        selectElement.appendChild(placeholder);
        
        AUSGABEN_KATEGORIEN.forEach(kategorie => {
            if (!alreadySelected.includes(kategorie.name) || kategorie.name === selectedName) {
                const option = document.createElement('option');
                option.value = kategorie.name;
                option.textContent = kategorie.name;
                option.dataset.kategorieId = kategorie.id;
                if (kategorie.name === selectedName) option.selected = true;
                selectElement.appendChild(option);
            }
        });
    }
}

function renderBudgetFields() {
    for (let i = 0; i < 5; i++) {
        const categorySelect = document.getElementById(`categorySelect${i + 1}`);
        if (!categorySelect) continue;
        
        const container = categorySelect.closest('.row') || categorySelect.parentElement;
        const budgetInput = container?.querySelector('input[placeholder*="Budget"]');
        
        if (budgetInput) {
            const budget = currentSettings[i]?.budget || 0;
            budgetInput.value = budget > 0 ? budget : '';
        }
    }
}

function setupCategoryDropdowns() {
    for (let i = 0; i < 5; i++) {
        const selectElement = document.getElementById(`categorySelect${i + 1}`);
        if (!selectElement) continue;
        
        selectElement.addEventListener('change', (event) => {
            const selectedName = event.target.value;
            const selectedOption = event.target.selectedOptions[0];
            const kategorieId = selectedOption?.dataset.kategorieId || null;
            
            currentSettings[i].kategorie_name = selectedName || null;
            currentSettings[i].kategorie_id = kategorieId ? parseInt(kategorieId) : null;
            
            renderAllDropdowns();
        });
        
        const container = selectElement.closest('.row') || selectElement.parentElement;
        const budgetInput = container?.querySelector('input[placeholder*="Budget"]');
        
        if (budgetInput) {
            budgetInput.addEventListener('input', (event) => {
                currentSettings[i].budget = parseFloat(event.target.value) || 0;
            });
        }
    }
}

function setupSaveButton() {
    const buttons = document.querySelectorAll('#settingsModal button');
    const saveButton = Array.from(buttons).find(btn => 
        btn.textContent.trim().toLowerCase().includes('speichern')
    );
    
    if (!saveButton) return;
    
    saveButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:8000/api/settings/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sprachCode: currentSettings.sprachCode,
                    slots: currentSettings
                })
            });
            
            const result = await response.json();
            
            if (result.success || result.sucess) {
                const modalElement = document.getElementById("settingsModal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) modalInstance.hide();
                window.location.reload();
            } else {
                throw new Error(result.error || "Fehler beim Speichern");
            }
        } catch (error) {
            console.error(error);
        }
    });
}

window.updateCategoryDropdowns = renderAllDropdowns;