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
  var studentSheetName = "生徒";
  var indexSheetName = "日付";

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var sheetname = sheet.getSheetName();

  var name = '';
  var studentSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(studentSheetName);
  var sutudentRows = studentSheet.getLastRow();
  for(var i = 1; i <= sutudentRows; i++){
    var keyname = studentSheet.getRange(i, 1).getValue()
    var nickname = studentSheet.getRange(i, 2).getValue()
    if (nickname == sheetname) {
      name = keyname;
      break;
    }
  }
  
  sheet.getRange(1, 1).setValue(keyname)
  
  if (name === '') return;
  var activeCell = sheet.getActiveCell();
  var indexSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(indexSheetName);
  var rows = indexSheet.getLastRow();
  var cols = indexSheet.getLastColumn();
  for(var i = 1; i <= rows; i++){
    sheet.getRange(1+i, 1).setValue(indexSheet.getRange(i, 1).getValue())
    var notation = sheet.getRange(1+i, 1).getA1Notation()
    sheet.getRange(1+i, 2).setValue("= QUERY(IMPORTRANGE("+vlookup+", "+notation+" & \"!A:M\"), \"SELECT * WHERE "+targetCol+"='"+name+"'\", FALSE)")
  }
  sheet.getRange(1,2).setValue("= QUERY(IMPORTRANGE("+vlookup+", A2 & \"!A:M\"), \"SELECT * WHERE "+targetCol+"='DUMMY'\", TRUE)")
}
