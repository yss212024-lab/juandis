/**
 * VIDEO PROJECT INTAKE FORM — Google Sheet connector
 * --------------------------------------------------
 * Paste this into the Apps Script editor of your Google Sheet
 * (Extensions > Apps Script), then deploy it as a Web App.
 * Full steps are in README.md.
 *
 * It auto-creates a "Responses" tab, writes headers from the
 * first submission, and appends one row per form submission —
 * so you never have to edit this file even if you change the form.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000); // avoid two submissions writing at once

  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Responses') || ss.insertSheet('Responses');
    var data  = JSON.parse(e.postData.contents);

    var headers;
    if (sheet.getLastRow() === 0) {
      // First ever submission — create a header row
      headers = Object.keys(data);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight('bold')
           .setBackground('#2B2620')
           .setFontColor('#FBF4E7');
      sheet.setFrozenRows(1);
    } else {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      // Add any brand-new fields as extra columns
      Object.keys(data).forEach(function (key) {
        if (headers.indexOf(key) === -1) {
          headers.push(key);
          sheet.getRange(1, headers.length).setValue(key)
               .setFontWeight('bold')
               .setBackground('#2B2620')
               .setFontColor('#FBF4E7');
        }
      });
    }

    var row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ''; });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/* Lets you open the deployed URL in a browser to confirm it's live. */
function doGet() {
  return ContentService.createTextOutput(
    'Video Project Intake Form connector is running. ✅'
  );
}
