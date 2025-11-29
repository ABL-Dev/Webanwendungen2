const settingsModalEl = document.getElementById("settingsModal");
const settingsModal = new bootstrap.Modal(settingsModalEl);

document.addEventListener('DOMContentLoaded', () => {
    //Kategorien als Schlüssel + Standardtexte
    const categories = [
        //{ key: "Main income", defaultText: "Haupteinkommen" },
        //{ key: "Supplementary income", defaultText: "Nebeneinkommen" },
        { key: "Government benefits/transfers", defaultText: "Staatliche Leistungen/Transfers" },
        //{ key: "Capital income", defaultText: "Kapitaleinkünfte" },
        //{ key: "Other income", defaultText: "Sonstige Einnahmen" },
        { key: "Housing", defaultText: "Wohnen" },
        { key: "Insurance", defaultText: "Versicherungen" },
        { key: "Mobility (fixed)", defaultText: "Mobilität (Fix)" },
        { key: "Communication/media", defaultText: "Kommunikation/Medien" },
        { key: "Finances/savings (fixed)", defaultText: "Finanzen/Sparen (Fix)" },
        { key: "Subscriptions/memberships", defaultText: "Abonnements/Mitgliedschaften" },
        { key: "Food & household", defaultText: "Lebensmittel & Haushalt" },
        { key: "Mobility (variable)", defaultText: "Mobilität (Variabel)" },
        { key: "Clothing & personal care", defaultText: "Kleidung & Körperpflege" },
        { key: "Health", defaultText: "Gesundheit" },
        { key: "Leisure & entertainment", defaultText: "Freizeit & Unterhaltung" },
        { key: "Children/pets", defaultText: "Kinder/Haustiere" },
        { key: "Vacations & travel", defaultText: "Urlaub & Reisen" },
        { key: "Gifts & donations", defaultText: "Geschenke & Spenden" },
        { key: "Other", defaultText: "Sonstiges" }
    ];

    const dropdownIds = ["categorySelect1", "categorySelect2", "categorySelect3", "categorySelect4", "categorySelect5"];
    const dropdowns = dropdownIds.map(id => document.getElementById(id));

    // prüft ob Kategorie bereits in einem Dropdown gewählt ist
    function isCategorySelected(key, ignoreSelect = null) {
        return dropdowns.some(dd => dd !== ignoreSelect && dd.value === key);
    }

    // Dropdown mit Optionen befüllen
    function fillDropdown(select) {
        const currentValue = select.value;
        select.innerHTML = ''; // Optionen löschen

        // Platzhalter immer oben
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.selected = !currentValue;
        placeholder.textContent = i18next.t("Kategorie wählen", { defaultValue: "Kategorie wählen" });
        select.appendChild(placeholder);

        categories.forEach(cat => {
            if (!isCategorySelected(cat.key, select) || cat.key === currentValue) {
                const option = document.createElement('option');
                option.value = cat.key;
                option.textContent = i18next.t(cat.key, { defaultValue: cat.defaultText });
                if (cat.key === currentValue) option.selected = true;
                select.appendChild(option);
            }
        });
    }

    // Alle Dropdowns initial befüllen
    dropdowns.forEach(dd => fillDropdown(dd));

    // EventListener hinzufügen
    dropdowns.forEach(dd => {
        dd.addEventListener('change', () => {
            dropdowns.forEach(otherDd => fillDropdown(otherDd));
        });
    });

    // Sprachupdate-Funktion
    window.updateCategoryDropdowns = function () {
        dropdowns.forEach(dd => fillDropdown(dd));
    };
});

