import AbstractView from './abstract-view';

const ALARM_TIME = 30;
const TIMER_RADIUS = 370;
const TIMER_CIRCUMFERENCE = Math.ceil(2 * Math.PI * TIMER_RADIUS);

export default class HeaderView extends AbstractView {
  constructor({timeRemains, livesSpent, timer}) {
    super();
    this._minutesRemains = ~~(timeRemains / 60);
    this._secondsRemains = timeRemains % 60;
    if (this._secondsRemains < 10) {
      this._secondsRemains = `0${this._secondsRemains}`;
    }
    this.livesSpent = livesSpent;
    this._timer = timer;
  }

  get template() {
    return `
      <header class="game__header">
        <a class="game__back" href="#">
          <span class="visually-hidden">Сыграть ещё раз</span>
          <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle class="timer__line" cx="390" cy="390" r="${TIMER_RADIUS}" stroke-dasharray="${TIMER_CIRCUMFERENCE}" stroke-dashoffset="${this.getDashoffset()}"
                  style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
        </svg>

        <div class="timer__value ${this._timer.time < 30 ? `timer__value--ends` : ``}" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer__mins">${this._minutesRemains}</span>

          <span class="timer__dots">:</span>
          <span class="timer__secs">${this._secondsRemains}</span>
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

    const timerLineEl = this._element.querySelector(`.timer__line`);

    this._timer.ontick = () => {
      if (this._timer.time < ALARM_TIME && !timerEl.classList.contains(`timer__value--ends`)) {
        timerEl.classList.add(`timer__value--ends`);
      }
      minutesEl.textContent = ~~(this._timer.time / 60);

      let secondsValue = this._timer.time % 60;
      if (secondsValue < 10) {
        secondsValue = `0${secondsValue}`;
      }
      secondsEl.textContent = secondsValue;

      timerLineEl.setAttribute(`stroke-dashoffset`, this.getDashoffset());
    };


    const toMainScreenEl = this._element.querySelector(`.game__back`);

    const toMainScreenElhandler = (evt) => {
      evt.preventDefault();
      this.onToMainScreenElClick();
    };

    toMainScreenEl.onclick = toMainScreenElhandler;
  }

  getDashoffset() {
    return TIMER_CIRCUMFERENCE * this._timer.getCompletionLeft();
  }

  onToMainScreenElClick() {}
}
