/**
 * Kotagiri Mansi - Cybersecurity & SOC Analyst Portfolio
 * Client-side Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Navigation ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link, .nav-cta-btn');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- 2. Navbar Scroll Shadow Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 3. Active Nav Link on Scroll (Intersection Observer) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksElements = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksElements.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --- 4. Copy Email to Clipboard ---
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyTooltip = document.getElementById('copyTooltip');

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback method for non-https or older browser context
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        copyTooltip.textContent = 'Copied!';
        copyTooltip.style.opacity = '1';
        copyTooltip.style.transform = 'translateY(0)';
        copyBtn.style.borderColor = 'var(--accent-emerald)';
        copyBtn.style.color = 'var(--accent-emerald)';

        setTimeout(() => {
          copyTooltip.textContent = 'Copy';
          copyTooltip.style.opacity = '';
          copyTooltip.style.transform = '';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
        copyTooltip.textContent = 'Failed';
        setTimeout(() => { copyTooltip.textContent = 'Copy'; }, 2000);
      }
    });
  }

  // --- 5. Contact Form Simulation ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitFormBtn');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Visual feedback
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
        Sending...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your message has been prepared. You can also reach me directly at <a href="mailto:mansikotagiri@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" style="color: #22d3ee; text-decoration: underline;">mansikotagiri@gmail.com</a>.
        `;
        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }, 700);
    });
  }

  // --- 6. Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 7. Subtle Console Message for Security Enthusiasts ---
  console.log(
    '%c[Kotagiri Mansi - SOC Analyst Portfolio]%c\n"Think like an attacker, build like a defender."\nEmail: mansikotagiri@gmail.com\nGitHub: https://github.com/mansikotagiri',
    'color: #06b6d4; font-weight: bold; font-size: 14px;',
    'color: #10b981; font-size: 12px;'
  );
});
