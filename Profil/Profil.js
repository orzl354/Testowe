document.addEventListener("DOMContentLoaded", () => {

    // 1. SPRAWDZENIE CZY UŻYTKOWNIK JEST ZALOGOWANY
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        // Jeśli nie ma zalogowanego użytkownika, wróć do logowania
        window.location.href = "../Logowanie/Logowanie.html";
        return;
    }

    // 2. WYŚWIETLENIE DANYCH
    document.getElementById("imie").textContent = user.imie;
    document.getElementById("nazwisko").textContent = user.nazwisko;
    document.getElementById("wiek").textContent = user.wiek;
    document.getElementById("email").textContent = user.email;

    // 3. OBSŁUGA WYLOGOWANIA
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedUser");
            window.location.href = "../Szkielet_strony/Szkielet_strony.html";
        });
    }

    // 4. TRYB WYSOKIEGO KONTRASTU
    const toggle = document.getElementById("contrast-toggle");
    if (localStorage.getItem("highContrast") === "true") {
        document.body.classList.add("high-contrast");
    }

    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
            localStorage.setItem(
                "highContrast",
                document.body.classList.contains("high-contrast")
            );
        });
    }
});