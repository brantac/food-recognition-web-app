// const modelURL = '/ml_models/tm-my-image-model/';
const modelURL = '/ml_models/image-model-two/';
let model, maxPredictions;

async function init() {
    const jsonModelURL = modelURL + 'model.json';
    const metadataURL = modelURL + 'metadata.json';

    // Instanciação do objeto refeição
    // document.querySelector('#meal-date').innerHTML = myNewMeal.myMeal.meal.dateTime;

    model = await tmImage.load(jsonModelURL, metadataURL);
    console.log("Model loaded.");
    maxPredictions = model.getTotalClasses();
}
init();

async function uploadImage() {
    let uploadedFile = document.getElementById("input-img").files[0];
    let imgContainer = document.getElementById('foodImage');
    imgContainer.src = URL.createObjectURL(uploadedFile);
}

async function predict() {
    let response = await model.predict(document.getElementById('foodImage'));
    return response;
}

function insertFoodItem(food) {
    // Se há alimento identificado pelo modelo,
    // inserir o nome numa lista
    if (food.length > 0) {
        // Get the first food in the list of foods
        // returned.
        let pf = food[0];

        // Get the table element
        let tableBody = document.querySelector('tbody');

        // Create a table row and then table data tags
        // for each food info
        let tablerow = document.createElement('tr');
        let foodName = document.createElement('td');
        let kcal = document.createElement('td');
        let protein = document.createElement('td');
        let carbohydrate = document.createElement('td');
        let fiber = document.createElement('td');

        // Create 'delete' and 'edit' food buttons
        let deleteButton = document.createElement('button');
        let editButton = document.createElement('button');

        // Create text nodes with each info of the food
        let foodNameTextNode = document.createTextNode(pf.food_name);
        let kcalText = document.createTextNode(pf.kcal);
        let proteinText = document.createTextNode(pf.protein);
        let carbohydrateText = document.createTextNode(pf.carbohydrate);
        let fiberText = document.createTextNode(pf.fiber);
        let editButtonText = document.createTextNode('Editar');
        let deleteButtonText = document.createTextNode('X');

        // Insert food info text nodes into their own 'td' tags
        kcal.append(kcalText);
        protein.append(proteinText);
        carbohydrate.append(carbohydrateText);
        fiber.append(fiberText);
        foodName.append(foodNameTextNode);

        // Insert text node into delete and edit buttons
        editButton.append(editButtonText);
        deleteButton.append(deleteButtonText);
        editButton.classList = "edit-food-button";
        deleteButton.classList = "del-food-button";

        // Inserir tags
        tablerow.appendChild(foodName);
        tablerow.appendChild(kcal);
        tablerow.appendChild(protein);
        tablerow.appendChild(carbohydrate);
        tablerow.appendChild(fiber);
        tablerow.appendChild(deleteButton);
        tablerow.appendChild(editButton);
        tableBody.appendChild(tablerow);
    }
}

// Event listener que escuta as mudanças de imagens.
// Quando uma nova imagem carregar, prever o alimento
// que está nela.
const imgTag = document.getElementById('foodImage');
imgTag.addEventListener('load', async e =>{
    let predictedFood = {};
    const response = await predict();
    predictedFood = myNewMeal.getFoodWithHighestProbability(response);
    let foodComp = await myNewMeal.getFoodComposition(`/meal/get-food-composition?className=${predictedFood.className}`);
    myNewMeal.addFood(foodComp[0]);
    insertFoodItem(foodComp);
}, false);

document.getElementById("input-img")
.addEventListener('change', e => {
    uploadImage();
}, false);

document.getElementById('save-meal-button')
.addEventListener('click', async e => {
    e.preventDefault();
    let response = await myNewMeal.saveFood('/meal/save');
    console.log(response);
}, false);

let myNewMeal = new Meal();
myNewMeal.mealSucessMessage();