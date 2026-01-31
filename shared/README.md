# Shared Navigation System

Sistema di navigazione centralizzato per tutti gli index del progetto.

## Struttura

```
shared/
??? navigation.html        Template HTML del menu
??? navigation.js          Logica e caricamento automatico
??? navigation.css         Stili del menu
??? navigation-i18n.js     Traduzioni menu
```

## Come usare

### 1. Includi i file nel tuo HTML

```html
<head>
    <!-- Altri CSS -->
    <link rel="stylesheet" href="shared/navigation.css"> <!-- o ../shared/navigation.css se in subdirectory -->
</head>
<body>
    <!-- Container per il menu (obbligatorio!) -->
    <div id="navigation-container"></div>
    
    <!-- Resto del contenuto -->
    
    <!-- Script alla fine del body -->
    <script src="shared/navigation.js"></script> <!-- o ../shared/navigation.js -->
    <script src="shared/navigation-i18n.js"></script>
    <script src="i18n.js"></script> <!-- Il tuo file i18n esistente -->
</body>
```

### 2. Path automatici

Il sistema rileva automaticamente se sei in:
- Root: `index.html` -> usa percorso relativo `.`
- Slider: `slider/index.html` -> usa percorso relativo `..`
- Information: `information/index.html` -> usa percorso relativo `..`

**Non devi modificare nulla!** Il sistema si adatta automaticamente.

### 3. Traduzioni

Le traduzioni del menu sono in `shared/navigation-i18n.js`.
Per aggiungere una nuova voce:

```javascript
window.NavigationTranslations = {
  "it": {
    "nav": {
      "home": "Home",
      "newItem": "Nuovo Item"  // <-- Aggiungi qui
    }
  }
}
```

Poi nel template `navigation.html`:
```html
<li><a href="#section" data-i18n="nav.newItem">Nuovo Item</a></li>
```

## ?? Modifica il menu

### Cambiare il logo:
Modifica `navigation.html` linea 3:
```html
<a href="BASE_PATH/index.html"><img src="BASE_PATH/logo.png" alt="logo" id="logo"/></a>
```

### Aggiungere link:
Modifica `navigation.html` e aggiungi:
```html
<li><a href="BASE_PATH/new-page.html" data-i18n="nav.newPage">New Page</a></li>
```

### Cambiare stili:
Modifica `shared/navigation.css`:
- Colori navbar: linea 24 (`.nav.scrolled`)
- Hover colore: linea 62 (`.nav #menu li a:hover`)
- Mobile menu: dalla linea 239

## ?? Vantaggi

? **Un solo punto di modifica** - Cambi una volta, si aggiorna ovunque
? **Consistenza** - Stesso menu su tutte le pagine
? **Facile manutenzione** - Traduzioni e stili centralizzati
? **Path automatici** - Funziona in qualsiasi directory
? **Responsive** - Desktop e mobile già configurati

## ?? Eventi personalizzati

Dopo che il menu è caricato, viene emesso l'evento `navigationLoaded`:

```javascript
document.addEventListener('navigationLoaded', function() {
  console.log('Menu caricato!');
  // Il tuo codice qui
});
```

## ?? Note

- Il container `<div id="navigation-container"></div>` è **obbligatorio**
- Deve essere posizionato dove vuoi che appaia il menu (di solito all'inizio del body)
- Gli script devono essere caricati nell'ordine specificato
