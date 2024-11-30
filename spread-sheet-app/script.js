const spreadsheet_Container = document.getElementById('spreadsheet-container');

const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadSheetRow = [];
        for (let j = 0; j < COLS; j++) {
            spreadSheetRow.push(i + "-" + j);
        }
        spreadSheet.push(spreadSheetRow);
    }
    console.log(spreadSheet);
}

initSpreadsheet();