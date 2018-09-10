import AbstractView from './abstract-view';
import header from './../pages/header';


export default class GenreView extends AbstractView {
  constructor({state, task, timer}) {
    super();
    this.state = state;
    this.task = task;
    this.timer = timer;
  }

  get template() {
    return `<section class="game game--genre">

        <section class="game__screen">
          <h2 class="game__title">${this.task.question}</h2>
          <form class="game__tracks">
            ${this.task.answers.map((answer, i) => `<div class="track ${answer.genre === this.task.genre}">
                <button class="track__button track__button--play" type="button"></button>
                <div class="track__status">
                  <audio src="${answer.src}"></audio>
                </div>
                <div class="game__answer">
                  <input class="game__input visually-hidden" type="checkbox" name="answer" value="${i}" id="answer-${i}">
                  <label class="game__check" for="answer-${i}">Отметить</label>
                </div>
              </div>`).join(``)}
            <button class="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>`;
  }

  bind() {
    this._element.insertBefore(header({
      state: this.state,
      timer: this.timer
    }), this._element.children[0]);
    const formEl = this._element.querySelector(`.game__tracks`);
    const inputsEl = Array.from(formEl.querySelectorAll(`.game__input`));
    const submitEl = formEl.querySelector(`.game__submit`);

    submitEl.disabled = true;

    formEl.onchange = () => {
      submitEl.disabled = !inputsEl.some((input) => input.checked);
    };

    formEl.onsubmit = (evt) => {
      evt.preventDefault();
      const selectedInputs = inputsEl.filter((input) => input.checked).map((input) => input.value);
      this.onFormSubmit(selectedInputs);
    };


    let playingTrackEl = null;

    const playTrack = (trackEl) => {
      const trackButtonEl = trackEl.querySelector(`.track__button`);
      const trackAudioEl = trackEl.querySelector(`audio`);

      trackButtonEl.classList.add(`track__button--pause`);
      trackAudioEl.play();
      playingTrackEl = trackEl;
    };
    const pauseTrack = (trackEl) => {
      const trackButtonEl = trackEl.querySelector(`.track__button`);
      const trackAudioEl = trackEl.querySelector(`audio`);

      trackButtonEl.classList.remove(`track__button--pause`);
      trackAudioEl.pause();
      playingTrackEl = null;
    };

    formEl.addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`track__button`)) {
        return;
      }

      const trackEl = evt.target.closest(`.track`);

      if (!playingTrackEl) {
        playTrack(trackEl);
      } else {
        if (playingTrackEl === trackEl) {
          pauseTrack(trackEl);
        } else {
          pauseTrack(playingTrackEl);
          playTrack(trackEl);
        }
      }
    });
  }

  onFormSubmit() {}
}
