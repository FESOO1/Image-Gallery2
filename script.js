const galleryImagesContainer = document.querySelector('.gallery-images');
const prevImageButton = document.getElementById('prevImageButton');
const nextImageButton = document.getElementById('nextImageButton');
let activeImageIndex = 0;
let firstImageMargin = 0;

// DISPLAY IMAGES

async function displayImages() {
    const response = await fetch('./image-data.json');
    const imageData = await response.json();
    
    // CREATING AS MANY IMAGE ELEMENTS AS THERE ARE IMAGE URLs IN THE JSON FILE.
    for (let i = 0; i < imageData.photos.length; i++) {
        const image = document.createElement('img');
        image.classList.add('gallery-image');
        image.src = imageData.photos[i].url;
        galleryImagesContainer.appendChild(image);
    };
    
    //
    galleryImagesContainer.firstElementChild.classList.add('gallery-image-active');
};

const galleryImage = document.querySelectorAll('.gallery-image');
// NEXT IMAGE

function showNextImage() {
    galleryImage[activeImageIndex].classList.remove('gallery-image-active');
    activeImageIndex++;
    galleryImage[activeImageIndex].classList.add('gallery-image-active');
    firstImageMargin -= 720;
    galleryImage[0].style.marginLeft = `${firstImageMargin}px`;
    prevImageButton.disabled = false;

    if (activeImageIndex === galleryImage.length - 1) {
        nextImageButton.disabled = true;
    };
};

// PREVIOUS IMAGE

function showPreviousImage() {
    galleryImage[activeImageIndex].classList.remove('gallery-image-active');
    activeImageIndex--;
    galleryImage[activeImageIndex].classList.add('gallery-image-active');
    firstImageMargin += 720;
    galleryImage[0].style.marginLeft = `${firstImageMargin}px`;
    nextImageButton.disabled = false;

    if (activeImageIndex === 0) {
        prevImageButton.disabled = true;
    };
};

// WHEEL SCROLLING

window.addEventListener('wheel', e => {
    if (e.deltaY === 100 && activeImageIndex < galleryImage.length - 1) {
        showNextImage();
    } else if (e.deltaY === -100 && activeImageIndex > 0) {
        showPreviousImage();
    };
});

// INITIALIZE BUTTONS
nextImageButton.addEventListener('click', showNextImage);
prevImageButton.addEventListener('click', showPreviousImage);
window.addEventListener('DOMContentLoaded', displayImages);