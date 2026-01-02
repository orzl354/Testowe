document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("logowanieForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const haslo = document.getElementById("haslo").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email);

        if (!user) {
            showError("Nie znaleziono konta z tym adresem e-mail.");
            return;
        }

        if (user.haslo !== haslo) {
            showError("Nieprawidłowe hasło.");
            return;
        }

        // ✅ ZAPIS ZALOGOWANEGO UŻYTKOWNIKA
        localStorage.setItem("loggedUser", JSON.stringify(user));

        alert(`Witaj ${user.imie}!`);
        window.location.href = "../Profil/Profil.html";
    });

    function showError(msg) {
        document.getElementById("error").textContent = msg;
    }

});
