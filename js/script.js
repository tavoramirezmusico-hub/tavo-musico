// ===== MENÚ MÓVIL =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Cambiar estilo del header
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Ocultar/mostrar header en móvil
    if (window.innerWidth < 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
});

// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARTÍCULAS EN HERO =====
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        if (!this.container) return;
        
        this.particles = [];
        this.init();
        this.animate();
        
        // Recrear partículas en resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.container.innerHTML = '';
                this.particles = [];
                this.init();
            }, 500);
        });
    }
    
    init() {
        const count = window.innerWidth < 768 ? 30 : 60;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: #c89b3c;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: ${opacity};
                pointer-events: none;
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: x,
                y: y,
                speed: Math.random() * 0.5 + 0.2,
                direction: Math.random() * 360
            });
        }
    }
    
    animate() {
        // Animación suave adicional con JS (movimiento orgánico)
        this.particles.forEach(p => {
            p.x += Math.sin(Date.now() / 3000 + p.direction) * 0.01;
            p.y += Math.cos(Date.now() / 4000 + p.direction) * 0.01;
            
            // Mantener dentro de la pantalla
            if (p.x > 100) p.x = 0;
            if (p.x < 0) p.x = 100;
            if (p.y > 100) p.y = 0;
            if (p.y < 0) p.y = 100;
            
            p.element.style.left = p.x + '%';
            p.element.style.top = p.y + '%';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Animación para tarjetas de shows
const showCards = document.querySelectorAll('.show-card');
const showObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, observerOptions);

showCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    showObserver.observe(card);
});

// Animación para bio image
const bioImage = document.querySelector('.image-placeholder');
if (bioImage) {
    const bioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.2 });
    
    bioImage.style.opacity = '0';
    bioImage.style.transform = 'scale(0.95)';
    bioImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    bioObserver.observe(bioImage);
}

// Animación para música links
const musicaLinks = document.querySelectorAll('.platform');
const linksObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, observerOptions);

musicaLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateX(-20px)';
    link.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    linksObserver.observe(link);
});

// ===== EFECTO DE TEXTO DINÁMICO EN SUBTÍTULO =====
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const textos = [
        'Multiinstrumentista · De todo un poco, con el alma en cada nota',
        'Rock · Ska · Cumbia · Balada · Reggae · Charanga',
        '🎸 Conectando con el alma del público'
    ];
    let index = 0;
    
    setInterval(() => {
        index = (index + 1) % textos.length;
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            subtitle.textContent = textos[index];
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 300);
    }, 5000);
}

// ===== SMOOTH APPEAR PARA LAS SECCIONES =====
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// ===== VALIDACIÓN DEL FORMULARIO =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');
        let isValid = true;
        
        // Resetear estilos de error
        [nombre, email, mensaje].forEach(field => {
            field.style.borderColor = 'rgba(200, 155, 60, 0.1)';
        });
        
        // Validar nombre
        if (nombre.value.trim().length < 2) {
            nombre.style.borderColor = '#dc2743';
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = '#dc2743';
            isValid = false;
        }
        
        // Validar mensaje
        if (mensaje.value.trim().length < 5) {
            mensaje.style.borderColor = '#dc2743';
            isValid = false;
        }
        
        if (isValid) {
            // Simular envío
            const btn = this.querySelector('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
                btn.style.background = '#1db954';
                btn.style.borderColor = '#1db954';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        }
    });
}

// ===== EFECTO DE GLITCH EN EL TÍTULO (SUAVE) =====
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    setInterval(() => {
        heroTitle.style.textShadow = '0 0 60px rgba(200, 155, 60, 0.3), 2px 0 0 rgba(200, 155, 60, 0.1), -2px 0 0 rgba(200, 155, 60, 0.1)';
        setTimeout(() => {
            heroTitle.style.textShadow = '0 0 60px rgba(200, 155, 60, 0.15)';
        }, 100);
    }, 6000);
}

// ===== CONTADOR DE SCROLL PARA HERO =====
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    window.addEventListener('scroll', () => {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const scrolled = window.pageYOffset;
        
        if (scrolled > heroHeight * 0.8) {
            heroScroll.style.opacity = '0';
        } else {
            heroScroll.style.opacity = '1';
        }
    });
}

// ===== DETECTAR TEMA OSCURO =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('🎸 Modo oscuro activado');
}

// ===== EASTER EGG EN CONSOLA =====
console.log('%c🎸 TAVO MÚSICO', 'font-size: 28px; font-weight: bold; color: #c89b3c;');
console.log('%cMultiinstrumentista · De todo un poco, con el alma en cada nota', 'font-size: 16px; color: #b0b0b0;');
console.log('%c📸 @tavo_musico | 🌐 tavomusico.com', 'font-size: 14px; color: #c89b3c;');
console.log('%c🎵 Rock · Ska · Cumbia · Balada · Reggae · Charanga', 'font-size: 13px; color: #8a8a8a;');

// ===== INICIALIZAR PARTÍCULAS =====
// Esperar a que cargue todo
setTimeout(() => {
    new ParticleSystem();
}, 100);

// ===== AGREGAR ESTILOS DE ANIMACIÓN PARA PARTÍCULAS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        25% {
            transform: translate(15px, -25px) scale(1.2);
        }
        50% {
            transform: translate(-10px, -40px) scale(0.8);
        }
        75% {
            transform: translate(20px, -15px) scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// ===== PREVENIR COMPORTAMIENTO POR DEFECTO EN ENLACES VACÍOS =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
});

console.log('🎸 TAVO MÚSICO · Web cargada exitosamente');