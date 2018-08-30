import AbstractView from './abstract-view';
import {wordsDeclension} from './../utils';

export default class SuccessView extends AbstractView {
  constructor(timeRemains, score, fastAnswers, fails, text) {
    super();
    this.timeRemainsMinutes = ~~(timeRemains / 60);
    this.timeRemainsSeconds = timeRemains - this.timeRemainsMinutes * 60;
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
        <p class="result__total">За ${this.timeRemainsMinutes} ${wordsDeclension(this.timeRemainsMinutes, [`минуту`, `минуты`, `минут`])} и ${this.timeRemainsSeconds} ${wordsDeclension(this.timeRemainsSeconds, [`секунду`, `секунды`, `секунд`])} вы набрали ${this.score} ${wordsDeclension(this.score, [`балл`, `балла`, `баллов`])} (${this.fastAnswers} ${wordsDeclension(this.fastAnswers, [`быстрый`, `быстрых`, `быстрых`])}), совершив ${this.fails} ${wordsDeclension(this.fails, [`ошибку`, `ошибки`, `ошибок`])}</p>
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
}
