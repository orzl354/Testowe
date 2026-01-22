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

    // ===== LOGOWANIE I LINKI =====
    const loginButton = document.getElementById("loginButton");
    const addMeasurementTile = document.getElementById("addMeasurementTile");
    const statsTile = document.getElementById("statsTile"); // Pobieramy nowy kafelek statystyk
    
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loggedUser) {
        // 1. Zmiana przycisku w nagłówku
        if (loginButton) {
            loginButton.textContent = `${loggedUser.imie} ${loggedUser.nazwisko}`;
            loginButton.href = "../Profil/Profil.html";
        }

        // 2. Link do dodawania pomiaru (kieruje do panelu rejestracji)
        if (addMeasurementTile) {
            addMeasurementTile.href = "../Panel_rejestracji/Panel_rejestracji.html";
        }

        // 3. Link do statystyk (kieruje do statystyk zamiast do logowania)
        if (statsTile) {
            statsTile.href = "../Statystyki/Statystyki.html";
        }
    }
});