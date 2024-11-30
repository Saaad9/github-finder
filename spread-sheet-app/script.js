const spreadsheet_Container = document.getElementById('spreadsheet-container');

const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

class Cell {
    constructor(isHeader, diabled, data, row, column, active = false) {
        this.isHeader = isHeader;
        this.disabled = diabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.active = active;
    }
}



function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadSheetRow = [];
        for (let j = 0; j < COLS; j++) {
            const cell = new Cell(false, false, "", i, j, false);
            spreadSheetRow.push(cell);
        }
        spreadSheet.push(spreadSheetRow);
    }
    drawSheet();
    console.log(spreadSheet);
}

initSpreadsheet();

function createCellElm (cell) { 
    const cellEl = document.createElement('input'); 
    cellEl.className = 'cell'; 
    cellEl.id = 'cell_' + cell.row + cell.column; 
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    return cellEl;
}

function drawSheet() {
    for (let i = 0; i < spreadSheet.length; i++) {
        const rowEl = document.createElement('div');
        rowEl.className = 'cell-row';
        for (let j = 0; j < spreadSheet[i].length; j++)  {
            const cell = spreadSheet[i][j];
            rowEl.appendChild(createCellElm(cell));
        }
        spreadsheet_Container.appendChild(rowEl);
    }
}