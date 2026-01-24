/**
 * Cookie Banner Module
 * Simple GDPR-compliant cookie consent banner
 */
(function() {
  'use strict';

  var CONSENT_KEY = 'cookie_consent';
  var CONSENT_VERSION = '1.0';

  // Initialize when DOM is ready
  $(function() {
    checkConsent();
  });

  /**
   * Check if user has already given consent
   */
  function checkConsent() {
    var consent = localStorage.getItem(CONSENT_KEY);
    
    if (!consent || consent !== CONSENT_VERSION) {
      showBanner();
    }
  }

  /**
   * Show cookie consent banner
   */
  function showBanner() {
    var banner = $('<div>', {
      id: 'cookie-banner',
      class: 'cookie-banner'
    });

    var content = $('<div>', {
      class: 'cookie-content'
    });

    var text = $('<p>', {
      class: 'cookie-text',
      'data-i18n': 'cookie.message',
      html: 'Questo sito utilizza cookie tecnici per salvare le tue preferenze di lingua e migliorare la tua esperienza di navigazione.'
    });

    var buttonContainer = $('<div>', {
      class: 'cookie-buttons'
    });

    var acceptBtn = $('<button>', {
      class: 'cookie-btn cookie-accept',
      'data-i18n': 'cookie.accept',
      text: 'Accetto',
      click: acceptCookies
    });

    var privacyLink = $('<a>', {
      href: 'privacy.html',
      class: 'cookie-link',
      'data-i18n': 'cookie.privacy',
      text: 'Privacy Policy',
      target: '_blank'
    });

    buttonContainer.append(acceptBtn).append(privacyLink);
    content.append(text).append(buttonContainer);
    banner.append(content);

    $('body').append(banner);

    // Trigger animation
    setTimeout(function() {
      banner.addClass('show');
    }, 100);

    // Translate if i18n is loaded
    if (typeof translatePage === 'function') {
      var currentLang = localStorage.getItem('lang') || 'it';
      translateCookieBanner(currentLang);
    }
  }

  /**
   * Accept cookies and hide banner
   */
  function acceptCookies() {
    localStorage.setItem(CONSENT_KEY, CONSENT_VERSION);
    
    var banner = $('#cookie-banner');
    banner.removeClass('show');
    
    setTimeout(function() {
      banner.remove();
    }, 400);
  }

  /**
   * Translate cookie banner (called by i18n.js)
   */
  function translateCookieBanner(lang) {
    var translations = {
      it: {
        message: 'Questo sito utilizza cookie tecnici per salvare le tue preferenze di lingua e migliorare la tua esperienza di navigazione.',
        accept: 'Accetto',
        privacy: 'Privacy Policy'
      },
      en: {
        message: 'This site uses technical cookies to save your language preferences and improve your browsing experience.',
        accept: 'Accept',
        privacy: 'Privacy Policy'
      },
      es: {
        message: 'Este sitio utiliza cookies técnicas para guardar tus preferencias de idioma y mejorar tu experiencia de navegación.',
        accept: 'Acepto',
        privacy: 'Política de Privacidad'
      }
    };

    var t = translations[lang] || translations['it'];
    
    $('.cookie-text').html(t.message);
    $('.cookie-accept').text(t.accept);
    $('.cookie-link').text(t.privacy);
  }

  // Expose translation function
  window.translateCookieBanner = translateCookieBanner;

})();
