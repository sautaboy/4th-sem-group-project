


// type writer
document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('typewriter-text');
    const texts = ["Get Each Semister Notes...", "Get Every Subject Past Year Questions...", "Know The Exam Shedule..."];
    let speed = 50; // Adjust the typing speed (milliseconds)
    let textIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < texts[textIndex].length) {
            textElement.innerHTML += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        } else {
            // Pause before starting to erase
            setTimeout(eraseText, 600);
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








