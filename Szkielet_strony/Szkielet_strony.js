// Pobranie przycisku
const contrastButton = document.getElementById('contrast-toggle');

// Sprawdzenie, czy użytkownik już miał włączony kontrast (localStorage)
if(localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast');
}

// Funkcja przełączania kontrastu
contrastButton.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');

    // Zapis w localStorage, żeby pamiętał ustawienie przy zmianie podstrony
    if(document.body.classList.contains('high-contrast')) {
        localStorage.setItem('highContrast', 'true');
    } else {
        localStorage.setItem('highContrast', 'false');
    }
});
