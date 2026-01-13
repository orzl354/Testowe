document.addEventListener("DOMContentLoaded", () => {

    // ===== HIGH CONTRAST =====
    const contrastButton = document.getElementById('contrast-toggle');

    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    if (contrastButton) {
        contrastButton.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isHigh = document.body.classList.contains('high-contrast');
            localStorage.setItem('highContrast', isHigh);
        });
    }

    // LOGOWANIE  
    const loginButton = document.getElementById("loginButton");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loginButton && loggedUser) {
        loginButton.textContent = `${loggedUser.imie} ${loggedUser.nazwisko}`;
        loginButton.href = "../Profil/Profil.html";
    }
});