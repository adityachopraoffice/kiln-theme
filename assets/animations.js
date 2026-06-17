/**
 * Scroll Reveal & Load Animations
 * Uses IntersectionObserver to trigger entry transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if users prefer reduced motion, if so, bypass animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Read global animation settings from CSS Custom Property
  const rootStyles = getComputedStyle(document.documentElement);
  const animationsEnabled = rootStyles.getPropertyValue('--animations-enabled').trim() !== '0';

  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

  if (prefersReducedMotion || !animationsEnabled) {
    // Instantly reveal all elements
    elementsToAnimate.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // Define intersection observer options
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -5% 0px', // trigger slightly before entering
    threshold: 0.01
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Separate above-the-fold or immediate elements
  elementsToAnimate.forEach(el => {
    const isAboveFold = el.closest('.header') || 
                        el.closest('.announcement-bar') || 
                        el.closest('.studio-hero') || 
                        el.classList.contains('animate-on-load');

    if (isAboveFold) {
      // Small stagger delay for page entry feel
      setTimeout(() => {
        el.classList.add('is-visible');
      }, 80);
    } else {
      observer.observe(el);
    }
  });

  // Page Preloader Logic
  const preloader = document.getElementById('Preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('theme-preloader--hidden');
      }, 1000);
    });

    // Safety fallback
    setTimeout(() => {
      preloader.classList.add('theme-preloader--hidden');
    }, 3000);
  }

  // Custom Cursor Follower Logic
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    const dot = cursor.querySelector('.custom-cursor__dot');
    const ring = cursor.querySelector('.custom-cursor__ring');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
      const speed = 0.15;
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Event delegation for hover states
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, input, select, textarea, [role="button"], details summary, .carousel-arrow, .product-card, .collection-card')) {
        cursor.classList.add('custom-cursor--hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, input, select, textarea, [role="button"], details summary, .carousel-arrow, .product-card, .collection-card')) {
        cursor.classList.remove('custom-cursor--hover');
      }
    });

    // Click effect
    window.addEventListener('mousedown', () => {
      cursor.classList.add('custom-cursor--click');
    });
    window.addEventListener('mouseup', () => {
      cursor.classList.remove('custom-cursor--click');
    });
  }
});
