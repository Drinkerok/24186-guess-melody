import AbstractView from './abstract-view';
import {InitialGame} from './../constants';

export default class GenreView extends AbstractView {
  constructor(task) {
    super();
    this.task = task;
  }

  get template() {
    return `
      <section class="game game--genre">
        <section class="game__screen">
          <h2 class="game__title">Выберите ${this.task.genre} треки</h2>
          <form class="game__tracks">
            ${((tracks) => {
              return tracks.map((track, i) => `
                <div class="track">
                  <button class="track__button track__button--play" type="button"></button>
                  <div class="track__status">
                    <audio src="${track.src}"></audio>
                  </div>
                  <div class="game__answer">
                    <input class="game__input visually-hidden" type="checkbox" name="answer" value="${i}" id="answer-${i}">
                    <label class="game__check" for="answer-${i}">Отметить</label>
                  </div>
                </div>`)
                .join(``);
            })(this.task.tracks)}
            <button class="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>`;
  }

  bind() {
    const formEl = this.element.querySelector(`.game__tracks`);
    const inputsEl = Array.from(formEl.querySelectorAll(`.game__input`));
    const submitEl = formEl.querySelector(`.game__submit`);

    submitEl.disabled = true;

    formEl.onchange = () => {
      submitEl.disabled = !inputsEl.some((input) => input.checked);
    };

    formEl.onsubmit = (evt) => {
      evt.preventDefault();
      const selectedInputs = inputsEl.filter((input) => input.checked).map((input) => this.task.tracks[input.value]);
      this.onFormSubmit(selectedInputs);
      // controller.setAnswer({
      //   correct: selectedInputs.every((input) => input.genre === question.genre),
      //   time: Math.round((new Date() - timeStart) / 1000)
      // });
    };
  }

  onFormSubmit(answers) {}
}