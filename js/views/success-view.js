import AbstractView from './abstract-view';
import {wordsDeclension} from './../utils';

export default class SuccessView extends AbstractView {
  constructor({timeSpent, score, fastAnswers, fails, text}) {
    super();
    this._timeSpentMinutes = ~~(timeSpent / 60);
    this._timeSpentSeconds = timeSpent - this._timeSpentMinutes * 60;
    this._score = score;
    this._fastAnswers = fastAnswers;
    this._fails = fails;
    this._text = text;
  }

  get template() {
    return `
      <section class="result">
        <div class="result__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
        </div>
        <h2 class="result__title">Вы настоящий меломан!</h2>
        <p class="result__total">За ${this._timeSpentMinutes} ${wordsDeclension(this._timeSpentMinutes, [`минуту`, `минуты`, `минут`])} и ${this._timeSpentSeconds} ${wordsDeclension(this._timeSpentSeconds, [`секунду`, `секунды`, `секунд`])} вы набрали ${this._score} ${wordsDeclension(this._score, [`балл`, `балла`, `баллов`])} (${this._fastAnswers} ${wordsDeclension(this._fastAnswers, [`быстрый`, `быстрых`, `быстрых`])}), совершив ${this._fails} ${wordsDeclension(this._fails, [`ошибку`, `ошибки`, `ошибок`])}</p>
        <p class="result__text">${this._text}</p>
        <button class="result__replay" type="button">Сыграть ещё раз</button>
      </section>`;
  }

  bind() {
    const againButtonEl = this._element.querySelector(`.result__replay`);
    againButtonEl.onclick = () => {
      this.onAgainButtonClick();
    };
  }

  onAgainButtonClick() {}

  changeResultText(text) {
    const resultTextEl = this._element.querySelector(`.result__text`);
    resultTextEl.textContent = text;
  }
}
