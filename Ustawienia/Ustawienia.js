document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!loggedUser) {
        window.location.href = "../Logowanie/Logowanie.html";
        return;
    }

    // Wypełnij dane na starcie
    document.getElementById("edit-imie").value = loggedUser.imie;
    document.getElementById("edit-nazwisko").value = loggedUser.nazwisko;
    document.getElementById("edit-wiek").value = loggedUser.wiek;
    document.getElementById("edit-email").value = loggedUser.email;

    // ZMIANA DANYCH
    document.getElementById("personalDataForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const userIndex = users.findIndex(u => u.email === loggedUser.email);
        if (userIndex !== -1) {
            users[userIndex].imie = document.getElementById("edit-imie").value;
            users[userIndex].nazwisko = document.getElementById("edit-nazwisko").value;
            users[userIndex].wiek = document.getElementById("edit-wiek").value;
            users[userIndex].email = document.getElementById("edit-email").value.toLowerCase();

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedUser", JSON.stringify(users[userIndex]));
            alert("Dane zaktualizowane!");
        }
    });

    // ZMIANA HASŁA
    document.getElementById("passwordChangeForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const err = document.getElementById("password-error");
        const currentP = document.getElementById("current-password").value;
        const newP = document.getElementById("new-password").value;
        const confirmP = document.getElementById("confirm-password").value;

        if (currentP !== loggedUser.haslo) { err.textContent = "Błędne aktualne hasło!"; return; }
        if (newP !== confirmP) { err.textContent = "Hasła nie są identyczne!"; return; }

        const userIndex = users.findIndex(u => u.email === loggedUser.email);
        users[userIndex].haslo = newP;
        localStorage.setItem("users", JSON.stringify(users));
        loggedUser.haslo = newP;
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        alert("Hasło zmienione!");
        e.target.reset();
        err.textContent = "";
    });

    // USUWANIE KONTA
    document.getElementById("deleteAccountBtn").addEventListener("click", () => {
        if (confirm("Czy na pewno chcesz trwale usunąć konto i wszystkie pomiary?")) {
            const updatedUsers = users.filter(u => u.email !== loggedUser.email);
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            const measurements = JSON.parse(localStorage.getItem("measurements")) || [];
            const updatedMeasures = measurements.filter(m => m.userEmail !== loggedUser.email);
            localStorage.setItem("measurements", JSON.stringify(updatedMeasures));

            localStorage.removeItem("loggedUser");
            window.location.href = "../Szkielet_strony/Szkielet_strony.html";
        }
    });

    // CONTRAST & LOGOUT
    if (localStorage.getItem("highContrast") === "true") document.body.classList.add("high-contrast");
    document.getElementById("contrast-toggle").addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
        localStorage.setItem("highContrast", document.body.classList.contains("high-contrast"));
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "../Logowanie/Logowanie.html";
    });
});