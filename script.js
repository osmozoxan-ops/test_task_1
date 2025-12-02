const slides = document.querySelector('.window-slider');
const slidesCon = document.querySelector('.container-slider');

const slideCount = document.querySelectorAll('.slider').length;
const slideIndex = document.querySelectorAll('.slider');
const allImgHide = document.querySelectorAll('.menu-img-2');
const allIcons = document.querySelectorAll('.menu-icon-2');

const menu = document.querySelector('.menu-container');

let currentIndex = 0;
let isScrolling = false; 
const SCROLL_DEBOUNCE_DELAY = 300;

function getCurrentRotation(element) {
    if (!element) return 0;
    
    const style = window.getComputedStyle(element);
    const transform = style.transform || style.webkitTransform || style.mozTransform;
    
    if (transform === 'none' || !transform) {
        return 0;
    }
    
    const matrix = new DOMMatrix(transform);
    const a = matrix.a;
    const b = matrix.b;
    
    const angleInRadians = Math.atan2(b, a);
    let angleInDegrees = angleInRadians * (180 / Math.PI);
    
    return angleInDegrees;
}

function goToSlide(index) {
    if (index < 0) {
        index = slideCount - 1;
    } else if (index >= slideCount) {
        index = 0;
    }
    
    currentIndex = index;
    slides.style.transform = `translateX(${-index * 14.28571428571429}%)`;
    
    allImgHide.forEach((img, i) => {
        if (i === index + 2) {
            img.classList.add('hidden');
        }
    });
    
    slideIndex.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('hiddenSlide');
        }
    });
}

function addClass(){
    const deld = document.querySelector('.hidden');
    if (deld) deld.classList.remove('hidden');
    const delSlide = document.querySelector('.hiddenSlide');
    if (delSlide) delSlide.classList.remove('hiddenSlide');
}

goToSlide(0);

slidesCon.addEventListener('wheel', function(e) {
    if (isScrolling) {
        return; 
    }

    isScrolling = true; 

    if (currentIndex < 3 && e.deltaY > 0) {
        addClass();
        goToSlide(currentIndex + 1);
        
        menu.style.transform = `rotate(${getCurrentRotation(menu) - 20}deg)`;
        
        allIcons.forEach(icon => {
            icon.style.transform = `rotate(${getCurrentRotation(icon) + 20}deg)`;
        });

    } else if (currentIndex > 0 && e.deltaY < 0) {
        addClass();
        goToSlide(currentIndex - 1);
        
        menu.style.transform = `rotate(${getCurrentRotation(menu) + 20}deg)`;
        
        allIcons.forEach(icon => {
            icon.style.transform = `rotate(${getCurrentRotation(icon) - 20}deg)`;
        });
    }

    setTimeout(() => {
        isScrolling = false;
    }, SCROLL_DEBOUNCE_DELAY);
});
