// Initial References from the html file
const backgroundMusic = document.getElementById("background-music");
const musicSlider = document.getElementById("music-slider");
const muteButton = document.getElementById("mute-button");
const unmuteButton = document.getElementById("unmute-button");

let isMuted = false;

// Function to play the background music
function playBackgroundMusic() {
    backgroundMusic.play();
}

// Function to pause the background music
function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

// Function to toggle mute/unmute
function toggleMute() {
    if (isMuted) {
        backgroundMusic.muted = false; // Unmute
        muteButton.disabled = false;
        unmuteButton.disabled = true;
        isMuted = false;
    } else {
        backgroundMusic.muted = true; // Mute
        muteButton.disabled = true;
        unmuteButton.disabled = false;
        isMuted = true;
    }
}

//calls the function to either mute or unmute the music
muteButton.addEventListener("click", toggleMute);
unmuteButton.addEventListener("click", toggleMute);


// Event listener for when the slider is moved
musicSlider.addEventListener("input", () => {
    const newPosition = (musicSlider.value / 100) * backgroundMusic.duration;
    backgroundMusic.currentTime = newPosition;
});

// Event listener for updating the slider as the audio plays
backgroundMusic.addEventListener("timeupdate", () => {
    const position = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
    musicSlider.value = position;
});
