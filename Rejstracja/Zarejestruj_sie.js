<script>
document.getElementById("rejestracjaForm").addEventListener("submit", function(e) {
    e.preventDefault(); // blokuje wysłanie formularza

    const email = document.getElementById("email").value;
    const haslo = document.getElementById("haslo").value;
    const wiek = parseInt(document.getElementById("wiek").value);

    // WALIDACJA EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Niepoprawny adres e-mail.");
        return;
    }

    // WALIDACJA HASŁA
    const minLength = haslo.length >= 8;
    const hasUppercase = /[A-Z]/.test(haslo);
    const specialChars = haslo.match(/[^a-zA-Z0-9]/g);
    const hasTwoSpecial = specialChars && specialChars.length >= 2;

    if (!minLength || !hasUppercase || !hasTwoSpecial) {
        alert("Hasło musi mieć min. 8 znaków, 1 wielką literę i 2 znaki specjalne.");
        return;
    }

    // WALIDACJA WIEKU
    if (wiek < 18) {
        alert("Musisz mieć co najmniej 18 lat.");
        return;
    }

    alert("Rejestracja poprawna!");
    // tutaj można wysłać formularz dalej, np. this.submit();
});
</script>

