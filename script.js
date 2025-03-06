let yesButton = document.getElementById("yes-button");
let noButton = document.getElementById("no-button");
let yesSize = 16; //initial font size (in pixels)
let clickCount = 0; //Counter to track how many times "No" is clicked

// Handles the response when a button is clicked
function showResponse(answer) {
    let response = document.getElementById("response");

    if (answer) {
        // User clicked "Yes" ❤️
        triggerConfetti();
        response.innerHTML = "ok";
        
    } else {
        // User clicked "No" 😢
        clickCount++; // Increase the click count

        if (clickCount >= 5) {
            // If clicked 5 times, hide the No button
            noButton.style.display = "none";
            response.innerHTML = "s s! 😆❤️";
        } else {
            response.innerHTML = "a";

            // Increase the Yes button size
            yesSize += 20 // Increases font size by 5px each time
            yesButton.style.fontSize = yesSize + "px";

            // Move the No button to a random position
            moveNoButton();
        }
    }
}

//Function to randomly move the NO button on the screen
function moveNOButton() {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);

    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

// Heart burst animation
function burstHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 100);
    }
}

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    document.body.appendChild(heart);

    let size = Math.random() * 20 + 10 + "px";
    heart.style.width = size;
    heart.style.height = size;

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

//Adding Music

//let music = document.getElementById("music");
window.addEventListener("DOMContentLoaded", () => {
    let music = document.getElementById("music");

    function startMusic() {
        let playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => fadeInMusic(music)) // Fade in smoothly
                .catch(() => console.log("Autoplay was blocked, waiting for interaction."));
        }

        // Remove the event listener after the first interaction
        window.removeEventListener("click", startMusic);
        window.removeEventListener("touchstart", startMusic);
    }

    // Try to autoplay, otherwise wait for interaction
    startMusic();

    // If autoplay fails, wait for user click/tap
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);
});

// Function to fade in music
function fadeInMusic(music) {
    let volume = 0;
    let fadeInterval = setInterval(() => {
        if (volume < 1) {
            volume += 0.05;
            music.volume = Math.min(volume, 1);
        } else {
            clearInterval(fadeInterval);
        }
    }, 200);
}

// Function to trigger confetti
function triggerConfetti() {
    confetti({
        particleCount: 1000, // Number of confetti pieces
        spread: 70, // How wide the confetti spreads
        origin: { y: 0.6 }, // Starting position
        colors: ['#ff0000', '#ff7300', '#fffb00', '#00ff00', '#00d0ff', '#ff00d0'] // Confetti colors
    });
}