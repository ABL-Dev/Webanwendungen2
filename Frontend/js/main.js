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

  Array.from(forms).forEach(form => {
    const radioContainer = form.querySelector('.transaction-type-group');
    const radios = form.querySelectorAll('input[name="transactionType"]');

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
      const radioChecked = form.querySelector('input[name="transactionType"]:checked');

      // Nur verhindern, wenn ungültig
      if (!radioChecked || !form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Fehlermarker nur setzen, wenn kein Radio gewählt wurde
      if (!radioChecked) {
        if (radioContainer) radioContainer.classList.add('is-invalid');
      } else {
        if (radioContainer) radioContainer.classList.remove('is-invalid');
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

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
})

window.onload = function () {
  // Pie chart //

  // Statische json Werte für das ganze Dashboard.
  // Diese Daten werden später dynamisch sein, für diese Abgabe jedoch nur statische Werte hier im Code.
  const transactions = [
    {
      "einnahme": true,
      "betrag": 2850.00,
      "datum": "2025-09-01",
      "kategorie": "Haupteinkommen",
      "beschreibung": "Gehalt September",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 950.00,
      "datum": "2025-09-02",
      "kategorie": "Wohnen",
      "beschreibung": "Miete Wohnung",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 78.50,
      "datum": "2025-09-03",
      "kategorie": "Versicherungen",
      "beschreibung": "Haftpflichtversicherung",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 12.99,
      "datum": "2025-09-03",
      "kategorie": "Abbonements",
      "beschreibung": "Netflix Abo",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 5.99,
      "datum": "2025-09-04",
      "kategorie": "Abbonements",
      "beschreibung": "Spotify Premium",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 54.20,
      "datum": "2025-09-04",
      "kategorie": "Lebensmittel",
      "beschreibung": "Wocheneinkauf Supermarkt",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 32.45,
      "datum": "2025-09-05",
      "kategorie": "Lebensmittel",
      "beschreibung": "Einkauf beim Bäcker und Metzger",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 120.00,
      "datum": "2025-09-05",
      "kategorie": "Sonstiges",
      "beschreibung": "Geschenk für Freundin",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 45.00,
      "datum": "2025-09-06",
      "kategorie": "Sonstiges",
      "beschreibung": "Kinobesuch und Snacks",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 30.25,
      "datum": "2025-09-07",
      "kategorie": "Lebensmittel",
      "beschreibung": "Einkauf Lidl",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 89.00,
      "datum": "2025-09-08",
      "kategorie": "Versicherungen",
      "beschreibung": "Kfz-Versicherung",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 75.00,
      "datum": "2025-09-09",
      "kategorie": "Wohnen",
      "beschreibung": "Stromabschlag",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 25.50,
      "datum": "2025-09-09",
      "kategorie": "Sonstiges",
      "beschreibung": "Café-Besuch mit Freunden",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 15.00,
      "datum": "2025-09-10",
      "kategorie": "Abbonements",
      "beschreibung": "Adobe Creative Cloud",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 48.70,
      "datum": "2025-09-10",
      "kategorie": "Lebensmittel",
      "beschreibung": "Wocheneinkauf Supermarkt",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": true,
      "betrag": 120.00,
      "datum": "2025-09-11",
      "kategorie": "Sonstiges",
      "beschreibung": "Verkauf gebrauchtes Smartphone",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 9.99,
      "datum": "2025-09-12",
      "kategorie": "Abbonements",
      "beschreibung": "YouTube Premium",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 27.30,
      "datum": "2025-09-13",
      "kategorie": "Lebensmittel",
      "beschreibung": "Einkauf Rewe",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 110.00,
      "datum": "2025-09-14",
      "kategorie": "Sonstiges",
      "beschreibung": "Kleidung Herbstkollektion",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 64.50,
      "datum": "2025-09-15",
      "kategorie": "Lebensmittel",
      "beschreibung": "Wocheneinkauf Aldi",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 95.00,
      "datum": "2025-09-16",
      "kategorie": "Versicherungen",
      "beschreibung": "Hausratversicherung",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 50.00,
      "datum": "2025-09-17",
      "kategorie": "Sonstiges",
      "beschreibung": "Tankfüllung Auto",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 22.80,
      "datum": "2025-09-18",
      "kategorie": "Lebensmittel",
      "beschreibung": "Bäckerei und Markt",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 5.50,
      "datum": "2025-09-19",
      "kategorie": "Sonstiges",
      "beschreibung": "Kaffee to go",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 45.00,
      "datum": "2025-09-20",
      "kategorie": "Lebensmittel",
      "beschreibung": "Wocheneinkauf",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 14.99,
      "datum": "2025-09-21",
      "kategorie": "Abbonements",
      "beschreibung": "Amazon Prime",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 73.00,
      "datum": "2025-09-22",
      "kategorie": "Wohnen",
      "beschreibung": "Internet und Telefon",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 40.00,
      "datum": "2025-09-23",
      "kategorie": "Sonstiges",
      "beschreibung": "Restaurantbesuch",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 62.80,
      "datum": "2025-09-24",
      "kategorie": "Lebensmittel",
      "beschreibung": "Einkauf Supermarkt",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": true,
      "betrag": 200.00,
      "datum": "2025-09-25",
      "kategorie": "Sonstiges",
      "beschreibung": "Nebenjob Wochenende",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 16.90,
      "datum": "2025-09-26",
      "kategorie": "Sonstiges",
      "beschreibung": "Friseurtermin",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 53.40,
      "datum": "2025-09-27",
      "kategorie": "Lebensmittel",
      "beschreibung": "Wocheneinkauf Rewe",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 11.99,
      "datum": "2025-09-28",
      "kategorie": "Abbonements",
      "beschreibung": "Apple Music",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 18.50,
      "datum": "2025-09-29",
      "kategorie": "Sonstiges",
      "beschreibung": "Mittagessen Kantine",
      "notizen": "Notizen ..."
    },
    {
      "einnahme": false,
      "betrag": 47.10,
      "datum": "2025-09-30",
      "kategorie": "Lebensmittel",
      "beschreibung": "Monatsabschluss Einkauf",
      "notizen": "Notizen ..."
    }
  ];

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

  //************************************************************************************************************************************+
  // Recent Transactions
  //*****************************************************************************************************************************

  (() => {

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

    // einfache Kategorie -> Bootstrap Icon Map
    const iconMap = {
      "haupteinkommen": "bi-wallet-fill",
      "nebeneinkommen": "bi-cash-stack",
      "staatliche Leistungen/Transfers": "bi-patch-check-fill",
      "kapitaleinkünfte": "bi-graph-up-arrow",
      "sonstige Einnahmen": "bi-three-dots",
      "wohnen": "bi-house-fill",
      "versicherungen": "bi-shield-shaded",
      "mobilität (Fix)": "bi-bus-front-fill",
      "kommunikation/Medien": "bi-headset",
      "finanzen/Sparen (Fix)": "bi-bank",
      "abbonements": "bi-repeat",
      "lebensmittel": "bi-cart-fill",
      "mobilität (Variabel)": "bi-fuel-pump-fill",
      "kleidung & Körperpflege": "bi-bag-fill",
      "gesundheit": "bi-heart-pulse-fill",
      "freizeit & Unterhaltung": "bi-controller",
      "kinder/Haustiere": "bi-people-fill",
      "urlaub & Reisen": "bi-airplane-fill",
      "geschenke & Spenden": "bi-gift-fill",
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

        // optional: kleine Kategorie-Zeile unter Betrag
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

        const ecBtn = document.createElement('div');
        ecBtn.innerHTML = `
            <div class="btn-group-sm">
                <button class="btn btn-outline-primary edit-btn mx-2" title="Bearbeiten">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-outline-danger delete-btn" title="Löschen">
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
  })();


  //////////////////////////

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
}



