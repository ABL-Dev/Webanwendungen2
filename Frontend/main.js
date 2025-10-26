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