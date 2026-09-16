# Matrimonio Antonio e Alessia

Sito statico pronto per GitHub Pages con RSVP e Guestbook salvati in Google Sheets tramite Google Apps Script.

## File
- `index.html`: sito completo
- `Code.gs`: backend da copiare in Google Apps Script

## Configurazione
1. Crea un Google Sheet e copia il suo ID dall'indirizzo.
2. Copia `Code.gs` in Estensioni > Apps Script e inserisci lo Spreadsheet ID.
3. Distribuisci come Applicazione web, esegui come proprietario e consenti l'accesso a chiunque.
4. Copia l'URL `/exec` e sostituisci `INCOLLA_QUI_URL_WEB_APP_GOOGLE_APPS_SCRIPT` in `index.html`.
5. Carica `index.html` nel repository e attiva GitHub Pages dalla branch `main`, cartella root.
