/* =========================================================
   Solo Leveling — Guía de Estilos UI/UX
   Interacciones
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. Nav activo según scroll (IntersectionObserver) ---------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(sec => spy.observe(sec));

    /* ---------- 2. Reveal al hacer scroll ---------- */
    const reveal = document.querySelectorAll(
        '.card, .episode, .map, .hero-content, .hero-figure, .section-head'
    );

    reveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity .7s ease, transform .7s ease';
    });

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveal.forEach(el => revealObs.observe(el));

    /* ---------- 3. Parallax sutil en la imagen del hero ---------- */
    const heroImg = document.querySelector('.hero-figure img');
    if (heroImg) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            heroImg.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    /* ---------- 4. Suavizar clicks internos (si no soporta scroll-behavior) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

});