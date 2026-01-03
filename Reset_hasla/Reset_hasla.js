document.addEventListener("DOMContentLoaded", () => {

    // HIGH CONTRAST
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

    // RESET
    const form = document.getElementById("resetForm");
    const error = document.querySelector(".error");

    form.addEventListener("submit", e => {
        e.preventDefault();
        error.textContent = "";

        const email = emailInput.value.trim().toLowerCase();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (!users.find(u => u.email === email)) {
            error.textContent = "Nie znaleziono konta z tym adresem e-mail.";
            return;
        }

        localStorage.setItem("resetEmail", email);
        window.location.href = "../Nowe_haslo/Nowe_haslo.html";
    });

    const emailInput = document.getElementById("email");
});
