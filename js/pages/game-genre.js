// Игра на выбор жанра

import game from './../game-controller';
import setPage from './../page-controller.js';
import {getElementFromTemplate} from './../utils.js';
import {initialState} from './../data/game-data';
import task from './../data/genre-data';
import {headerTemplate} from './header';

const getAnswersTemplate = (tracks) => {
  return tracks.map((track) => `
    <div class="track">
      <button class="track__button track__button--play" type="button"></button>
      <div class="track__status">
        <audio></audio>
      </div>
      <div class="game__answer">
        <input class="game__input visually-hidden" type="checkbox" name="answer" value="${track.id}" id="${track.id}">
        <label class="game__check" for="${track.id}">Отметить</label>
      </div>
    </div>`)
  .join(``);
};

const gameGenreTemplate = (taskItem) => `
  <section class="game game--genre">
    ${headerTemplate(initialState)}
    <section class="game__screen">
      <h2 class="game__title">Выберите ${taskItem.genre} треки</h2>
      <form class="game__tracks">
        ${getAnswersTemplate(taskItem.tracks)}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>`;

const screenEl = getElementFromTemplate(gameGenreTemplate(task));


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
  addAnswer();
  resetForm();
};

toMainScreenEl.onclick = (evt) => {
  evt.preventDefault();
  setPage(`welcome`);
  resetForm();
};


function addAnswer() {
  const playerAnswersEl = inputsEl.filter((input) => input.checked);

  if (playerAnswersEl.length !== task.answers.length) {
    game.addAnswer({
      right: false,
      time: 40
    });
    return;
  }

  game.addAnswer({
    right: playerAnswersEl.every((input) => task.answers.indexOf(input.id) !== -1),
    time: 40
  });
}


export default screenEl;
