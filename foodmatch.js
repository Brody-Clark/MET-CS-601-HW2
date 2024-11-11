/*jshint esversion: 6 */
const VEGETABLE = "vegetable";
const FRUIT = "fruit";
const foodMatch = document.getElementById("main");
const itemContainer = document.getElementById("draggableItems");
const foodContainer = document.getElementById("foodContainer");
const fruitDropZone = document.getElementById('fruitDropZone');
const vegDropZone = document.getElementById('vegDropZone');
const completionMsg = document.getElementById('completionMsg');

fruitDropZone.addEventListener('dragover', onFruitDragOver);
fruitDropZone.addEventListener('dragleave', onDragLeaveOrDrop);
fruitDropZone.addEventListener('drop', (event) => {
  onDragLeaveOrDrop(event);
  const itemType = event.dataTransfer.getData('type');

  if (itemType === FRUIT) {
    const itemId = event.dataTransfer.getData('text/plain');
    const fruit = document.getElementById(itemId);
    fruitDropZone.appendChild(fruit);
    checkForCompletion();
  }
});

vegDropZone.addEventListener('dragover', onVegetableDragOver);
vegDropZone.addEventListener('dragleave', onDragLeaveOrDrop);
vegDropZone.addEventListener('drop', (event) => {
  onDragLeaveOrDrop(event);
  const itemType = event.dataTransfer.getData('type');

  if (itemType === VEGETABLE) {
    const itemId = event.dataTransfer.getData('text/plain');
    const veg = document.getElementById(itemId);
    vegDropZone.appendChild(veg);
    checkForCompletion();
  }
});

function checkForCompletion() {
  if (itemContainer.children.length <= 0) {
    foodContainer.style.display = "none";
    completionMsg.style.display = "block";
    vegDropZone.setAttribute('complete', "true");
    fruitDropZone.setAttribute('complete', "true");
  }
}
function fetchItems() {
  fetch("https://brody-clark.github.io/MET-CS-601-HW2/data.json")
    .then((response) => response.json())
    .then((body) => loadItems(body))
    .catch((error) => {
      console.log(error);
    });
}

// Loop through json reponse and add new created elements to HTML
function loadItems(body) {
  for (const food in body.items) {
    let newItem = document.createElement("li");
    newItem.setAttribute('category', body.items[food].category);
    newItem.setAttribute('draggable', 'true');
    newItem.setAttribute('class', 'draggable-item');
    newItem.setAttribute('id', body.items[food].id);

    let imageItem = document.createElement("img");
    imageItem.setAttribute('src', body.items[food].img);
    imageItem.setAttribute('alt', body.items[food].name);
    imageItem.setAttribute('id', body.items[food].id);

    newItem.appendChild(imageItem);
    itemContainer.appendChild(newItem);

    newItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
      event.dataTransfer.setData('type', body.items[food].category);
      event.target.classList.add('dragging');
    });

    newItem.addEventListener('dragend', (event) => {
      event.target.classList.remove('dragging');
    });
  }
}

function onVegetableDragOver(event) {
  onDragOver(event, VEGETABLE);
}
function onFruitDragOver(event) {
  onDragOver(event, FRUIT);
}

function onDragOver(event, typeOfItem) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function onDragLeaveOrDrop(event) {
  event.currentTarget.classList.remove('drag-over');
}