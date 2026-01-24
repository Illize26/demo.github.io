/**
 * Mobile Auto-Slide Module for Slider
 * Automatically advances slides on mobile devices (ping-pong pattern)
 */
(function() {
  'use strict';

  var autoSlideTimer;
  var autoSlideInterval = 5000; // 5 seconds
  var isMobile = window.innerWidth <= 900;
  var isAutoSliding = false;
  var direction = 'forward'; // 'forward' or 'backward'

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
   * Start automatic slide advancement (ping-pong pattern)
   */
  function startAutoSlide() {
    if (isAutoSliding) return;
    
    isAutoSliding = true;
    autoSlideTimer = setInterval(function() {
      if (window.sliderAnimating) return;
      
      var $activeSlide = $('.slide.active');
      var $nextSlide, $prevSlide;
      
      if (direction === 'forward') {
        // Going forward
        $nextSlide = $activeSlide.next('.slide');
        
        if ($nextSlide.length) {
          // Move to next slide
          window.sliderAnimating = true;
          window.goToNextSlide($activeSlide, $nextSlide, $('.slide'));
        } else {
          // Reached the end, change direction to backward
          direction = 'backward';
          $prevSlide = $activeSlide.prev('.slide');
          
          if ($prevSlide.length) {
            window.sliderAnimating = true;
            window.goToPrevSlide($activeSlide, $prevSlide, $('.slide'));
          }
        }
      } else {
        // Going backward
        $prevSlide = $activeSlide.prev('.slide');
        
        if ($prevSlide.length) {
          // Move to previous slide
          window.sliderAnimating = true;
          window.goToPrevSlide($activeSlide, $prevSlide, $('.slide'));
        } else {
          // Reached the beginning, change direction to forward
          direction = 'forward';
          $nextSlide = $activeSlide.next('.slide');
          
          if ($nextSlide.length) {
            window.sliderAnimating = true;
            window.goToNextSlide($activeSlide, $nextSlide, $('.slide'));
          }
        }
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
      // Reset direction to forward when stopped
      direction = 'forward';
    }
  }

  // Expose functions
  window.stopAutoSlide = stopAutoSlide;
  window.startAutoSlide = startAutoSlide;

})();

