(function () {
  var currentLang = localStorage.getItem('lang') || 'it';
  var translations = null;

  // Fallback incorporato con le traduzioni (uguale a lang.json)
  var embeddedTranslations = {
  "it": {
    "slide1": {
      "theme": "PROGETTO 1",
      "title": "Una casa che vive con la luce",
      "text": "Progettata per dialogare con l'orientamento solare, Casa Aurora e' un'abitazione luminosa, essenziale e accogliente.\nGrandi aperture mettono in relazione interno ed esterno, mentre gli spazi sono organizzati per offrire comfort, privacy e continuita' visiva.\nUna residenza contemporanea dove la semplicita' diventa qualita'."
    },
    "slide2": {
      "theme": "PROGETTO 2",
      "title": "Abitare in equilibrio",
      "text": "Immersa nel verde, questa abitazione nasce dal desiderio di unire natura e architettura.\nMateriali naturali, volumi puliti e ampie superfici vetrate creano un ambiente armonioso e sostenibile.\nUn progetto che privilegia il benessere, la luce e la relazione con il paesaggio."
    },
    "slide3": {
      "theme": "PROGETTO 3",
      "title": "Il nuovo modo di abitare urbano",
      "text": "Un complesso residenziale moderno pensato per la vita contemporanea.\nLinee essenziali, spazi luminosi e soluzioni funzionali definiscono un'architettura che coniuga estetica e praticita'.\nResidenza Nova offre comfort, privacy e qualita' costruttiva in un contesto urbano dinamico."
    },
    "slide4": {
      "theme": "PROGETTO 4",
      "title": "Eleganza che dura nel tempo",
      "text": "Corte Linea nasce come risposta a un'idea di abitare sobria e raffinata.\nIl progetto valorizza la regolarita' dei volumi, la qualita' dei materiali e la chiarezza distributiva degli spazi.\nUn condominio pensato per offrire solidita', comfort e valore nel tempo."
    },
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
    "slide1": {
      "theme": "PROJECT 1",
      "title": "A house that lives with light",
      "text": "Designed to interact with solar orientation, Casa Aurora is a bright, essential and welcoming home.\nLarge openings relate interior and exterior, while spaces are organized to offer comfort, privacy and visual continuity.\nA contemporary residence where simplicity becomes quality."
    },
    "slide2": {
      "theme": "PROJECT 2",
      "title": "Living in balance",
      "text": "Immersed in greenery, this house was born from the desire to unite nature and architecture.\nNatural materials, clean volumes and large glazed surfaces create a harmonious and sustainable environment.\nA project that prioritizes well-being, light and the relationship with the landscape."
    },
    "slide3": {
      "theme": "PROJECT 3",
      "title": "The new way of urban living",
      "text": "A modern residential complex designed for contemporary life.\nEssential lines, bright spaces and functional solutions define an architecture that combines aesthetics and practicality.\nResidenza Nova offers comfort, privacy and construction quality in a dynamic urban context."
    },
    "slide4": {
      "theme": "PROJECT 4",
      "title": "Timeless elegance",
      "text": "Corte Linea was born as an answer to a sober and refined idea of living.\nThe project enhances the regularity of volumes, the quality of materials and the distributive clarity of spaces.\nA condominium designed to offer solidity, comfort and long-term value."
    },
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
    "slide1": {
      "theme": "PROYECTO 1",
      "title": "Una casa que vive con la luz",
      "text": "Diseñada para interactuar con la orientación solar, Casa Aurora es una vivienda luminosa, esencial y acogedora.\nGrandes aberturas relacionan interior y exterior, mientras los espacios se organizan para ofrecer confort, privacidad y continuidad visual.\nUna residencia contemporánea donde la simplicidad se convierte en calidad."
    },
    "slide2": {
      "theme": "PROYECTO 2",
      "title": "Vivir en equilibrio",
      "text": "Sumergida en la vegetación, esta vivienda nace del deseo de unir naturaleza y arquitectura.\nMateriales naturales, volúmenes limpios y grandes superficies acristaladas crean un ambiente armonioso y sostenible.\nUn proyecto que prioriza el bienestar, la luz y la relación con el paisaje."
    },
    "slide3": {
      "theme": "PROYECTO 3",
      "title": "La nueva forma de vivir urbano",
      "text": "Un complejo residencial moderno diseñado para la vida contemporánea.\nLíneas esenciales, espacios luminosos y soluciones funcionales definen una arquitectura que combina estética y practicidad.\nResidenza Nova ofrece confort, privacidad y calidad constructiva en un contexto urbano dinámico."
    },
    "slide4": {
      "theme": "PROYECTO 4",
      "title": "Elegancia atemporal",
      "text": "Corte Linea nació como respuesta a una idea de habitar sobria y refinada.\nEl proyecto valora la regularidad de los volúmenes, la calidad de los materiales y la claridad distributiva de los espacios.\nUn condominio diseñado per offrire solidità, comfort e valore nel tempo."
    },
    "nav": {
      "home": "Inicio",
      "about": "Sobre nosotros",
      "services": "Servicios",
      "information": "Competencias",
      "team": "Nuestro equipo",
      "contact": "Contacto"
    }
  }
}
;

  function loadTranslations(cb) {
    // prova a caricare il file esterno; in caso di fallimento usa il fallback incorporato
    $.getJSON('./lang.json').done(function (data) {
      translations = data;
      console.log('Translations loaded from lang.json', Object.keys(translations));
      cb && cb();
    }).fail(function (jqxhr, textStatus, error) {
      console.warn('Impossibile caricare lang.json via XHR:', textStatus, error);
      console.warn('Uso le traduzioni incorporate come fallback');
      translations = embeddedTranslations;
      cb && cb();
    });
  }

  function translatePage(lang) {
    if (!translations) {
      console.warn('Traduzioni non disponibili');
      return;
    }
    if (!translations[lang]) {
      console.warn('Lingua non trovata nelle traduzioni:', lang);
      return;
    }

    console.log('Traduzione pagina in:', lang);

    // aggiorna tutti gli elementi con data-i18n
    $('[data-i18n]').each(function () {
      var $el = $(this);
      var key = $el.attr('data-i18n');
      var value = getValueByKey(translations[lang], key);
      if (value !== null && value !== undefined) {
        // Se l'elemento è un input/textarea aggiorna placeholder, altrimenti usa html per mantenere eventuali tag
        if ($el.is('input') || $el.is('textarea')) {
          $el.attr('placeholder', value);
        } else {
          // Manteniamo eventuali spazi e newline coerenti
          $el.html(escapeHtmlPreserveNewlines(value));
        }
      } else {
        console.warn('Chiave non trovata:', key);
      }
    });

    // aggiorna attributo lang della pagina
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }

  function escapeHtmlPreserveNewlines(text) {
    // semplice escape per evitare injection, ma mantiene i newline come <br>
    var esc = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return esc.replace(/\n/g, '<br>');
  }

  function getValueByKey(obj, key) {
    var parts = key.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur[parts[i]] === undefined) return null;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function initButtons() {
    $('.lang-btn').each(function () {
      var $b = $(this);
      var lang = $b.data('lang');
      if (lang === currentLang) $b.addClass('active');

      $b.on('click', function () {
        if (lang === currentLang) return;
        currentLang = lang;
        $('.lang-btn').removeClass('active');
        $b.addClass('active');
        translatePage(lang);
      });
    });
  }

  // inizializza dopo che il DOM è pronto
  $(function () {
    loadTranslations(function () {
      initButtons();
      translatePage(currentLang);
    });
  });

})();
