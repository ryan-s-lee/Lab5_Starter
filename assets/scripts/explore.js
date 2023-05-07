// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  let speechSynth = window.speechSynthesis;
  let voicePicker = document.getElementById("voice-select");
  let voiceDict = {};

  // add all options to voicePicker
  speechSynth.addEventListener("voiceschanged", () => {
    let voices = speechSynth.getVoices();
    for(const i in voices) {
      if (voiceDict[`${voices[i].name} (${voices[i].lang})`] != null) { continue; }

      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voicePicker.appendChild(option);
      voiceDict[option.textContent] = voices[i];
    }
  });

  let speakButton = document.querySelector("button");
  let inputBox = document.getElementById("text-to-speak");
  let faceImg = document.querySelector("img");
  function startSpeaking() {
    // open mouth
    faceImg.setAttribute("src", "./assets/images/smiling-open.png");

    let thingToSay = new SpeechSynthesisUtterance(inputBox.value);
    thingToSay.voice = voiceDict[voicePicker.value];
    if (thingToSay.voice != null) {
      speechSynth.speak(thingToSay);
    }
    thingToSay.onend = () => {
      faceImg.setAttribute("src", "./assets/images/smiling.png")
    }
  }
  speakButton.addEventListener("click", startSpeaking);
}