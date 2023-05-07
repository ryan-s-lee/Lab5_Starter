// expose.js

window.addEventListener('DOMContentLoaded', init);


function init() {
  // create handle for image
  let hornImg = document.querySelector("#expose > img");
  // listen for dropdown selection, and change image upon that event
  let dropdown = document.getElementById("horn-select");
  function changeHorn() {
    hornImg.setAttribute("src", `./assets/images/${dropdown.value}.svg`)
  }
  dropdown.addEventListener("change", changeHorn);

  // create handle for volume control img
  let volumeImg = document.querySelector("#volume-controls > img");
  // listen for volume slider change, and change image based on that value
  let volumeSlider = document.getElementById("volume");
  function changeVolumeImg() {
    let level = 3;
    if (volumeSlider.value == 0) {
      level = 0;
    } else if (volumeSlider.value < 33) {
      level = 1;
    } else if (volumeSlider.value < 67) {
      level = 2;
    }
    volumeImg.setAttribute("src", `./assets/icons/volume-level-${level}.svg`);
  }
  volumeSlider.addEventListener("input", changeVolumeImg);

  // Select the play button and the audio
  let playButton = document.getElementsByTagName("button")[0];
  let audioPlayer = document.getElementsByClassName("hidden")[0];

  // change volume on playback and play sound.
  function playSound() {
    console.log('sound');
    if (dropdown.value == "select") {
      audioPlayer.setAttribute("src", "");
    } else {
      audioPlayer.setAttribute("src", `./assets/audio/${dropdown.value}.mp3`)
    }
    audioPlayer.volume = volumeSlider.value / 100.0;
    audioPlayer.play();
  }
  const jsConfetti = new JSConfetti();

  // Listen for the button being pressed and play a sound with confetti.
  function onPlayButton() {
    // TODO
    playSound();
    if (dropdown.value == "party-horn") {
      jsConfetti.addConfetti();
    }
  }
  playButton.addEventListener("click", onPlayButton)
}