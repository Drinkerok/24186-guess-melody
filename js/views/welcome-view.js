import AbstractView from './abstract-view';
import {wordsDeclension} from './../utils';

export default class WelcomePage extends AbstractView {
  constructor(time, lives) {
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
        <button class="welcome__button">
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
    const buttonStart = this.element.querySelector(`.welcome__button`);

    buttonStart.onclick = this.onButtonStartClick;
  }

  onButtonStartClick() {}
}