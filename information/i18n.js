(function(){
  var currentLang = localStorage.getItem('lang') || 'it';
  var translations = null;

  // Traduzioni incorporate nel JS (fallback)
  var embeddedTranslations = {
    "it": {
      "nav": { "home": "Home", "about": "Su di noi", "services": "Servizi", "team": "Il nostro team", "contact": "Contatti" },
      "info": {
        "hero": {
          "title": "Competenze Architettoniche",
          "subtitle": "Dal concept alla realizzazione, seguiamo ogni fase del progetto con professionalita' e creativita'"
        },
        "services": {
          "title": "I Nostri Servizi",
          "item1": { "title": "Progettazione Architettonica", "desc": "Concept design, planimetrie, prospetti e sezioni tecniche per edifici residenziali e commerciali" },
          "item2": { "title": "Direzione Lavori", "desc": "Supervisione cantiere, coordinamento imprese e controllo qualita' durante l'esecuzione" },
          "item3": { "title": "Interior Design", "desc": "Progettazione d'interni, scelta materiali e coordinamento arredi per spazi funzionali ed estetici" }
        },
        "process": {
          "title": "Il Nostro Processo",
          "step1": { "title": "Analisi e Concept", "desc": "Studio delle esigenze del cliente, analisi del sito e sviluppo del concept iniziale" },
          "step2": { "title": "Progetto Preliminare", "desc": "Planimetrie, prospetti e rendering 3D per visualizzare l'idea progettuale" },
          "step3": { "title": "Progetto Esecutivo", "desc": "Elaborati tecnici dettagliati, computi metrici e documentazione per il cantiere" },
          "step4": { "title": "Realizzazione", "desc": "Direzione lavori, coordinamento e assistenza fino alla consegna finale" }
        },
        "plans": {
          "title": "Esempi di Elaborati",
          "plan1": { "title": "Planimetria Generale", "desc": "Layout completo con distribuzione spazi, quote e specifiche tecniche" },
          "plan2": { "title": "Prospetti e Sezioni", "desc": "Viste esterne e sezioni tecniche dell'edificio con dettagli costruttivi" },
          "plan3": { "title": "Dettagli Tecnici", "desc": "Particolari costruttivi, nodi strutturali e specifiche materiali" }
        },
        "cta": {
          "title": "Inizia il Tuo Progetto",
          "desc": "Contattaci per una consulenza gratuita e trasforma le tue idee in realta'",
          "button": "Contattaci"
        }
      }
    },
    "en": {
      "nav": { "home": "Home", "about": "About", "services": "Services", "team": "Our team", "contact": "Contact" },
      "info": {
        "hero": {
          "title": "Architectural Expertise",
          "subtitle": "From concept to completion, we follow every phase of the project with professionalism and creativity"
        },
        "services": {
          "title": "Our Services",
          "item1": { "title": "Architectural Design", "desc": "Concept design, floor plans, elevations and technical sections for residential and commercial buildings" },
          "item2": { "title": "Construction Management", "desc": "Site supervision, company coordination and quality control during execution" },
          "item3": { "title": "Interior Design", "desc": "Interior design, material selection and furniture coordination for functional and aesthetic spaces" }
        },
        "process": {
          "title": "Our Process",
          "step1": { "title": "Analysis and Concept", "desc": "Study of client needs, site analysis and development of initial concept" },
          "step2": { "title": "Preliminary Design", "desc": "Floor plans, elevations and 3D renderings to visualize the design idea" },
          "step3": { "title": "Executive Design", "desc": "Detailed technical drawings, bill of quantities and documentation for construction" },
          "step4": { "title": "Realization", "desc": "Construction management, coordination and assistance until final delivery" }
        },
        "plans": {
          "title": "Project Examples",
          "plan1": { "title": "General Floor Plan", "desc": "Complete layout with space distribution, dimensions and technical specifications" },
          "plan2": { "title": "Elevations and Sections", "desc": "External views and technical sections of the building with construction details" },
          "plan3": { "title": "Technical Details", "desc": "Construction details, structural nodes and material specifications" }
        },
        "cta": {
          "title": "Start Your Project",
          "desc": "Contact us for a free consultation and turn your ideas into reality",
          "button": "Contact Us"
        }
      }
    },
    "es": {
      "nav": { "home": "Inicio", "about": "Sobre nosotros", "services": "Servicios", "team": "Nuestro equipo", "contact": "Contacto" },
      "info": {
        "hero": {
          "title": "Competencias Arquitectonicas",
          "subtitle": "Del concepto a la realizacion, seguimos cada fase del proyecto con profesionalidad y creatividad"
        },
        "services": {
          "title": "Nuestros Servicios",
          "item1": { "title": "Diseno Arquitectonico", "desc": "Diseno conceptual, plantas, alzados y secciones tecnicas para edificios residenciales y comerciales" },
          "item2": { "title": "Direccion de Obra", "desc": "Supervision de obra, coordinacion de empresas y control de calidad durante la ejecucion" },
          "item3": { "title": "Diseno de Interiores", "desc": "Diseno de interiores, seleccion de materiales y coordinacion de mobiliario para espacios funcionales y esteticos" }
        },
        "process": {
          "title": "Nuestro Proceso",
          "step1": { "title": "Analisis y Concepto", "desc": "Estudio de las necesidades del cliente, analisis del sitio y desarrollo del concepto inicial" },
          "step2": { "title": "Proyecto Preliminar", "desc": "Plantas, alzados y renders 3D para visualizar la idea del proyecto" },
          "step3": { "title": "Proyecto Ejecutivo", "desc": "Planos tecnicos detallados, presupuestos y documentacion para la obra" },
          "step4": { "title": "Realizacion", "desc": "Direccion de obra, coordinacion y asistencia hasta la entrega final" }
        },
        "plans": {
          "title": "Ejemplos de Proyectos",
          "plan1": { "title": "Planta General", "desc": "Distribucion completa con espacios, cotas y especificaciones tecnicas" },
          "plan2": { "title": "Alzados y Secciones", "desc": "Vistas externas y secciones tecnicas del edificio con detalles constructivos" },
          "plan3": { "title": "Detalles Tecnicos", "desc": "Detalles constructivos, nodos estructurales y especificaciones de materiales" }
        },
        "cta": {
          "title": "Inicia Tu Proyecto",
          "desc": "Contactanos para una consulta gratuita y transforma tus ideas en realidad",
          "button": "Contactanos"
        }
      }
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
