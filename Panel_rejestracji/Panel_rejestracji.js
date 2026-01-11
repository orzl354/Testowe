document.addEventListener("DOMContentLoaded", () => {
    // 1. Sprawdzenie logowania
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
        window.location.href = "../Logowanie/Logowanie.html";
        return;
    }

    // Wyświetlanie imienia w nagłówku
    const userNameBtn = document.getElementById("userName");
    userNameBtn.textContent = `${loggedUser.imie} ${loggedUser.nazwisko}`;

    // 2. Obsługa kontrastu
    if (localStorage.getItem("highContrast") === "true") document.body.classList.add("high-contrast");
    document.getElementById("contrast-toggle").addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
        localStorage.setItem("highContrast", document.body.classList.contains("high-contrast"));
    });

    // 3. Zapisywanie pomiaru
    const form = document.getElementById("rejestracjaCisnieniaForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const pomiar = {
            userEmail: loggedUser.email,
            sys: document.getElementById("sys").value,
            dia: document.getElementById("dia").value,
            pulse: document.getElementById("pulse").value,
            data: new Date().toLocaleString() // Zapisuje datę i godzinę
        };

        // Pobieramy stare pomiary lub tworzymy nową tablicę
        const allMeasurements = JSON.parse(localStorage.getItem("measurements")) || [];
        allMeasurements.push(pomiar);
        localStorage.setItem("measurements", JSON.stringify(allMeasurements));

        // Przekierowanie do statystyk
        window.location.href = "../Statystyki/Statystyki.html";
    });
});