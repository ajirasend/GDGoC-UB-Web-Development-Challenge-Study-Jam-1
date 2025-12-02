// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Typing Effect for Hero Section
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const texts = [
        'Programmer Pemula.',
        'Sedang Belajar Coding.',
        'Antusias dengan Teknologi.',
        'Terus Berkembang.'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// Button Click Animations
const exploreBtn = document.getElementById('exploreBtn');
const contactBtn = document.getElementById('contactBtn');

if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        // Scroll to skills section
        document.querySelector('.skills')?.scrollIntoView({ behavior: 'smooth' });
    });
}

if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
}

// Skill Progress Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skill bars animation
if (document.querySelector('.skill-progress')) {
    animateSkillBars();
}

// Counter Animation for About Page
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.dataset.target);
                const increment = target / 50;
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = target < 1 ? current.toFixed(1) : Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target < 1 ? target.toFixed(1) : target;
                    }
                };

                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animation
if (document.querySelector('.counter')) {
    animateCounters();
}

// Project Card Interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('.btn-submit');
    const successMessage = document.getElementById('formSuccess');

    // Real-time validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const errorElement = document.getElementById(input.id + 'Error');
        errorElement.textContent = message;
        input.style.borderColor = '#ef4444';
    }

    function clearError(input) {
        const errorElement = document.getElementById(input.id + 'Error');
        errorElement.textContent = '';
        input.style.borderColor = '';
    }

    // Input validation on blur
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Nama minimal 2 karakter');
        } else {
            clearError(nameInput);
        }
    });

    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Email tidak valid');
        } else {
            clearError(emailInput);
        }
    });

    subjectInput.addEventListener('blur', () => {
        if (subjectInput.value.trim().length < 3) {
            showError(subjectInput, 'Subjek minimal 3 karakter');
        } else {
            clearError(subjectInput);
        }
    });

    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Pesan minimal 10 karakter');
        } else {
            clearError(messageInput);
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;

        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Nama minimal 2 karakter');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Email tidak valid');
            isValid = false;
        }

        if (subjectInput.value.trim().length < 3) {
            showError(subjectInput, 'Subjek minimal 3 karakter');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Pesan minimal 10 karakter');
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide loading
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

            // Log form data (in real app, send to server)
            console.log('Form submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value,
                timestamp: new Date().toISOString()
            });
        }, 2000);
    });

    // Clear errors on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim().length > 0) {
                clearError(input);
            }
        });
    });
}

// Smooth Scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Initialize reveal animation
if (document.querySelector('.skill-card, .project-card, .cert-card')) {
    revealOnScroll();
}

// Dynamic text on project buttons
document.querySelectorAll('.btn-small').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        const projectName = projectCard.querySelector('h3').textContent;
        
        // Create and show modal (simple alert for now)
        alert(`Detail untuk project: ${projectName}\n\nFitur akan segera hadir!`);
        
        // In a real app, you would open a modal or navigate to project detail page
        console.log('Project clicked:', projectName);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-animation');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Glitch effect on hover
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s infinite';
    });
    
    glitchTitle.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
}

// Add CSS for glitch animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});