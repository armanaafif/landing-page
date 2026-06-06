/**
 * =================================================================
 * UNIVERSITAS NGUDI WALUYO (UNW) - PMB WEBSITE
 * =================================================================
 * File: script.js
 * Tujuan: Interaktivitas website (animasi, mobile menu, FAQ, dll)
 * Fitur:
 * 1. Sticky navbar dengan efek transparan
 * 2. Mobile menu toggle (hamburger)
 * 3. Smooth scrolling untuk anchor link
 * 4. Fade-in animation (Intersection Observer)
 * 5. FAQ Accordion interaktif
 * 6. Active menu indicator
 * 7. Back to top button
 * =================================================================
 */

/**
 * ==================== 1. STICKY NAVBAR ====================
 * Saat scroll melebihi 50px, navbar menjadi lebih transparan
 * dan bayangannya lebih tegas.
 */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        // Scroll ke bawah -> navbar lebih transparan
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
        // Di paling atas -> navbar solid
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

/**
 * ==================== 2. MOBILE MENU TOGGLE ====================
 * Menampilkan/menyembunyikan menu navigasi di layar kecil.
 * Ikon berubah antara hamburger (☰) dan close (✕).
 */
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

// Pastikan elemen ada di halaman (untuk menghindari error)
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        // Toggle class 'active' pada menu
        navMenu.classList.toggle('active');

        // Ganti icon
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

// Tutup mobile menu secara otomatis saat link di klik
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

/**
 * ==================== 3. SMOOTH SCROLLING ====================
 * Untuk semua link yang menuju ke anchor (#id),
 * scroll akan berjalan halus (tidak loncat).
 * Offset 80px untuk menghindari navbar menutupi konten.
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        // Skip jika hanya "#" (tidak valid)
        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault(); // Mencegah perilaku default
            const offsetTop = targetElement.offsetTop - 80; // offset navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * ==================== 4. FADE-IN ANIMATION ====================
 * Menggunakan Intersection Observer API (modern, performa tinggi).
 * Elemen dengan class 'fade-in-up' akan muncul saat discroll ke viewport.
 * Threshold 0.15 berarti 15% elemen terlihat baru trigger.
 */
const fadeElements = document.querySelectorAll('.fade-in-up');

const observerOptions = {
    threshold: 0.15,        // Seberapa banyak elemen terlihat
    rootMargin: '0px 0px -30px 0px' // Sedikit offset
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambahkan class 'visible' untuk memicu animasi CSS
            entry.target.classList.add('visible');
            // Berhenti observe setelah muncul (hemat resource)
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe semua elemen dengan class 'fade-in-up'
fadeElements.forEach(el => {
    fadeObserver.observe(el);
});

/**
 * ==================== 5. FAQ ACCORDION ====================
 * Saat pertanyaan FAQ diklik, jawaban akan muncul/muncul.
 * Hanya satu FAQ yang bisa terbuka dalam satu waktu.
 */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            // Tutup FAQ lain yang sedang terbuka
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle status FAQ yang diklik
            item.classList.toggle('active');
        });
    }
});

/**
 * ==================== 6. ACTIVE MENU INDICATOR ====================
 * Menandai menu navigasi yang aktif berdasarkan halaman yang sedang dibuka.
 * Berguna untuk memberi tahu pengguna posisi mereka di website.
 */
function updateActiveMenu() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-menu a');

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');

        // Cek apakah link sesuai dengan halaman saat ini
        if (href === 'index.html' && (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html'))) {
            item.classList.add('active');
        } else if (href === 'prodi.html' && currentPath.includes('prodi.html')) {
            item.classList.add('active');
        } else if (href && href.includes('#') && window.location.hash === href) {
            item.classList.add('active');
        }
    });
}

// Jalankan saat halaman selesai loading dan saat hash berubah
window.addEventListener('load', updateActiveMenu);
window.addEventListener('hashchange', updateActiveMenu);

/**
 * ==================== 7. BACK TO TOP BUTTON ====================
 * Membuat tombol yang muncul saat scroll > 500px.
 * Klik tombol akan membawa pengguna ke atas halaman secara halus.
 */
const createBackToTop = () => {
    // Buat elemen button
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    document.body.appendChild(btn);

    // Tampilkan/sembunyikan berdasarkan posisi scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });

    // Scroll ke atas saat diklik
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Panggil fungsi untuk membuat tombol
createBackToTop();

/**
 * ==================== 8. CTA BUTTON ALERT (DEMO) ====================
 * Karena formulir pendaftaran belum tersedia, tampilkan alert.
 * Ini hanya untuk keperluan demo tugas.
 */
const daftarButtons = document.querySelectorAll('.cta-section .btn-primary, .hero-buttons .btn-primary');
daftarButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Cek apakah link mengarah ke '#' (belum ada tujuan)
        if (btn.getAttribute('href') === '#') {
            e.preventDefault();
            alert('🚀 Formulir pendaftaran akan segera hadir. Silakan hubungi WhatsApp Admin untuk info lebih lanjut.');
        }
    });
});

// Konfirmasi di console bahwa script berhasil dijalankan
console.log('✅ Website PMB UNW siap digunakan!');