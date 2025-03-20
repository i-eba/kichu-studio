// Wait for DOM content to be fully loaded
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

    // Smooth scrolling for internal links
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

    // Hero carousel
    const carouselImages = [
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1534097056477-70ff71acc0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1535572290543-960a8046f5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
    ];

    let currentImageIndex = 0;
    const carouselContainer = document.querySelector('.carousel-images');
    
    // Preload images
    carouselImages.forEach((src, index) => {
        if (index > 0) {
            const img = new Image();
            img.src = src;
        }
    });

    // Change image every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        const img = document.createElement('img');
        img.src = carouselImages[currentImageIndex];
        img.className = 'carousel-image';
        img.style.opacity = '0';
        
        carouselContainer.appendChild(img);
        
        setTimeout(() => {
            img.style.transition = 'opacity 1s';
            img.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            if (carouselContainer.children.length > 1) {
                carouselContainer.removeChild(carouselContainer.children[0]);
            }
        }, 1000);
    }, 5000);

    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const serviceField = document.getElementById('service');
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
            
            if (!serviceField.value) {
                isValid = false;
                highlightField(serviceField, true);
            } else {
                highlightField(serviceField, false);
            }
            
            if (!messageField.value.trim()) {
                isValid = false;
                highlightField(messageField, true);
            } else {
                highlightField(messageField, false);
            }
            
            if (isValid) {
                // In a real implementation, you would handle form submission here
                alert('Thanks for booking with us! We\'ll contact you shortly to confirm your session.');
                contactForm.reset();
            }
        });
    }

    // Helper functions for form validation
    function highlightField(field, isError) {
        if (isError) {
            field.style.borderColor = 'var(--primary-dark)';
        } else {
            field.style.borderColor = 'var(--gray)';
        }
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
