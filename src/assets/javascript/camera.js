const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const image = document.getElementById('foodImage');
const captureButton = document.getElementById('capture');
const turnOffCameraButton = document.getElementById('turnoff-camera-button');

const constraints = {
    video: true
};

function drawImage() {
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
}

function stopStreaming() {
    player.srcObject.getVideoTracks().forEach(track => track.stop());
}

function takeCanvasToImage() {
    const context = canvas.getContext('2d');
    const data = canvas.toDataURL('image/png');
    image.setAttribute('src', data);
}

turnOffCameraButton.addEventListener('click', () => {
    player.srcObject.getVideoTracks().forEach(track => track.stop());
});

captureButton.addEventListener('click', () => {
    drawImage();
    takeCanvasToImage();
});

async function getUserMedia() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        player.srcObject = stream;
        
    } catch (error) {
        throw new Error('Erro => ', error);
        return error;
    }
}

getUserMedia();