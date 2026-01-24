/**
 * Menu Navigation Module for Slider Page
 * Extends base menu functionality with wheel scroll navigation
 */
(function() {
  'use strict';

  // Import base menu functionality
  // (menu.js should be loaded before this file)

  /**
   * Mouse wheel scroll navigation for slides
   */
  function initWheelScrollNavigation() {
    var wheelTimeout;
    var isAnimating = false;

    $(document).on('wheel', function(e) {
      // Check if slider is animating
      if (window.sliderAnimating || isAnimating) return;
      
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(function() {
        var delta = e.originalEvent.deltaY;
        
        if (delta > 0) {
          // Scroll down - go to next slide
          var slideOut = $('.slide.active'),
              slideIn = slideOut.next('.slide'),
              slideInAll = $('.slide');
          
          if (slideIn.length && typeof window.goToNextSlide === 'function') {
            isAnimating = true;
            window.sliderAnimating = true;
            window.goToNextSlide(slideOut, slideIn, slideInAll);
            setTimeout(function() {
              isAnimating = false;
            }, 1000);
          }
        } else if (delta < 0) {
          // Scroll up - go to previous slide
          var slideOut = $('.slide.active'),
              slideIn = slideOut.prev('.slide'),
              slideInAll = $('.slide');
          
          if (slideIn.length && typeof window.goToPrevSlide === 'function') {
            isAnimating = true;
            window.sliderAnimating = true;
            window.goToPrevSlide(slideOut, slideIn, slideInAll);
            setTimeout(function() {
              isAnimating = false;
            }, 1000);
          }
        }
      }, 50); // Debounce delay
    });
  }

  // Initialize slider-specific functionality when DOM is ready
  $(function() {
    // Only init wheel scroll if we're on the slider page
    if ($('.slide').length > 0) {
      initWheelScrollNavigation();
    }
  });

})();
