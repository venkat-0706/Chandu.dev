const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');
const themeLabel = themeToggle?.querySelector('.theme-label');
const profileContainer = document.querySelector('.profile-container');
const heroImageSection = document.querySelector('.hero-image-section');

const applyTheme = (isDark) => {
    body.classList.toggle('theme-dark', isDark);
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');

    if (themeIcon) {
        themeIcon.classList.toggle('fa-sun', !isDark);
        themeIcon.classList.toggle('fa-moon', isDark);
    }

    if (themeLabel) {
        themeLabel.textContent = isDark ? 'Light' : 'Dark';
    }
};

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : false);

themeToggle?.addEventListener('click', () => {
    applyTheme(!body.classList.contains('theme-dark'));
});

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const updateActiveNav = () => {
    let current = 'home';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach((navItem) => {
        const linkHref = navItem.getAttribute('href');
        const isActive = linkHref === `#${current}`;
        navItem.classList.toggle('active', isActive);
    });
};

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
    updateActiveNav();
});

heroImageSection?.addEventListener('pointermove', (event) => {
    const rect = heroImageSection.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (profileContainer) {
        profileContainer.style.transform = `perspective(1000px) rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg) translateY(-8px) translateX(${(x * 10).toFixed(2)}px)`;
    }

    document.querySelectorAll('.tech-float').forEach((floatCard, index) => {
        const strength = 8 + index * 2;
        floatCard.style.transform = `translate(${(x * strength).toFixed(2)}px, ${(y * strength * -1).toFixed(2)}px)`;
    });
});

heroImageSection?.addEventListener('pointerleave', () => {
    if (profileContainer) {
        profileContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(0px)';
    }

    document.querySelectorAll('.tech-float').forEach((floatCard) => {
        floatCard.style.transform = '';
    });
});

const statValues = document.querySelectorAll('.stat-value');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            el.textContent = target >= 1000 ? `${current.toLocaleString()}+` : `${current}${target === 2026 ? '' : '+'}`;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target === 2026 ? '2026' : `${target.toLocaleString()}+`;
            }
        };

        requestAnimationFrame(tick);
        statObserver.unobserve(el);
    });
}, { threshold: 0.35 });

statValues.forEach((stat) => statObserver.observe(stat));

window.addEventListener('load', () => {
    updateActiveNav();
    document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 30);
});
