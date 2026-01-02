document.addEventListener("DOMContentLoaded", () => {

    // ===== HIGH CONTRAST =====
    const contrastButton = document.getElementById('contrast-toggle');

    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    contrastButton.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');

        if (document.body.classList.contains('high-contrast')) {
            localStorage.setItem('highContrast', 'true');
        } else {
            localStorage.setItem('highContrast', 'false');
        }
    });

    // ===== LOGOWANIE / UŻYTKOWNIK =====
    const loginButton = document.getElementById("loginButton");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loginButton && loggedUser) {
        loginButton.textContent = `${loggedUser.imie} ${loggedUser.nazwisko}`;
        loginButton.href = "../Profil/Profil.html";
    }

});
