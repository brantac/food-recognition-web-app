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

const imgTag = document.getElementById('foodImage');
imgTag.addEventListener('load', async e =>{
    let predictedFood = {};
    const response = await predict();
    predictedFood = myNewMeal.getFoodWithHighestProbability(response);

    if (Object.keys(predictedFood) > 0) {
        let ul = document.getElementsByClassName('foods')[0];
        let li = document.createElement('li');
        // let textNode = document.createTextNode(predictedFood.className);
        let textNode = document.createTextNode("Hi");
        li.appendChild(textNode);
        ul.appendChild(li);
    }
}, false);

const fileInput = document.getElementById("input-img");
fileInput.addEventListener('change', e => {
    uploadImage();
}, false);