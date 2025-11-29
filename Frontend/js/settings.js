const settingsModalEl = document.getElementById("settingsModal");
const settingsModal = new bootstrap.Modal(settingsModalEl);

document.addEventListener('DOMContentLoaded', async () => {

    // Gespeicherte Settings vom Backend laden
    let settings = { slots: [], sprachCode: 'DE' };
    try {
        const response = await fetch('/api/settings/load');
        const result = await response.json();
        if(result.success){
            settings = result.data;
        } else {
            console.error("Fehler beim Laden der Einstellungen:", result.error);
        }
    } catch(err){
        console.error("Fehler beim Abrufen der Einstellungen:", err);
    }

    const categories = [
        { id: 1, key: "Government benefits/transfers", defaultText: "Staatliche Leistungen/Transfers" },
        { id: 2, key: "Housing", defaultText: "Wohnen" },
        { id: 3, key: "Insurance", defaultText: "Versicherungen" },
        { id: 4, key: "Mobility (fixed)", defaultText: "Mobilität (Fix)" },
        { id: 5, key: "Communication/media", defaultText: "Kommunikation/Medien" },
        { id: 6, key: "Finances/savings (fixed)", defaultText: "Finanzen/Sparen (Fix)" },
        { id: 7, key: "Subscriptions/memberships", defaultText: "Abonnements/Mitgliedschaften" },
        { id: 8, key: "Food & household", defaultText: "Lebensmittel & Haushalt" },
        { id: 9, key: "Mobility (variable)", defaultText: "Mobilität (Variabel)" },
        { id: 10, key: "Clothing & personal care", defaultText: "Kleidung & Körperpflege" },
        { id: 11, key: "Health", defaultText: "Gesundheit" },
        { id: 12, key: "Leisure & entertainment", defaultText: "Freizeit & Unterhaltung" },
        { id: 13, key: "Children/pets", defaultText: "Kinder/Haustiere" },
        { id: 14, key: "Vacations & travel", defaultText: "Urlaub & Reisen" },
        { id: 15, key: "Gifts & donations", defaultText: "Geschenke & Spenden" },
        { id: 16, key: "Other", defaultText: "Sonstiges" }
    ];

    const dropdownIds = ["categorySelect1", "categorySelect2", "categorySelect3", "categorySelect4", "categorySelect5"];
    const dropdowns = dropdownIds.map(id => document.getElementById(id));

    // Prüft, ob Kategorie bereits in einem Dropdown gewählt ist
    function isCategorySelected(key, ignoreSelect = null){
        return dropdowns.some(dd => dd !== ignoreSelect && dd.value === key);
    }

    // Dropdown mit Optionen befüllen
    function fillDropdown(select, currentValue){
        select.innerHTML = '';

        // Platzhalter
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.selected = !currentValue;
        placeholder.textContent = i18next.t("Kategorie wählen", { defaultValue: "Kategorie wählen" });
        select.appendChild(placeholder);

        // Statische Kategorien einfügen, bereits gewählte ausblenden
        categories.forEach(cat => {
            if(!isCategorySelected(cat.key, select) || cat.key === currentValue){
                const option = document.createElement('option');
                option.value = cat.key;
                option.textContent = i18next.t(cat.key, { defaultValue: cat.defaultText });
                if(cat.key === currentValue) option.selected = true;
                select.appendChild(option);
            }
        });
    }

    // Alle Dropdowns initial befüllen und EventListener hinzufügen
    dropdowns.forEach((dd, index) => {
        const slot = settings.slots[index];
        const currentValue = slot?.kategorie_name || '';
        fillDropdown(dd, currentValue);

        dd.addEventListener('change', async () => {
            // Auswahl im settings-Array speichern
            slot.kategorie_name = dd.value;
            slot.kategorie_id = categories.find(c => c.key === dd.value)?.id || null;

            // Alle Dropdowns neu rendern, um doppelte Auswahl zu verhindern
            dropdowns.forEach((otherDd, i) => fillDropdown(otherDd, settings.slots[i]?.kategorie_name));

            // Änderungen ans Backend senden
            try {
                const response = await fetch('/api/settings/save', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        sprachCode: settings.sprachCode,
                        slots: settings.slots
                    })
                });
                const result = await response.json();
                if(!result.success){
                    console.error("Fehler beim Speichern:", result.error);
                }
            } catch(err){
                console.error("Fehler beim Speichern der Settings:", err);
            }
        });
    });

    // Sprachupdate-Funktion für i18next
    window.updateCategoryDropdowns = function(){
        dropdowns.forEach((dd, i) => fillDropdown(dd, settings.slots[i]?.kategorie_name));
    };

});
