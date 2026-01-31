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
   * Get navigation HTML template
   */
  function getNavigationTemplate(basePath) {
    return `
<!-- Shared Navigation Menu -->
<nav class="nav">
      <span id="brand">
            <a href="${basePath}/index.html"><img src="${basePath}/logo.png" alt="logo" id="logo"/></a>
      </span>

      <ul id="menu">
            <li><a href="${basePath}/index.html#home" data-i18n="nav.home">Home</a></li>
            <li><a href="${basePath}/index.html#about" data-i18n="nav.about">Su di noi</a></li>
            <li><a href="${basePath}/index.html#services" data-i18n="nav.services">Servizi</a></li>
            <li><a href="${basePath}/information/index.html" data-i18n="nav.information">Competenze</a></li>
            <li><a href="${basePath}/index.html#team" data-i18n="nav.team">Il nostro team</a></li>
            <li><a href="${basePath}/index.html#footer" data-i18n="nav.contact">Contatti</a></li>
            <li class="lang-dropdown">
                  <button class="lang-current" id="lang-current-desktop">IT</button>
                  <ul class="lang-menu">
                        <li><a href="#" class="lang-btn" data-lang="it">IT</a></li>
                        <li><a href="#" class="lang-btn" data-lang="en">EN</a></li>
                        <li><a href="#" class="lang-btn" data-lang="es">ES</a></li>
                  </ul>
            </li>
      </ul>

      <div id="toggle">
            <div class="span">menu</div>
      </div>
</nav>

<div id="resize">
      <div class="close-btn">close</div>

      <ul id="menu">
            <li><a href="${basePath}/index.html#home" data-i18n="nav.home">Home</a></li>
            <li><a href="${basePath}/index.html#about" data-i18n="nav.about">Su di noi</a></li>
            <li><a href="${basePath}/index.html#services" data-i18n="nav.services">Servizi</a></li>
            <li><a href="${basePath}/information/index.html" data-i18n="nav.information">Competenze</a></li>
            <li><a href="${basePath}/index.html#team" data-i18n="nav.team">Il nostro team</a></li>
            <li><a href="${basePath}/index.html#footer" data-i18n="nav.contact">Contatti</a></li>
            <li>
                  <div class="lang-switch" id="lang-switch">
                        <button class="lang-btn" data-lang="it">IT</button>
                        <button class="lang-btn" data-lang="en">EN</button>
                        <button class="lang-btn" data-lang="es">ES</button>
                  </div>
            </li>
      </ul>
</div>
`;
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

    // Use embedded template instead of fetch (works in all environments)
    var html = getNavigationTemplate(basePath);
    navContainer.innerHTML = html;
    
    // Initialize menu functionality
    initializeMenu();
    
    // Trigger custom event for other scripts
    if (typeof Event === 'function') {
      document.dispatchEvent(new Event('navigationLoaded'));
    } else {
      // IE fallback
      var event = document.createEvent('Event');
      event.initEvent('navigationLoaded', true, true);
      document.dispatchEvent(event);
    }
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
    for (var i = 0; i < resizeLinks.length; i++) {
      resizeLinks[i].addEventListener('click', function() {
        resize.classList.remove('active');
      });
    }

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

      // Update current language display
      var currentLang = localStorage.getItem('lang') || 'it';
      langCurrent.textContent = currentLang.toUpperCase();
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

