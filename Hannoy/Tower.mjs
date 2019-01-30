'use strict';

export class Tower {

    constructor(name, num, count) {
        this.name = name;
        this.num = num;
        this.count = count;
        this.items = [];
        this.x = this.num * 400;
        this.y = 250;
    }

    renderTower() {
        let container = document.getElementsByClassName('container');
        this.tower = document.createElement("DIV");
        this.tower.className = "tower droppable";
        this.tower.style.width = '30px';
        this.tower.style.height = (this.count * 75) + 'px';
        container[0].appendChild(this.tower);
        this.tower.style.left = (this.x - 15) + 'px';
        this.tower.style.top = this.y + 'px';
    }

    addItem(item) {
        if(this.checkEnableAdd(item.size)) {
            this.items.push(item);
            this.resetDraggable();
            return {x: this.x, y: (this.y + (this.count - this.items.length) * 75)};
        }
        return false;
    }

    hasItem(item) {
        for(let i = 0;i < this.items.length; i++) {
            if(this.items[i].name === item.name) {
                return true;
            }
        }
        return false;
    }

    removeItem() {
        if(this.items.length > 1){
            this.items.splice(-1, 1);
        } else {
            this.items = [];
        }
        this.resetDraggable();
    }

    getLastSize() {
        return this.items.length > 0 ? (this.items[this.items.length - 1].size) : 0;

    }

    checkEnableAdd(newSize) {
        let last = this.getLastSize();
        return last ? (newSize <= last) : true;
    }

    resetDraggable() {
        for(let i = 0; i < this.items.length; i++) {
            this.items[i].circle.className = 'circle';
            if(i === this.items.length - 1 )
            {
                this.items[this.items.length - 1].circle.className = 'circle draggable';
            }
        }
    }
}