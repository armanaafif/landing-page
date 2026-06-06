/**
 * ═══════════════════════════════════════════════════════════════════
 * UNIVERSITAS NGUDI WALUYO (UNW) - PMB WEBSITE
 * ═══════════════════════════════════════════════════════════════════
 * Tagline: UNW Berdikari (Berbudaya Sehat, Disiplin, Karakter Unggul, Mandiri)
 * Semboyan: Kampusnya Para Juara
 * ═══════════════════════════════════════════════════════════════════
 */

// ==================== 1. STICKY NAVBAR ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// ==================== 2. MOBILE MENU TOGGLE ====================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

const allNavLinks = document.querySelectorAll('.nav-menu a');
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ==================== 3. SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 4. FADE-IN ANIMATION ====================
const fadeElements = document.querySelectorAll('.fade-in-up');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});

// ==================== 5. FAQ ACCORDION (Jika ada di halaman) ====================
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
}

// ==================== 6. ACTIVE MENU INDICATOR ====================
function updateActiveMenu() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-menu a');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        
        if (href === 'index.html' && (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html'))) {
            item.classList.add('active');
        } else if (href === 'prodi.html' && currentPath.includes('prodi.html')) {
            item.classList.add('active');
        } else if (href === 'fasilitas.html' && currentPath.includes('fasilitas.html')) {
            item.classList.add('active');
        } else if (href === 'kontak.html' && currentPath.includes('kontak.html')) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('load', updateActiveMenu);
window.addEventListener('hashchange', updateActiveMenu);

// ==================== 7. BACK TO TOP BUTTON ====================
const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

createBackToTop();

// ==================== 8. FILTER PRODI (Hanya di halaman prodi.html) ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const prodiCards = document.querySelectorAll('.prodi-card');

if (filterButtons.length > 0 && prodiCards.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            prodiCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-fakultas') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== 9. CTA BUTTON ALERT ====================
const daftarButtons = document.querySelectorAll('.cta-section .btn-primary, .hero-buttons .btn-primary');
daftarButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#') {
            e.preventDefault();
            alert('✨ Terima kasih minat Anda! Silakan hubungi WhatsApp 6285799957642 untuk pendaftaran resmi. UNW Berdikari — Kampusnya Para Juara ✨');
        }
    });
});

console.log('✅ Website PMB UNW siap digunakan! | UNW Berdikari — Kampusnya Para Juara | WhatsApp: 6285799957642');