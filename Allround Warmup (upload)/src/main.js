import SubmitQuestion from "./addQuestions.js";
import startPracticing from "./startPracticing.js";
import TopicGenerator from "./homeAnimation.js";

const addQuestion = document.querySelector(".add-question-btn");
const topicChose = document.querySelector(".topic-choice");
const topicChoseBtn = document.querySelector(".btns");

const closeBtns = document.querySelectorAll(".close");

const existingTopicForm = document.querySelector(".existing-topic__form");
const newTopicForm = document.querySelector(".new-topic__form");
const questionForm = document.querySelector(".questions-form");

class Main {
  constructor() {
    addQuestion.addEventListener("click", this._openAddQuestion);
    topicChoseBtn.addEventListener("click", this._openQuestionForm);
    closeBtns.forEach(closeBtn =>
      closeBtn.addEventListener("click", this._closeForms.bind(this))
    );
    existingTopicForm.addEventListener(
      "submit",
      this._gettingDataFromTopicForm.bind(this)
    );
    newTopicForm.addEventListener(
      "submit",
      this._gettingDataFromTopicForm.bind(this)
    );

    TopicGenerator._showTopic();
  }

  _openAddQuestion() {
    topicChose.style.display = "flex";
    topicChose.style.opacity = "1";
    topicChose.style.visibility = "visible";
  }

  _openQuestionForm(e) {
    const event_happened = e.target;
    const btn = event_happened.closest(".btn");

    if (!btn) return;

    const question_choice = btn.textContent;

    if (question_choice === "Existing Topic") {
      existingTopicForm.style.display = "flex";
      existingTopicForm.style.opacity = "1";
      existingTopicForm.style.visibility = "visible";
    }

    if (question_choice === "New Topic") {
      newTopicForm.style.display = "flex";
      newTopicForm.style.opacity = "1";
      newTopicForm.style.visibility = "visible";
    }
  }

  _closeForms(e) {
    const closeEl = e.target;
    let parentEl = closeEl.parentElement;
    parentEl = parentEl.parentElement;

    if (parentEl.classList.contains("question-btn"))
      parentEl = parentEl.parentElement;

    this._closeParentElement(e, parentEl);
  }

  _closeParentElement(event, parent) {
    event.preventDefault();
    parent.style.display = "none";
    parent.style.opacity = "0";
    parent.style.visibility = "hidden";
    if (parent.classList.contains("question-btn"))
      parent.style.backgroundColor = "transparent";
  }

  _gettingDataFromTopicForm(e) {
    e.preventDefault();
    const datas = [];

    const data = new FormData(e.target);

    for (const pair of data.entries()) {
      datas.push(pair[1]);
    }

    SubmitQuestion._addQuestions(datas[0], Number(datas[1]));
  }
}

const main = new Main();
