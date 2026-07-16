const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Referencia a las páginas
const pages = [
    document.querySelector("#p1"),
    document.querySelector("#p2"),
    document.querySelector("#p3")
];

let currentState = 1;
const numOfPapers = pages.length;
const maxState = numOfPapers + 1;

// Asignar eventos a los botones
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Asignar eventos táctiles/clic directamente a las páginas
pages.forEach((page, index) => {
    page.addEventListener("click", () => {
        // Si haces clic en la página activa, avanza o retrocede
        if (currentState === index + 1) {
            goNextPage();
        } else if (currentState === index + 2) {
            goPrevPage();
        }
    });
});

function openBook() {
    book.style.transform = "translateX(0%)";
}

function closeBook(isAtStart) {
    if (isAtStart) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(0%)";
    }
}

function goNextPage() {
    if (currentState < maxState) {
        const targetPage = pages[currentState - 1];
        targetPage.classList.add("flipped");
        targetPage.style.zIndex = currentState;
        
        // Quitar interactividad de la página anterior y dársela a la siguiente
        targetPage.classList.remove("active");
        if (currentState < numOfPapers) {
            pages[currentState].classList.add("active");
        }

        currentState++;
        updateButtons();
    }
}

function goPrevPage() {
    if (currentState > 1) {
        const targetPage = pages[currentState - 2];
        targetPage.classList.remove("flipped");
        
        // Ajustar z-index progresivamente al regresar
        setTimeout(() => {
            targetPage.style.zIndex = numOfPapers - (currentState - 2);
        }, 100);

        // Actualizar estados activos para clics
        if (currentState - 1 < numOfPapers) {
            pages[currentState - 1].classList.remove("active");
        }
        targetPage.classList.add("active");

        currentState--;
        updateButtons();
    }
}

function updateButtons() {
    // Controlar si los botones de abajo están activos o no
    prevBtn.disabled = currentState === 1;
    nextBtn.disabled = currentState === maxState;
}

// Inicializar la primera página como activa al cargar
pages[0].classList.add("active");