import { elementById, firstElementByClassName } from "./html-accessor";

function getEmInPixel(): number {
    const div = elementById("emInPixel") as HTMLDivElement;
    div.style.height = "1em";
    return div.offsetHeight;
}

function getDivWidth(): number {
    const div = firstElementByClassName("main") as HTMLDivElement;
    return div.clientWidth;
}

function getDivHeight(): number {
    const div = firstElementByClassName("main") as HTMLDivElement;
    return div.clientHeight;
}

export function calculateCellsX(): number {
    const numberOfPixelIn1em = getEmInPixel();
    const cellCountX = Math.floor(getDivWidth() / numberOfPixelIn1em) - 4;
    return cellCountX;
}

export function calculateCellsY(): number {
    const numberOfPixelIn1em = getEmInPixel();
    const cellCountY = Math.floor(getDivHeight() / numberOfPixelIn1em) - 4;
    return cellCountY;
}
