import { FixedBoard, Board, TorusBoard } from "./gol-core";
import { BoardUi } from "./board-ui";


enum BoardType {
    TORUS = "TORUS",
    FIXED = "FIXED"
}

function getEmInPixel(): number {
    const div = document.getElementById("emInPixel") as HTMLDivElement;
    div.style.height = "3em";
    return div.offsetHeight;
}
function calculateCellsX(): number {
    const numberOfPixelIn1em = getEmInPixel();
    const cellCountX = Math.floor((window.innerWidth - 100) / numberOfPixelIn1em);
    return cellCountX;
}
function calculateCellsY(): number {
    const numberOfPixelIn1em = getEmInPixel();
    const cellCountY = Math.floor((window.innerHeight - 250) / numberOfPixelIn1em);
    return cellCountY;
}

const width = calculateCellsX();
const height = calculateCellsY();
let boardType = BoardType.TORUS;

function createBoard(type: BoardType): Board {
    return type == BoardType.TORUS 
            ? new TorusBoard(width, height)
            : new FixedBoard(width, height);
}

const boardUi = new BoardUi("boardTable", width, height);
let board: Board = createBoard(boardType);

function onCellClick(x: number, y: number): void {
    const alive = board.coordinateIsAliveCell(x, y);
    if (alive) {
        board.removeCell(x, y);
    }
    else {
        board.addCell(x, y);
    }
    boardUi.apply(board);
}
function onTableClick(this: HTMLTableElement, ev: MouseEvent): void {
    const targetId: string = (ev.target as Element).id;
    const startsWithCell = targetId.lastIndexOf("cell-", 0) == 0;
    if (startsWithCell) {
        const xStr = (targetId.match(/(?<=\-)\d+(?=(\-))/) as RegExpMatchArray)[0];
        const yStr = (targetId.match(/(?<=\-)\d+$/) as RegExpMatchArray)[0];
        onCellClick(parseInt(xStr), parseInt(yStr));
    }
}
boardUi.addEventListener("click", onTableClick);


board.addCell(1, 0);
board.addCell(2, 1);
board.addCell(0, 2);
board.addCell(1, 2);
board.addCell(2, 2);
boardUi.apply(board);


let intervalId = -1;
function simulationIsRunning(): boolean {
    return intervalId != -1;
}

function nextStep(): void {
    board.executeCycle();
    boardUi.apply(board);
}
function play(): void {
    if (!simulationIsRunning()) {
        intervalId = setInterval(() => {
            nextStep();
        }, 200);
    }
}
function pause(): void {
    if (simulationIsRunning()) {
        clearInterval(intervalId);
        intervalId = -1;
    }
}
function clearBoard(): void {
    pause();
    board.clear();
    boardUi.apply(board);
}
function changeBoardType(this: HTMLSelectElement): void {
    const newBoardType = this.value as BoardType;
    if (boardType != newBoardType) {
        pause();
        clearBoard();
        boardType = newBoardType;
        board = createBoard(boardType);
    }
}

(document.getElementById("nextStepBtn") as HTMLButtonElement).addEventListener("click", nextStep);
(document.getElementById("playBtn") as HTMLButtonElement).addEventListener("click", play);
(document.getElementById("pauseBtn") as HTMLButtonElement).addEventListener("click", pause);
(document.getElementById("clearBtn") as HTMLButtonElement).addEventListener("click", clearBoard);
(document.getElementById("boardType") as HTMLSelectElement).addEventListener("change", changeBoardType);
