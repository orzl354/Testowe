document.addEventListener("DOMContentLoaded", () => {

    /* ===== HIGH CONTRAST - Standardowy mechanizm ===== */
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

    /* ===== REJESTRACJA ===== */
    const form = document.getElementById("Rejestracja");
    const imieField = document.getElementById("imie");
    const nazwiskoField = document.getElementById("nazwisko");
    const wiekField = document.getElementById("wiek");
    const emailField = document.getElementById("email");
    const hasloField = document.getElementById("haslo");

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            clearErrors();

            const imie = imieField.value.trim();
            const nazwisko = nazwiskoField.value.trim();
            const wiek = Number(wiekField.value);
            const email = emailField.value.trim().toLowerCase();
            const haslo = hasloField.value;

            let valid = true;

            // Walidacja pól
            if (imie === "") { setError(imieField, "Podaj imię"); valid = false; }
            if (nazwisko === "") { setError(nazwiskoField, "Podaj nazwisko"); valid = false; }
            if (wiek < 18) { setError(wiekField, "Musisz mieć co najmniej 18 lat"); valid = false; }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError(emailField, "Niepoprawny adres e-mail");
                valid = false;
            }

            const specialChars = haslo.match(/[^a-zA-Z0-9]/g);
            if (
                haslo.length < 8 ||
                !/[A-Z]/.test(haslo) ||
                !specialChars || specialChars.length < 2
            ) {
                setError(hasloField, "Hasło nie spełnia wymagań");
                valid = false;
            }

            // Sprawdzenie czy email już istnieje
            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.find(u => u.email === email)) {
                setError(emailField, "Konto z tym e-mailem już istnieje");
                valid = false;
            }

            if (!valid) return;

            // Tworzenie użytkownika
            const newUser = { imie, nazwisko, wiek, email, haslo };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Automatyczne zalogowanie
            localStorage.setItem("loggedUser", JSON.stringify(newUser));

            // Przejście do profilu
            window.location.href = "../Profil/Profil.html";
        });
    }

    /* ===== HELPERY ===== */
    function setError(input, message) {
        // Znajduje najbliższy element .error wewnątrz kontenera .field
        const fieldContainer = input.closest('.field');
        const errorLabel = fieldContainer.querySelector('.error');
        if (errorLabel) errorLabel.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(e => e.textContent = "");
    }
    
});