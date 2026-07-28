// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('nav a, .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Cambiar opacidad del header al hacer scroll
    if (currentScroll > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.borderBottom = '1px solid #d4a547';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.92)';
        header.style.borderBottom = '1px solid #2a2a2a';
    }
    
    // Ocultar/mostrar header en móvil (opcional)
    if (window.innerWidth < 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
});

// ===== EFECTO DE PARALLAX SUAVE EN HERO =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
    }
});

// ===== ANIMACIÓN DE TARJETAS AL HACER SCROLL =====
const cards = document.querySelectorAll('.card');
const bioImg = document.querySelector('.placeholder-img');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Aplicar a tarjetas
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Aplicar a bio-img
if (bioImg) {
    bioImg.style.opacity = '0';
    bioImg.style.transform = 'scale(0.95)';
    bioImg.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    const bioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.2 });
    
    bioObserver.observe(bioImg);
}

// ===== EFECTO DE TEXTO DINÁMICO EN HERO (OPCIONAL) =====
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const textos = ['Multiinstrumentista', 'Rock & Alma', 'En vivo', '@tavo_musico'];
    let index = 0;
    
    setInterval(() => {
        index = (index + 1) % textos.length;
        subtitle.style.opacity = '0';
        setTimeout(() => {
            subtitle.textContent = textos[index];
            subtitle.style.opacity = '1';
        }, 300);
    }, 4000);
}

// ===== EFECTO DE GLITCH EN EL TÍTULO (OPCIONAL) =====
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    setInterval(() => {
        heroTitle.style.textShadow = '0 0 40px rgba(212, 165, 71, 0.3), 2px 0 0 rgba(212, 165, 71, 0.1), -2px 0 0 rgba(212, 165, 71, 0.1)';
        setTimeout(() => {
            heroTitle.style.textShadow = '0 0 40px rgba(212, 165, 71, 0.15)';
        }, 100);
    }, 5000);
}

// ===== PREVENIR CLICK EN ENLACES VACÍOS =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
});

// ===== CONSOLA CON MENSAJE OCULTO (EASTER EGG) =====
console.log('%c🎸 TAVO MÚSICO', 'font-size: 24px; font-weight: bold; color: #d4a547;');
console.log('%cMultiinstrumentista · Rock & Alma', 'font-size: 14px; color: #bfb8ae;');
console.log('%c📸 @tavo_musico', 'font-size: 14px; color: #f0c96a;');
console.log('%c🌐 tavomusico.com · 2026', 'font-size: 12px; color: #6a645c;');

// ===== DETECCIÓN DE TEMA OSCURO (por si el navegador lo soporta) =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('🎸 Modo oscuro activado');
}

// ===== FUNCIÓN PARA COPIAR EMAIL (opcional, si lo usas) =====
// function copiarEmail() {
//     const email = 'tavomusico@proton.me';
//     navigator.clipboard.writeText(email).then(() => {
//         alert('📧 Email copiado: ' + email);
//     });
// }