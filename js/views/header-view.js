import AbstractView from './abstract-view';

export default class HeaderView extends AbstractView {
  constructor({timeRemains, livesSpent, timer}) {
    super();
    this.minutesRemains = ~~(timeRemains / 60);
    this.secondsRemains = timeRemains % 60;
    if (this.secondsRemains < 10) {
      this.secondsRemains = `0${this.secondsRemains}`;
    }
    this.livesSpent = livesSpent;
    this.timer = timer;
  }

  get template() {
    return `
      <header class="game__header">
        <a class="game__back" href="#">
          <span class="visually-hidden">Сыграть ещё раз</span>
          <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle class="timer__line" cx="390" cy="390" r="370"
                  style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
        </svg>

        <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer__mins">${this.minutesRemains}</span>

          <span class="timer__dots">:</span>
          <span class="timer__secs">${this.secondsRemains}</span>
        </div>

        <div class="game__mistakes">
          ${new Array(this.livesSpent)
            .fill(`<div class="wrong"></div>`)
            .join(``)}
        </div>
      </header>`;
  }

  bind() {
    const timerEl = this._element.querySelector(`.timer__value`);
    const minutesEl = timerEl.querySelector(`.timer__mins`);
    const secondsEl = timerEl.querySelector(`.timer__secs`);

    setInterval(() => {
      minutesEl.textContent = ~~(this.timer.time / 60);

      let secondsValue = this.timer.time % 60;
      if (secondsValue < 10) {
        secondsValue = `0${secondsValue}`;
      }
      secondsEl.textContent = secondsValue;
    }, 1000);


    const toMainScreenEl = this._element.querySelector(`.game__back`);

    const toMainScreenElhandler = (evt) => {
      evt.preventDefault();
      this.onToMainScreenElClick();
    };

    toMainScreenEl.onclick = toMainScreenElhandler;
  }

  onToMainScreenElClick() {}
}