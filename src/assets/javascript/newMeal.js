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
        let pf = food[0];
        let ul = document.getElementsByClassName('foods-container')[0];
        let foodName = document.createElement('span');
        let kcal = document.createElement('span');
        let protein = document.createElement('span');
        let carbohydrate = document.createElement('span');
        let fiber = document.createElement('span');
        let li = document.createElement('li');
        let deleteButton = document.createElement('span');
        let editButton = document.createElement('span');
        // Criar nós de texto
        let kcalText = document.createTextNode(pf.kcal);
        let proteinText = document.createTextNode(pf.protein);
        let carbohydrateText = document.createTextNode(pf.carbohydrate);
        let fiberText = document.createTextNode(pf.fiber);
        let deleteTextNode = document.createTextNode('Apagar');
        let editTextNode = document.createTextNode('Editar');
        let predictionTextNode = document.createTextNode(pf.food_name);

        // Inserir dados do alimento
        foodName.classList = "food-name";
        li.classList = "food-item";
        editButton.append(editTextNode);
        editButton.classList = "edit-food-button";
        deleteButton.classList = "del-food-button";
        kcal.append(kcalText);
        protein.append(proteinText);
        carbohydrate.append(carbohydrateText);
        fiber.append(fiberText);
        deleteButton.append(deleteTextNode);
        foodName.append(predictionTextNode);
        // Inserir tags
        li.appendChild(foodName);
        li.appendChild(kcal);
        li.appendChild(protein);
        li.appendChild(carbohydrate);
        li.appendChild(fiber);
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        ul.appendChild(li);
        console.log(li);
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