(function(){
  var currentLang = localStorage.getItem('lang') || 'it';
  var translations = null;

  // Traduzioni incorporate nel JS (fallback)
  var embeddedTranslations = {
    "it": {
      "nav": { "home": "Home", "about": "Su di noi", "services": "Servizi", "team": "Il nostro team", "contact": "Contatti" }
    },
    "en": {
      "nav": { "home": "Home", "about": "About", "services": "Services", "team": "Our team", "contact": "Contact" }
    },
    "es": {
      "nav": { "home": "Inicio", "about": "Sobre nosotros", "services": "Servicios", "team": "Nuestro equipo", "contact": "Contacto" }
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
    $('.lang-btn[data-lang="'+lang+'"]').addClass('active');
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
  });

})();
