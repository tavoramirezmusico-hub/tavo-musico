// =====================================
// TAVO MÚSICO - SCRIPT MUSICAL
// MULTIINSTRUMENTISTA · ANIMACIONES
// =====================================

// =====================================
// NOTAS MUSICALES FLOTANTES
// =====================================
function crearNotas() {
    const contenedor = document.getElementById('notas');
    if (!contenedor) return;

    const simbolos = ['♪', '♫', '♬', '🎵', '🎶'];
    const colores = ['#d4a017', '#f0d060', '#ffffff', '#b8860b'];
    const cantidad = 30;

    for (let i = 0; i < cantidad; i++) {
        const nota = document.createElement('div');
        nota.className = 'nota';

        const size = Math.random() * 1.5 + 1;
        const x = Math.random() * 100;
        const duracion = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];
        const color = colores[Math.floor(Math.random() * colores.length)];

        nota.textContent = simbolo;
        nota.style.fontSize = size + 'rem';
        nota.style.left = x + '%';
        nota.style.color = color;
        nota.style.animationDuration = duracion + 's';
        nota.style.animationDelay = delay + 's';
        nota.style.textShadow = `0 0 ${size * 10}px ${color}40`;

        contenedor.appendChild(nota);
    }
}

// =====================================
// MENÚ HAMBURGUESA
// =====================================
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.innerHTML = menu.classList.contains('active')
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll('.menu a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            menu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// =====================================
// MENÚ ACTIVO POR SCROLL
// =====================================
const secciones = document.querySelectorAll('section[id]');
const enlacesMenu = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let actual = '';
    secciones.forEach(seccion => {
        const top = seccion.offsetTop - 150;
        if (window.scrollY >= top) {
            actual = seccion.getAttribute('id');
        }
    });

    enlacesMenu.forEach(enlace => {
        enlace.classList.remove('active');
        if (enlace.getAttribute('href') === '#' + actual) {
            enlace.classList.add('active');
        }
    });
});

// =====================================
// BOTÓN SUBIR CON EFECTO MUSICAL
// =====================================
const btnSubir = document.getElementById('subir');

if (btnSubir) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnSubir.classList.add('visible');
        } else {
            btnSubir.classList.remove('visible');
        }
    });

    btnSubir.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =====================================
// ANIMACIÓN DE CONTADORES
// =====================================
function animarContadores() {
    const contadores = document.querySelectorAll('.stat-musical .numero');

    contadores.forEach(contador => {
        const target = parseInt(contador.dataset.count);
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        const increment = target / steps;
        let animationStarted = false;

        contador.textContent = '0';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    animationStarted = true;
                    let counter = 0;
                    const intervalo = setInterval(() => {
                        counter += increment;
                        if (counter >= target) {
                            contador.textContent = target + '+';
                            clearInterval(intervalo);
                        } else {
                            const valorActual = Math.floor(counter);
                            contador.textContent = valorActual;
                        }
                    }, stepTime);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(contador);
    });
}

// =====================================
// ANIMACIONES AL HACER SCROLL
// =====================================
const elementosMusicales = document.querySelectorAll(
    '.instrumento-card, .servicio-card, .galeria-item, .sobre-texto, .contacto-info, .contacto-formulario'
);

const observerMusical = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.filter = 'blur(0)';
        }
    });
}, { threshold: 0.15 });

elementosMusicales.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.filter = 'blur(4px)';
    el.style.transition = `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`;
    observerMusical.observe(el);
});

// =====================================
// EFECTO DE APARICIÓN EN TARJETAS (hover)
// =====================================
document.querySelectorAll('.instrumento-card, .servicio-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// =====================================
// FORMULARIO DE CONTACTO - ENVÍO A WHATSAPP
// =====================================
const form = document.getElementById('contactForm');
const formMensaje = document.getElementById('formMensaje');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const servicio = document.getElementById('servicio');
        const tipoServicio = servicio.options[servicio.selectedIndex]?.text || 'No especificado';
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !email) {
            mostrarMensaje('⚠️ Por favor, completa los campos obligatorios (Nombre y Email).', 'error');
            return;
        }

        const numeroWhatsApp = '50612345678'; // Cambia por tu número

        let mensajeWhatsApp = `Hola Tavo Músico,%0A%0A`;
        mensajeWhatsApp += `Mi nombre es ${nombre}.%0A`;
        mensajeWhatsApp += `Mi correo electrónico es ${email}.%0A`;

        if (telefono) {
            mensajeWhatsApp += `Mi teléfono es ${telefono}.%0A`;
        }

        mensajeWhatsApp += `%0AEstoy interesado en: ${tipoServicio}.%0A%0A`;

        if (mensaje) {
            mensajeWhatsApp += `Detalles del evento o proyecto:%0A${mensaje}`;
        } else {
            mensajeWhatsApp += `Me gustaría obtener más información sobre tus servicios musicales.`;
        }

        const btn = form.querySelector('.btn-magico');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Abriendo WhatsApp...';
        btn.disabled = true;

        setTimeout(() => {
            const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
            window.open(url, '_blank');

            btn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Enviar Mensaje <span class="chispa"></span>';
            btn.disabled = false;

            mostrarMensaje('✅ ¡Redirigiendo a WhatsApp! Completa el mensaje y envíalo. 🎵', 'success');
        }, 1000);
    });
}

function mostrarMensaje(texto, tipo) {
    formMensaje.textContent = texto;
    formMensaje.className = 'form-mensaje ' + tipo;
    formMensaje.style.display = 'block';

    setTimeout(() => {
        formMensaje.style.display = 'none';
    }, 5000);
}

// =====================================
// EFECTO DE BRILLO MUSICAL EN EL TÍTULO
// =====================================
function efectoBrilloTitulo() {
    const titulo = document.querySelector('.titulo-musical');
    if (!titulo) return;

    setInterval(() => {
        titulo.style.textShadow = '0 0 60px rgba(212, 160, 23, 0.5)';
        setTimeout(() => {
            titulo.style.textShadow = '0 0 20px rgba(212, 160, 23, 0.2)';
        }, 300);
    }, 3000);
}

// =====================================
// EFECTO DE REVELADO EN GALERÍA FLIP
// =====================================
document.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', function () {
        this.style.transition = 'transform 0.1s';
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// =====================================
// EFECTO DE "CHISPA" EN LOS BOTONES
// =====================================
document.querySelectorAll('.btn-magico').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const chispa = document.createElement('span');
        chispa.style.position = 'absolute';
        chispa.style.left = e.clientX - this.getBoundingClientRect().left + 'px';
        chispa.style.top = e.clientY - this.getBoundingClientRect().top + 'px';
        chispa.style.width = '20px';
        chispa.style.height = '20px';
        chispa.style.background = 'rgba(255,255,255,0.6)';
        chispa.style.borderRadius = '50%';
        chispa.style.pointerEvents = 'none';
        chispa.style.transform = 'scale(0)';
        chispa.style.transition = 'all 0.5s ease';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(chispa);

        setTimeout(() => {
            chispa.style.transform = 'scale(4)';
            chispa.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            chispa.remove();
        }, 600);
    });
});

// =====================================
// EFECTO DE PARALLAX EN EL HERO
// =====================================
document.addEventListener('mousemove', function (e) {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    const overlay = hero.querySelector('.hero-overlay');
    if (overlay) {
        overlay.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
});

// =====================================
// INICIALIZAR TODAS LAS MAGIAS MUSICALES
// =====================================
document.addEventListener('DOMContentLoaded', function () {
    crearNotas();
    animarContadores();
    efectoBrilloTitulo();

    console.log('🎵🎶 Música cargada correctamente - Tavo Músico');
});

// =====================================
// EFECTO DE TRANSICIÓN ENTRE SECCIONES
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================
// EFECTO DE APARICIÓN AL RECARGAR
// =====================================
window.addEventListener('load', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.inset = '0';
        flash.style.background = 'rgba(212, 160, 23, 0.08)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '99999';
        flash.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                flash.remove();
            }, 500);
        }, 300);
    }
});

console.log('🎵 ¡La música está en el aire! 🎵');