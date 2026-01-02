document.addEventListener("DOMContentLoaded", () => {

    // ===== LISTA UŻYTKOWNIKÓW =====
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ===== DOMYŚLNE KONTO (ZAWSZE ISTNIEJE) =====
    const defaultUser = {
        imie: "Jan",
        nazwisko: "Kowalski",
        wiek: 25,
        email: "demo@test.pl",
        haslo: "Demo@123!"
    };

    if (!users.find(u => u.email === defaultUser.email)) {
        users.push(defaultUser);
        localStorage.setItem("users", JSON.stringify(users));
    }

    // ===== OBSŁUGA FORMULARZA =====
    document.getElementById("Rejestracja").addEventListener("submit", function (e) {
        e.preventDefault();

        const imie = document.getElementById("imie").value.trim();
        const nazwisko = document.getElementById("nazwisko").value.trim();
        const wiek = parseInt(document.getElementById("wiek").value);
        const email = document.getElementById("email").value.trim().toLowerCase();
        const haslo = document.getElementById("haslo").value;

        if (wiek < 18) {
            alert("Musisz mieć co najmniej 18 lat.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Niepoprawny adres e-mail.");
            return;
        }

        const hasUppercase = /[A-Z]/.test(haslo);
        const specialChars = haslo.match(/[^a-zA-Z0-9]/g);
        if (haslo.length < 8 || !hasUppercase || !specialChars || specialChars.length < 2) {
            alert("Hasło musi mieć min. 8 znaków, 1 wielką literę i 2 znaki specjalne.");
            return;
        }

        if (users.find(u => u.email === email)) {
            alert("Konto z tym adresem e-mail już istnieje.");
            return;
        }

        users.push({ imie, nazwisko, wiek, email, haslo });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Rejestracja zakończona sukcesem!");
        window.location.href = "../Logowanie/Logowanie.html";
    });

});
