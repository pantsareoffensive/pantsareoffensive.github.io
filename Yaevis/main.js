import { gameResources } from "./v.js";

let last_time = null;
let total_time = 0;
let gameLoaded = false;

function Stat(name, value, max, gatherable) {
  this.name = name;
  this.gatherable = gatherable || false;
  this.max = max;
  this.value = value;
  this.toString = function () {
    return (
      this.name + ": " + this.value.toFixed(2) + " / " + this.max.toFixed(2)
    );
  };
}

function updateCntText(element) {
  document.getElementById("#" + element.name + "cnt").innerHTML =
    element.toString();
}

function addCount(data, value) {
  data.value += value;
  if (data.value > data.max) {
    data.value = data.max;
  }
  updateCntText(data);
}

function ClickedButton(data) {
  addCount(data, 1);
  console.log("Gathered" + data.name + ": " + data.value);
}

fetch("game.json")
  .then((response) => response.json()) // Parse JSON
  .then((data) => GameLoadData(data)) // Work with JSON data
  .catch((error) => console.error("Error fetching JSON:", error));

function buildResources(resource) {
  var data = new Stat(
    resource.name,
    resource.value,
    resource.max,
    resource.gatherable,
  );

  document.getElementById("#resources").innerHTML +=
    '<div class="resource"><span id="#' + data.name + 'cnt"></span></div>';

  console.log(
    "Resource created: " +
      data.name +
      " with value: " +
      data.value +
      " and max: " +
      data.max,
  );
  gameResources.push(data);
  updateCntText(data);

  if (data.gatherable) {
    let gatherButton =
      '<button id="#gather' + data.name + '">Gather ' + data.name + "</button>";

    document
      .getElementById("#content")
      .appendChild(document.createElement("span")).innerHTML = gatherButton;

    document
      .getElementById("#gather" + data.name)
      .addEventListener("click", function () {
        addCount(data, 1);
        console.log("Gathered " + data.name + ": " + data.value);
      });
  }
}

function getObjectByName(array, name) {
  return array.find((obj) => obj.name === name);
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
  // Update game logic here
  gameResources.forEach((resource) => {});

  // Update UI elements
  gameResources.forEach(updateCntText);
}
