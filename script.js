// Fichier script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Défilement doux (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Révélation au défilement (Reveal on Scroll)
    const sectionsToObserve = document.querySelectorAll('section[data-scroll]');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Déclenche quand 20% de la section est visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la section est visible, ajouter la classe 'visible'
                entry.target.classList.add('visible');
                // Optionnel: arrêter d'observer une fois révélé
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
});
