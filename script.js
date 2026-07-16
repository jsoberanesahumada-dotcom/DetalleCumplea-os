const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const audio = document.getElementById("birthday-song");

// Mapeamos las 3 páginas físicas reales
const pages = [
    document.querySelector("#p1"),
    document.querySelector("#p2"),
    document.querySelector("#p3"),
    document.querySelector("#p4"),
    document.querySelector("#p5")
];

let currentState = 1; 
const totalPages = pages.length;

function updateBook() {
    pages.forEach((page, index) => {
        const pageNumber = index + 1;

        if (pageNumber === currentState) {
            // Activa únicamente la hoja correspondiente
            page.classList.add("active");
            page.classList.remove("flipped");
        } else if (pageNumber < currentState) {
            // Oculta y voltea las que ya pasaron
            page.classList.remove("active");
            page.classList.add("flipped");
        } else {
            // Deja preparadas las que no se han abierto
            page.classList.remove("active");
            page.classList.remove("flipped");
        }
    });

    // Validar el estado de los botones
    prevBtn.disabled = currentState === 1;
    nextBtn.disabled = currentState === totalPages;
}

function goNextPage() {
    if (currentState < totalPages) {
        currentState++;
        updateBook();

        // Al presionar "Siguiente" la primera vez, se inicia la música
        if (audio && audio.paused) {
            audio.play().catch(err => {
                console.log("El navegador bloqueó la reproducción automática. Se activará manualmente al final.");
            });
        }
    }
}

function goPrevPage() {
    if (currentState > 1) {
        currentState--;
        updateBook();
    }
}

// Escuchas para los botones de atrás y adelante
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Iniciar cargando la portada
updateBook();
