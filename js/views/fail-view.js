import AbstractView from './abstract-view';

export default class FailView extends AbstractView {
  constructor(header, text) {
    super();
    this.header = header;
    this.text = text;
  }

  get template() {
    return `
      <section class="result">
        <div class="result__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
        </div>
        <h2 class="result__title">${this.header}</h2>
        <p class="result__total result__total--fail">${this.text}</p>
        <button class="result__replay" type="button">Попробовать ещё раз</button>
      </section>`;
  }

  bind() {
    const againButtonEl = this._element.querySelector(`.result__replay`);
    againButtonEl.onclick = () => {
      this.onAgainButtonClick();
    };
  }

  onAgainButtonClick() {}
}
