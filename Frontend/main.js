// Navbar buttens (Statischer Dummy)

document.addEventListener("DOMContentLoaded", () =>{
    const navButtons = document.querySelectorAll("#navbar button:not([disabled])");

    navButtons.forEach(button =>{
        button.addEventListener("click", () =>{
            //Später Seite dynamisch neuladen
            //loadNewData(button.textContent.trim()); -> mogliche dynamisirung
            window.location.reload();
        });
    });
});

//Modal input validirung
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

input.addEventListener('input', ()=>{
  const eingabe = input.value.trim();

  if(eingabe.length > 0){
    input.classList.add('is-invalid');

      // Heir kann später eine richtige suchlogig eingebaut werden
  }
  else{
    input.classList.remove('is-invalid');
  }
})
