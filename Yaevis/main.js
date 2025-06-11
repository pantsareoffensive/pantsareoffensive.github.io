
let last_time = null;
let total_time = 0;

function Stat(name, id, max) {
    this.name = name;
    this.id = id;
    this.active = false;
    this.max = max;
    this.value = 0;
    this.add = function(num) {
        this.value += num;
    
        if (this.value > stat.max) {
            stat.value = stat.max;
        }
    }
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
    stat.add(value);
    updateText(stat.id, stat.toString());

}


fetch('game.json')
    .then(response => response.json()) // Parse JSON
    .then(data => gData(data)) // Work with JSON data
    .catch(error => console.error('Error fetching JSON:', error));


function GameLoadData(gData) {
    
    StartLoop();
}

function StartLoop() {
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
}


function GameUpdate(delta_time, total_time) { 
}
