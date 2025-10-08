document.addEventListener('DOMContentLoaded', () => {

    // --- Fonctionnalité de Bascule de Thème ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme');

    const updateTheme = (theme) => {
        if (theme === 'dark-mode') {
            htmlElement.classList.add('dark-mode');
            htmlElement.classList.remove('light-mode');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
            htmlElement.classList.add('light-mode');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light-mode');
        }
    };

    // 1. Applique le thème au chargement (stocké ou système)
    if (currentTheme) {
        updateTheme(currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateTheme('dark-mode');
    } else {
        // Initialiser en light-mode si aucune préférence
        updateTheme('light-mode');
    }

    // 2. Gestion du clic sur le bouton
    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = htmlElement.classList.contains('dark-mode');
        
        if (isCurrentlyDark) {
            updateTheme('light-mode');
        } else {
            updateTheme('dark-mode');
        }
    });


    // --- Fonctionnalité de Défilement Fluide ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Fonctionnalité de Révélation au Défilement ---
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
