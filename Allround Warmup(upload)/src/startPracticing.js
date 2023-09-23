import EndPage from "./endPage.js";
import HandleSpeech from "./computerSpeak.js";

const startPracticing = document.querySelector(".start-practice-btn");
const startPracticeForm = document.querySelector(".start-practice__form");
const questionShower = document.querySelector(".question-shower");
const questionTitle = document.querySelector(".question-title");
const nextQuestion = document.querySelector(".next-question__btn");

const answerBtn = document.querySelector(".answer-btn");
const stopBtn = document.querySelector(".stop-btn");

let count = 1;

class StartPractice {
  #topic;
  #numOfQuestions;
  #choosedQuestions;
  constructor() {
    startPracticing.addEventListener("click", this._letsStart.bind(this));
    startPracticeForm.addEventListener(
      "submit",
      this._submitStartForm.bind(this)
    );
    nextQuestion.addEventListener(
      "click",
      this._generateNextQuestion.bind(this)
    );
    answerBtn.addEventListener(
      "click",
      HandleSpeech._handleUserAnswer.bind(HandleSpeech)
    );
    stopBtn.addEventListener("click", HandleSpeech._handleStop);
  }

  _letsStart() {
    startPracticeForm.style.display = "flex";
    startPracticeForm.style.opacity = "1";
    startPracticeForm.style.visibility = "visible";
  }

  _submitStartForm(e) {
    e.preventDefault();
    const startingData = [];

    const beginData = new FormData(e.target);

    for (const data of beginData.entries()) {
      startingData.push(data[1]);
    }
    [this.#topic, this.#numOfQuestions] = startingData;

    this._getQuestionsFromLocalStorage();
  }

  _getQuestionsFromLocalStorage() {
    const topicDetails = JSON.parse(localStorage.getItem(this.#topic));
    const questions = topicDetails["questions"];

    this._displayQuestions(questions);
  }

  _displayQuestions(questions) {
    questionShower.style.display = "flex";
    questionShower.style.opacity = "1";
    questionShower.style.visibility = "visible";
    questionShower.style.zIndex = "7";

    const choosedQuestions = this._getRandomQuestion(questions);

    this.#choosedQuestions = choosedQuestions;
    questionTitle.textContent = this.#choosedQuestions[0];
    this._giveQuestionToComputer(this.#choosedQuestions[0]);
  }

  _generateNextQuestion() {
    if (count < this.#numOfQuestions) {
      questionTitle.textContent = this.#choosedQuestions[count];
      this._giveQuestionToComputer(this.#choosedQuestions[count]);
      count++;
    } else {
      EndPage._showEndPage();
    }
  }

  _getRandomQuestion(questions) {
    const choosenQuestions = [];

    for (let i = 0; i < Number(this.#numOfQuestions); i++) {
      const randomIndex = Math.trunc(Math.random() * questions.length);
      const randomQuestion = questions[randomIndex];
      if (!choosenQuestions.includes(randomQuestion)) {
        choosenQuestions.push(randomQuestion);
      } else {
        i--;
      }
    }
    return choosenQuestions;
  }

  _giveQuestionToComputer(question) {
    HandleSpeech._makeComputerSpeak(question);
  }
}

export default new StartPractice();
