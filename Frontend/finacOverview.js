document.addEventListener('DOMContentLoaded', () => {
  const LIST_ID = 'transactionList';
  const TEMPLATE_ID = 'transaction-template';
  const JSON_PATH = 'dummy.json'; // <- anpassen falls nötig

  const iconMap = {
    // typische Kategorien — bei Bedarf erweitern
    'haupteinkommen': 'bi-wallet2',
    'salary': 'bi-wallet2',
    'gehalt': 'bi-wallet2',
    'food': 'bi-basket3',
    'essen': 'bi-basket3',
    'grocery': 'bi-cart3',
    'shopping': 'bi-cart3',
    'miete': 'bi-building',
    'rent': 'bi-building',
    'strom': 'bi-lightning-charge',
    'electricity': 'bi-lightning-charge',
    'vertrag': 'bi-file-earmark-text',
    'contracts': 'bi-file-earmark-text',
    'auto': 'bi-car-front',
    'car': 'bi-car-front',
    'social': 'bi-megaphone',
    'social media': 'bi-megaphone',
    'income': 'bi-cash-stack',
    // fallback wird 'bi-question-circle' sein
  };

   // Formats number to euro value.
  const currencyFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  });

  const dateFormatter = new Intl.DateTimeFormat('de-DE', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  });

  // Hilfsfunktionen
  function chooseIconForCategory(cat) {
    const key = String(cat).trim().toLowerCase();
    return iconMap[key] || 'bi-question-circle';
  }

  function formatAmount(amount, isIncome) {
    const abs = Math.abs(Number(amount) || 0);
    const sign = isIncome ? '+' : '-';
    return `${sign}${currencyFormatter.format(abs)}`;
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      if (isNaN(d)) return iso;
      return dateFormatter.format(d);
    } catch (e) {
      return iso;
    }
  }

  function capitalizeFirst(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Render-Funktion für ein Array von Transaktionen
  function renderTransactions(transactions) {
    const list = document.getElementById(LIST_ID);
    const template = document.getElementById(TEMPLATE_ID);
    if (!list || !template) {
      console.warn('Fehlendes #transactionList oder #transaction-template im DOM.');
      return;
    }

    // entferne ggf. Platzhalterinhalte
    list.innerHTML = '';

    transactions.forEach(tx => {
      // Erwartete Struktur:
      // { "einnahme": true, "betrag": 2850.00, "datum": "2025-09-01", "kategorie": "haupteinkommen", "beschreibung": "Gehalt September" }

      const clone = template.content.cloneNode(true);
      const li = clone.querySelector('li') || clone.querySelector(':scope > *');

      // Elementreferenzen innerhalb des Templates
      const titleEl = clone.querySelector('.tx-title');
      const subEl   = clone.querySelector('.tx-sub');
      const amountEl= clone.querySelector('.tx-amount');
      const catEl   = clone.querySelector('.tx-category');
      const iconWrap= clone.querySelector('.tx-icon');

      const isIncome = Boolean(tx.einnahme);
      const amountStr = formatAmount(tx.betrag, isIncome);
      const dateStr = formatDate(tx.datum);
      const category = tx.kategorie || (tx.beschreibung ? tx.beschreibung : 'Unbekannt');
      const description = tx.beschreibung || capitalizeFirst(category);

      // Fülle Inhalte
      if (titleEl) titleEl.textContent = description;
      if (subEl) subEl.textContent = `${dateStr} • ${capitalizeFirst(category)}`;
      if (amountEl) {
        amountEl.textContent = amountStr;
        amountEl.classList.remove('text-success', 'text-danger');
        amountEl.classList.add(isIncome ? 'text-success' : 'text-danger');
      }
      if (catEl) catEl.textContent = capitalizeFirst(category);

      // Icon setzen
      if (iconWrap) {
        iconWrap.setAttribute('data-category', category);
        const iconClass = chooseIconForCategory(category);
        // iconWrap kann zusätzliche Bootstrap utility classes behalten; wir ersetzen nur das <i>
        iconWrap.innerHTML = `<i class="bi ${iconClass}" aria-hidden="true" style="font-size:1.25rem;"></i>`;
      }

      // Accessibility / Role
      if (li) {
        li.setAttribute('role', 'listitem');
        li.classList.add('transaction-item');
      }

      list.appendChild(clone);
    });
  }

  // Lade JSON mittels fetch; wenn Fehler, logge diesen
  function loadAndRender(path) {
    fetch(path)
      .then(resp => {
        if (!resp.ok) throw new Error('Netzwerkantwort war nicht ok: ' + resp.status);
        return resp.json();
      })
      .then(json => {
        // falls deine JSON ein Objekt mit eigenem Feld enthält, z.B. { transactions: [...] }, handle das:
        const data = Array.isArray(json) ? json : (Array.isArray(json.transactions) ? json.transactions : []);
        renderTransactions(data);
      })
      .catch(err => {
        console.error('Fehler beim Laden der Transaktionen:', err);
        // optional: Fallback wenn im Fenster ein `transactions`-Array definiert ist
        if (Array.isArray(window.transactions)) {
          console.info('Verwende window.transactions als Fallback.');
          renderTransactions(window.transactions);
        }
      });
  }

  // Start
  loadAndRender(JSON_PATH);

  // Optional: Exponiere Funktion global, falls du dynamisch von außen nachladen willst
  window.renderTransactions = renderTransactions;
});
