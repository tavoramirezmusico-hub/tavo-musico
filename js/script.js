// ===== MENÚ MÓVIL =====
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (menuToggle) menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
});

// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORMULARIO =====
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
        btn.style.background = '#1db954';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
            this.reset();
        }, 3000);
    }, 2000);
});

// ===== EASTER EGG =====
console.log('%c🎸 TAVO MÚSICO · Visual First', 'font-size:24px;font-weight:bold;color:#dc2626;');
console.log('%c📸 Todas las fotos son protagonistas', 'font-size:14px;color:#b0b0b0;');