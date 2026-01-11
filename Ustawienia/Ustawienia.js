document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!loggedUser) {
        window.location.href = "../Logowanie/Logowanie.html";
        return;
    }

    // Wypełnij formularz obecnymi danymi
    document.getElementById("edit-imie").value = loggedUser.imie;
    document.getElementById("edit-nazwisko").value = loggedUser.nazwisko;
    document.getElementById("edit-wiek").value = loggedUser.wiek;
    document.getElementById("edit-email").value = loggedUser.email;

    // 1. ZMIANA DANYCH OSOBOWYCH
    const personalForm = document.getElementById("personalDataForm");
    personalForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedEmail = document.getElementById("edit-email").value.trim().toLowerCase();
        
        // Znajdź użytkownika w głównej tablicy
        const userIndex = users.findIndex(u => u.email === loggedUser.email);

        if (userIndex !== -1) {
            // Aktualizujemy dane w tablicy wszystkich użytkowników
            users[userIndex].imie = document.getElementById("edit-imie").value;
            users[userIndex].nazwisko = document.getElementById("edit-nazwisko").value;
            users[userIndex].wiek = document.getElementById("edit-wiek").value;
            users[userIndex].email = updatedEmail;

            // Aktualizujemy sesję (loggedUser)
            localStorage.setItem("loggedUser", JSON.stringify(users[userIndex]));
            localStorage.setItem("users", JSON.stringify(users));

            alert("Dane zostały zaktualizowane!");
        }
    });

    // 2. ZMIANA HASŁA
    const passwordForm = document.getElementById("passwordChangeForm");
    const passError = document.getElementById("password-error");

    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        passError.textContent = "";

        const currentPass = document.getElementById("current-password").value;
        const newPass = document.getElementById("new-password").value;
        const confirmPass = document.getElementById("confirm-password").value;

        if (currentPass !== loggedUser.haslo) {
            passError.textContent = "Aktualne hasło jest nieprawidłowe.";
            return;
        }

        if (newPass !== confirmPass) {
            passError.textContent = "Nowe hasła nie są identyczne.";
            return;
        }

        const userIndex = users.findIndex(u => u.email === loggedUser.email);
        if (userIndex !== -1) {
            users[userIndex].haslo = newPass;
            localStorage.setItem("users", JSON.stringify(users));
            
            // Aktualizujemy też hasło w bieżącej sesji
            loggedUser.haslo = newPass;
            localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

            alert("Hasło zostało zmienione!");
            passwordForm.reset();
        }
    });

    // 3. WYLOGUJ I KONTRAST (Kopiujemy logikę z Profil.js)
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "../Logowanie/Logowanie.html";
    });

    if (localStorage.getItem("highContrast") === "true") document.body.classList.add("high-contrast");
    document.getElementById("contrast-toggle").addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
        localStorage.setItem("highContrast", document.body.classList.contains("high-contrast"));
    });
});