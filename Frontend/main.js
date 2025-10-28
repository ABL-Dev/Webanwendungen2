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