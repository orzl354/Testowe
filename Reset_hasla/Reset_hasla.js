document.addEventListener("DOMContentLoaded", () => {

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

    /* RESET HASŁA  */
    const form = document.getElementById("resetForm");
    const error = document.querySelector(".error");
    const emailInput = document.getElementById("email");

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            if (error) error.textContent = "";

            const email = emailInput.value.trim().toLowerCase();
            const users = JSON.parse(localStorage.getItem("users")) || [];

            if (!users.find(u => u.email === email)) {
                if (error) error.textContent = "Nie znaleziono konta z tym adresem e-mail.";
                return;
            }

            // Jeśli e-mail istnieje, zapisujemy go i idziemy do strony tworzenia nowego hasła
            localStorage.setItem("resetEmail", email);
            window.location.href = "../Nowe_haslo/Nowe_haslo.html";
        });
    }
});