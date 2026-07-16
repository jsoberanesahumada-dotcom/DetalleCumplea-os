const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const audio = document.getElementById("birthday-song");

// Referencia a las páginas
const pages = [
    document.querySelector("#p1"),
    document.querySelector("#p2"),
    document.querySelector("#p3")
];

let currentState = 1;
const numOfPapers = pages.length;
const maxState = numOfPapers + 1;

// Asignar eventos a los botones de abajo
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Asignar eventos clic directamente a las páginas
pages.forEach((page, index) => {
    page.addEventListener("click", (e) => {
        // Evitamos pasar la página si el usuario está haciendo clic 
        // directamente dentro del reproductor de audio
        if (e.target.closest('.audio-container') || e.target.tagName === 'AUDIO') {
            return; 
        }

        if (currentState === index + 1) {
            goNextPage();
        } else if (currentState === index + 2) {
            goPrevPage();
        }
    });
});

function goNextPage() {
    if (currentState < maxState) {
        const targetPage = pages[currentState - 1];
        targetPage.classList.add("flipped");
        
        // Al girar una página, la enviamos atrás en z-index
        targetPage.style.zIndex = currentState;
        
        targetPage.classList.remove("active");
        if (currentState < numOfPapers) {
            pages[currentState].classList.add("active");
        }

        // --- CONTROL DE CAPAS AL LLEGAR AL FINAL ---
        // Si acabamos de pasar la página 2 (es decir, entramos al estado 3, viendo la p3)
        // le damos a la página 3 el z-index más alto de todos para que los controles sean clickeables.
        if (currentState === 2) {
            setTimeout(() => {
                pages[2].style.zIndex = "100";
            }, 500); // Esperamos a que termine la animación de giro
        }

        // --- REPRODUCCIÓN AUTOMÁTICA ---
        if (audio && audio.paused) {
            audio.play().catch(error => {
                console.log("Interacción requerida para reproducir audio.");
            });
        }

        currentState++;
        updateButtons();
    }
}

function goPrevPage() {
    if (currentState > 1) {
        const targetPage = pages[currentState - 2];
        targetPage.classList.remove("flipped");
        
        // Si regresamos desde la última página, le devolvemos su z-index normal a la página 3
        if (currentState === 3) {
            pages[2].style.zIndex = "1";
        }

        // Devolvemos el orden de apilamiento correcto al retroceder
        const originalZIndex = numOfPapers - (currentState - 2) + 1;
        setTimeout(() => {
            targetPage.style.zIndex = originalZIndex;
        }, 150);

        if (currentState - 1 < numOfPapers) {
            pages[currentState - 1].classList.remove("active");
        }
        targetPage.classList.add("active");

        currentState--;
        updateButtons();
    }
}

function updateButtons() {
    prevBtn.disabled = currentState === 1;
    nextBtn.disabled = currentState === maxState;
}

// Inicializar la primera página como activa al cargar
pages[0].classList.add("active");
