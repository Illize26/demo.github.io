/**
 * Shared Navigation Module
 * Loads and manages navigation across all pages
 */
(function() {
  'use strict';

  // Determine base path based on current location
  function getBasePath() {
    var path = window.location.pathname;
    
    // If in root directory
    if (path === '/' || path.endsWith('index.html') && !path.includes('/')) {
      return '.';
    }
    
    // If in slider/ or information/ subdirectory
    if (path.includes('/slider/') || path.includes('/information/')) {
      return '..';
    }
    
    return '.';
  }

  /**
   * Load navigation HTML and inject into page
   */
  function loadNavigation() {
    var basePath = getBasePath();
    var navContainer = document.getElementById('navigation-container');
    
    if (!navContainer) {
      console.error('Navigation container not found! Add <div id="navigation-container"></div> to your HTML');
      return;
    }

    // Load navigation template
    fetch(basePath + '/shared/navigation.html')
      .then(function(response) {
        if (!response.ok) throw new Error('Navigation template not found');
        return response.text();
      })
      .then(function(html) {
        // Replace BASE_PATH placeholder with actual base path
        html = html.replace(/BASE_PATH/g, basePath);
        
        // Inject navigation
        navContainer.innerHTML = html;
        
        // Initialize menu functionality
        initializeMenu();
        
        // Trigger custom event for other scripts
        document.dispatchEvent(new Event('navigationLoaded'));
      })
      .catch(function(error) {
        console.error('Failed to load navigation:', error);
      });
  }

  /**
   * Initialize menu functionality (toggle, scroll, etc.)
   */
  function initializeMenu() {
    var toggle = document.getElementById('toggle');
    var resize = document.getElementById('resize');
    var closeBtn = document.querySelector('.close-btn');
    var nav = document.querySelector('.nav');

    // Toggle mobile menu
    if (toggle) {
      toggle.addEventListener('click', function() {
        resize.classList.add('active');
      });
    }

    // Close mobile menu
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        resize.classList.remove('active');
      });
    }

    // Close menu when clicking on links
    var resizeLinks = resize.querySelectorAll('a');
    resizeLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        resize.classList.remove('active');
      });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Language dropdown toggle
    var langDropdown = document.querySelector('.lang-dropdown');
    if (langDropdown) {
      var langCurrent = langDropdown.querySelector('.lang-current');
      
      langCurrent.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!langDropdown.contains(e.target)) {
          langDropdown.classList.remove('active');
        }
      });
    }
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavigation);
  } else {
    loadNavigation();
  }

})();
