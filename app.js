// Premium Footwear Store - Global Interactivity System

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initStickyHeader();
  initMobileMenu();
  initDropdowns();
  initScrollToTop();
  initSizeGuideModal();
  initFormsValidation();
});

// 1. Theme Toggle System (Light / Dark)
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    updateThemeIcons('dark');
  } else {
    htmlElement.classList.remove('dark');
    updateThemeIcons('light');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeIcons('light');
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons('dark');
      }
    });
  });
}

function updateThemeIcons(theme) {
  const themeIcons = document.querySelectorAll('.theme-icon');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      // Show sun icon, hide moon icon
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else {
      // Show moon icon, hide sun icon
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
  });
}

// 2. RTL Toggle System
function initRTL() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const htmlElement = document.documentElement;

  // Check saved direction
  const savedDir = localStorage.getItem('dir');
  if (savedDir === 'rtl') {
    htmlElement.setAttribute('dir', 'rtl');
    updateRTLButtons(true);
  } else {
    htmlElement.setAttribute('dir', 'ltr');
    updateRTLButtons(false);
  }

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRTL = htmlElement.getAttribute('dir') === 'rtl';
      if (isRTL) {
        htmlElement.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
        updateRTLButtons(false);
      } else {
        htmlElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
        updateRTLButtons(true);
      }
      // Re-trigger layout alignment dependencies if any
    });
  });
}

function updateRTLButtons(isRTL) {
  const rtlTextSpan = document.querySelectorAll('.rtl-btn-text');
  rtlTextSpan.forEach(span => {
    span.textContent = isRTL ? 'LTR' : 'RTL';
  });
}

// 3. Sticky Header
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
  });
}

// 4. Mobile Menu Drawer
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const closeMenuBtn = document.getElementById('close-mobile-menu-btn');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!menuBtn || !mobileNav) return;

  const toggleMobileMenu = (open) => {
    if (open) {
      mobileNav.classList.remove('invisible');
      mobileNav.classList.remove('translate-x-full', '-translate-x-full');
      // Slide open direction based on RTL
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRTL) {
        mobileNav.classList.add('translate-x-0');
        mobileNav.classList.remove('translate-x-full');
      } else {
        mobileNav.classList.add('translate-x-0');
        mobileNav.classList.remove('-translate-x-full');
      }
      overlay.classList.remove('hidden', 'opacity-0');
      overlay.classList.add('opacity-50');
      document.body.classList.add('overflow-hidden');
    } else {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      mobileNav.classList.remove('translate-x-0');
      if (isRTL) {
        mobileNav.classList.add('-translate-x-full');
      } else {
        mobileNav.classList.add('translate-x-full');
      }
      overlay.classList.remove('opacity-50');
      overlay.classList.add('opacity-0');
      setTimeout(() => {
        overlay.classList.add('hidden');
        mobileNav.classList.add('invisible');
      }, 300);
      document.body.classList.remove('overflow-hidden');
    }
  };

  menuBtn.addEventListener('click', () => toggleMobileMenu(true));
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
  if (overlay) overlay.addEventListener('click', () => toggleMobileMenu(false));

  // Handle nested mobile menu dropdowns
  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = btn.nextElementSibling;
      const arrow = btn.querySelector('.mobile-arrow');
      if (content) {
        content.classList.toggle('hidden');
        if (arrow) {
          arrow.classList.toggle('rotate-180');
        }
      }
    });
  });
}

// 5. Elegant Nav Dropdowns
function initDropdowns() {
  const dropdownContainers = document.querySelectorAll('.nav-dropdown-container');

  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.nav-dropdown-trigger');
    const menu = container.querySelector('.nav-dropdown-menu');

    if (!trigger || !menu) return;

    // Desktop hover handles itself via CSS usually, but this adds JS protection
    let timeout;
    container.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      menu.classList.remove('hidden', 'opacity-0', 'scale-95');
      menu.classList.add('opacity-100', 'scale-100');
    });

    container.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        menu.classList.add('opacity-0', 'scale-95');
        menu.classList.remove('opacity-100', 'scale-100');
        setTimeout(() => {
          if (menu.classList.contains('opacity-0')) {
            menu.classList.add('hidden');
          }
        }, 150);
      }, 100);
    });
  });
}

// 6. Scroll-To-Top System
function initScrollToTop() {
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m18 15-6-6-6 6"/></svg>`;
  scrollTopBtn.className = 'fixed bottom-6 right-6 p-3 rounded-full bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform translate-y-20 opacity-0 cursor-pointer z-50';
  scrollTopBtn.id = 'scroll-top-btn';
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('translate-y-20', 'opacity-0');
      scrollTopBtn.classList.add('translate-y-0', 'opacity-100');
    } else {
      scrollTopBtn.classList.add('translate-y-20', 'opacity-0');
      scrollTopBtn.classList.remove('translate-y-0', 'opacity-100');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 7. Global Size Guide Modal Logic
function initSizeGuideModal() {
  const openBtns = document.querySelectorAll('.open-size-guide-btn');
  const closeBtns = document.querySelectorAll('.close-size-guide-btn');
  const modal = document.getElementById('size-guide-modal');

  if (!modal) return;

  const toggleModal = (show) => {
    if (show) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleModal(true);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => toggleModal(false));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      toggleModal(false);
    }
  });
}

// 8. Form Validation Suite
function initFormsValidation() {
  // Bulk Order Inquiry Form
  const bulkForm = document.getElementById('bulk-inquiry-form');
  if (bulkForm) {
    bulkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(bulkForm)) {
        showSuccessMessage(bulkForm, 'Your bulk order inquiry has been submitted! Our luxury concierge will contact you within 24 hours.');
      }
    });
  }

  // Contact Page Form
  const contactForm = document.getElementById('general-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(contactForm)) {
        showSuccessMessage(contactForm, 'Thank you! Your message has been sent successfully. We will get back to you shortly.');
      }
    });
  }

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(loginForm)) {
        const successMsg = document.createElement('div');
        successMsg.className = 'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-zinc-800 dark:text-green-400 font-semibold';
        successMsg.innerText = 'Login successful! Redirecting...';
        loginForm.prepend(successMsg);
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }
    });
  }

  // Signup Form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(signupForm)) {
        // Additional password match verification
        const passwordInput = signupForm.querySelector('input[type="password"]');
        const confirmInput = signupForm.querySelector('#confirm-password');
        if (passwordInput && confirmInput && passwordInput.value !== confirmInput.value) {
          showInputError(confirmInput, 'Passwords do not match');
          return;
        }

        const successMsg = document.createElement('div');
        successMsg.className = 'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-zinc-800 dark:text-green-400 font-semibold';
        successMsg.innerText = 'Registration successful! Redirecting to login page...';
        signupForm.prepend(successMsg);
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      }
    });
  }

  // Newsletter Signups
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && validateEmail(emailInput.value)) {
        const originalHTML = form.innerHTML;
        form.innerHTML = `<span class="text-gold-500 font-bold block py-2 animate-fade-in-up">✨ Thank you for subscribing to our luxury catalog!</span>`;
        setTimeout(() => {
          form.innerHTML = originalHTML;
          // Re-attach validation if they want to subscribe again
          initFormsValidation();
        }, 4000);
      } else if (emailInput) {
        emailInput.classList.add('border-red-500');
        setTimeout(() => emailInput.classList.remove('border-red-500'), 3000);
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

  inputs.forEach(input => {
    // Clear previous error styles/messages
    clearInputError(input);

    if (!input.value.trim()) {
      showInputError(input, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      showInputError(input, 'Please enter a valid email address');
      isValid = false;
    } else if (input.type === 'tel' && !validatePhone(input.value)) {
      showInputError(input, 'Please enter a valid phone number');
      isValid = false;
    } else if (input.type === 'checkbox' && !input.checked) {
      showInputError(input, 'You must accept the terms & conditions');
      isValid = false;
    }
  });

  return isValid;
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^\+?[0-9\s\-()]{7,15}$/;
  return re.test(phone);
}

function showInputError(input, message) {
  input.classList.add('border-red-500', 'focus:ring-red-500');
  input.classList.remove('border-gold-500/30', 'border-gray-200');

  // Check if error message is already appended
  let errorDiv = input.parentElement.querySelector('.form-error-msg');
  if (!errorDiv) {
    errorDiv = document.createElement('span');
    errorDiv.className = 'form-error-msg text-xs text-red-500 mt-1 block font-semibold animate-fade-in-up';
    input.parentElement.appendChild(errorDiv);
  }
  errorDiv.innerText = message;
}

function clearInputError(input) {
  input.classList.remove('border-red-500', 'focus:ring-red-500');
  const errorDiv = input.parentElement.querySelector('.form-error-msg');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function showSuccessMessage(form, message) {
  const originalContent = form.innerHTML;
  form.innerHTML = `
    <div class="text-center py-12 px-6 bg-gold-50/50 dark:bg-charcoal-900/50 rounded-2xl border border-gold-500/20 max-w-lg mx-auto animate-fade-in-up">
      <div class="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </div>
      <h3 class="text-xl font-bold text-charcoal-900 dark:text-white mb-2">Request Processed</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">${message}</p>
      <button class="px-6 py-2 bg-charcoal-950 hover:bg-gold-500 hover:text-charcoal-950 dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-charcoal-950 text-white font-semibold rounded-lg transition-all duration-300" onclick="window.location.reload()">Done</button>
    </div>
  `;
}
