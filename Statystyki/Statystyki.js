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
        location.reload(); 
    });

    // Pobieranie danych zalogowanego użytkownika
    const allData = JSON.parse(localStorage.getItem("measurements")) || [];
    const userData = allData.filter(m => m.userEmail === loggedUser.email);

    // Sortowanie danych po dacie (opcjonalne, ale dobre dla wykresu)
    // userData.sort((a, b) => new Date(a.data) - new Date(b.data));

    const labels = userData.map(m => m.data);
    const sysData = userData.map(m => Number(m.sys)); // Rzutowanie na liczbę
    const diaData = userData.map(m => Number(m.dia)); // Rzutowanie na liczbę
    // Zakładam, że pole pulsu w bazie nazywa się 'pulse'. Jeśli nie, zmień m.pulse na odpowiednią nazwę
    const pulseData = userData.map(m => m.pulse ? Number(m.pulse) : 0); 

    // --- OBLICZANIE ŚREDNICH (NOWE) ---
    function calculateAverage(arr) {
        if (arr.length === 0) return 0;
        const sum = arr.reduce((a, b) => a + b, 0);
        return Math.round(sum / arr.length);
    }

    const avgSys = calculateAverage(sysData);
    const avgDia = calculateAverage(diaData);
    // Filtrujemy puls, żeby nie liczyć zer, jeśli gdzieś brakowało pomiaru pulsu
    const avgPulse = calculateAverage(pulseData.filter(p => p > 0));

    // Wstawianie średnich do HTML
    document.getElementById('avg-sys').textContent = avgSys || "--";
    document.getElementById('avg-dia').textContent = avgDia || "--";
    document.getElementById('avg-pulse').textContent = avgPulse || "--";
    // ----------------------------------

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
            maintainAspectRatio: false, // Ważne dla elastycznego layoutu
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
                    position: 'left', // Przeniosłem na lewo, bardziej standardowo
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