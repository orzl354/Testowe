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
    const addMeasurementTile = document.getElementById("addMeasurementTile"); // Pobieramy nowy kafelek
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loggedUser) {
        // 1. Zmiana przycisku w nagłówku (Imię zamiast "Zaloguj się")
        if (loginButton) {
            loginButton.textContent = `${loggedUser.imie} ${loggedUser.nazwisko}`;
            loginButton.href = "../Profil/Profil.html";
        }

        // 2. Zmiana linku w kafelku "Dodaj pomiar"
        // Jeśli użytkownik jest zalogowany, kierujemy do rejestracji.
        // Jeśli nie (else), zostaje domyślny link z HTML (Logowanie.html).
        if (addMeasurementTile) {
            addMeasurementTile.href = "../Panel_rejestracji/Panel_rejestracji.html";
        }
    }
});