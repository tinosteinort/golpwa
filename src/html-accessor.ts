
export function elementById(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
}

export function firstElementByClassName(className: string): HTMLElement {
    return document.getElementsByClassName(className)[0] as HTMLElement;
}

export function setHtmlContent(element: HTMLElement, html: string): void {
    element.innerHTML = html;
}