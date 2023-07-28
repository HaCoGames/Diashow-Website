document.addEventListener('DOMContentLoaded', init);

async function init() {
    const container = document.getElementById('dataContainer');
    container.appendChild(makeImageContaier(await fetchImages()));
}

//--------------------------------------------------------------------------------------------------->
//Image diplay
//make the image container
function makeImageContaier(images) {
    const container = document.createElement('div');
    container.id = 'dataContainer';
    
    for (let image of images) {
        const element = document.createElement('div');
        element.className = 'imageContainer';
        element.innerHTML = image;
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        
            const { clientX: mouseX, clientY: mouseY } = event;
            
            menu.style.top  = `${mouseY}px`;
            menu.style.left = `${mouseX}px`;
        
            menu.removeAttribute('hidden');
        });

        container.appendChild(element);
    }

    return container;
}

async function fetchImages() {
    let images = await fetch('/api/images').then(response => response.json());
    return images;
}

//--------------------------------------------------------------------------------------------------->
//Upload Image and buttons
document.getElementById('upload-button').addEventListener('click', uploadImage);

function uploadImage() {
    let uploadBox = document.getElementById('upload-box');
    uploadBox.style.display="block";

    console.log("uploading");
}

document.getElementById('close-button').addEventListener('click', closeUploadBox);

function closeUploadBox() {
    let uploadBox = document.getElementById('upload-box');
    uploadBox.style.display="none";
}

//--------------------------------------------------------------------------------------------------->
//Context menue tests

const menu = document.querySelector('#context-menu');

document.addEventListener('click', (e) => {
    if (e.target.offsetParent != menu) {
        menu.setAttribute('hidden','true');
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        menu.setAttribute('hidden','true');
    }
});