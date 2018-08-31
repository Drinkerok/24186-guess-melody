import AbstractView from './abstract-view';
import header from './../pages/header';


export default class GenreView extends AbstractView {
  constructor({state, question}) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `
      <section class="game game--genre">

        <section class="game__screen">
          <h2 class="game__title">Выберите ${this.question.genre} треки</h2>
          <form class="game__tracks">
            ${((tracks) => tracks.map((track, i) => `
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
              .join(``))(this.question.tracks || [])}
            <button class="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>`;
  }

  bind() {
    this._element.insertBefore(header(this.state), this._element.children[0]);
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
  }

  onFormSubmit() {}
}