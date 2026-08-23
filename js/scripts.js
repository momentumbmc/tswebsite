document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const navOverlay = document.getElementById('mobile-nav-overlay');

  if (menuBtn && closeBtn && navOverlay) {
    const setMenuState = (open) => {
      navOverlay.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    menuBtn.addEventListener('click', () => {
      setMenuState(true);
    });

    closeBtn.addEventListener('click', () => {
      setMenuState(false);
    });
  }

  // Sticky Mobile CTA Bar visibility logic
  const stickyCta = document.getElementById('sticky-cta-bar');
  const heroSection = document.getElementById('hero');

  if (stickyCta) {
    if (heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            stickyCta.classList.remove('is-visible');
          } else {
            if (entry.boundingClientRect.top < 0) {
              stickyCta.classList.add('is-visible');
            } else {
              stickyCta.classList.remove('is-visible');
            }
          }
        });
      }, { threshold: 0.1 });

      observer.observe(heroSection);
    } else {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          stickyCta.classList.add('is-visible');
        } else {
          stickyCta.classList.remove('is-visible');
        }
      });
    }
  }

  // Remove scroll affordance text once table is scrolled
  const scrollWrappers = document.querySelectorAll('.scroll-table-wrapper');
  scrollWrappers.forEach(wrapper => {
    const affordance = wrapper.nextElementSibling;
    if (affordance && affordance.classList.contains('scroll-affordance')) {
      const handleScroll = () => {
        affordance.style.display = 'none';
        wrapper.removeEventListener('scroll', handleScroll);
      };
      wrapper.addEventListener('scroll', handleScroll, { once: true });
    }
  });

});
