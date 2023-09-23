const endScreen = document.querySelector(".end-screen");
const quoteEl = document.querySelector(".quote_text");

class EndPage {
  constructor() {
    this._showQuote();
  }

  _showEndPage() {
    endScreen.style.display = "flex";
    endScreen.style.opacity = "1";
    endScreen.style.visibility = "visible";
    endScreen.style.zIndex = "8";
  }

  _showQuote() {
    async function fetchQuotes() {
      try {
        const response = await fetch("https://type.fit/api/quotes");

        if (!response.status) throw new Error("Network problem");

        const data = await response.json();
        const quote = this._randomQuote(data);
        quoteEl.textContent = quote;
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchQuotes.call(this);
  }

  _randomQuote(data) {
    const randomIndex = Math.trunc(Math.random() * data.length);
    const randomQuote = data[randomIndex];
    return randomQuote["text"];
  }
}

export default new EndPage();
