import AbstractView from './abstract-view';
import {wordsDeclension} from './../utils';

export default class WelcomeView extends AbstractView {
  constructor({time, lives}) {
    super();
    this.time = time;
    this.lives = lives;
  }

  get template() {
    return `
      <section class="welcome">
        <div class="welcome__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
        </div>
        <p class="welcome__loading">Загрузка...</p>
        <button class="welcome__button welcome__button--hidden">
          <span class="visually-hidden">Начать игру</span>
        </button>
        <h2 class="welcome__rules-title">Правила игры</h2>
        <p class="welcome__text">Правила просты:</p>
        <ul class="welcome__rules-list">
          <li>За ${~~(this.time / 60)} ${wordsDeclension(~~(this.time / 60), [`минуту`, `минуты`, `минут`])} нужно ответить на все вопросы.</li>
          <li>Можно допустить ${this.lives} ${wordsDeclension(this.lives, [`ошибку`, `ошибки`, `ошибок`])}.</li>
        </ul>
        <p class="welcome__text">Удачи!</p>
      </section>`;
  }

  bind() {
    const buttonStart = this._element.querySelector(`.welcome__button`);

    buttonStart.onclick = this.onButtonStartClick;
  }

  onButtonStartClick() {}

  onReady() {
    const loadingEl = this._element.querySelector(`.welcome__loading`);
    loadingEl.parentNode.removeChild(loadingEl);

    const buttonStart = this._element.querySelector(`.welcome__button`);
    buttonStart.classList.remove(`welcome__button--hidden`);
  }
}
