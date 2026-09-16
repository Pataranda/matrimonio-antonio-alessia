const SPREADSHEET_ID = '153F1VxwUTEZymcZDdLaPbaTb4igyGFqOxM8dXBmkp30';
const TURNSTILE_SECRET = '0x4AAAAAAE44C5LBnAvFH1umZ2eov3tnuno';
function doPost(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const p = e.parameter || {};

if (!verifyTurnstile(p['cf-turnstile-response'])) {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        ok: false,
        error: 'turnstile_failed'
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}

  const type = p.type === 'guestbook' ? 'guestbook' : 'rsvp';
  const sheetName = type === 'guestbook' ? 'Guestbook' : 'RSVP';
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (type === 'guestbook') sheet.appendRow(['Data', 'Nome', 'Messaggio']);
    else sheet.appendRow(['Data', 'Nome', 'Partecipazione', 'Persone', 'Note']);
  }
  if (type === 'guestbook') sheet.appendRow([new Date(), clean(p.name), clean(p.message)]);
  else sheet.appendRow([new Date(), clean(p.name), clean(p.attendance), clean(p.guests), clean(p.notes)]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}

function clean(value) {
  value = String(value || '').trim();
  if (/^[=+\-@]/.test(value)) value = "'" + value;
  return value.substring(0, 500);
}
function verifyTurnstile(token) {
  const response = UrlFetchApp.fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'post',
      payload: {
        secret: TURNSTILE_SECRET,
        response: token
      }
    }
  );
  const result = JSON.parse(response.getContentText());
  return result.success === true;
}
