// Mobile navigation menu toggle function
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-item');
const backToTopBtn = document.getElementById('backToTop');

// YouTube Pop-up elements selection
const youtubeModal = document.getElementById('youtubeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const visitChannelBtn = document.getElementById('visitChannelBtn');

// Trigger Pop-up Modal automatically immediately on Page Load
window.addEventListener('DOMContentLoaded', () => {
    // Adds class to open modal smoothly
    setTimeout(() => {
        if (youtubeModal) {
            youtubeModal.classList.add('show-modal');
        }
    }, 500); // 0.5s soft delay for elegant display
});

// Close Pop-up on (X) Button Click
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        youtubeModal.classList.remove('show-modal');
    });
}

// Close Pop-up when user clicks 'Visit Channel' CTA
if (visitChannelBtn) {
    visitChannelBtn.addEventListener('click', () => {
        // Soft timeout to dismiss popup as user transitions to YouTube
        setTimeout(() => {
            youtubeModal.classList.remove('show-modal');
        }, 300);
    });
}

// Close Pop-up when clicking anywhere outside the card box
if (youtubeModal) {
    youtubeModal.addEventListener('click', (e) => {
        if (e.target === youtubeModal) {
            youtubeModal.classList.remove('show-modal');
        }
    });
}

// Navigation hamburger menu control
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Dynamically handle active navigation tab on scrolling
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(currentSection)) {
            item.classList.add('active');
        }
    });

    // Back to top dynamic view logic
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Back to Top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dynamic Client Side Submit Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you, Muhammad has received your message. I will connect with you shortly!');
        contactForm.reset();
    });
}