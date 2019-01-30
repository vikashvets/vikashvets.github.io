'use strict';

export class Item {

    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.circle = document.createElement("DIV");
        this.prev = {
            x: 0,
            y: 0,
        };
        this.x = 0;
        this.y = 0;
    }

    renderItem(x, y, callback) {
        let container = document.getElementsByClassName('container');
        this.circle.className = "circle";
        this.circle.style.backgroundColor = this.color;
        this.circle.style.width = this.size + 'px';
        this.circle.zIndex = 10;
        container[0].appendChild(this.circle);
        this.circle.style.left = (x - this.size / 2) + 'px';
        this.circle.style.top = y + 'px';
        this.x = (x - this.size / 2);
        this.y = y;
        let draggable = this;
        this.circle.onmousedown = function (e) {
            if (e.which !== 1 || !draggable.circle.classList.contains('draggable')) {
                return;
            }

            draggable.circle.onmouseup = function (e) {
                draggable.moveItem(e.pageX, e.pageY);
                let result = callback(draggable);
                if (result) {
                    draggable.moveItem(result.x, result.y);
                    draggable.setBase();
                }
                draggable.resetItem();
                draggable.circle.onmousemove = null;
                draggable.circle.onmouseup = null;
            }
        };


        this.setBase();
    }

    setBase() {
        this.prev.x = this.x;
        this.prev.y = this.y;
    }

    moveItem(x, y) {
        this.x = (x - this.size / 2);
        this.y = y;
    }

    resetItem() {
        this.circle.style.left = this.prev.x + 'px';
        this.circle.style.top = this.prev.y + 'px';
        this.x = this.prev.x;
        this.y = this.prev.y;
    }

    getBorders() {
        return {
            left: this.x,
            right: this.x + this.size,
        }
    }
}