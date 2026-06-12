/**
 * Scroll Reveal Animations
 * Uses IntersectionObserver to add an .is-visible class to elements
 * as they scroll into view.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if users prefer reduced motion, if so, don't run the observer
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const observerOptions = {
    root: null, // use viewport
    rootMargin: '0px 0px -10% 0px', // trigger slightly before it comes fully into view
    threshold: 0 // trigger as soon as any part of the element passes the rootMargin
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is visible
        entry.target.classList.add('is-visible');
        // Stop observing it after it's animated in once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements that should animate on scroll
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
});
