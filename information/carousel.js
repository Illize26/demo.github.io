/**
 * Simple Carousel for Plans Section
 */
(function() {
  'use strict';

  var currentSlide = 0;
  var slides = [];
  var dots = [];

  function initCarousel() {
    slides = document.querySelectorAll('.plan-slide');
    var dotsContainer = document.getElementById('carousel-dots');
    
    if (!slides.length || !dotsContainer) return;

    // Create dots
    slides.forEach(function(slide, index) {
      var dot = document.createElement('span');
      dot.className = 'dot' + (index === 0 ? ' active' : '');
      dot.addEventListener('click', function() {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    // Navigation buttons
    var prevBtn = document.getElementById('prev-plan');
    var nextBtn = document.getElementById('next-plan');

    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }

    // Auto-play (optional)
    // setInterval(nextSlide, 5000);
  }

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Remove active class from all
    slides.forEach(function(slide) {
      slide.classList.remove('active');
    });
    dots.forEach(function(dot) {
      dot.classList.remove('active');
    });

    // Add active to current
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }

})();
