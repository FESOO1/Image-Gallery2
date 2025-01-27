const galleryImagesContainer = document.querySelector('.gallery-images');
const galleryImage = document.querySelectorAll('.gallery-image');
const prevImageButton = document.getElementById('prevImageButton');
const nextImageButton = document.getElementById('nextImageButton');
let activeImageIndex = 0;
let firstImageMargin = 0;

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