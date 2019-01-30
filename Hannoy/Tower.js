'use strict';

export class Tower {
    items = [];

    constructor(name) {
        this.name = name;
    }

    addItem(item) {
        if(this.checkEnableAdd(item.size)) {
            this.items.push(item);
            return true;
        }
        return false;
    }

    removeItem() {
        this.items.splice(this.items.length - 2, 1);
    }

    getLastSize() {
        return this.items[this.items.length - 1].size;
    }

    checkEnableAdd(newSize) {
        return newSize >= this.getLastSize();
    }
}