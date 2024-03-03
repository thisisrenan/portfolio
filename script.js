function resetZIndex() {
    // Seleciona todos os elementos com a classe específica ou outro seletor que você preferir
    var elements = document.querySelectorAll('.movable-div');
    console.log("testw")
    // Itera sobre os elementos e redefine o z-index
    elements.forEach(function(element) {
        element.style.zIndex = 0;
    });
}

class DraggableDiv {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.maxZIndex = 999;

        this.element.addEventListener("mousedown", (e) => this.startDrag(e));
    }

    startDrag(e) {
        this.isDragging = true;
        this.offsetX = e.clientX - this.element.getBoundingClientRect().left;
        this.offsetY = e.clientY - this.element.getBoundingClientRect().top;
        this.element.style.cursor = "grabbing";

        // Incrementar o z-index máximo
        resetZIndex();
        this.maxZIndex += 1;
        this.element.style.zIndex = this.maxZIndex;

        // Mudar a posição para relative se for static
        if (window.getComputedStyle(this.element).position === "static") {
            this.element.style.position = "relative";
        }

        document.addEventListener("mousemove", (e) => this.drag(e));
        document.addEventListener("mouseup", () => this.stopDrag());
    }

    drag(e) {
        if (this.isDragging) {
            const x = e.clientX - this.offsetX;
            const y = e.clientY - this.offsetY;
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
        }
    }

    stopDrag() {
        this.isDragging = false;
        this.element.style.cursor = "grab";
        document.removeEventListener("mousemove", (e) => this.drag(e));
        document.removeEventListener("mouseup", () => this.stopDrag());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const divs = document.querySelectorAll(".movable-div");

    divs.forEach((div) => {
        new DraggableDiv(div);
    });
});