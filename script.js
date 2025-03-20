// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Optional: Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjusted for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Optional: Simple form validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        // Simple validation
        let isValid = true;
        
        if (!nameField.value.trim()) {
            isValid = false;
            highlightField(nameField, true);
        } else {
            highlightField(nameField, false);
        }
        
        if (!emailField.value.trim() || !validateEmail(emailField.value)) {
            isValid = false;
            highlightField(emailField, true);
        } else {
            highlightField(emailField, false);
        }
        
        if (!messageField.value.trim()) {
            isValid = false;
            highlightField(messageField, true);
        } else {
            highlightField(messageField, false);
        }
        
        if (isValid) {
            // In a real implementation, you would handle form submission here
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
}

// Helper functions for form validation
function highlightField(field, isError) {
    if (isError) {
        field.style.borderColor = '#ff6b6b';
    } else {
        field.style.borderColor = '#b2bec3';
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
