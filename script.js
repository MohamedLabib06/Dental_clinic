(function () {
  'use strict';

  const navbar = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const fadeElements = document.querySelectorAll('.fade-up');

  /* ---- Navbar scroll effect ---- */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ---- Back to top visibility ---- */
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  /* ---- Active nav link on scroll ---- */
  function highlightNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ---- Scroll reveal animations ---- */
  function revealOnScroll() {
    fadeElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  /* ---- Close mobile menu on link click ---- */
  function closeMobileMenu() {
    const collapse = document.getElementById('navbarContent');
    if (collapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---- Back to top click ---- */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Contact form validation & submit ---- */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = contactForm.querySelectorAll('[required]');
      let valid = true;

      fields.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      const emailField = document.getElementById('email');
      if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) return;

      let successMsg = contactForm.querySelector('.form-success');
      if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.setAttribute('role', 'alert');
        contactForm.appendChild(successMsg);
      }

      successMsg.textContent = 'Thank you! Your message has been sent. We will contact you within 24 hours.';
      successMsg.classList.add('show');
      contactForm.reset();

      setTimeout(function () {
        successMsg.classList.remove('show');
      }, 5000);
    });

    contactForm.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.value.trim()) {
          field.classList.remove('is-invalid');
        }
      });
    });
  }

  /* ---- Throttled scroll handler ---- */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        handleBackToTop();
        highlightNavLink();
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', function () {
    handleNavbarScroll();
    revealOnScroll();
  });

  revealOnScroll();
})();
