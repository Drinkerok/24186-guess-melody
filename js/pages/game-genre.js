// Игра на выбор жанра

import {getElementFromTemplate, changeScreen} from './../utils.js';
import {initialState} from './../data/game-data';
import task from './../data/genre-data';
import {headerTemplate} from './header';
import screenGameArtist from './game-artist';
import screenWelcome from './welcome';

const getAnswersTemplate = (tracks) => {
  return tracks.map((answer, i) => `
    <div class="track">
      <button class="track__button track__button--play" type="button"></button>
      <div class="track__status">
        <audio></audio>
      </div>
      <div class="game__answer">
        <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${i}" id="answer-${i}">
        <label class="game__check" for="answer-${i}">Отметить</label>
      </div>
    </div>`)
  .join(``);
}

const gameGenreTemplate = (task) => `
  <section class="game game--genre">
    ${headerTemplate(initialState)}
    <section class="game__screen">
      <h2 class="game__title">Выберите ${task.genre} треки</h2>
      <form class="game__tracks">
        ${getAnswersTemplate(task.tracks)}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>`;

const screenEl = getElementFromTemplate(gameGenreTemplate({genre: `инди-рок`, tracks: new Array(4).fill(0)}));


const formEl = screenEl.querySelector(`.game__tracks`);
const inputsEl = Array.from(formEl.querySelectorAll(`.game__input`));
const submitEl = formEl.querySelector(`.game__submit`);
const toMainScreenEl = screenEl.querySelector(`.game__logo`);

submitEl.disabled = true;

function resetForm() {
  formEl.reset();
  submitEl.disabled = true;
}

formEl.onchange = () => {
  submitEl.disabled = !inputsEl.some((input) => input.checked);
};

formEl.onsubmit = (evt) => {
  evt.preventDefault();
  changeScreen(screenGameArtist);
  resetForm();
};

toMainScreenEl.onclick = (evt) => {
  evt.preventDefault();
  changeScreen(screenWelcome);
  resetForm();
};


export default screenEl;
