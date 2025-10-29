document.addEventListener('DOMContentLoaded', () => {
    // Alle verfügbaren Kategorien
    const categories = [
        "Haupteinkommen", "Nebeneinkommen", "Staatliche Leistungen/Transfers",
        "Kapitaleinkünfte", "Sonstige Einnahmen", "Wohnen", "Versicherungen",
        "Mobilität (Fix)", "Kommunikation/Medien", "Finanzen/Sparen (Fix)",
        "Abonnements/Mitgliedschaften", "Lebensmittel & Haushalt",
        "Mobilität (Variabel)", "Kleidung & Körperpflege", "Gesundheit",
        "Freizeit & Unterhaltung", "Kinder/Haustiere", "Urlaub & Reisen",
        "Geschenke & Spenden", "Sonstiges"
    ];

    // IDs der Dropdowns
    const dropdownIds = ["categorySelect1", "categorySelect2", "categorySelect3", "categorySelect4", "categorySelect5"];

    dropdownIds.forEach(id => {
        const select = document.getElementById(id);
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            select.appendChild(option);
        });
    });
});
