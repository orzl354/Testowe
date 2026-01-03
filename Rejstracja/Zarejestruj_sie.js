document.addEventListener("DOMContentLoaded", () => {

    /* ===== HIGH CONTRAST (WSPÓLNY) ===== */
    const toggle = document.getElementById("contrast-toggle");

    if (localStorage.getItem("highContrast") === "true") {
        document.body.classList.add("high-contrast");
    }

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
        localStorage.setItem(
            "highContrast",
            document.body.classList.contains("high-contrast")
        );
    });

    /* ===== UŻYTKOWNICY ===== */
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const form = document.getElementById("Rejestracja");

    form.addEventListener("submit", e => {
        e.preventDefault();
        clearErrors();

        const imie = imieField.value.trim();
        const nazwisko = nazwiskoField.value.trim();
        const wiek = Number(wiekField.value);
        const email = emailField.value.trim().toLowerCase();
        const haslo = hasloField.value;

        let valid = true;

        if (imie === "") error(imieField, "Podaj imię"), valid = false;
        if (nazwisko === "") error(nazwiskoField, "Podaj nazwisko"), valid = false;
        if (wiek < 18) error(wiekField, "Musisz mieć co najmniej 18 lat"), valid = false;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error(emailField, "Niepoprawny adres e-mail");
            valid = false;
        }

        const special = haslo.match(/[^a-zA-Z0-9]/g);
        if (
            haslo.length < 8 ||
            !/[A-Z]/.test(haslo) ||
            !special || special.length < 2
        ) {
            error(hasloField, "Hasło nie spełnia wymagań");
            valid = false;
        }

        if (users.find(u => u.email === email)) {
            error(emailField, "Konto z tym e-mailem już istnieje");
            valid = false;
        }

        if (!valid) return;

        const newUser = { imie, nazwisko, wiek, email, haslo };

users.push(newUser);
localStorage.setItem("users", JSON.stringify(users));

// ✅ AUTOMATYCZNE ZALOGOWANIE
localStorage.setItem("loggedUser", JSON.stringify(newUser));

// ✅ PRZEJŚCIE DO PROFILU
window.location.href = "../Profil/Profil.html";

    });

    /* ===== HELPERY ===== */
    const imieField = document.getElementById("imie");
    const nazwiskoField = document.getElementById("nazwisko");
    const wiekField = document.getElementById("wiek");
    const emailField = document.getElementById("email");
    const hasloField = document.getElementById("haslo");

    function error(input, message) {
        input.nextElementSibling.nextElementSibling.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(e => e.textContent = "");
    }
    
});
