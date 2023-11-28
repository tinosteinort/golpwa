import { FixedBoard, Board, TorusBoard } from "./gol-core";
import { initTableUi, applyToUi } from "./board-ui";
import { elementById } from "./html-accessor";
import { calculateCellsX, calculateCellsY } from "./table-size-calculator";

function registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) =>
                console.log(`Service Worker registration complete, scope: '${registration.scope}'`))
            .catch((error) =>
                console.log(`Service Worker registration failed with error: '${error}'`));
    }
}
registerServiceWorker();

enum BoardType {
    TORUS = "TORUS",
    FIXED = "FIXED"
}

const width = calculateCellsX();
const height = calculateCellsY();
let boardType = BoardType.TORUS;

function createBoard(type: BoardType): Board {
    return type == BoardType.TORUS
        ? new TorusBoard(width, height)
        : new FixedBoard(width, height);
}
let board: Board = createBoard(boardType);


function onCellClick(x: number, y: number): void {
    const alive = board.coordinateIsAliveCell(x, y);
    if (alive) {
        board.removeCell(x, y);
    }
    else {
        board.addCell(x, y);
    }
    applyToUi(board);
}

function createAndShowInitialFigure(): void {
    board.addCell(1, 0)
        .addCell(2, 1)
        .addCell(0, 2)
        .addCell(1, 2)
        .addCell(2, 2);
    applyToUi(board);
}

initTableUi(width, height, onCellClick);
createAndShowInitialFigure();


let intervalId = -1;
function simulationIsRunning(): boolean {
    return intervalId != -1;
}

function nextStep(): void {
    board.executeCycle();
    applyToUi(board);
}
function play(): void {
    if (!simulationIsRunning()) {
        intervalId = window.setInterval(() => {
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
    applyToUi(board);
}
function changeBoardType(this: HTMLSelectElement): void {
    const newBoardType = this.value as BoardType;
    if (boardType != newBoardType) {
        pause();
        clearBoard();
        boardType = newBoardType;
        board = createBoard(boardType);
    }
    createAndShowInitialFigure();
}

(elementById("nextStepBtn") as HTMLButtonElement).addEventListener("click", nextStep);
(elementById("playBtn") as HTMLButtonElement).addEventListener("click", play);
(elementById("pauseBtn") as HTMLButtonElement).addEventListener("click", pause);
(elementById("clearBtn") as HTMLButtonElement).addEventListener("click", clearBoard);
(elementById("boardType") as HTMLSelectElement).addEventListener("change", changeBoardType);
