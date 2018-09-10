import AbstractView from './abstract-view';
import {wordsDeclension} from './../utils';

export default class SuccessView extends AbstractView {
  constructor({timeSpent, score, fastAnswers, fails, text}) {
    super();
    this.timeSpentMinutes = ~~(timeSpent / 60);
    this.timeSpentSeconds = timeSpent - this.timeSpentMinutes * 60;
    this.score = score;
    this.fastAnswers = fastAnswers;
    this.fails = fails;
    this.text = text;
  }

  get template() {
    return `
      <section class="result">
        <div class="result__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
        </div>
        <h2 class="result__title">Вы настоящий меломан!</h2>
        <p class="result__total">За ${this.timeSpentMinutes} ${wordsDeclension(this.timeSpentMinutes, [`минуту`, `минуты`, `минут`])} и ${this.timeSpentSeconds} ${wordsDeclension(this.timeSpentSeconds, [`секунду`, `секунды`, `секунд`])} вы набрали ${this.score} ${wordsDeclension(this.score, [`балл`, `балла`, `баллов`])} (${this.fastAnswers} ${wordsDeclension(this.fastAnswers, [`быстрый`, `быстрых`, `быстрых`])}), совершив ${this.fails} ${wordsDeclension(this.fails, [`ошибку`, `ошибки`, `ошибок`])}</p>
        <p class="result__text">${this.text}</p>
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
