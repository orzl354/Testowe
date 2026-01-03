document.addEventListener("DOMContentLoaded", () => {

    const email = localStorage.getItem("resetEmail");
    if (!email) {
        window.location.href = "../Reset_hasla/Reset_hasla.html";
        return;
    }

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

    const form = document.getElementById("newPasswordForm");
    const error = document.querySelector(".error");

    form.addEventListener("submit", e => {
        e.preventDefault();
        error.textContent = "";

        const haslo = document.getElementById("haslo").value;
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const valid =
            haslo.length >= 8 &&
            /[A-Z]/.test(haslo) &&
            (haslo.match(/[^a-zA-Z0-9]/g) || []).length >= 2;

        if (!valid) {
            error.textContent =
                "Min. 8 znaków, 1 wielka litera i 2 znaki specjalne.";
            return;
        }

        const index = users.findIndex(u => u.email === email);
        users[index].haslo = haslo;

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem("resetEmail");

        window.location.href = "../Logowanie_wlasciwe/Logowanie_wlasciwe.html";
    });
});
