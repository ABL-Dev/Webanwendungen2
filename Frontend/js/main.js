let transactions = [];
let wasTransactionModified = false;

// Navbar buttens (Statischer Dummy)

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("#navbar button:not([disabled])");
  const monthButtons = document.querySelectorAll(".month-btn");
  const yearButton = document.getElementById("year");

  //Aktuellen btn auswehlen
  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const currentYear = now.getFullYear();

  yearButton.textContent = currentYear;

  const currentMonthButton = monthButtons[currentMonthIndex];
  if (currentMonthButton) {
    currentMonthButton.disabled = true;
    currentMonthButton.classList.remove("btn-outline-primary");
    currentMonthButton.classList.add("btn-primary");
  }
  //nav btn handler wenn ein btn gedrückt wird
  navButtons.forEach(button => {
    button.addEventListener("click", () => {

      let yearNumber = Number(yearButton.textContent);
      switch (button.textContent) {
        case '<':
          yearNumber--;
          yearButton.textContent = yearNumber;
          //lodData(button.textContent, yearNumber);
          break;

        case '>':
          yearNumber++;
          yearButton.textContent = yearNumber;
          //lodData(button.textContent, yearNumber);
          break;

        default:
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
          //lodData(button.textContent, yearNumber);

          break;
      };
    });
  });

  //Hier eine funktion zum laden der aktuellen daten z.b.
  //lodData(currentMonthIndex, currentYear)
});

//Modal input validierung New Entry
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  const dateInput = document.getElementById('date');
 


  // Heutiges Datum als Standard setzen
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;

  // Formular zurückseten beim
  if (NEModal){
    NEModal.addEventListener('hidden.bs.modal', function () {
      
    //Setzt die überschrift und den submit btn richtig
    const modalElement = document.getElementById('NEModal'); 
    const btn = document.getElementById('btn-transaktionen');

    modalElement.querySelector('.modal-title').textContent = 'Transaktionen erstellen';

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
      event.preventDefault(); // Wichtig: Damit das Kommunizieren mit dem Backend nicht unterbrochen wird von Submit.

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
            
            /*const newTransaction = {
              "id": (maxId + 1), // Neue ID
              "einnahme": isEinnamhe,
              "betrag": betrag,
              "datum": datum,
              "kategorie": kategorie,
              "beschreibung": beschreibung,
              "notizen": notizen
            };

            transactions.push(newTransaction);*/

            // TODO:
          // Neue Daten an Server senden.

          // Werte aus dem New-Entry-Dokument holen.
          // TODO: Evtl. hier noch bestimmte Abfragen machen zu den Eingaben - Validation.
          const einnahme = document.getElementById('income-btn').checked ? "true" : "false";
          const betrag = parseFloat(document.getElementById('amount').value.replace(',', '.'));
          const datum = String(document.getElementById('date').value); // YYYY-MM-DD
          const kategorie = document.getElementById('category').value;
          const beschreibung = String(document.getElementById('beschreibung').value);
          const notizen = document.getElementById('notizen').value;

          const data = {
            einnahme: einnahme,
            betrag: betrag,
            datum: datum,
            kategorie: kategorie, // Hier sendet man nur Name der Kategorie mit. Im api/write wird dann Kategorie-ID geholt.
            beschreibung: beschreibung,
            notizen: notizen
          };

          fetch('/api/write', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
            .then(r => r.json())
            .then(() => {
              // Wichtig: Da man ganz oben den Submit unterdrückt mit event.preventDefault(); wird er hier manuell gemacht.
              // TODO: Das muss beim editieren als auch beim Löschen ebenfalls gemacht werden.
              form.submit();
            });

        }

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
    const modalEdidBtn = document.getElementById('btn-transaktionen');

    modalElement.querySelector('.modal-title').textContent = 'Transaktion bearbteiten';
    modalEdidBtn.textContent = "Transaktion bearbteiten";
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

function recentTransaction(suchLeisteText) {

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

  // Renderer - Asynchron, da auf das Fetchen der Transaktionsdaten gewartet werden muss.
  async function render() {
    //Hohlt die ul
    const listContainer = document.getElementById("transactionList");
    listContainer.innerHTML = '';

    // Holt die aktuellen Daten aus der Datenbank.
    const res = await fetch('/api/getTableArray');
    const data = await res.json();
    transactions = data;
    console.log("Loaded transactions in render:", transactions);

    // nach Datum sortieren (neu -> alt)
    transactions.sort((a, b) => new Date(b.datum) - new Date(a.datum));

    transactions.forEach(tx => {
      var addZeile = false;

      if (suchLeisteText == "") {
        addZeile = true;
      }
      else {
        const escaped = suchLeisteText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'i'); // 'i' = case-insensitive

        if (regex.test(String(tx.beschreibung))) {
          addZeile = true;
        }
      }

      if (addZeile) {
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
      }
      });
    }
    return render(); // Gebe render() zurück, damit das window.onload-Fenster auf die zu fetchenden Transaktionen wartet.
};

//************************************************************************************************************************************+
// Search Transactions
//*****************************************************************************************************************************

// Grab the search input
const suchleiste = document.getElementById('suchleiste');
suchleiste.addEventListener('input', () => {
    recentTransaction(suchleiste.value);
});

window.onload = async function () {
  //Recent Transaktion laden
  await recentTransaction(""); // Mit leerem String (Standardladevorgang).
  console.log("in window should have transactions now");
  console.log("Loaded transactions in window:", transactions);

  // Pie chart // 

  // Filter die json Einträge nach einname === false, also nur Ausgaben anzeigen.
  const expenses = transactions.filter(entry => entry.einnahme === false);
  console.log("transactions: ",transactions);
  console.log("expenses: ",expenses);

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

  console.log("categorynames:", categoryNames);

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