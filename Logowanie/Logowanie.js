document.addEventListener("DOMContentLoaded", () => {

    /* HIGH CONTRAST */
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

    /* LOGOWANIE */
    const form = document.getElementById("logowanieForm");
    const error = document.querySelector(".error");

    form.addEventListener("submit", e => {
        e.preventDefault();
        error.textContent = "";

        const email = document.getElementById("email").value.trim().toLowerCase();
        const haslo = document.getElementById("haslo").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email);

        if (!user || user.haslo !== haslo) {
            error.textContent = "Nieprawidłowy e-mail lub hasło.";
            return;
        }

        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "../Profil/Profil.html";
    });
    /* POKAŻ / UKRYJ HASŁO */
    const passwordInput = document.getElementById("haslo");
    const togglePassword = document.getElementById("togglePassword");

    if (togglePassword && passwordInput) {
        togglePassword.classList.add("hidden"); // start: hasło ukryte

        togglePassword.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password";

            passwordInput.type = isPassword ? "text" : "password";
            togglePassword.classList.toggle("hidden", isPassword);
        });
    }

});
