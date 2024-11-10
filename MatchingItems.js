const itemContainer = document.getElementById("draggableItems");
const fruitDropZone = document.getElementById('fruitDropZone');
const vegDropZone = document.getElementById('vegDropZone');

// Add event listeners for the fruit drop zone
fruitDropZone.addEventListener('dragover', handleDragOver);
fruitDropZone.addEventListener('dragleave', handleDragLeaveOrDrop);
fruitDropZone.addEventListener('drop', (event) => {
  handleDragLeaveOrDrop(event); // Remove visual feedback
  const itemType = event.dataTransfer.getData('type');

  if (itemType === 'fruit') {
    const itemId = event.dataTransfer.getData('text/plain');
    const fruit = document.getElementById(itemId);
    fruitDropZone.appendChild(fruit); // Move the fruit to its drop zone
  }
});

// Add event listeners for the vegetable drop zone
vegDropZone.addEventListener('dragover', handleDragOver);
vegDropZone.addEventListener('dragleave', handleDragLeaveOrDrop);
vegDropZone.addEventListener('drop', (event) => {
  handleDragLeaveOrDrop(event); // Remove visual feedback
  const itemType = event.dataTransfer.getData('type');

  if (itemType === 'vegetable') {
    const itemId = event.dataTransfer.getData('text/plain');
    const veg = document.getElementById(itemId);
    vegDropZone.appendChild(veg); // Move the vegetable to its drop zone
  }
});


function fetchItems(){
    fetch("https://brody-clark.github.io/MET-CS-601-HW2/data.json")
    .then((response) => response.json())
    .then((body) => loadItems(body))
    .catch((error) =>{
      console.log(error)
    });
}

// Loop through json reponse and add new created elements to HTML
function loadItems(items){
    for(let i = 0; i < body.lenght; i++){
        let obj = body[i];
        let newItem = document.createElement("li");

        newItem.setAttribute('category', obj.category);
        newItem.setAttribute('draggable', 'true');
        newItem.setAttribute('class', 'draggable-item');
        newItem.setAttribute('id', obj.id);
        newItem.textContent = obj.name;

        itemContainer.appendChild(newItem);

        newItem.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.dataTransfer.setData('type', obj.category);
            event.target.classList.add('dragging');
        });
        
        newItem.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });
    }
}

// Function to handle 'dragover' event for both drop zones
function handleDragOver(event) {
  event.preventDefault(); // Allow dropping
  event.currentTarget.classList.add('drag-over');
}

// Function to handle 'dragleave' and 'drop' events for both drop zones
function handleDragLeaveOrDrop(event) {
  event.currentTarget.classList.remove('drag-over');
}