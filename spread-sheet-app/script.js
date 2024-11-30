const spreadsheet_Container = document.getElementById('spreadsheet-container');

const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

const alphabets = 
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
            let cell_data = "";
            // 행의 첫번째 요소일 때 숫자 삽입
            if (j === 0) {
                cell_data = i;
            }
            // 첫 번째 행일 때 숫자 삽입
            if (i === 0) {
                // 알파벳 매칭 시켜야함
                cell_data = alphabets[j-1];
            }

            // [0,0] 데이터 x
            if (i === 0  && j === 0) {
                cell_data = "";
            }

            const cell = new Cell(false, false, cell_data, i, j, false);
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

