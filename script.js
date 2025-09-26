// Contact Popup functionality
function showContactInfo() {
    const popup = document.getElementById('contactPopup');
    popup.style.display = 'block';
    
    // Close popup when clicking outside
    document.addEventListener('click', function closeOnClickOutside(event) {
        if (!popup.contains(event.target) && !event.target.closest('.contact-planner-btn')) {
            hideContactInfo();
            document.removeEventListener('click', closeOnClickOutside);
        }
    });
}

function hideContactInfo() {
    const popup = document.getElementById('contactPopup');
    popup.style.display = 'none';
}

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideContactInfo();
    }
});

// Services Auto-Switch functionality
function initServiceSwitcher() {
    const serviceIds = ['service-planner', 'service-conductor', 'service-organizer'];
    let currentIndex = 0;
    
    // Start the auto-switch interval
    setInterval(() => {
        // Remove active class from all services
        serviceIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('active');
            }
        });
        
        // Add active class to current service
        const currentElement = document.getElementById(serviceIds[currentIndex]);
        if (currentElement) {
            currentElement.classList.add('active');
        }
        
        // Increment and wrap around
        currentIndex = (currentIndex + 1) % serviceIds.length;
    }, 3000); // Changed to 3 seconds for better readability
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize service switcher
    initServiceSwitcher();
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            navbar.style.backdropFilter = 'blur(25px) saturate(200%)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Service cards fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Observe event type cards
    const eventTypeCards = document.querySelectorAll('.event-type-card');
    eventTypeCards.forEach(card => {
        observer.observe(card);
    });

    // Service cards hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Event type cards click effects
    eventTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventType = this.querySelector('h3').textContent;
            showEventTypeModal(eventType);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // CTA button animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                scrollToServices();
            }, 150);
        });
    }
});

// Create new event functionality
function createNewEvent() {
    // Replace with your WhatsApp number (with country code, no + or spaces)
    const phone = "+918433775541";
    const message = encodeURIComponent("Hello Team, I would like to request your middle-man service.");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

// Close modal function
function closeModal() {
    const modal = window.currentModal;
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            window.currentModal = null;
        }, 300);
    }
}

// Show event type modal
function showEventTypeModal(eventType) {
    const descriptions = {
        'Conferences': 'Professional business conferences, seminars, and networking events designed to bring industry leaders together.',
        'Corporate Events': 'Team building activities, company retreats, product launches, and corporate celebrations.',
        'Sporting Events': 'Sports tournaments, competitions, marathons, and athletic celebrations for all skill levels.',
        'Family Events': 'Weddings, birthday parties, anniversaries, graduations, and intimate family celebrations.'
    };

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;

    modalContent.innerHTML = `
        <h2 style="color: #6366f1; margin-bottom: 1rem;">${eventType}</h2>
        <p style="margin-bottom: 2rem; line-height: 1.6; color: #666;">${descriptions[eventType]}</p>
        <button onclick="closeEventTypeModal()" style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeEventTypeModal();
        }
    });

    window.currentEventTypeModal = modalOverlay;
}

// Close event type modal
function closeEventTypeModal() {
    const modal = window.currentEventTypeModal;
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            window.currentEventTypeModal = null;
        }, 300);
    }
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// Scroll to services section
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const offsetTop = servicesSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (window.currentModal) {
            closeModal();
        }
        if (window.currentEventTypeModal) {
            closeEventTypeModal();
        }
    }
});

// Service card stagger animation
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    // Trigger any additional animations here
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
    }
});
