/**
 * Menu Navigation Module
 * Handles desktop/mobile navigation, language dropdown, and smooth scrolling
 */
(function() {
  'use strict';

  // Configuration
  var config = {
    scrollDuration: 1000,
    navScrollThreshold: 0, // Height after which nav gets scrolled class
    debounceDelay: 50
  };

  // Initialize menu when DOM is ready
  $(function() {
    initMobileMenu();
    initScrollBehavior();
    initLanguageDropdown();
    initSmoothScroll();
  });

  /**
   * Mobile menu toggle functionality
   */
  function initMobileMenu() {
    // Toggle mobile menu
    $("#toggle").click(function() {
      $(this).toggleClass('on');
      $("#resize").toggleClass("active");
    });

    // Close menu when clicking on a link
    $("#resize ul li a").click(function() {
      $("#toggle").toggleClass('on');
      $("#resize").toggleClass("active");
    });

    // Close button
    $(".close-btn").click(function() {
      $("#toggle").toggleClass('on');
      $("#resize").toggleClass("active");
    });
  }

  /**
   * Navigation scroll behavior (add background on scroll)
   */
  function initScrollBehavior() {
    $(document).scroll(function() {
      var $nav = $(".nav");
      var scrolled = $(this).scrollTop() > $nav.height();
      $nav.toggleClass('scrolled', scrolled);
    });
  }

  /**
   * Language dropdown functionality
   */
  function initLanguageDropdown() {
    // Toggle dropdown on button click
    $('.lang-dropdown').on('click', '.lang-current', function(e) {
      e.stopPropagation();
      $(this).closest('.lang-dropdown').toggleClass('active');
    });

    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.lang-dropdown').length) {
        $('.lang-dropdown').removeClass('active');
      }
    });

    // Update dropdown text when language changes
    $('.lang-btn').on('click', function(e) {
      e.preventDefault();
      var lang = $(this).data('lang').toUpperCase();
      var dropdown = $(this).closest('.lang-dropdown');
      
      // Update the current language display (desktop dropdown only)
      if (dropdown.length) {
        dropdown.find('.lang-current').text(lang);
        dropdown.removeClass('active');
      }
      
      // Mark as active
      $('.lang-btn').removeClass('active');
      $(this).addClass('active');
      
      // The i18n.js will handle the actual language change
    });

    // Set initial language display
    var currentLang = (localStorage.getItem('lang') || 'it').toUpperCase();
    $('.lang-current').text(currentLang);
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    $('a[href*="#"]')
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // Only for same-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Find target element
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          
          // Animate scroll if target exists
          if (target.length) {
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, config.scrollDuration, function() {
              // Set focus after animation
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr('tabindex', '-1');
                $target.focus();
              }
            });
          }
        }
      });
  }

  // Expose configuration for external modification if needed
  window.MenuConfig = config;

})();
