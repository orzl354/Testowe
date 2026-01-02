document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        window.location.href = "../Logowanie/Logowanie.html";
        return;
    }

    document.getElementById("welcome").textContent =
        `Zalogowany jako: ${user.imie} ${user.nazwisko}`;

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "../Logowanie/Logowanie.html";
    });

});

