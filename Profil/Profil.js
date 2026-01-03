document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        window.location.href = "../Logowanie/Logowanie.html";
        return;
    }

    // dane użytkownika
    document.getElementById("imie").textContent = user.imie;
    document.getElementById("nazwisko").textContent = user.nazwisko;
    document.getElementById("wiek").textContent = user.wiek;
    document.getElementById("email").textContent = user.email;

    // wylogowanie
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "../Szkielet_strony/Szkielet_strony.html";
    });

    // high contrast
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
});
