// Members data - 25 people
const members = [
    { id: 1, name: 'Angelika', desc: 'The Scenography', photo: 'angelika.JPG', badge: 'TKJ' },
    { id: 2, name: 'Bryan Max Clarence', desc: 'Yearbook Committee', photo: 'bryan.JPG', badge: 'TKJ' },
    { id: 3, name: 'Calvin Ricard', desc: 'General Affair', photo: 'calvin.JPG', badge: 'TKJ' },
    { id: 4, name: 'Chandra Wijaya', desc: 'Assistant Project Manager & Developer', photo: 'chandra.JPG', badge: 'TKJ' },
    { id: 5, name: 'Chelsea suci tayomi', desc: 'Yearbook Committee', photo: 'tayomi.JPG', badge: 'Akuntansi' },
    { id: 6, name: 'Dicky Xaviera', desc: 'General Affair', photo: 'dicky.JPG', badge: 'TKJ' },
    { id: 7, name: 'Febriyani', desc: 'General Affair', photo: 'febriani.JPG', badge: 'Akutansi' },
    { id: 8, name: 'Frederick Prajna.S', desc: 'General Affair', photo: 'frederick.JPG', badge: 'TKJ' },
    { id: 9, name: 'Jessica Cornelia', desc: 'The Scenography', photo: 'jessica.JPG', badge: 'TKJ' },
    { id: 10, name: 'Kisardi', desc: 'Creative Editor', photo: 'kisardi.JPG', badge: 'TKJ' },
    { id: 11, name: 'Lorenzo', desc: 'The Scenography', photo: 'lorenzo.JPG', badge: 'TKJ' },
    { id: 12, name: 'Lucky wijaya', desc: 'General Affair', photo: 'lucky.JPG', badge: 'Akuntansi' },
    { id: 13, name: 'Maverick', desc: 'General Affair', photo: 'maverick.JPG', badge: 'TKJ' },
    { id: 14, name: 'Melani Putri.F', desc: 'Secretary', photo: 'melani.JPG', badge: 'Akuntansi' },
    { id: 15, name: 'Nicholas Liem', desc: 'Creative Editor', photo: 'nicholas.JPG', badge: 'TKJ' },
    { id: 16, name: 'Firming Owen', desc: 'Developer', photo: 'owen.JPG', badge: 'TKJ' },
    { id: 17, name: 'Risky Kensen', desc: 'General Affair', photo: 'risky.JPG', badge: 'TKJ' },
    { id: 18, name: 'Selly Susanti', desc: 'Finance Officer & earbook Committee', photo: 'selly.JPG', badge: 'Akuntansi' },
    { id: 19, name: 'Susanto', desc: 'Developer', photo: 'susanto.JPG', badge: 'TKJ' },
    { id: 20, name: 'Valentina', desc: 'Legacy Committee', photo: 'valentina.jpg', badge: 'Akuntansi' },
    { id: 21, name: 'Vannessa angelin', desc: 'The Scenography & Yearbook Committee', photo: 'vanessa.jpg', badge: 'Akuntansi' },
    { id: 22, name: 'Veronica Vernanda.C', desc: 'The Scenography', photo: 'veronica.jpg', badge: 'TKJ' },
    { id: 23, name: 'Vino Tandra', desc: 'The Scenography', photo: 'vino.jpg', badge: 'TKJ' },
    { id: 24, name: 'Weliem Lho', desc: 'Project Manager', photo: 'weliem.jpg', badge: 'TKJ' },
    { id: 25, name: 'Wilson', desc: 'Program Director', photo: 'wilson.jpg', badge: 'TKJ' }
];

// Music variables
const bgMusic = document.getElementById('bgMusic');
const musicPlayer = document.getElementById('musicPlayer');
const musicIcon = document.getElementById('musicIcon');
const musicStatus = document.getElementById('musicStatus');
let isPlaying = localStorage.getItem('musicPlaying') === 'true';

// Music controls
function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.className = 'fas fa-play';
        musicStatus.textContent = 'Paused';
        musicPlayer.classList.remove('playing');
        localStorage.setItem('musicPlaying', 'false');
    } else {
        bgMusic.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
        musicIcon.className = 'fas fa-pause';
        musicStatus.textContent = 'Playing';
        musicPlayer.classList.add('playing');
        localStorage.setItem('musicPlaying', 'true');
    }
    isPlaying = !isPlaying;
}

// Auto play music when page loads
function autoPlayMusic() {
    bgMusic.volume = 0.5;

    // Try to autoplay regardless of localStorage state
    bgMusic.play().then(() => {
        musicIcon.className = 'fas fa-pause';
        musicStatus.textContent = 'Playing';
        musicPlayer.classList.add('playing');
        isPlaying = true;
        localStorage.setItem('musicPlaying', 'true');
    }).catch(err => {
        console.log('Autoplay prevented:', err);
        // If autoplay failed, check localStorage
        if (isPlaying) {
            musicIcon.className = 'fas fa-pause';
            musicStatus.textContent = 'Playing';
            musicPlayer.classList.add('playing');
        } else {
            musicIcon.className = 'fas fa-play';
            musicStatus.textContent = 'Paused';
        }
    });
}

// Music player toggle
musicPlayer.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
});

// Render Members
function renderMembers() {
    const grid = document.getElementById('membersGrid');
    if (!grid) return;

    grid.innerHTML = '';

    members.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.transitionDelay = `${index * 0.03}s`;

        card.innerHTML = `
            <div class="member-frame">
                <div class="member-badge">${member.badge}</div>
                <div class="member-inner">
                    <img src="${member.photo}" alt="${member.name}" class="member-photo" loading="lazy" decoding="async" width="300" height="300">
                    <div class="member-info">
                        <h3 class="member-name">${member.name}</h3>
                        <p class="member-desc">${member.desc}</p>
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Trigger member card animations
function triggerMemberAnimations() {
    document.querySelectorAll('.member-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 80);
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const toggleBtn = document.getElementById('modeToggle');
    const modeIcon = document.getElementById('modeIcon');

    if (!toggleBtn || !modeIcon) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.documentElement.setAttribute('data-theme', 'light');
        modeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.add('dark-mode');
        document.documentElement.removeAttribute('data-theme');
        modeIcon.className = 'fas fa-moon';
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';

        if (isLight) {
            document.body.classList.add('dark-mode');
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            modeIcon.className = 'fas fa-moon';
        } else {
            document.body.classList.remove('dark-mode');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            modeIcon.className = 'fas fa-sun';
        }
    });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('toggle');
        navMenu.classList.toggle('nav-active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('toggle');
            navMenu.classList.remove('nav-active');
        });
    });
}

// Scroll Effects (navbar shadow, etc.)
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Smooth Scrolling for Nav Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            if (navToggle && navMenu) {
                navToggle.classList.remove('toggle');
                navMenu.classList.remove('nav-active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Fade Animation using Intersection Observer
function initializeScrollFadeAnimation() {
    // Initial trigger after page load
    setTimeout(() => {
        triggerMemberAnimations();
    }, 300);

    // Observe sections for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'members') {
                    triggerMemberAnimations();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Trigger gallery animation when gallery section is visible
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        galleryObserver.observe(gallerySection);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
    autoPlayMusic();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeSmoothScrolling();
    initializeScrollFadeAnimation();

    // Trigger initial animations
    setTimeout(() => {
        triggerMemberAnimations();
    }, 300);
});
