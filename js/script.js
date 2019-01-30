import {gameStart} from "../Hannoy/Game.mjs";

let count = localStorage.getItem('new game');
count = count ? count : 3;
gameStart(parseInt(count, 10));
localStorage.clear();