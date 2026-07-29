// ============================================================
// 1. MENÚ HAMBURGUESA
// ============================================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

// Crear overlay para móvil
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('open')) toggleMenu();
    });
});

// ============================================================
// 2. HEADER SCROLL (cambia fondo al hacer scroll)
// ============================================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================================
// 3. EFECTO DE ESCRITURA (typing effect)
// ============================================================
const typingText = document.querySelector('.typing-text');
const words = ['Cantante · Bajista · Guitarrista', 'Multiinstrumentista', 'Amante de la Tecnología', 'Músico Costarricense'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Iniciar typing effect al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 500);
});

// ============================================================
// 4. INTERSECTION OBSERVER (animaciones al hacer scroll)
// ============================================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animación de fotos
            const items = entry.target.querySelectorAll('.foto-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 80);
            });
        }
    });
}, observerOptions);

// Observar secciones
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ============================================================
// 5. GALERÍA DE FOTOS (grid + lightbox)
// ============================================================
const gridFotos = document.getElementById('gridFotos');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
let fotosArray = [];

// Generar las 9 fotos
for (let i = 1; i <= 9; i++) {
    fotosArray.push(`img/${i}.webp`);
}

function renderGaleria() {
    gridFotos.innerHTML = '';
    fotosArray.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'foto-item';
        div.setAttribute('data-index', index);
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Tavo Músico - Foto ${index + 1}`;
        img.loading = 'lazy';
        div.appendChild(img);
        div.addEventListener('click', () => openLightbox(index));
        gridFotos.appendChild(div);
    });
}

// ============================================================
// 6. LIGHTBOX
// ============================================================
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = fotosArray[index];
    lightboxImg.alt = `Tavo Músico - Foto ${index + 1}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function prevImage() {
    currentIndex = (currentIndex - 1 + fotosArray.length) % fotosArray.length;
    lightboxImg.src = fotosArray[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % fotosArray.length;
    lightboxImg.src = fotosArray[currentIndex];
}

// Eventos Lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
    if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
        prevImage();
    }
    if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
        nextImage();
    }
});

// Cerrar clickeando fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ============================================================
// 7. INICIALIZAR
// ============================================================
renderGaleria();