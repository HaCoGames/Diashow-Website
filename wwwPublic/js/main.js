let last_image = null;

document.addEventListener('DOMContentLoaded', async function() {
    let image = document.getElementById('img');
    let images = await fetch('/api/images').then(res => res.json());
    let index = 0; 
    let interval = 2000;

    last_image = image.childNodes[1];

    let intervalF = async function() {
        if (index >= images.length) {
            index = 0;
            images = await fetch('/api/images').then(res => res.json());
        }
        if (last_image) last_image.parentNode.removeChild(last_image);
        last_image = newImage(`/api/image/${images[index++]}`);
        last_image.style.width = "100%";
        last_image.style.height = "100%";
        last_image.id = "last_image";
        image.appendChild(last_image);
    }

    setInterval(intervalF, interval);
});

function newImage(src){
    var tmp = new Image();
    tmp.src = src;
    return tmp
}

const fullscreenButton = document.getElementById('fullscreen-button');
const fullscreenImage = document.getElementById('img');

// Toggle fullscreen mode when the button is clicked
fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Go into fullscreen mode
        if (fullscreenImage.requestFullscreen) {
            fullscreenImage.requestFullscreen();
        } else if (fullscreenImage.mozRequestFullScreen) { /* Firefox */
            fullscreenImage.mozRequestFullScreen();
        } else if (fullscreenImage.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            fullscreenImage.webkitRequestFullscreen();
        } else if (fullscreenImage.msRequestFullscreen) { /* IE/Edge */
            fullscreenImage.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}





