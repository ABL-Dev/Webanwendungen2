const settingsModalEl = document.getElementById("settingsModal");
const settingsModal = new bootstrap.Modal(settingsModalEl);

document.addEventListener('DOMContentLoaded', () => {
    //Kategorien als Schlüssel + Standardtexte
    const categories = [
        { key: "Main income", defaultText: "Haupteinkommen" },
        { key: "Supplementary income", defaultText: "Nebeneinkommen" },
        { key: "Government benefits/transfers", defaultText: "Staatliche Leistungen/Transfers" },
        { key: "Capital income", defaultText: "Kapitaleinkünfte" },
        { key: "Other income", defaultText: "Sonstige Einnahmen" },
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

    //Dropdowns befüllen
    dropdownIds.forEach(id => {
        const select = document.getElementById(id);
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.key;
            option.textContent = i18next.t(cat.key, { defaultValue: cat.defaultText });
            select.appendChild(option);
        });
    });

    //Funktion zum Aktualisieren bei Sprachwechsel
    window.updateCategoryDropdowns = function() {
        dropdownIds.forEach(id => {
            const select = document.getElementById(id);
            select.querySelectorAll("option").forEach(option => {
                const cat = categories.find(c => c.key === option.value);
                if (cat) {
                    option.textContent = i18next.t(cat.key, { defaultValue: cat.defaultText });
                }
            });
        });
    };
});
