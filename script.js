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

// Mobile navigation menu toggle function
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-item');
const backToTopBtn = document.getElementById('backToTop');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Navigation menu elements click parameters
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

// Dynamic AJAX Form Submission (Sends data directly to your email without reload)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.gradient-submit-btn');
        const originalText = submitBtn.textContent;
        const formData = new FormData(contactForm);

        // Visual loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Sends the form parameters asynchronously to Formspree endpoint
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Thank you! Your message has been sent directly to Muhammad\'s email.');
                contactForm.reset();
            } else {
                alert('Oops! There was a problem submitting your form. Please check your Formspree ID and try again.');
            }
        } catch (error) {
            alert('Oops! There was a network error. Please check your internet connection and try again.');
        } finally {
            // Revert submit button back to normal state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}