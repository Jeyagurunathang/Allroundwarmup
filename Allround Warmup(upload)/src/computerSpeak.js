const speech = new SpeechSynthesisUtterance();
const answerBtn = document.querySelector(".answer-btn");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const loadingHTML = `
    <span class="loader">
        <div class="loaders"></div>
        <div class="loaders"></div>
        <div class="loaders"></div>
    </span>
`;

const normalAnswerEl = `&#127908; Answer`;

class HandleSpeech {
  constructor() {}

  _makeComputerSpeak(question) {
    speech.rate = 0.9;
    speech.text = question;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  }

  _handleUserAnswer() {
    this._speechRecognition();

    if (!answerBtn.classList.contains("answer-loading")) {
      answerBtn.innerHTML = loadingHTML;
      answerBtn.classList.add("answer-loading");
    }
  }

  _speechRecognition() {
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    // Printing user voice into text
    /* recognition.addEventListener("result", e => {
      const text = Array.from(e.results)
        .map(result => result[0].transcript)
        .join("");
    }); */

    recognition.start();
  }

  _handleStop() {
    if (answerBtn.classList.contains("answer-loading")) {
      answerBtn.innerHTML = normalAnswerEl;
      answerBtn.classList.remove("answer-loading");
    }
  }
}

export default new HandleSpeech();
