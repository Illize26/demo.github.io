/**
 * Mobile Auto-Slide Module for Slider
 * Automatically advances slides on mobile devices
 */
(function() {
  'use strict';

  var autoSlideTimer;
  var autoSlideInterval = 5000; // 5 seconds
  var isMobile = window.innerWidth <= 900;
  var isAutoSliding = false;

  // Initialize autoplay for mobile
  $(function() {
    if (isMobile) {
      startAutoSlide();
      
      // Stop on user interaction
      $('.pn-btn, .slide').on('click touchstart', function() {
        stopAutoSlide();
        // Restart after 10 seconds of inactivity
        setTimeout(function() {
          if (!window.sliderAnimating) {
            startAutoSlide();
          }
        }, 10000);
      });
    }

    // Update on resize
    $(window).on('resize', function() {
      var newIsMobile = window.innerWidth <= 900;
      if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        if (isMobile) {
          startAutoSlide();
        } else {
          stopAutoSlide();
        }
      }
    });
  });

  /**
   * Start automatic slide advancement
   */
  function startAutoSlide() {
    if (isAutoSliding) return;
    
    isAutoSliding = true;
    autoSlideTimer = setInterval(function() {
      if (window.sliderAnimating) return;
      
      var $activeSlide = $('.slide.active');
      var $nextSlide = $activeSlide.next('.slide');
      
      // If last slide, go to first
      if (!$nextSlide.length) {
        $nextSlide = $('.slide').first();
      }
      
      if ($nextSlide.length && typeof window.goToNextSlide === 'function') {
        window.sliderAnimating = true;
        window.goToNextSlide($activeSlide, $nextSlide, $('.slide'));
      }
    }, autoSlideInterval);
  }

  /**
   * Stop automatic slide advancement
   */
  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
      isAutoSliding = false;
    }
  }

  // Expose stop function
  window.stopAutoSlide = stopAutoSlide;

})();
