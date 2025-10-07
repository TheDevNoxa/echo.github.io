// Fichier script.js

document.addEventListener('DOMContentLoaded', () => {

    // Gestion du défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Révélation des sections au défilement
    const sectionsToObserve = document.querySelectorAll('[data-scroll]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    });

    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
});
