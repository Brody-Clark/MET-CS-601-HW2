

function fetchItems(){
    fetch("https://brody-clark.github.io/MET-CS-601-HW2/data.json")
    .then((response) => response.json())
    .then((body) => console.log(body));
}