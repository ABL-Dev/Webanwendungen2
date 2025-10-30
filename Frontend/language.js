// --- Rekursive Übersetzungsfunktion ---
function translateElement(el) {
    el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text && i18next.exists(text)) {
                node.textContent = i18next.t(text);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            translateElement(node);
        }
    });
}

function updateContent() {
    translateElement(document.body);
}

// --- i18next Initialisierung ---
i18next.init({
    lng: localStorage.getItem("language") || "de",
    debug: false,
    resources: {
        de: {
            translation: {
                // Allgemein
                "Finance Tracker": "Finanz-Tracker",
                "Search": "Suchen",
                "Nothing found": "Nichts gefunden",
                "+ New Entry": "+ Neuer Eintrag",
                "Settings": "Einstellungen",
                "Interface": "Interface",
                "Language": "Sprache",
                "Close": "Schließen",
                "Save": "Speichern",
                "Cancel": "Abbrechen",
                "+ Entry Note": "+ Notiz hinzufügen",
                "delete all": "Alle löschen",
                "Entry New Note": "Neue Notiz hinzufügen" ,
                "Delete all notes?": "Alle Notizen löschen?",
                "Are you sure you want to permanently delete all notes?": "Möchtest du wirklich alle Notizen dauerhaft löschen?",
                "yes, delete": "Ja, löschen",
                "days ago": "Tage zuvor",

                // Dashboard
                "Pie Chart": "Kreisdiagramm",
                "Budget Overview": "Budgetübersicht",
                "Financial Overview": "Finanzübersicht",
                "Total Balance": "Gesamtguthaben",
                "Income": "Einnahmen",
                "Expenses": "Ausgaben",
                "Notes": "Notizen",
                "Recent Transactions": "Letzte Transaktionen",

                // Monate
                "Mar": "Mär",
                "May": "Mai",
                "Oct": "Okt",
                "Dec": "Dez",

                // Modal / Formular
                "Create New Entry": "Neuen Eintrag anlegen",
                "Transaction type": "Transaktionstyp",
                "€ Income": "€ Einnahmen",
                "€ Expenses": "€ Ausgaben",
                "Amount": "Betrag",
                "Date": "Datum",
                "Category": "Kategorie",
                "Choose category": "Kategorie wählen",
                "Description": "Beschreibung",
                "Notes (optional)": "Notizen (optional)",
                "Create Entry": "Eintrag erstellen",
                "Please select a transaction type.": "Bitte wählen Sie eine Transaktionsart aus.",
                "Please enter a valid amount with two decimals.": "Bitte einen gültigen Betrag mit zwei Nachkommastellen eingeben.",
                "Please select a valid date.": "Bitte ein gültiges Datum auswählen.",
                "Please select a category.": "Bitte eine Kategorie auswählen.",
                "Please enter a description.": "Bitte eine Beschreibung eingeben.",
                "Abort": "Abbrechen",

                // Kategorien
                "Main income": "Haupteinkommen",
                "Supplementary income": "Nebeneinkommen",
                "Government benefits/transfers": "Staatliche Leistungen/Transfers",
                "Capital income": "Kapitaleinkünfte",
                "Other income": "Sonstige Einnahmen",
                "Housing": "Wohnen",
                "Insurance": "Versicherungen",
                "Mobility (fixed)": "Mobilität (Fix)",
                "Communication/media": "Kommunikation/Medien",
                "Finances/savings (fixed)": "Finanzen/Sparen (Fix)",
                "Subscriptions/memberships": "Abonnements/Mitgliedschaften",
                "Food & household": "Lebensmittel & Haushalt",
                "Mobility (variable)": "Mobilität (Variabel)",
                "Clothing & personal care": "Kleidung & Körperpflege",
                "Health": "Gesundheit",
                "Leisure & entertainment": "Freizeit & Unterhaltung",
                "Children/pets": "Kinder/Haustiere",
                "Vacations & travel": "Urlaub & Reisen",
                "Gifts & donations": "Geschenke & Spenden",
                "Other": "Sonstiges",

                // Finance Settings
                "Finance Settings": "Finanz-Einstellungen",
                "Category 1": "Kategorie 1",
                "Category 2": "Kategorie 2",
                "Category 3": "Kategorie 3",
                "Category 4": "Kategorie 4",
                "Category 5": "Kategorie 5",
            }
        },
        en: {
            translation: {
                // General
                "Finanz-Tracker": "Finance Tracker",
                "Suchen": "Search",
                "Nichts gefunden": "Nothing found",
                "+ Neuer Eintrag": "+ New Entry",
                "Einstellungen": "Settings",
                "Interface": "Interface",
                "Sprache": "Language",
                "Schließen": "Close",
                "Speichern": "Save",
                "Abbrechen": "Cancel",
                "+ Notiz hinzufügen": "+ Entry Note",
                "Alle löschen": "delete all",
                "Neue Notiz hinzufügen": "Entry New Note",
                "Alle Notizen löschen?": "Delete all notes? ",
                "Möchtest du wirklich alle Notizen dauerhaft löschen?":  "Are you sure you want to permanently delete all notes?",
                "Ja, löschen": "yes, delete",

                // Dashboard
                "Kreisdiagramm": "Pie Chart",
                "Budgetübersicht": "Budget Overview",
                "Finanzübersicht": "Financial Overview",
                "Gesamtguthaben": "Total Balance",
                "Einnahmen": "Income",
                "Ausgaben": "Expenses",
                "Notizen": "Notes",
                "Letzte Transaktionen": "Recent Transactions",

                // Months
                "Mär": "Mar",
                "Mai": "May",
                "Okt": "Oct",
                "Dez": "Dec",

                // Modal / Form
                "Neuen Eintrag anlegen": "Create New Entry",
                "Transaktionstyp": "Transaction type",
                "€ Einnahmen": "€ Income",
                "€ Ausgaben": "€ Expenses",
                "Betrag": "Amount",
                "Datum": "Date",
                "Kategorie": "Category",
                "Kategorie wählen": "Choose category",
                "Beschreibung": "Description",
                "Notizen (optional)": "Notes (optional)",
                "Eintrag erstellen": "Create Entry",
                "Bitte wählen Sie eine Transaktionsart aus.": "Please select a transaction type.",
                "Bitte einen gültigen Betrag mit zwei Nachkommastellen eingeben": "Please enter a valid amount with two decimals.",
                "Bitte ein gültiges Datum auswählen.": "Please select a valid date.",
                "Bitte eine Kategorie auswählen.": "Please select a category.",
                "Bitte eine Beschreibung eingeben.": "Please enter a description.",
                "Abrechen": "Cancel",

                // Kategorien
                "Haupteinkommen": "Main income",
                "Nebeneinkommen": "Supplementary income",
                "Staatliche Leistungen/Transfers": "Government benefits/transfers",
                "Kapitaleinkünfte": "Capital income",
                "Sonstige Einnahmen": "Other income",
                "Wohnen": "Housing",
                "Versicherungen": "Insurance",
                "Mobilität (Fix)": "Mobility (fixed)",
                "Kommunikation/Medien": "Communication/media",
                "Finanzen/Sparen (Fix)": "Finances/savings (fixed)",
                "Abonnements/Mitgliedschaften": "Subscriptions/memberships",
                "Lebensmittel & Haushalt": "Food & household",
                "Mobilität (Variabel)": "Mobility (variable)",
                "Kleidung & Körperpflege": "Clothing & personal care",
                "Gesundheit": "Health",
                "Freizeit & Unterhaltung": "Leisure & entertainment",
                "Kinder/Haustiere": "Children/pets",
                "Urlaub & Reisen": "Vacations & travel",
                "Geschenke & Spenden": "Gifts & donations",
                "Sonstiges": "Other",

                // Finance Settings
                "Finanz-Einstellungen": "Finance Settings",
                "Kategorie 1": "Category 1",
                "Kategorie 2": "Category 2",
                "Kategorie 3": "Category 3",
                "Kategorie 4": "Category 4",
                "Kategorie 5": "Category 5",
            }
        }
    }
}, function(err, t) {
    updateContent();
});

// --- Sprachwechsel Dropdown ---
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("languageSelect");
    if (!select) return;

    const currentLang = localStorage.getItem("language") || "de";
    select.value = currentLang;

    select.addEventListener("change", (e) => {
        const newLang = e.target.value;
        i18next.changeLanguage(newLang, updateContent);
        localStorage.setItem("language", newLang);
    });
});
