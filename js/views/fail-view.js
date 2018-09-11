import AbstractView from './abstract-view';

const LooseTypeHeader = {
  TIME: `Увы и ах!`,
  TRIES: `Какая жалость!`,
};


export default class FailView extends AbstractView {
  constructor({type, message}) {
    super();
    this._title = LooseTypeHeader[type];
    this._message = message;
  }

  get template() {
    return `
      <section class="result">
        <div class="result__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
        </div>
        <h2 class="result__title">${this._title}</h2>
        <p class="result__total result__total--fail">${this._message}</p>
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
