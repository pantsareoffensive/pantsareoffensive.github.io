
let last_time = null;
let total_time = 0;

function Stat(name, id, max) {
    this.name = name;
    this.id = id;
    this.max = max;
    this.value = 0;
    this.toString = function() {
        return this.name + ": " + this.value.toFixed(2) +" / "+this.max.toFixed(2);
    }
};

let pollen = new Stat("Pollen","#pollenCnt", 10);
let honey =  new Stat("Honey","#honeyCnt", 10);

function updateText(element, text) {
    document.getElementById(element).innerHTML = text;
}

function addCount(stat, value) {
    stat.value += value;
    if (stat.value > stat.max) {
        stat.value = stat.max;
    }
    updateText(stat.id, stat.toString());

}


setInterval(function gameLoop() {
    const current_time = Date.now();
    if (last_time === null) {
        last_time = current_time;
    }
    const delta_time = current_time - last_time;
    total_time += delta_time;
    last_time = current_time; 
    GameUpdate(delta_time, total_time);

}, 1000);

function GameUpdate(delta_time, total_time) { 
    addCount(pollen, 0.01 );
}
