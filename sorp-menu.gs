function sheetname() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function isJP() {
  return (Session.getActiveUserLocale() === 'ja');
}

function onOpen(event) {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
      .addItem(isJP() ? '生徒別SOAP' : 'Student SOAP', 'generateSOAP')
      .addToUi();
}

function onInstall(event) {
  onOpen(event);
}

function generateSOAP() {
  var targetCol = "Col2";
  var vlookup = "VLOOKUP(\"シートID\", '設定'!A:B, 2, FALSE)"
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var name = sheet.getSheetName();
  var activeCell = sheet.getActiveCell();
  var indexSheetName = "日付";
  var indexSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(indexSheetName);
  var rows = indexSheet.getLastRow();
  var cols = indexSheet.getLastColumn();
  for(var i = 1; i <= rows; i++){
    sheet.getRange(1+i, 1).setValue(indexSheet.getRange(i, 1).getValue())
    var notation = sheet.getRange(1+i, 1).getA1Notation()
    sheet.getRange(1+i, 2).setValue("= QUERY(IMPORTRANGE("+vlookup+", "+notation+" & \"!A:M\"), \"SELECT * WHERE "+targetCol+"='\" & sheetname() & \"'\", FALSE)")
  }
  sheet.getRange(1,2).setValue("= QUERY(IMPORTRANGE("+vlookup+", A2 & \"!A:M\"), \"SELECT * WHERE "+targetCol+"='DUMMY'\", TRUE)")
}
