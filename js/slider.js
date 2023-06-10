const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slider-item')),
    progressbar = document.querySelector('.progressbar');

let isDragging = false,
    startPosition,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0, //id to cancel the request frame
    currentIndex = 0, //Current slide
    prevIndex = -1,
    cardWidth = 0,
    screenWidth = 0,
    maxCardsOnScreen = 0;

//Use slider only on mobile devices
if (window.innerWidth < 600) {
    slides.forEach((slide, index) => {
        //Removign drag image effect
        const slideImage = slide.querySelector('img');
        slideImage.addEventListener('dragstart', (e) => e.preventDefault());

        //Mouse events
        slide.addEventListener('mousedown', (event) => {
            touchStart(event, index);
        });
        slide.addEventListener('mouseup', (event) => {
            touchEnd(event);
        });
        slide.addEventListener('mouseleave', (event) => {
            touchEnd(event);
        });
        slide.addEventListener('mousemove', touchMove);

        // //Touch events
        slide.addEventListener('touchstart', (event) => {
            touchStart(event, index);
        });
        slide.addEventListener('touchend', (event) => {
            touchEnd(event);
        });
        slide.addEventListener('touchmove', touchMove);
    });
} else {
    document.querySelector('.progressbar-container').style.display = 'none';
}
//Removing context menu
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
//Calculating card width
recalculateSizes();
addEventListener('resize', (event) => {
    recalculateSizes();
});

function recalculateSizes() {
    if (slides.length > 0) {
        let style = window.getComputedStyle(slides[0]);
        cardWidth = slides[0].offsetWidth + parseFloat(style.marginLeft);
    }
    screenWidth = window.innerWidth;
    maxCardsOnScreen = Math.trunc(screenWidth / cardWidth);
}

function touchStart(event, index) {
    //if(slides.length - 1 !== index)
    currentIndex = index;

    startPosition = getPositionX(event);

    isDragging = true;

    animationId = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
}

function touchEnd(event) {
    isDragging = false;
    cancelAnimationFrame(animationId);

    const moveBy = currentTranslate - prevTranslate;

    //For mobile devices
    if (!event.type.includes('mouse')) {
        //If moving slider right
        if (moveBy < -7) {
            //Preventing the leaving out of range
            if (currentIndex + 1 === slides.length) {
                currentIndex -= 1;
            } else if (currentIndex - prevIndex > 1) {
                //Clicked on the secound item
                //No need in increasing currentIndex, because user has already clicked on
                //the secound items, so index will already corresponds to it
                prevIndex++;
            }
            //If clicked on first item; & preventing from slider moving out of range
            else if (currentIndex < slides.length - 2) {
                prevIndex = currentIndex;
                currentIndex += 1;
            }
        }

        //If moving slider left
        if (moveBy > 7) {
            //If clicked on the secound item
            if (currentIndex - prevIndex > 1) {
                if (currentIndex - 1 > 0) {
                    currentIndex -= 2;
                    prevIndex = currentIndex - 1;
                }
            } else if (currentIndex - 1 >= 0) {
                //If clicked on the first item
                currentIndex -= 1;
                prevIndex = currentIndex - 1;
            }
        }
        //Prevent index change if user clicks on a item, instead of sliding it
        if (Math.abs(moveBy) > 6) {
            setPositionByIndex();
        }
    }
    slider.classList.remove('grabbing');
    setSliderByIndex();
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging === true) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -cardWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function setSliderByIndex() {
    let width = Math.round(
        (parseFloat(currentIndex) / (slides.length - 2)) * 100
    );
    progressbar.style.width = width + '%';
}
