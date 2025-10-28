// Navbar buttens (Statischer Dummy)

document.addEventListener("DOMContentLoaded", () =>{
    const navButtons = document.querySelectorAll("#navbar button:not([disabled])");

    navButtons.forEach(button =>{
        button.addEventListener("click", () =>{

            const  year = document.getElementById("year"); 
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

window.onload = function() {
    // Pie chart:
    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
            datasets: [{
                label: 'Color Distribution',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
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
                    position: 'right', // 🟢 move labels to the right
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

    // Bar chart (budget):
    const ctxbar = document.getElementById('budgetChart').getContext('2d');

    const categories = ['Money', 'Shopping', 'Car', 'Rent', 'Contracts'];
    const spent = [300, 68, 240, 1200, 110];          // Amount spent
    const totalBudget = [600, 100, 300, 1200, 200];   // Maximum budget

    new Chart(ctxbar, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Spent',
                    data: spent,
                    backgroundColor: 'rgba(75, 192, 255, 0.7)',
                    borderRadius: 5,
                    barThickness: 20
                },
                {
                    label: 'Remaining',
                    data: totalBudget.map((t, i) => t - spent[i]),
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 5,
                    barThickness: 20
                }
            ]
        },
        options: {
            indexAxis: 'y',   // Horizontal bars
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
                    max: Math.max(...totalBudget)
                },
                y: { stacked: true, ticks: { color: '#fff' }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false }, // <-- Legend removed
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const i = context.dataIndex;
                            const used = spent[i];
                            const max = totalBudget[i];
                            const percent = ((used / max) * 100).toFixed(1);
                            return `${used} € / ${max} € (${percent}%)`;
                        }
                    }
                }
            }
        }
    });
};