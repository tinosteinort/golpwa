import { Board } from "./gol-core";
import { elementById, setHtmlContent } from "./html-accessor";


function buildBoardHtml(width: number, height: number): string {
    let table = "";
    table += "<tbody>";
    for (let y = 0; y < height; y++) {
        table += "<tr>"
        for (let x = 0; x < width; x++) {
            table += `<td id="cell-${x}-${y}"></td>`;
        }
        table += "</tr>"
    }
    table += "</tbody>";
    return table;
}

function getCell(x: number, y: number): HTMLElement {
    return elementById(`cell-${x}-${y}`) as HTMLElement;
}

function setAlive(x: number, y: number): void {
    getCell(x, y).classList.add("alive");
}
function setDead(x: number, y: number): void {
    getCell(x, y).classList.remove("alive");
}
function setAllDead(width: number, height: number): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            setDead(x, y);
        }
    }
}

export function applyToUi(board: Board): void {
    setAllDead(board.width, board.height);
    for (const cell of board.getLivingCells()) {
        setAlive(cell.x, cell.y);
    }
    setHtmlContent(elementById("generationCounter"), `${board.generationCount}`);
}

export function initTableUi(width: number, height: number, onCellClick: (x: number, y: number) => void): void {
    const table = elementById("boardTable") as HTMLTableElement;
    setHtmlContent(table, buildBoardHtml(width, height));

    function onTableClick(this: HTMLTableElement, ev: MouseEvent): void {
        const targetId: string = (ev.target as Element).id;
        const startsWithCell = targetId.lastIndexOf("cell-", 0) == 0;
        if (startsWithCell) {
            const xStr = (targetId.match(/(?<=\-)\d+(?=(\-))/) as RegExpMatchArray)[0];
            const yStr = (targetId.match(/(?<=\-)\d+$/) as RegExpMatchArray)[0];
            onCellClick(parseInt(xStr), parseInt(yStr));
        }
    }

    table.addEventListener("click", onTableClick);
}
