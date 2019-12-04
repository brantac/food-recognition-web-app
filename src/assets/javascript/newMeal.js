const modelURL = '/ml_models/tm-my-image-model/';
let model, maxPredictions;

async function init() {
    const jsonModelURL = modelURL + 'model.json';
    const metadataURL = modelURL + 'metadata.json';

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

function insertFoodItem(pf) {
    // Se há alimento identificado pelo modelo,
    // inserir o nome numa lista
    if (Object.keys(pf).length > 0) {
        let ul = document.getElementsByClassName('foods-container')[0];
        let foodName = document.createElement('span');
        let kcal = document.createElement('span');
        let protein = document.createElement('span');
        let carbohydrate = document.createElement('span');
        let fiber = document.createElement('span');
        let li = document.createElement('li');
        let deleteTextNode = document.createTextNode('Apagar');
        let deleteButton = document.createElement('span');
        let editTextNode = document.createTextNode('Editar');
        let editButton = document.createElement('span');
        let predictionTextNode = document.createTextNode(pf.className);

        editButton.append(editTextNode);
        foodName.classList = "food-name";
        editButton.classList = "edit-food-button";
        deleteButton.classList = "del-food-button";
        li.classList = "food-item";
        deleteButton.append(deleteTextNode);
        foodName.append(predictionTextNode);

        li.appendChild(foodName);
        li.appendChild(kcal);
        li.appendChild(protein);
        li.appendChild(carbohydrate);
        li.appendChild(fiber);
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        console.log(li);
        ul.appendChild(li);
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
    insertFoodItem(predictedFood);
}, false);

const fileInput = document.getElementById("input-img");
fileInput.addEventListener('change', e => {
    uploadImage();
}, false);