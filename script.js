document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

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

    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        updateTheme(currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateTheme('dark-mode');
    } else {
        updateTheme('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = htmlElement.classList.contains('dark-mode');
        
        if (isCurrentlyDark) {
            updateTheme('light-mode');
        } else {
            updateTheme('dark-mode');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
