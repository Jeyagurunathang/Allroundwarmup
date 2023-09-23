const questionForm = document.querySelector(".questions-form");
const questionFormHolder = document.querySelector(".add-question");

const existingTopicsSelectEl = document.querySelectorAll(".existing-topics");

const successMessage = `
    <div class="success">
        <p class="success-icon">Tick</p>
        <p class="success-message">Questions add successfully.</p>
        <span class="close"><a href="./index.html"><i class="fa-solid fa-circle-xmark"></i></a></span>
    </div>
`;

class SubmitQuestion {
  #existingQuestions;
  #topic;
  constructor() {
    this._showTopics();
    questionForm.addEventListener("submit", this._submitQuestions.bind(this));
  }

  _showForm() {
    questionFormHolder.style.display = "flex";
    questionFormHolder.style.opacity = "1";
    questionFormHolder.style.visibility = "visible";
  }

  _addQuestions(topic, count) {
    if (this._topicAlreadyExists(topic)) {
      const topicData = JSON.parse(localStorage.getItem(topic));
      this.#existingQuestions = topicData["questions"];
    }

    this.#topic = topic;

    this._showForm();
    for (let i = count; i > 0; i--) {
      const addQuestionEl = `
            <div>
                <label class="existing-topic__label">Question: ${i}</label>
                <input type="text" class="existing-topic__input mt-xlg" name=${count} />
            </div>
        `;
      questionForm.insertAdjacentHTML("afterbegin", addQuestionEl);
    }
  }

  _topicAlreadyExists(topic) {
    for (let [key] of Object.entries(localStorage)) {
      if (topic === key) return true;
    }
  }

  _submitQuestions(e) {
    e.preventDefault();

    let questionsData = [];

    const questions = new FormData(e.target);
    for (const question of questions.entries()) {
      questionsData.push(question[1]);
    }

    if (this._topicAlreadyExists(this.#topic)) {
      questionsData = [...this.#existingQuestions, ...questionsData];
    }
    this._addQuestionsToLocalStorage(questionsData);

    questionForm.innerHTML = successMessage;
  }

  _addQuestionsToLocalStorage(questions) {
    const topic = {
      title: this.#topic,
      questions,
    };
    localStorage.setItem(this.#topic, JSON.stringify(topic));
  }

  /* Show the topics on the existing topic button select option */
  _getTopicsFromLocalStorage() {
    const topics = [];
    for (let [key] of Object.entries(localStorage)) {
      topics.push(key);
    }
    return topics;
  }
  _showTopics() {
    const topics = this._getTopicsFromLocalStorage();

    topics?.forEach(topic => {
      const option = `<option value="${topic}">${topic}</option>`;
      existingTopicsSelectEl.forEach(el =>
        el.insertAdjacentHTML("beforeend", option)
      );
    });
  }
}

export default new SubmitQuestion();
