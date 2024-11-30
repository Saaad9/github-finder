const spreadsheet_Container = document.getElementById('spreadsheet-container');

const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

const alphabets = 
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Cell {
    constructor(isHeader, diabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader;
        this.disabled = diabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}



function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadSheetRow = [];
        for (let j = 0; j < COLS; j++) {
            let cell_data = "";
            let isHeader = false;
            let disabeld = false;
            let rowName = i;
            let columnName = alphabets[j-1];
            
            // 행의 첫번째 요소일 때 숫자 삽입
            if (j === 0) {
                cell_data = i;
                isHeader = true;
                disabeld = true;
            }
            // 첫 번째 행일 때 숫자 삽입
            if (i === 0) {
                // 알파벳 매칭 시켜야함
                cell_data = alphabets[j-1];
                isHeader = true;
                disabeld = true;
            }

            // [0,0] 데이터 x
            if (i === 0  && j === 0) {
                cell_data = "";
                isHeader = true;
                disabeld = true;
            }

            if (columnName === undefined) {
                columnName = "0";
            }
            
            const cell = new Cell(isHeader, disabeld, cell_data, i, j, rowName, columnName, false);
            spreadSheetRow.push(cell);
        }
        spreadSheet.push(spreadSheetRow);
    }
    drawSheet();
}

initSpreadsheet();

function createCellElm (cell) { 
    const cellEl = document.createElement('input'); 
    cellEl.className = 'cell'; 
    cellEl.id = cell.rowName + cell.columnName; 
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    if(cell.isHeader) {
        cellEl.classList.add("header");
    }

    cellEl.addEventListener('keyup', (e) => {
        if (e.key === "Enter") {
            cellEl.blur();
            cellEl.classList.remove("active");
            cell.data = cellEl.value;
        }
    });

    cellEl.addEventListener('click',() =>{

        const selectRow = cell.rowName;
        const selectColumn = cell.columnName;

        const selectRowElm = document.getElementById("0" + selectColumn);
        const selectColumnElm = document.getElementById(selectRow + "0");
        
        selectRowElm.classList.add("selected");
        selectColumnElm.classList.add("selected");
        
        cellEl.classList.add("active");
    });

    cellEl.addEventListener('blur', () => {
        cellEl.classList.remove("active");
        cell.data = cellEl.value;

        const selectRow = cell.rowName;
        const selectColumn = cell.columnName;

        // 헤더 선택
        const row_header = document.getElementById("0" + selectColumn);
        const column_header = document.getElementById(selectRow + "0");

        row_header.classList.remove("selected");
        column_header.classList.remove("selected");
    });

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


const export_btn = document.getElementById('export-btn');

export_btn.addEventListener('click',exportSpreadSheet);

function exportSpreadSheet() {
    let csv = "";

    for (let i = 0; i < spreadSheet.length; i++) {
        if (i === 0) {
            continue;
        }

        csv += spreadSheet[i]
            .filter((item) => !item.isHeader)
            .map((item) => item.data)
            .join(",") + "\r\n";
    }   

    console.log(csv);

    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    console.log('csvUrl:', csvUrl);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'spreadsheet name.csv';
    a.click();
}