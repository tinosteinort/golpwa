export class Cell {

    constructor(public readonly x: number, public readonly y: number) {

    }
}

export enum Status {
    DEAD = "DEAD",
    ALIVE = "ALIVE"
}

export interface Rule {
    matches(currentStatus: Status, neighbourCount: number): boolean;
    getStatus(): Status;
}

export class OverPopulationRule implements Rule {

    matches(currentStatus: Status, neighbourCount: number): boolean {
        return neighbourCount > 3;
    }
    
    getStatus(): Status {
        return Status.DEAD;
    }
}

export class RecreationRule implements Rule {

    matches(currentStatus: Status, neighbourCount: number): boolean {
        return currentStatus == Status.DEAD && neighbourCount == 3;
    }
    
    getStatus(): Status {
        return Status.ALIVE;
    }
}

export class SurvivalRule implements Rule {

    matches(currentStatus: Status, neighbourCount: number): boolean {
        return currentStatus == Status.ALIVE 
            && (neighbourCount == 2 || neighbourCount == 3);
    }
    
    getStatus(): Status {
        return Status.ALIVE;
    }
}

export class UnderPopulationRule implements Rule {

    matches(currentStatus: Status, neighbourCount: number): boolean {
        return currentStatus == Status.DEAD || neighbourCount < 2;
    }
    
    getStatus(): Status {
        return Status.DEAD;
    }
}

export class StatusCalculator {

    private rules: Array<Rule> = [
        new RecreationRule(),
        new SurvivalRule(),
        new UnderPopulationRule(),
        new OverPopulationRule()
    ];

    public calculateStatus(currentStatus: Status, neighbourCount: number): Status {
        for (const rule of this.rules) {
            if (rule.matches(currentStatus, neighbourCount)) {
                return rule.getStatus();
            }
        }
        throw Error("Could not find a matching rulue");
    }
}

export abstract class Board {

    private statusCalculator = new StatusCalculator();
    private livingCells: Array<Cell> = [];
    private newLivingCells: Array<Cell> = [];

    constructor(public readonly width: number, public readonly height: number) {
        
    }

    public executeCycle(): void {
        this.calculateNextStatusOfCells(Status.ALIVE, this.livingCells);
        const deadNeighbours = this.determineDeadNeighbourCells();
        this.calculateNextStatusOfCells(Status.DEAD, deadNeighbours);

        this.updateLivingCells();
    }
    
    private calculateNextStatusOfCells(currentStatus: Status, cells: Array<Cell>): void {
        cells.forEach((cell: Cell) => {
            const neigbours = this.determineLivingNeighbourCells(cell);
            const newStatus = this.statusCalculator.calculateStatus(currentStatus, neigbours.length);

            if (newStatus == Status.ALIVE) {
                this.newLivingCells.push(cell);
            }
        });
    }

    protected abstract getNeighbours(cell: Cell): Array<Cell>;

    private determineLivingNeighbourCells(cell: Cell): Array<Cell> {
        const livingNeighbours: Array<Cell> = [];
        for (const neighbour of this.getNeighbours(cell)) {
            if (this.cellIsAlive(neighbour)) {
                livingNeighbours.push(neighbour);
            }
        }
        return livingNeighbours;
    }

    private determineDeadNeighbourCells(): Array<Cell> {
        const deadNeighbours: Array<Cell> = []
        for (const cell of this.livingCells) {
            for (const neighbour of this.getNeighbours(cell)) {
                if (!this.cellIsAlive(neighbour)
                        && !this.cellIsInArray(deadNeighbours, neighbour)) {
                    deadNeighbours.push(neighbour);
                }
            }
        }
        return deadNeighbours;
    }

    private cellIsInArray(cells: Array<Cell>, cellToCheck: Cell): boolean {
        for (const cell of cells) {
            if (cell.x == cellToCheck.x && cell.y == cellToCheck.y) {
                return true;
            }
        }
        return false;
    }

    private updateLivingCells(): void {
        this.livingCells.splice(0, this.livingCells.length);
        this.livingCells = this.livingCells.concat(this.newLivingCells);
        this.newLivingCells.splice(0, this.newLivingCells.length);
    }
    
    private cellIsAlive(cellToCheck: Cell): boolean {
        for (const cell of this.livingCells) {
            if (cell.x == cellToCheck.x 
                && cell.y == cellToCheck.y) {
                    return true;
                }
            }
        return false;
    }
    
    public coordinateIsAliveCell(x: number, y: number): boolean {
        return this.cellIsAlive(new Cell(x, y));
    }

    public addCell(x: number, y: number): Board {
        this.livingCells.push(new Cell(x, y));
        return this;
    }

    private indexOfCell(cell: Cell): number {
        for (let i = 0; i < this.livingCells.length; i++) {
            const currentCell = this.livingCells[i];
            if (currentCell.x == cell.x 
                    && currentCell.y == cell.y) {
                return i;
            }
        }
        return -1;
    }

    public removeCell(x: number, y: number): Board {
        const index = this.indexOfCell(new Cell(x, y));
        if (index > -1) {
            this.livingCells.splice(index, 1);
        }
        return this;
    }

    public clear(): Board {
        this.livingCells.splice(0, this.livingCells.length);
        return this;
    }

    public getLivingCells(): Array<Cell> {
        return this.livingCells;
    }
}

export class FixedBoard extends Board {

    constructor(public readonly width: number, public readonly height: number) {
        super(width, height);
    }

    protected getNeighbours(cell: Cell): Array<Cell> {
        const neighbours: Array<Cell> = [];

        for (let x = cell.x -1; x <= cell.x + 1; x++) {
            for (let y = cell.y -1; y <= cell.y + 1; y++) {
                if (!this.pointIsInBound(x, y) || (x == cell.x && y == cell.y)) {
                    continue;
                }
                neighbours.push(new Cell(x, y));
            }
        }

        return neighbours;
    }

    private pointIsInBound(x: number, y: number): boolean {
        return x >= 0 && x < this.width
            && y >= 0 && y < this.height;
    }
}

export class TorusBoard extends Board {

    constructor(public readonly width: number, public readonly height: number) {
        super(width, height);
    }

    protected getNeighbours(cell: Cell): Array<Cell> {
        const neighbours: Array<Cell> = [];

        for (let x = cell.x -1; x <= cell.x + 1; x++) {
            for (let y = cell.y -1; y <= cell.y + 1; y++) {
                if (x == cell.x && y == cell.y) {
                    continue;
                }
                neighbours.push(new Cell(this.translateX(x), this.translateY(y)));
            }
        }

        return neighbours;
    }

    private translateX(x: number): number {
        if (x < 0) {
            return this.width - 1;
        }
        if (x >= this.width) {
            return 0;
        }
        return x;
    }

    private translateY(y: number): number {
        if (y < 0) {
            return this.height - 1;
        }
        if (y >= this.height) {
            return 0;
        }
        return y;
    }
}
