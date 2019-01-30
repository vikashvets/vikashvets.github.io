import {Item} from "../Hannoy/Item.mjs";
import {Tower} from "../Hannoy/Tower.mjs";
import {DragManager} from "./DragManager.mjs";

export function gameStart(count) {
    let stats = 0;

    let towers = [
        new Tower('start tower', 1, count),
        new Tower('tower', 2, count),
        new Tower('tower', 3, count)
    ];
    let manager = new DragManager;

    renderTowers(towers);
    renderFirstItems(towers, count);

    function renderFirstItems(towers, count) {
        for (let i = 0; i < count; i++) {
            let item = new Item('circle' + (count - i), (count + 1 - i) * 75, 'red');
            let coordinates = towers[0].addItem(item);
            item.renderItem(coordinates.x, coordinates.y, checkNewTower);
            towers[0].resetDraggable();
        }
    }

    function renderTowers(towers) {
        for (let i = 0; i < towers.length; i++) {
            towers[i].renderTower();
        }
    }

    function checkNewTower(item) {
        let borders = item.getBorders();
        for (let i = 0; i < towers.length; i++) {
            if (towers[i].x <= borders.right && towers[i].x >= borders.left && !towers[i].hasItem(item)) {
                if (towers[i].checkEnableAdd(item.size)) {
                    towers[findTower(towers, item)].removeItem();
                    let result = towers[i].addItem(item);
                    stats++;
                    checkEndGame();
                    return result;
                }
            }
        }
        return false;
    }

    function findTower(towers, item) {
        for (let i = 0; i < towers.length; i++) {
            if (towers[i].hasItem(item)) {
                return i;
            }
        }
    }

    function checkEndGame() {
        for (let i = 0; i < towers.length; i++) {
            if ((towers[i].items.length === count) && (towers[i].name !== 'start tower')) {
                alert('You win! Total steps: ' + stats + '. Get ready to the next level!');
                localStorage.setItem('new game', (count < 7 ? count + 1 : 2));
                location.reload();
            }
        }
    }
}






