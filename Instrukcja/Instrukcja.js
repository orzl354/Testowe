
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

    /* LOGIN STATUS */
    const loginButton = document.getElementById("loginButton");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loginButton && loggedUser) {
        loginButton.textContent = `${loggedUser.imie} ${loggedUser.nazwisko}`;
        loginButton.href = "../Profil/Profil.html";
    }

});