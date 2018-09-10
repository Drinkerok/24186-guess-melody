import AbstractView from './abstract-view';
import header from './../pages/header';

export default class ArtistView extends AbstractView {
  constructor({state, task, timer}) {
    super();
    this.state = state;
    this.task = task;
    this.timer = timer;
  }

  get template() {
    return `
      <section class="game game--artist">
        <section class="game__screen">
          <h2 class="game__title">${this.task.question}</h2>
          <div class="game__track">
            <button class="track__button track__button--play" type="button"></button>
            <audio src="${this.task.src}"></audio>
          </div>

          <form class="game__artist">
            ${this.task.answers.map((answer, i) => `<div class="artist ${answer.isCorrect}">
                <input class="artist__input visually-hidden" type="radio" name="answer" value="${i}" id="answer-${i}">
                <label class="artist__name" for="answer-${i}">
                  <img class="artist__picture" src="${answer.image.url}" alt="${answer.title}">
                  ${answer.title}
                </label>
              </div>`).join(``)}
          </form>
        </section>
      </section>`;
  }

  bind() {
    this._element.insertBefore(header({
      state: this.state,
      timer: this.timer
    }), this._element.children[0]);
    const formEl = this._element.querySelector(`.game__artist`);

    formEl.onchange = () => {
      this.onFormSubmit(formEl.answer.value);
    };

    const trackEl = this._element.querySelector(`.game__track`);
    const buttonEl = trackEl.querySelector(`.track__button`);
    const audioEl = trackEl.querySelector(`audio`);


    buttonEl.onclick = () => {
      if (buttonEl.classList.contains(`track__button--pause`)) {
        buttonEl.classList.remove(`track__button--pause`);
        audioEl.pause();
      } else {
        buttonEl.classList.add(`track__button--pause`);
        audioEl.play();
      }
    };
  }

  onFormSubmit() {}
}
