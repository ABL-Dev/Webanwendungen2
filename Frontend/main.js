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

  // Static json values used by the pie chart.
  // This data will later be fetched from the SQL server (for now its just static).
  transactions = [
    {
      "einnahme": true,
      "betrag": 2850.00,
      "datum": "2025-09-01",
      "kategorie": "haupteinkommen",
      "beschreibung": "Gehalt September"
    },
    {
      "einnahme": false,
      "betrag": 950.00,
      "datum": "2025-09-02",
      "kategorie": "wohnen",
      "beschreibung": "Miete Wohnung"
    },
    {
      "einnahme": false,
      "betrag": 78.50,
      "datum": "2025-09-03",
      "kategorie": "versicherungen",
      "beschreibung": "Haftpflichtversicherung"
    },
    {
      "einnahme": false,
      "betrag": 12.99,
      "datum": "2025-09-03",
      "kategorie": "abbonements",
      "beschreibung": "Netflix Abo"
    },
    {
      "einnahme": false,
      "betrag": 5.99,
      "datum": "2025-09-04",
      "kategorie": "abbonements",
      "beschreibung": "Spotify Premium"
    },
    {
      "einnahme": false,
      "betrag": 54.20,
      "datum": "2025-09-04",
      "kategorie": "lebensmittel",
      "beschreibung": "Wocheneinkauf Supermarkt"
    },
    {
      "einnahme": false,
      "betrag": 32.45,
      "datum": "2025-09-05",
      "kategorie": "lebensmittel",
      "beschreibung": "Einkauf beim Bäcker und Metzger"
    },
    {
      "einnahme": false,
      "betrag": 120.00,
      "datum": "2025-09-05",
      "kategorie": "sonstiges",
      "beschreibung": "Geschenk für Freundin"
    },
    {
      "einnahme": false,
      "betrag": 45.00,
      "datum": "2025-09-06",
      "kategorie": "sonstiges",
      "beschreibung": "Kinobesuch und Snacks"
    },
    {
      "einnahme": false,
      "betrag": 30.25,
      "datum": "2025-09-07",
      "kategorie": "lebensmittel",
      "beschreibung": "Einkauf Lidl"
    },
    {
      "einnahme": false,
      "betrag": 89.00,
      "datum": "2025-09-08",
      "kategorie": "versicherungen",
      "beschreibung": "Kfz-Versicherung"
    },
    {
      "einnahme": false,
      "betrag": 75.00,
      "datum": "2025-09-09",
      "kategorie": "wohnen",
      "beschreibung": "Stromabschlag"
    },
    {
      "einnahme": false,
      "betrag": 25.50,
      "datum": "2025-09-09",
      "kategorie": "sonstiges",
      "beschreibung": "Café-Besuch mit Freunden"
    },
    {
      "einnahme": false,
      "betrag": 15.00,
      "datum": "2025-09-10",
      "kategorie": "abbonements",
      "beschreibung": "Adobe Creative Cloud"
    },
    {
      "einnahme": false,
      "betrag": 48.70,
      "datum": "2025-09-10",
      "kategorie": "lebensmittel",
      "beschreibung": "Wocheneinkauf Supermarkt"
    },
    {
      "einnahme": true,
      "betrag": 120.00,
      "datum": "2025-09-11",
      "kategorie": "sonstiges",
      "beschreibung": "Verkauf gebrauchtes Smartphone"
    },
    {
      "einnahme": false,
      "betrag": 9.99,
      "datum": "2025-09-12",
      "kategorie": "abbonements",
      "beschreibung": "YouTube Premium"
    },
    {
      "einnahme": false,
      "betrag": 27.30,
      "datum": "2025-09-13",
      "kategorie": "lebensmittel",
      "beschreibung": "Einkauf Rewe"
    },
    {
      "einnahme": false,
      "betrag": 110.00,
      "datum": "2025-09-14",
      "kategorie": "sonstiges",
      "beschreibung": "Kleidung Herbstkollektion"
    },
    {
      "einnahme": false,
      "betrag": 64.50,
      "datum": "2025-09-15",
      "kategorie": "lebensmittel",
      "beschreibung": "Wocheneinkauf Aldi"
    },
    {
      "einnahme": false,
      "betrag": 95.00,
      "datum": "2025-09-16",
      "kategorie": "versicherungen",
      "beschreibung": "Hausratversicherung"
    },
    {
      "einnahme": false,
      "betrag": 50.00,
      "datum": "2025-09-17",
      "kategorie": "sonstiges",
      "beschreibung": "Tankfüllung Auto"
    },
    {
      "einnahme": false,
      "betrag": 22.80,
      "datum": "2025-09-18",
      "kategorie": "lebensmittel",
      "beschreibung": "Bäckerei und Markt"
    },
    {
      "einnahme": false,
      "betrag": 5.50,
      "datum": "2025-09-19",
      "kategorie": "sonstiges",
      "beschreibung": "Kaffee to go"
    },
    {
      "einnahme": false,
      "betrag": 45.00,
      "datum": "2025-09-20",
      "kategorie": "lebensmittel",
      "beschreibung": "Wocheneinkauf"
    },
    {
      "einnahme": false,
      "betrag": 14.99,
      "datum": "2025-09-21",
      "kategorie": "abbonements",
      "beschreibung": "Amazon Prime"
    },
    {
      "einnahme": false,
      "betrag": 73.00,
      "datum": "2025-09-22",
      "kategorie": "wohnen",
      "beschreibung": "Internet und Telefon"
    },
    {
      "einnahme": false,
      "betrag": 40.00,
      "datum": "2025-09-23",
      "kategorie": "sonstiges",
      "beschreibung": "Restaurantbesuch"
    },
    {
      "einnahme": false,
      "betrag": 62.80,
      "datum": "2025-09-24",
      "kategorie": "lebensmittel",
      "beschreibung": "Einkauf Supermarkt"
    },
    {
      "einnahme": true,
      "betrag": 200.00,
      "datum": "2025-09-25",
      "kategorie": "sonstiges",
      "beschreibung": "Nebenjob Wochenende"
    },
    {
      "einnahme": false,
      "betrag": 16.90,
      "datum": "2025-09-26",
      "kategorie": "sonstiges",
      "beschreibung": "Friseurtermin"
    },
    {
      "einnahme": false,
      "betrag": 53.40,
      "datum": "2025-09-27",
      "kategorie": "lebensmittel",
      "beschreibung": "Wocheneinkauf Rewe"
    },
    {
      "einnahme": false,
      "betrag": 11.99,
      "datum": "2025-09-28",
      "kategorie": "abbonements",
      "beschreibung": "Apple Music"
    },
    {
      "einnahme": false,
      "betrag": 18.50,
      "datum": "2025-09-29",
      "kategorie": "sonstiges",
      "beschreibung": "Mittagessen Kantine"
    },
    {
      "einnahme": false,
      "betrag": 47.10,
      "datum": "2025-09-30",
      "kategorie": "lebensmittel",
      "beschreibung": "Monatsabschluss Einkauf"
    }
  ];

  // First filter only entries in json where "einnahme" is false -> ausgabe.
  const expenses = transactions.filter(entry => entry.einnahme === false);

  // Sum up "betrag" values for each category.
  const categorySums = {}; // Using dictionary for category:sum data.
  expenses.forEach(entry => {
    const category = entry.kategorie;
    categorySums[category] = (categorySums[category] || 0) + entry.betrag;
  });

  // Use the dict keys as labels for the pie chart.
  // But make the first letter of every word uppercase.
  const categoryNames = Object.keys(categorySums).map(key =>
    key.charAt(0).toUpperCase() + key.slice(1)
  );

  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categoryNames, // Use the dict keys as labels.
      datasets: [{
        label: 'Gesamtausgaben',
        data: Object.values(categorySums), // Use the dict values as data.
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
      maintainAspectRatio: false, // allows custom sizing
      plugins: {
        legend: {
          position: 'right', // move labels to the right
          labels: {
            boxWidth: 25, // smaller color boxes
            padding: 20   // spacing between labels
          }
        },
      },
      layout: {
        padding: 10 // optional spacing around chart
      }
    }
  });

  const ctxbar = document.getElementById('budgetChart').getContext('2d');

  const categories = categoryNames;
  // Spent amount in each category.
  const spent = Object.values(categorySums);
  // Max. budget in each category.
  // TODO: Hier evtl.new entry knopf rippen aber nur mit kategorien und total budget, damit man dann
  // hier je nach kategoriename ein totalbudget wert hat. falls kein wert -> totalbudget = spent.
  const totalBudget = [600, 500, 300, 1200, 200];

  // Split into two parts, spent and exceeded.
  // Spent.
  const normalSpent = spent.map((s, i) => Math.min(s, totalBudget[i]));
  // Exceeded.
  const exceededSpent = spent.map((s, i) => Math.max(0, s - totalBudget[i]));
  // Not exceeded (remaining).
  const remaining = totalBudget.map((t, i) => Math.max(0, t - spent[i]));

  new Chart(ctxbar, {
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
          backgroundColor: 'rgba(255, 99, 132, 0.7)', // red color for exceeded part
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
          max: Math.max(...totalBudget.concat(spent)) // so that exceeded scales properly.
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
      transactions.sort((a,b) => new Date(b.datum) - new Date(a.datum));

      transactions.forEach(tx => {
        const li = document.createElement("li");
        li.className = 'd-flex align-items-start justify-content-between gap-3 py-2 border-bottom border-primary';

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
        desc.textContent = tx.beschreibung || (tx.kategorie || 'Transaktion');

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
        const formatted = Number(tx.betrag || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        amtSpan.textContent = (tx.einnahme ? '+' : '-') + formatted;
        amtSpan.classList.add(tx.einnahme ? 'text-success' : 'text-danger');

        // optional: kleine Kategorie-Zeile unter Betrag
        const catSmall = document.createElement('div');
        catSmall.className = 'small text-primary';
        catSmall.textContent = tx.kategorie || '';

        amount.appendChild(amtSpan);
        amount.appendChild(catSmall);

        li.appendChild(left);
        li.appendChild(amount);

        listContainer.appendChild(li);
      });
    }
    render();
  })();
}