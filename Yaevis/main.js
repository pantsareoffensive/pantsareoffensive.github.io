
let last_time = null;
let total_time = 0;

let gameResources = []; 
function Stat(name, value, max) {
    this.name = name;
    this.active = false;
    this.max = max;
    this.value = value;
    this.toString = function() {
        return this.name + ": " + this.value.toFixed(2) +" / "+this.max.toFixed(2);
    }
};

function updateCntText(element) {
    document.getElementById("#" + element.name + "cnt").innerHTML = element.toString();
}

function addCount(data, value) {
    data.value += value;
    if (data.value > data.max) {
        data.value = data.max;
    }
    updateCntText(data);
}


fetch('game.json')
    .then(response => response.json()) // Parse JSON
    .then(data => GameLoadData(data)) // Work with JSON data
    .catch(error => console.error('Error fetching JSON:', error));

function buildResources(resource) {
    document.getElementById('#resources').innerHTML += '<div class="resource"><span id="#'+ resource.name +'cnt"></span></div>' ;
    var data = new Stat(resource.name, resource.value, resource.max);
    gameResources.push(data);
    addCount(data, 0);
}    


function GameLoadData(gData) {
    gData.resources.forEach((element) => buildResources(element));
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
