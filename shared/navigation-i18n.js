/**
 * Navigation Translations
 * Centralized translations for menu items
 */
(function() {
  'use strict';

  window.NavigationTranslations = {
    "it": {
      "nav": {
        "home": "Home",
        "about": "Su di noi",
        "services": "Servizi",
        "information": "Competenze",
        "team": "Il nostro team",
        "contact": "Contatti"
      }
    },
    "en": {
      "nav": {
        "home": "Home",
        "about": "About",
        "services": "Services",
        "information": "Expertise",
        "team": "Our team",
        "contact": "Contact"
      }
    },
    "es": {
      "nav": {
        "home": "Inicio",
        "about": "Sobre nosotros",
        "services": "Servicios",
        "information": "Competencias",
        "team": "Nuestro equipo",
        "contact": "Contacto"
      }
    }
  };


  /**
   * Update language dropdown display when language changes
   */
  document.addEventListener('navigationLoaded', function() {
    // Listen for language changes
    $(document).on('click', '.lang-btn', function() {
      var lang = $(this).data('lang');
      if (lang) {
        var langUpper = lang.toUpperCase();
        $('.lang-current').text(langUpper);
      }
    });

    // Set initial language
    var currentLang = localStorage.getItem('lang') || 'it';
    $('.lang-current').text(currentLang.toUpperCase());
  });

})();

