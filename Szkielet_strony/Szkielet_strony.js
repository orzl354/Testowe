document.addEventListener("DOMContentLoaded", () => {

    // ===== HIGH CONTRAST =====
    const contrastButton = document.getElementById('contrast-toggle');

    // Sprawdź czy tryb był włączony
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

    // ===== LOGOWANIE / UŻYTKOWNIK =====
    const loginButton = document.getElementById("loginButton");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    // Jeśli w localStorage jest zalogowany użytkownik, zmień przycisk
    if (loginButton && loggedUser) {
        loginButton.textContent = `${loggedUser.imie} ${loggedUser.nazwisko}`;
        loginButton.href = "../Profil/Profil.html"; // Kieruj do profilu zamiast do logowania
    }

});