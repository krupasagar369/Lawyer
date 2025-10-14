// Scroll to Top Functionality
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// Active Navigation Link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Close mobile menu if open
      const navbar = document.querySelector('.navbar-collapse');
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
      }
    }
  });
});

// Animation on Scroll (Fade-in effect for elements)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// Mobile Menu Toggle Enhancement
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});

// Prevent body scroll when mobile menu is open
navbarCollapse.addEventListener('show.bs.collapse', () => {
  document.body.style.overflow = 'hidden';
});

navbarCollapse.addEventListener('hide.bs.collapse', () => {
  document.body.style.overflow = 'auto';
});

// Add animation to cards on scroll
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  
  observer.observe(card);
});

// WhatsApp Link Handler
const whatsappLink = document.querySelector('a[href*="wa.me"]');
if (whatsappLink) {
  whatsappLink.addEventListener('click', (e) => {
    const phoneNumber = '919441287609';
    const message = 'Hello! I would like to consult with you regarding legal matters.';
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  });
}

// Hamburger Menu Close on Mobile
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const collapse = new window.bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    collapse.hide();
  });
});

// Header Shadow on Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Lazy Load Images (if needed in future)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach((img) => imageObserver.observe(img));
}

// Form Validation (if contact form is added later)
const validateForm = (formId) => {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  }
};

// Initialize tooltips and popovers (Bootstrap)
document.addEventListener('DOMContentLoaded', () => {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map((popoverTriggerEl) => new window.bootstrap.Popover(popoverTriggerEl));
});

console.log('Script loaded successfully!');
