document.addEventListener("DOMContentLoaded", () => {

    const email = localStorage.getItem("resetEmail");
    if (!email) {
        // Jeśli ktoś wejdzie bezpośrednio na tę stronę bez procesu resetu
        window.location.href = "../Reset_hasla/Reset_hasla.html";
        return;
    }

    /* HIGH CONTRAST */
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

    /* FORMULARZ ZMIANY HASŁA */
    const form = document.getElementById("newPasswordForm");
    const errorDisplay = document.querySelector(".error");

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            if (errorDisplay) errorDisplay.textContent = "";

            const haslo = document.getElementById("haslo").value;
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Walidacja: min 8 znaków, 1 wielka litera, min 2 znaki specjalne
            const specialChars = haslo.match(/[^a-zA-Z0-9]/g);
            const valid =
                haslo.length >= 8 &&
                /[A-Z]/.test(haslo) &&
                specialChars && specialChars.length >= 2;

            if (!valid) {
                if (errorDisplay) errorDisplay.textContent = "Hasło nie spełnia wymagań (8 znaków, wielka litera, 2 specyficzne).";
                return;
            }

            // Znajdź użytkownika i zaktualizuj hasło
            const index = users.findIndex(u => u.email === email);
            if (index !== -1) {
                users[index].haslo = haslo;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.removeItem("resetEmail");

                alert("Hasło zostało zmienione pomyślnie!");
                window.location.href = "../Logowanie/Logowanie.html";
            }
        });
    }
});