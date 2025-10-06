const darkLightSwitch = document.getElementById('dark-light-switch');

const starCount = 15;

document.addEventListener('click', e=> e.target === darkLightSwitch && console.log('Switched Mode!'));

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';

    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    const colors = [
        "rgba(255, 255, 255, 0.9",
        "rgba(200, 200, 255, 0.8",
        "rgba(255, 220, 220, 0.8",
        "rgba(255, 255, 200, 0.8"
    ];

    star.style.background = colors[Math.floor(Math.random() * colors.length)];

    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${1.5 + Math.random() * 2}s`;

    if (Math.random() > 0.5) {
        const lifespan = 10000 + Math.random() * 10000;
        setTimeout(() => {
            star.remove();
            createStar();
        }, lifespan);
    }

    document.body.appendChild(star);
}

for (let i = 0; i < starCount; i++) {
    createStar();
}

document.addEventListener('DOMContentLoaded', function() {
    const headerTitle = document.querySelector('.header-title');
    const navContainer = document.querySelector('.nav-container');
    const mainElement = document.querySelector('main');
    let isMobileMenuOpen = false;
    
    function isMobileScreen() {
        return window.innerWidth <= 767.98;
    }
    
    function toggleMobileMenu() {
        if (!isMobileScreen()) return;
        
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            navContainer.classList.add('mobile-visible');
            mainElement.classList.add('nav-open');
            headerTitle.setAttribute('aria-expanded', 'true');
        } else {
            navContainer.classList.remove('mobile-visible');
            mainElement.classList.remove('nav-open');
            headerTitle.setAttribute('aria-expanded', 'false');
        }
    }
    
    function closeMobileMenu() {
        if (isMobileMenuOpen) {
            isMobileMenuOpen = false;
            navContainer.classList.remove('mobile-visible');
            mainElement.classList.remove('nav-open');
            headerTitle.setAttribute('aria-expanded', 'false');
        }
    }
    
    headerTitle.addEventListener('click', function(e) {
        if (isMobileScreen()) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
    
    const navItems = document.querySelectorAll('.nav-item, .nav-first-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (isMobileScreen()) {
                closeMobileMenu();
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (isMobileScreen() && isMobileMenuOpen) {
            if (!headerTitle.contains(e.target) && !navContainer.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    window.addEventListener('resize', function() {
        if (!isMobileScreen() && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    if (isMobileScreen()) {
        headerTitle.setAttribute('aria-expanded', 'false');
        headerTitle.setAttribute('role', 'button');
        headerTitle.setAttribute('tabindex', '0');
    }
    
    headerTitle.addEventListener('keydown', function(e) {
        if (isMobileScreen() && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
});