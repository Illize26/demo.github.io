(function(){
  var currentLang = localStorage.getItem('lang') || 'it';
  var translations = null;

  // Traduzioni incorporate nel JS (fallback) - usa newline reali '\n' nelle stringhe
  var embeddedTranslations = {
    "it": {
      "hero": { "header": "I nostri servizi di progettazione alla vostra portata di mano" },
      "nav": { "home": "Home", "about": "Su di noi", "services": "Servizi", "team": "Il nostro team", "contact": "Contatti" },
      "about": {
        "heading": "BENVENUTI IN AESIS",
        "subheading": "Progettiamo spazi che danno forma al modo di vivere.",
        "info": "Ogni nostro lavoro nasce dall'ascolto, cresce nella funzione e si completa nella bellezza.\nCrediamo in un'architettura autentica, pensata per durare e per essere vissuta.",
        "projects": "I nostri Progetti"
      },
      "services": {
        "heading": "La nostra filosofia",
        "item1": "Architettura che nasce dal luogo\n\nOgni progetto parte dall'ascolto del contesto.\nLuce, clima, paesaggio e persone guidano ogni scelta.",
        "item2": "Forma con funzione\n\nLa bellezza ha senso solo se migliora la vita quotidiana.\nOgni spazio è pensato per essere vissuto, non solo guardato.",
        "item3": "Costruire con verità\n\nMateriali autentici, soluzioni durevoli, processi chiari.\nNiente artifici. Solo qualità che resiste nel tempo.",
        "item4": "Spazi che raccontano\n\nOgni progetto esprime un'identità.\nCreiamo luoghi che emozionano, accolgono e restano nella memoria."
      },
      "team": {
        "heading": "Il nostro team",
        "member1": { "name": "Diego de la Torre", "title": "CEO" },
        "member2": { "name": "Adriana Aquino", "title": "CEO" }
      },
      "footer": { "city": "Milano", "street": "Via Esempio 8", "quote": "Fai un preventivo" }
    },
    "en": {
      "hero": { "header": "Our design services at your fingertips" },
      "nav": { "home": "Home", "about": "About", "services": "Services", "team": "Our team", "contact": "Contact" },
      "about": {
        "heading": "WELCOME TO AESIS",
        "subheading": "We design spaces that shape the way of living.",
        "info": "Every project starts from listening, grows in function and is completed in beauty.\nWe believe in authentic architecture, designed to last and to be lived in.",
        "projects": "Our Projects"
      },
      "services": {
        "heading": "Our philosophy",
        "item1": "Architecture born from the place\n\nEvery project starts from listening to the context.\nLight, climate, landscape and people guide every choice.",
        "item2": "Form with function\n\nBeauty only makes sense if it improves everyday life.\nEvery space is designed to be lived in, not just looked at.",
        "item3": "Building with truth\n\nAuthentic materials, durable solutions, clear processes.\nNo artifices. Only quality that withstands time.",
        "item4": "Spaces that tell\n\nEach project expresses an identity.\nWe create places that move, welcome and remain in memory."
      },
      "team": {
        "heading": "Our team",
        "member1": { "name": "Diego de la Torre", "title": "CEO" },
        "member2": { "name": "Adriana Aquino", "title": "CEO" }
      },
      "footer": { "city": "Milan", "street": "Example Street 8", "quote": "Request a quote" }
    },
    "es": {
      "hero": { "header": "Nuestros servicios de diseño a tu alcance" },
      "nav": { "home": "Inicio", "about": "Sobre nosotros", "services": "Servicios", "team": "Nuestro equipo", "contact": "Contacto" },
      "about": {
        "heading": "BIENVENIDOS A AESIS",
        "subheading": "Diseñamos espacios que dan forma a la forma de vivir.",
        "info": "Cada proyecto nace de la escucha, crece en función y se completa en la belleza.\nCreemos en una arquitectura auténtica, diseñada para durar y para ser vivida.",
        "projects": "Nuestros Proyectos"
      },
      "services": {
        "heading": "Nuestra filosofía",
        "item1": "Arquitectura que nace del lugar\n\nCada progetto parte de la escucha del contexto.\nLa luz, el clima, el paisaje y las personas guían cada elección.",
        "item2": "Forma con función\n\nLa belleza solo tiene sentido si mejora la vida cotidiana.\nCada espacio está pensado para ser vivido, no solo mirado.",
        "item3": "Construir con verdad\n\nMateriales auténticos, soluciones duraderas, procesos claros.\nSin artificios. Solo calidad que resiste en el tiempo.",
        "item4": "Espacios che raccontano\n\nCada progetto esprime una identidad.\nCreamos luoghi che emozionano, accolgono y permanecen en la memoria."
      },
      "team": {
        "heading": "Nuestro equipo",
        "member1": { "name": "Diego de la Torre", "title": "CEO" },
        "member2": { "name": "Adriana Aquino", "title": "CEO" }
      },
      "footer": { "city": "Milán", "street": "Calle Ejemplo 8", "quote": "Solicita un presupuesto" }
    }
  };

  function loadExternalTranslations(cb) {
    $.getJSON('./lang.json').done(function(data){
      translations = data;
      console.log('Loaded lang.json');
      cb && cb();
    }).fail(function(){
      console.warn('lang.json not loaded, using embedded translations');
      translations = embeddedTranslations;
      cb && cb();
    });
  }

  function getValueByKey(obj, key) {
    var parts = key.split('.');
    var cur = obj;
    for(var i=0;i<parts.length;i++){
      if(cur[parts[i]]===undefined) return null;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function escapeHtmlPreserveNewlines(text){
    var esc = String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    return esc.replace(/\n/g,'<br>');
  }

  function translatePage(lang){
    var dict = translations && translations[lang] ? translations[lang] : embeddedTranslations[lang];
    if(!dict) { console.warn('Language not found', lang); return; }

    $('[data-i18n]').each(function(){
      var $el = $(this);
      var key = $el.attr('data-i18n');
      var val = getValueByKey(dict, key);
      if(val!==null && val!==undefined){
        if($el.is('input')|| $el.is('textarea')){
          $el.attr('placeholder', val);
        } else {
          $el.html(escapeHtmlPreserveNewlines(val));
        }
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    $('.lang-btn').removeClass('active');
    $('.lang-btn[data-lang="'+lang+'"]')
      .addClass('active');
  }

  function initButtons(){
    $('.lang-btn').on('click', function(){
      var lang = $(this).data('lang');
      if(lang===currentLang) return;
      currentLang = lang;
      translatePage(lang);
    });
    // set active on load
    $('.lang-btn[data-lang="'+currentLang+'"]').addClass('active');
  }

  $(function(){
    loadExternalTranslations(function(){
      initButtons();
      translatePage(currentLang);
    });

    // mostra il selettore lingua quando si effettua lo scroll oltre l'hero
    $(document).on('scroll', function(){
      var show = $(document).scrollTop() > ($(window).height() * 0.2); // 20% height
      $('#lang-switch').toggleClass('visible', show);
    });
  });

})();
