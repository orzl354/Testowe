document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
        window.location.href = "../Logowanie/Logowanie.html";
        return;
    }

    // Obsługa kontrastu
    if (localStorage.getItem("highContrast") === "true") document.body.classList.add("high-contrast");
    document.getElementById("contrast-toggle").addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
        localStorage.setItem("highContrast", document.body.classList.contains("high-contrast"));
        location.reload(); // Odświeżamy, by wykres dopasował kolory
    });

    // Pobieranie danych zalogowanego użytkownika
    const allData = JSON.parse(localStorage.getItem("measurements")) || [];
    const userData = allData.filter(m => m.userEmail === loggedUser.email);

    const labels = userData.map(m => m.data);
    const sysData = userData.map(m => m.sys);
    const diaData = userData.map(m => m.dia);

    // Kolory zależne od trybu
    const isHC = document.body.classList.contains("high-contrast");
    const colorSYS = isHC ? "#00ff00" : "#ff4d4d";
    const colorDIA = isHC ? "#00ffff" : "#4d79ff";
    const textColor = isHC ? "#00ff00" : "#000000";
    const gridColor = isHC ? "#fff" : "#cccccc";

    // Inicjalizacja wykresu
    const ctx = document.getElementById('pressureChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Skurczowe (SYS)',
                    data: sysData,
                    borderColor: colorSYS,
                    backgroundColor: colorSYS,
                    pointStyle: 'circle',
                    pointRadius: 6,
                },
                {
                    label: 'Rozkurczowe (DIA)',
                    data: diaData,
                    borderColor: colorDIA,
                    backgroundColor: colorDIA,
                    pointStyle: 'circle',
                    pointRadius: 6,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { 
                    display: true,
                    title: {
                        display: true,
                        text: 'Data pomiaru',
                        color: textColor
                    },
                    ticks: { color: textColor },
                    grid: {
                        color: gridColor
                    }
                },
                y: { 
                    position: 'right',
                    display: true,
                    title: {
                        display: true,
                        text: 'mmHg',
                        color: textColor
                    },
                    ticks: { color: textColor },
                    grid: {
                        color: gridColor
                    }
                }
            },
            plugins: {
                legend: {
                    labels: { color: textColor }
                }
            }
        }
    });
});