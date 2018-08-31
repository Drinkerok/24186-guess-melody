import AbstractView from './abstract-view';
import header from './../pages/header';

export default class ArtistView extends AbstractView {
  constructor({state, question}) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `
      <section class="game game--artist">
        <section class="game__screen">
          <h2 class="game__title">Кто исполняет эту песню?</h2>
          <div class="game__track">
            <button class="track__button track__button--play" type="button"></button>
            <audio src="${this.question.track.src}"></audio>
          </div>

          <form class="game__artist">
            ${((artists) => artists.map((artist, i) => `
              <div class="artist">
                <input class="artist__input visually-hidden" type="radio" name="answer" value="${i}" id="answer-${i}">
                <label class="artist__name" for="answer-${i}">
                  <img class="artist__picture" src="${artist.image}" alt="${artist.name}">
                  ${artist.name}
                </label>
              </div>`))(this.question.artists)}
          </form>
        </section>
      </section>`;
  }

  bind() {
    this._element.insertBefore(header(this.state), this._element.children[0]);
    const formEl = this._element.querySelector(`.game__artist`);

    formEl.onchange = () => {
      this.onFormSubmit(formEl.answer.value);
    };
  }

  onFormSubmit() {}
}
