import { Board } from "./gol-core";

export class BoardUi {

    private table: HTMLTableElement;

    constructor(private readonly tableId: string, private width: number, private height: number) {
        this.table = document.getElementById(tableId) as HTMLTableElement;
        this.table.innerHTML = this.buildBoard(width, height);
    }

    private buildBoard(width: number, height: number): string {
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
    
    private getCell(x: number, y: number): HTMLElement {
        return document.getElementById(`cell-${x}-${y}`) as HTMLElement;
    }
    
    private setAlive(x: number, y: number): void {
        const cell = this.getCell(x, y);
        cell.classList.add("alive");
    }
    private setDead(x: number, y: number): void {
        const cell = this.getCell(x, y);
        cell.classList.remove("alive");
    }
    private setAllDead(width: number, height: number): void {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.setDead(x, y);
            }
        }
    }

    public apply(board: Board): void {
        this.setAllDead(board.width, board.height);
        for (const cell of board.getLivingCells()) {
            this.setAlive(cell.x, cell.y);
        }
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
        this.table.addEventListener(type, listener, options);
    }
}