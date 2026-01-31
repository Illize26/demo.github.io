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

    console.log('Init menu - elements found:', {
      toggle: !!toggle,
      resize: !!resize,
      closeBtn: !!closeBtn
    });

    // FIX: Move close button outside #resize to avoid z-index/overflow issues
    if (closeBtn && resize) {
      // Create a wrapper for close button outside resize
      var closeBtnWrapper = document.createElement('div');
      closeBtnWrapper.style.position = 'fixed';
      closeBtnWrapper.style.top = '0';
      closeBtnWrapper.style.right = '30px';
      closeBtnWrapper.style.zIndex = '10003';
      closeBtnWrapper.style.pointerEvents = 'none';
      closeBtnWrapper.style.width = '100px';
      closeBtnWrapper.style.height = '80px';
      closeBtnWrapper.className = 'close-btn-wrapper';
      
      // Clone and move close button
      var closeBtnClone = closeBtn.cloneNode(true);
      closeBtnClone.style.position = 'relative';
      closeBtnClone.style.pointerEvents = 'auto';
      closeBtnClone.style.opacity = '0';
      closeBtnClone.style.visibility = 'hidden';
      
      closeBtnWrapper.appendChild(closeBtnClone);
      document.body.appendChild(closeBtnWrapper);
      
      // Remove original close button
      closeBtn.remove();
      closeBtn = closeBtnClone;
      
      console.log('Close button moved outside resize');
    }

    // Toggle mobile menu
    if (toggle && resize) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Toggle clicked - opening menu');
        resize.classList.add('active');
        
        // Hide toggle, show close
        toggle.style.opacity = '0';
        toggle.style.visibility = 'hidden';
        toggle.style.pointerEvents = 'none';
        
        if (closeBtn) {
          var wrapper = closeBtn.parentElement;
          wrapper.style.pointerEvents = 'auto';
          closeBtn.style.opacity = '1';
          closeBtn.style.visibility = 'visible';
          console.log('Close button shown');
        }
      });
    }

    // Close mobile menu
    if (closeBtn && resize) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked - closing menu');
        resize.classList.remove('active');
        
        // Show toggle, hide close
        if (toggle) {
          toggle.style.opacity = '1';
          toggle.style.visibility = 'visible';
          toggle.style.pointerEvents = 'auto';
        }
        
        var wrapper = closeBtn.parentElement;
        wrapper.style.pointerEvents = 'none';
        closeBtn.style.opacity = '0';
        closeBtn.style.visibility = 'hidden';
      });
      
      // Debug - check if close button is clickable
      closeBtn.addEventListener('mouseenter', function() {
        console.log('Mouse entered close button area');
      });
    }

    // Close menu when clicking on links
    if (resize) {
      var resizeLinks = resize.querySelectorAll('a');
      for (var i = 0; i < resizeLinks.length; i++) {
        resizeLinks[i].addEventListener('click', function() {
          resize.classList.remove('active');
          
          // Restore toggle visibility
          if (toggle) {
            toggle.style.opacity = '1';
            toggle.style.visibility = 'visible';
            toggle.style.pointerEvents = 'auto';
          }
          
          if (closeBtn) {
            var wrapper = closeBtn.parentElement;
            wrapper.style.pointerEvents = 'none';
            closeBtn.style.opacity = '0';
            closeBtn.style.visibility = 'hidden';
          }
        });
      }
    }

    // Navbar background on scroll
    if (nav) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      });
    }

    // Language dropdown toggle
    var langDropdown = document.querySelector('.lang-dropdown');
    if (langDropdown) {
      var langCurrent = langDropdown.querySelector('.lang-current');
      
      if (langCurrent) {
        langCurrent.addEventListener('click', function(e) {
          e.stopPropagation();
          langDropdown.classList.toggle('active');
        });
      }

      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!langDropdown.contains(e.target)) {
          langDropdown.classList.remove('active');
        }
      });

      // Update current language display
      var currentLang = localStorage.getItem('lang') || 'it';
      if (langCurrent) {
        langCurrent.textContent = currentLang.toUpperCase();
      }
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

