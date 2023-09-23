const topicsEl = document.querySelector(".topics");

const topics = [
  "Java",
  "JavaScript",
  "HTML",
  "SQL",
  "CSS",
  "React",
  "Python",
  "C",
  "C++",
  "Ruby",
];

class TopicGenerator {
  _showTopic() {
    setInterval(() => {
      const topic = this._getRandomTopic();
      topicsEl.textContent = topic;
    }, 1000);
  }

  _getRandomTopic() {
    const randomIndex = Math.trunc(Math.random() * topics.length);
    return topics[randomIndex];
  }
}

export default new TopicGenerator();
