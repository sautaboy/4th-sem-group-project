


// type writer
document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('typewriter-text');
    const texts = ["Each Semister Notes", "Every Subject Past Year Questions", "Exam Shedule"];
    let speed = 80; // Adjust the typing speed (milliseconds)
    let textIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < texts[textIndex].length) {
            textElement.innerHTML += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        } else {
            // Pause before starting to erase
            setTimeout(eraseText, 1000);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            textElement.innerHTML = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, speed);
        } else {
            // Move to the next text or start over
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter(); // Start the typing animation
});




// carousel

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtn = document.querySelectorAll(".wrapper  i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChilderns = [...carousel.children];

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

// get the number of card that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of last few card to the begining of the carousel for infinite scrolling
carouselChilderns
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
// Insert copies of first few card to the end of the carousel for infinite scrolling
carouselChilderns.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Record the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) {
        return;
    }
    // Update the scroll position based on the cursoe movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

const autoPlay = () => {
    if (window.innerWidth < 100) {
        return;
    }
    // Auto play the carousel after every 2500ms
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 1500);
};
autoPlay();

const infiniteScroll = () => {
    const scrollWidth = carousel.scrollWidth;
    const offsetWidth = carousel.offsetWidth;

    // if the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = scrollWidth - 2 * offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // if the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === scrollWidth - offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear the timeout & start again if the mouse is not hovering
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);







