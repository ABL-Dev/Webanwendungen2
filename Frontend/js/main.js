  // Statische json Werte für das ganze Dashboard.
  // Diese Daten werden später dynamisch sein, für diese Abgabe jedoch nur statische Werte hier im Code.
const defaultTransactions = [
    {
      "id": 1,
      "einnahme": true,
      "betrag": 2850.00,
      "datum": "2025-09-01",
      "kategorie": "Haupteinkommen",
      "beschreibung": "Gehalt September",
      "notizen": "Notizen ..."
    },
    {
      "id": 2,
      "einnahme": false,
      "betrag": 950.00,
      "datum": "2025-09-02",
      "kategorie": "Wohnen",
      "beschreibung": "Miete Wohnung",
      "notizen": "Notizen ..."
    },
    {
      "id": 3,
      "einnahme": false,
      "betrag": 78.50,
      "datum": "2025-09-03",
      "kategorie": "Versicherungen",
      "beschreibung": "Haftpflichtversicherung",
      "notizen": "Notizen ..."
    },
    {
      "id": 4,
      "einnahme": false,
      "betrag": 12.99,
      "datum": "2025-09-03",
      "kategorie": "Abonnements/Mitgliedschaften",
      "beschreibung": "Netflix Abo",
      "notizen": "Notizen ..."
    },
    {
      "id": 5,
      "einnahme": false,
      "betrag": 5.99,
      "datum": "2025-09-04",
      "kategorie": "Abonnements/Mitgliedschaften",
      "beschreibung": "Spotify Premium",
      "notizen": "Notizen ..."
    },
    {
      "id": 6,
      "einnahme": false,
      "betrag": 54.20,
      "datum": "2025-09-04",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Wocheneinkauf Supermarkt",
      "notizen": "Notizen ..."
    },
    {
      "id": 7,
      "einnahme": false,
      "betrag": 32.45,
      "datum": "2025-09-05",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Einkauf beim Bäcker und Metzger",
      "notizen": "Notizen ..."
    },
    {
      "id": 8,
      "einnahme": false,
      "betrag": 120.00,
      "datum": "2025-09-05",
      "kategorie": "Sonstiges",
      "beschreibung": "Geschenk für Freundin",
      "notizen": "Notizen ..."
    },
    {
      "id": 9,
      "einnahme": false,
      "betrag": 45.00,
      "datum": "2025-09-06",
      "kategorie": "Sonstiges",
      "beschreibung": "Kinobesuch und Snacks",
      "notizen": "Notizen ..."
    },
    {
      "id": 10,
      "einnahme": false,
      "betrag": 30.25,
      "datum": "2025-09-07",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Einkauf Lidl",
      "notizen": "Notizen ..."
    },
    {
      "id": 11,
      "einnahme": false,
      "betrag": 89.00,
      "datum": "2025-09-08",
      "kategorie": "Versicherungen",
      "beschreibung": "Kfz-Versicherung",
      "notizen": "Notizen ..."
    },
    {
      "id": 12,
      "einnahme": false,
      "betrag": 75.00,
      "datum": "2025-09-09",
      "kategorie": "Wohnen",
      "beschreibung": "Stromabschlag",
      "notizen": "Notizen ..."
    },
    {
      "id": 13,
      "einnahme": false,
      "betrag": 25.50,
      "datum": "2025-09-09",
      "kategorie": "Sonstiges",
      "beschreibung": "Café-Besuch mit Freunden",
      "notizen": "Notizen ..."
    },
    {
      "id": 14,
      "einnahme": false,
      "betrag": 15.00,
      "datum": "2025-09-10",
      "kategorie": "Abonnements/Mitgliedschaften",
      "beschreibung": "Adobe Creative Cloud",
      "notizen": "Notizen ..."
    },
    {
      "id": 15,
      "einnahme": false,
      "betrag": 48.70,
      "datum": "2025-09-10",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Wocheneinkauf Supermarkt",
      "notizen": "Notizen ..."
    },
    {
      "id": 16,
      "einnahme": true,
      "betrag": 120.00,
      "datum": "2025-09-11",
      "kategorie": "Sonstiges",
      "beschreibung": "Verkauf gebrauchtes Smartphone",
      "notizen": "Notizen ..."
    },
    {
      "id": 17,
      "einnahme": false,
      "betrag": 9.99,
      "datum": "2025-09-12",
      "kategorie": "Abonnements/Mitgliedschaften",
      "beschreibung": "YouTube Premium",
      "notizen": "Notizen ..."
    },
    {
      "id": 18,
      "einnahme": false,
      "betrag": 27.30,
      "datum": "2025-09-13",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Einkauf Rewe",
      "notizen": "Notizen ..."
    },
    {
      "id": 19,
      "einnahme": false,
      "betrag": 110.00,
      "datum": "2025-09-14",
      "kategorie": "Sonstiges",
      "beschreibung": "Kleidung Herbstkollektion",
      "notizen": "Notizen ..."
    },
    {
      "id": 20,
      "einnahme": false,
      "betrag": 64.50,
      "datum": "2025-09-15",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Wocheneinkauf Aldi",
      "notizen": "Notizen ..."
    },
    {
      "id": 21,
      "einnahme": false,
      "betrag": 95.00,
      "datum": "2025-09-16",
      "kategorie": "Versicherungen",
      "beschreibung": "Hausratversicherung",
      "notizen": "Notizen ..."
    },
    {
      "id": 22,
      "einnahme": false,
      "betrag": 50.00,
      "datum": "2025-09-17",
      "kategorie": "Sonstiges",
      "beschreibung": "Tankfüllung Auto",
      "notizen": "Notizen ..."
    },
    {
      "id": 23,
      "einnahme": false,
      "betrag": 22.80,
      "datum": "2025-09-18",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Bäckerei und Markt",
      "notizen": "Notizen ..."
    },
    {
      "id": 24,
      "einnahme": false,
      "betrag": 5.50,
      "datum": "2025-09-19",
      "kategorie": "Sonstiges",
      "beschreibung": "Kaffee to go",
      "notizen": "Notizen ..."
    },
    {
      "id": 25,
      "einnahme": false,
      "betrag": 45.00,
      "datum": "2025-09-20",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Wocheneinkauf",
      "notizen": "Notizen ..."
    },
    {
      "id": 26,
      "einnahme": false,
      "betrag": 14.99,
      "datum": "2025-09-21",
      "kategorie": "Abonnements/Mitgliedschaften",
      "beschreibung": "Amazon Prime",
      "notizen": "Notizen ..."
    },
    {
      "id": 27,
      "einnahme": false,
      "betrag": 73.00,
      "datum": "2025-09-22",
      "kategorie": "Wohnen",
      "beschreibung": "Internet und Telefon",
      "notizen": "Notizen ..."
    },
    {
      "id": 28,
      "einnahme": false,
      "betrag": 40.00,
      "datum": "2025-09-23",
      "kategorie": "Sonstiges",
      "beschreibung": "Restaurantbesuch",
      "notizen": "Notizen ..."
    },
    {
      "id": 29,
      "einnahme": false,
      "betrag": 62.80,
      "datum": "2025-09-24",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Einkauf Supermarkt",
      "notizen": "Notizen ..."
    },
    {
      "id": 30,
      "einnahme": true,
      "betrag": 200.00,
      "datum": "2025-09-25",
      "kategorie": "Sonstiges",
      "beschreibung": "Nebenjob Wochenende",
      "notizen": "Notizen ..."
    },
    {
      "id": 31,
      "einnahme": false,
      "betrag": 16.90,
      "datum": "2025-09-26",
      "kategorie": "Sonstiges",
      "beschreibung": "Friseurtermin",
      "notizen": "Notizen ..."
    },
    {
      "id": 32,
      "einnahme": false,
      "betrag": 53.40,
      "datum": "2025-09-27",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Wocheneinkauf Rewe",
      "notizen": "Notizen ..."
    },
    {
      "id": 33,
      "einnahme": false,
      "betrag": 11.99,
      "datum": "2025-09-28",
      "kategorie": "Abonnements/Mitgliedschaften",
      "beschreibung": "Apple Music",
      "notizen": "Notizen ..."
    },
    {
      "id": 34,
      "einnahme": false,
      "betrag": 18.50,
      "datum": "2025-09-29",
      "kategorie": "Sonstiges",
      "beschreibung": "Mittagessen Kantine",
      "notizen": "Notizen ..."
    },
    {
      "id": 35,
      "einnahme": false,
      "betrag": 47.10,
      "datum": "2025-09-30",
      "kategorie": "Lebensmittel & Haushalt",
      "beschreibung": "Monatsabschluss Einkauf",
      "notizen": "Notizen ..."
    }
  ];

  // Daten lokal im browser speichern so können die daten beritz verändert werden später dynamisch
const STORAGE_KEY = 'transactionData';


function loadTransactions(){
  const storeData = localStorage.getItem(STORAGE_KEY);
  if (storeData) {
    return JSON.parse(storeData);
  }
  saveTransactions(defaultTransactions);
  return defaultTransactions;
}

function saveTransactions(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let transactions = loadTransactions();
let wasTransactionModified = false;

// Navbar buttens (Statischer Dummy)

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("#navbar button:not([disabled])");

  navButtons.forEach(button => {
    button.addEventListener("click", () => {

      const year = document.getElementById("year");
      let yearNumber = Number(year.textContent);
      switch (button.textContent) {
        case '<':
          yearNumber--;
          year.textContent = yearNumber;
          //handleMonthClick(button.textContent, yearNumber);
          break;

        case '>':
          yearNumber++;
          year.textContent = yearNumber;
          //handleMonthClick(button.textContent, yearNumber);
          break;

        default:
          const monthButtons = document.querySelectorAll(".month-btn");
          monthButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-outline-primary");

          });

          // Geklickten Button aktivieren & markieren
          button.disabled = true;
          button.classList.remove("btn-outline-primary");
          button.classList.add("btn-primary");

          //Für die spätere dynamik zum laden der Daten des buttens
          //handleMonthClick(button.textContent, yearNumber);

          break;
      };
    });
  });
});

//Modal input validierung
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  const dateInput = document.getElementById('date');
 


  // Heutiges Datum als Standard setzen
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;


  // Formular zurückseten beim
  if (NEModal){
    NEModal.addEventListener('hidden.bs.modal', function () {
      
      const formToReset = this.querySelector('.needs-validation');
      if (formToReset) {
        // Formular einträge löschen++++++++++++++++++++++++++++++++++++++++++++++
        formToReset.reset();

        //Valedirung entfernen
        formToReset.classList.remove('was-validated');
        formToReset.removeAttribute('data-editing-id');

        //Radio buttens Fehlermeldung entfernen
        const radioContainer = formToReset.querySelector('.transaction-type-group');
        if (radioContainer) {
          radioContainer.classList.remove('is-invalid');
        }
        

        // Datum wieder auf heute setzen
        const dateInputModal = formToReset.querySelector('#date');
        if (dateInputModal) {
          dateInputModal.value = today;
        }

        //Prüfen ob ein edit vorgenomen wurde
        if (wasTransactionModified){
          wasTransactionModified = false; //flag zurücksetzen
          window.location.reload();
        }

      }

    })
  }


  Array.from(forms).forEach(form => {
    const radioContainer = form.querySelector('.transaction-type-group');
    const radios = form.querySelectorAll('input[name="transactionType"]');


    //Alle inpus hohlen
    const amountInput = document.getElementById('amount'); 
    const categoryInput = document.getElementById('category'); 
    const descriptionInput = document.getElementById('beschreibung');
    const notesInput = document.getElementById('notizen');

    // Wenn der Benutzer ein Radio wählt: Fehlermarker entfernen
    radios.forEach(r => r.addEventListener('change', () => {
      if (radioContainer) radioContainer.classList.remove('is-invalid');
    }));

    // Betrag-Input 
    const amount = document.getElementById('amount');

    // Regex: eine oder mehrere Ziffern, dann , oder . gefolgt von genau 2 Ziffern
    const amountRegex = /^\d+([.,]\d{2})$/;
    function isValidAmountStr(val) {
      if (!val) return false;
      val = val.trim();
      if (!amountRegex.test(val)) return false;
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num >= 0.01;
    }

    form.addEventListener('submit', event => {

      if (event.submitter && event.submitter.hasAttribute('data-bs-dismiss')) {
          event.preventDefault(); 
          return; 
      }

      const radioChecked = form.querySelector('input[name="transactionType"]:checked');
      let validationFailed = false;

      // Fehlermarker nur setzen, wenn kein Radio gewählt wurde
      if (!radioChecked) {
        if (radioContainer) radioContainer.classList.add('is-invalid');
        validationFailed = true;
      } else {
        if (radioContainer) radioContainer.classList.remove('is-invalid');
      }

      if (!radioChecked || !form.checkValidity()) {
        event.preventDefault(); // Wird nur bei Ungültigkeit aufgerufen
        event.stopPropagation();
        validationFailed = true;
      }

      form.classList.add('was-validated');

      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //  Daten Extrahiren und Hinzufügen wenn gültig
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //  Daten Extrahiren und Hinzufügen (ODER BEARBEITEN) wenn gültig
      //  KORRIGIERTE VERSION
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      if (!validationFailed) {
        
        // 1. Daten aus dem Formular auslesen (wie bisher)
        const isEinnamhe = (radioChecked.value === 'einnahme');
        const amuntStr = amountInput.value.replace(',', '.');
        const betrag = parseFloat(amuntStr);
        const datum = dateInput.value;
        const kategorie = categoryInput.value;
        const beschreibung = descriptionInput.value;
        const notizen = notesInput.value;
        
        // 2. Prüfen: Sind wir im "Bearbeiten"-Modus?
        const editingId = form.dataset.editingId;
       
        if (editingId) {
            // ----------- MODUS: BEARBEITEN -----------
            const idZahl = parseInt(editingId, 10);
            const transactionToUpdate = transactions.find(tx => tx.id === idZahl);

            if (transactionToUpdate) {
                // Aktualisiere das bestehende Objekt im 'transactions'-Array
                transactionToUpdate.einnahme = isEinnamhe;
                transactionToUpdate.betrag = betrag;
                transactionToUpdate.datum = datum;
                transactionToUpdate.kategorie = kategorie;
                transactionToUpdate.beschreibung = beschreibung;
                transactionToUpdate.notizen = notizen;
            }            
        } else {
            // ----------- MODUS: NEU ERSTELLEN -----------
            const maxId = transactions.reduce((max, objekt) =>{
              return objekt.id > max ? objekt.id : max;
            }, 0);
            
            const newTransaction = {
              "id": (maxId + 1), // Neue ID
              "einnahme": isEinnamhe,
              "betrag": betrag,
              "datum": datum,
              "kategorie": kategorie,
              "beschreibung": beschreibung,
              "notizen": notizen
            };

            transactions.push(newTransaction);
        }

        saveTransactions(transactions);
        wasTransactionModified = true;
      } // Ende if (!validationFailed)

    }, false);
  });
})();

  //Resend Transaction btns abfragen
const dataConteiner = document.getElementById('data-conteiner');
dataConteiner.addEventListener('click', (event) =>{
  const clickedElement = event.target.closest('.action-btn'); // closest sorgt dafür das es auch geht wennd das Icon getrückt wird

  if (clickedElement){

    const eintragID = clickedElement.dataset.id;
    const aktion = clickedElement.dataset.action;

    // Da jeder Click abgefangen wird das aber nicht zwingend ein btn ist wird das abgefangen und das event bendet
    if(!eintragID || !aktion) return;

    if (aktion === 'edit') {
      transactionEdit(eintragID);
    }else if (aktion === 'delete') {
      transactionDelete(eintragID);
     }
  }
});

function transactionEdit(id){
  const idZahl = parseInt(id, 10);
    // 1. Transaktion im globalen 'transactions'-Array finden
    const transactionToEdit = transactions.find(tx => tx.id === idZahl);
   
    const form = document.querySelector('.needs-validation'); 
    if (!form) return;

    // Dem Formular mitteilen, welche ID bearbeitet wird
    form.dataset.editingId = idZahl;

    //Formularfelder füllen
    document.getElementById('amount').value = transactionToEdit.betrag.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('category').value = transactionToEdit.kategorie;
    document.getElementById('beschreibung').value = transactionToEdit.beschreibung;
    document.getElementById('notizen').value = transactionToEdit.notizen;
    document.getElementById('date').value = transactionToEdit.datum;

    // Radio-Buttons setzen
    // (Annahme: Ihre Radio-Buttons haben die IDs 'type-einnahme' und 'type-ausgabe')
    if (transactionToEdit.einnahme) {
        document.getElementById('income-btn').checked = true;
    } else {
        document.getElementById('expense-btn').checked = true;
    }
    
    // Alte Validierungsmarkierungen entfernen
    form.classList.remove('was-validated');

    // Modal öffnen
    // NEModal ist das Modal-Element mit der ID 'NEModal'
    const modalElement = document.getElementById('NEModal'); 
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

    modalElement.querySelector('.modal-title').textContent = 'Transaktion bearbteiten';
    modalInstance.show();
};

function transactionDelete(id){
  //Erstellt ein neus Array mit allen auser dem zu Löschenden Objekt
  const idZahl = parseInt(id, 10); // 10 für Dezimal
  const newTransaction = transactions.filter(eintrag => eintrag.id !== idZahl);
  transactions = newTransaction;
  saveTransactions(newTransaction);

  // Kompleter relod der seite da auch alle diagrame usw. ne geladen werden müssen
  window.location.reload();
};


//Suchleiste
const input = document.getElementById("suchleiste");
input.addEventListener('input', () => {
  const eingabe = input.value.trim();

  if (eingabe.length > 0) {
    input.classList.add('is-invalid');

    // Heir kann später eine richtige suchlogig eingebaut werden
  }
  else {
    input.classList.remove('is-invalid');
  }
});

  //************************************************************************************************************************************+
  // Recent Transactions
  //*****************************************************************************************************************************

function recentTransaction(){

    //daysAgo-Funktion
    function daysAgo(dateStr) {
      const now = new Date();
      const date = new Date(dateStr);
      const diff = now - date;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days === 0) return "Today";
      if (days === 1) return "Yesterday";
      return `${days} days ago`;
    }

  //////////////////////////

    // einfache Kategorie -> Bootstrap Icon Map
    const iconMap = {
      "haupteinkommen": "bi-wallet-fill",
      "nebeneinkommen": "bi-cash-stack",
      "staatliche leistungen/transfers": "bi-patch-check-fill",
      "kapitaleinkünfte": "bi-graph-up-arrow",
      "sonstige einnahmen": "bi-three-dots",
      "wohnen": "bi-house-fill",
      "versicherungen": "bi-shield-shaded",
      "mobilität (fix)": "bi-bus-front-fill",
      "kommunikation/medien": "bi-headset",
      "finanzen/sparen (fix)": "bi-bank",
      "abonnements/mitgliedschaften": "bi-repeat",
      "lebensmittel & haushalt": "bi-cart-fill",
      "mobilität (variabel)": "bi-fuel-pump-fill",
      "kleidung & körperpflege": "bi-bag-fill",
      "gesundheit": "bi-heart-pulse-fill",
      "freizeit & unterhaltung": "bi-controller",
      "kinder/haustiere": "bi-people-fill",
      "urlaub & reisen": "bi-airplane-fill",
      "geschenke & spenden": "bi-gift-fill",
      "sonstiges": "bi-three-dots",
    };

    //Ortnet den Katigorien Icons zu
    function chooseIcon(cat) {
      // fals es nicht das richtige Icon gibt wird das ? genommen
      return iconMap[String(cat).toLowerCase()] || 'bi-question-circle';
    }

    // Renderer
    function render() {
      //Hohlt die ul
      const listContainer = document.getElementById("transactionList");
      listContainer.innerHTML = '';

      // Holt die Aktuellen daten aus dem Speicher
      transactions = loadTransactions();
      // nach Datum sortieren (neu -> alt)
      transactions.sort((a, b) => new Date(b.datum) - new Date(a.datum));

      transactions.forEach(tx => {
        const li = document.createElement("li");
        li.className = 'py-2 border-bottom border-primary';

        //links icon + text
        const left = document.createElement('div');
        left.className = 'd-flex align-items-start gap-2';

        const iconWrap = document.createElement('div');
        iconWrap.className = 'flex-shrink-0 d-flex align-items-center justify-content-center rounded-3 p-2';
        iconWrap.style.width = '44px';
        iconWrap.style.height = '44px';
        // setze icon
        iconWrap.innerHTML = `<i class="bi ${chooseIcon(tx.kategorie)}" aria-hidden="true" style="font-size:1.3rem; color:#a2a2a2"></i>`;

        const textWrap = document.createElement('div');
        textWrap.className = 'left-text';

        const desc = document.createElement("div");
        desc.className = "description fw-semibold";
        desc.textContent = tx.beschreibung;

        const date = document.createElement("div");
        date.className = "date small text-primary";
        date.textContent = daysAgo(tx.datum);

        textWrap.appendChild(desc);
        textWrap.appendChild(date);

        left.appendChild(iconWrap);
        left.appendChild(textWrap);

        // right: Betrag
        const amount = document.createElement("div");
        amount.className = 'text-end';
        const amtSpan = document.createElement('div');
        amtSpan.className = 'fw-bold';
        const formatted = Number(tx.betrag).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        amtSpan.textContent = (tx.einnahme ? '+' : '-') + formatted + ' €';
        amtSpan.classList.add(tx.einnahme ? 'text-success' : 'text-danger');

        //kleine Kategorie-Zeile unter Betrag
        const catSmall = document.createElement('div');
        catSmall.className = 'small text-primary';
        catSmall.textContent = tx.kategorie;

        amount.appendChild(amtSpan);
        amount.appendChild(catSmall);

        const mainRow = document.createElement('div');
        mainRow.className = 'd-flex align-items-start justify-content-between gap-3' 

        mainRow.appendChild(left);
        mainRow.appendChild(amount);

        const nots = document.createElement("div");
        nots.textContent = tx.notizen;
        nots.className = 'mt-2 small'
        nots.style.color = '#a2a2a2';

        //Btns generriren
        const ecBtn = document.createElement('div');
        ecBtn.innerHTML = `
            <div class="btn-group-sm">
                <button class="btn btn-outline-primary mx-2 action-btn" title="Bearbeiten" data-id=${tx.id} data-action="edit">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-outline-danger action-btn" title="Löschen" data-id=${tx.id} data-action="delete">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        `;

        const bottomRow = document.createElement('div');
        bottomRow.className = 'd-flex justify-content-between align-items-center mt-2 small';
        bottomRow.style.marginLeft = 'calc(44px + 0.5rem)';
        
        bottomRow.appendChild(nots);
        bottomRow.appendChild(ecBtn);


        li.appendChild(mainRow);
        li.appendChild(bottomRow);

        listContainer.appendChild(li);
      });
    }
    render();
};

window.onload = function () {
  //Recent Transaktion laden
  recentTransaction();

  // Pie chart // 

  // Filter die json Einträge nach einname === false, also nur Ausgaben anzeigen.
  const expenses = transactions.filter(entry => entry.einnahme === false);

  // Summen für die jeweiligen Kategorien.
  const categorySums = {}; // Dictionary -> Kategoriename:Summe.
  expenses.forEach(entry => {
    const category = entry.kategorie;
    categorySums[category] = (categorySums[category] || 0) + entry.betrag;
  });

  // Dictionary keys werden zu labels.
  // Erste Buchstabe aber immer groß.
  const categoryNames = Object.keys(categorySums).map(key =>
    key.charAt(0).toUpperCase() + key.slice(1)
  );

  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categoryNames,
      datasets: [{
        label: 'Gesamtausgaben',
        data: Object.values(categorySums), // Dictionary values sind die Daten (Summen).
        backgroundColor: [
          'rgba(131, 182, 217, 0.8)',
          'rgba(72, 61, 139, 0.8)',
          'rgba(48, 130, 255, 0.8)',
          'rgba(156, 140, 255, 0.8)',
          'rgba(26, 26, 150, 0.8)',
          'rgba(100, 149, 237, 0.8)',
          'rgba(123, 104, 238, 0.8)',
          'rgba(0, 0, 205, 0.8)',
          'rgba(70, 130, 180, 0.8)',
          'rgba(65, 105, 225, 0.8)',
          'rgba(148, 0, 211, 0.8)',
          'rgba(0, 0, 139, 0.8)',
          'rgba(0, 191, 255, 0.8)',
          'rgba(106, 90, 205, 0.8)',
          'rgba(72, 61, 139, 0.8)',
          'rgba(123, 104, 238, 0.8)',
          'rgba(25, 25, 112, 0.8)',
          'rgba(0, 0, 255, 0.8)',
          'rgba(65, 105, 225, 0.8)',
          'rgba(123, 104, 238, 0.8)',
          'rgba(0, 0, 139, 0.8)'
        ],
        borderColor: 'white',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right', // Labels rechts.
          labels: {
            boxWidth: 25,
            padding: 20
          }
        },
      },
      layout: {
        padding: 10 // Platz um Chart herum.
      }
    }
  });

  const ctxbar = document.getElementById('budgetChart').getContext('2d');

  const categories = categoryNames;
  // Ausgaben je Kategorie.
  const spent = Object.values(categorySums);
  // Max. budget in Kategorie (wie viel man pro Kategorie ausgeben darf).
  const totalBudget = [600, 500, 300, 1200, 200];

  // In zwei Teile aufteilen.
  // Ausgaben.
  const normalSpent = spent.map((s, i) => Math.min(s, totalBudget[i]));
  // Mehr als Limit ausgegeben (rot).
  const exceededSpent = spent.map((s, i) => Math.max(0, s - totalBudget[i]));
  // Übrig, also wie viel Geld man in dieser Kategorie noch ausgeben dürfte.
  const remaining = totalBudget.map((t, i) => Math.max(0, t - spent[i]));

  const totalBudgetChart = new Chart(ctxbar, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Spent (within budget)',
          data: normalSpent,
          backgroundColor: 'rgba(75, 192, 255, 0.7)',
          borderRadius: 5,
          barThickness: 20
        },
        {
          label: 'Spent (exceeded)',
          data: exceededSpent,
          backgroundColor: 'rgba(255, 99, 132, 0.7)', // Zu viel ausgegeben in rot.
          borderRadius: 5,
          barThickness: 20
        },
        {
          label: 'Remaining',
          data: remaining,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 5,
          barThickness: 20
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: {
            color: '#9cc0ff',
            callback: val => val + ' €'
          },
          min: 0,
          max: Math.max(...totalBudget.concat(spent)) // Exceeded wird richtig gescaled hier.
        },
        y: { stacked: true, ticks: { color: '#fff' }, grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              const i = context.dataIndex;
              const datasetLabel = context.dataset.label;
              if (datasetLabel === 'Spent (within budget)') {
                return `Im Budget: ${normalSpent[i]} €`;
              }
              if (datasetLabel === 'Spent (exceeded)') {
                return `Überschritten: ${exceededSpent[i]} €`;
              }
              if (datasetLabel === 'Remaining') {
                return `Übrig: ${remaining[i]} €`;
              }
            }
          }
        }
      }
    }
  });

  // Financial overview //
  // Formats number to euro value.
  function formatEuro(amount) {
    return amount.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR"
    });
  }

  // Calculate sums.
  let einnahmenSumme = 0;
  let ausgabenSumme = 0;
  transactions.forEach(t => {
    if (t.einnahme) {
      einnahmenSumme += t.betrag;
    } else {
      ausgabenSumme += t.betrag;
    }
  });

  // Dynamically enter sums to corresponding id.
  document.getElementById("income").textContent = formatEuro(einnahmenSumme);
  document.getElementById("expenses").textContent = formatEuro(ausgabenSumme);

  // TODO: Will man so total ausrechnen? Oder gibt es extra variable für total?
  // TODO: Prozentzahlen dynamisch anpassen unter den werten.
  document.getElementById("total").textContent = formatEuro(einnahmenSumme - ausgabenSumme);

  // SETTINGS SAVE KNOPF //

  const selectedElementArray = []; // Ausgewählte Kategorien in Settings.
  const selectedTotalBudgetArray = []; // Ausgewählte max. Budgets in Settings.

  // Hier den event listener gemacht, weil hier alle Variablen sind.
  const saveButton = document.getElementById("saveFinanceSettings");
  saveButton.addEventListener("click", function () {
    for (let i = 1; i < 6; i++) {
      const selectElement = document.getElementById("categorySelect" + i);
      selectedElementArray.push(selectElement.value);

      const totalBudgetElement = document.getElementById("totalBudget" + i);
      selectedTotalBudgetArray.push(totalBudgetElement.value);
    }

    // Neue total Budgets die in settings gesetzt wurden (graue balken in diagramm).
    const newTotalBudget = selectedTotalBudgetArray;

    // Danach wandle die neuen Kategorien um in lowercase (so wie die daten im json stehen).
    // Gibt es die daten im json wird der bereits bestehende wert für die kategorie genommen.
    // Wurde in den settings eine kategorie ausgewählt die es im json/später in der datenbank
    // gar nicht gibt - dann wird die kategorie als label übernommen, aber die ausgaben sind einfach 0
    // für diese kategorie.
    const categoryNamesLower = selectedElementArray.map(str => str.toLowerCase());
    totalBudgetChart.data.labels = categoryNamesLower; // Alte Kategorien mit neuen aus Settings austauschen im Chart.

    // Neues "spent" Array wird erstellt.
    // Gibt es Ausgaben für die ausgewählte Kategorie in Settings werden diese übernommen.
    // Gibt es keine Ausgaben für die Kategorie (Daten für Kategorie existieren noch nicht)
    // dann wird als Summe der Ausgaben einfach 0 übernommen.
    
    //Object.values(categorySums);
    const newSpent = [];

    // Gehe durch Daten Dictionary und prüfe ob es bereits Summenwerte gibt für ausgewählte Kategorien aus Settings.
    // Sonst ordne 0 zu, weil es keine Daten zur Kategorie gibt.
    for (let i = 0; i < 5; i++) {
      if (categorySums[categoryNamesLower[i]] == undefined) { // Kategoriewerte existieren nicht = 0.
        newSpent.push("0");
      }
      else {
        newSpent.push(categorySums[categoryNamesLower[i]]); // Es gibt Werte zur Kategorie -> Werte übernehmen.
      }
    }
    
    // Oben wurde totalBudget ersetzt, jetzt werden die restlichen alten Werte des Budget Overview Charts ersetzt.
    // In zwei Teile aufteilen.
    // Ausgaben.
    const newNormalSpent = newSpent.map((s, i) => Math.min(s, newTotalBudget[i]));
    // Mehr als Limit ausgegeben (rot).
    const newExceededSpent = newSpent.map((s, i) => Math.max(0, s - newTotalBudget[i]));
    // Übrig, also wie viel Geld man in dieser Kategorie noch ausgeben dürfte.
    const newRemaining = newTotalBudget.map((t, i) => Math.max(0, t - newSpent[i]));

    // Chart updaten mit Settings Daten.
    totalBudgetChart.data.datasets[0].data = newNormalSpent;
    totalBudgetChart.data.datasets[1].data = newExceededSpent;
    totalBudgetChart.data.datasets[2].data = newRemaining;

    // X-Achse manuell updaten mit neuen Settings Daten.
    totalBudgetChart.options.scales.x.max = Math.max(...newTotalBudget.concat(newSpent));

    // Tooltips manuell updaten mit neuen Settings Daten.
    totalBudgetChart.options.plugins.tooltip.callbacks.label = function (context) {
      const i = context.dataIndex;
      const datasetLabel = context.dataset.label;
      if (datasetLabel === 'Spent (within budget)') return `Im Budget: ${newNormalSpent[i]} €`;
      if (datasetLabel === 'Spent (exceeded)') return `Überschritten: ${newExceededSpent[i]} €`;
      if (datasetLabel === 'Remaining') return `Übrig: ${newRemaining[i]} €`;
    };

    // Chart updaten mit neuen Werten und neu zeichnen.
    totalBudgetChart.update();

    // Settings Seite schließen.
    settingsModal.hide();
  });
};



