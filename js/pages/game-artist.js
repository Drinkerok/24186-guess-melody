// Игра на выбор исполнителя

import game from './../game-controller';
import setPage from './../page-controller.js';
import {getElementFromTemplate} from './../utils.js';
import {initialState} from './../data/game-data';
import task from './../data/artist-data.js';
import {headerTemplate} from './header';

const getArtistsTemplate = (artists) => {
  return artists.map((artist) => `
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value="${artist.id}" id="${artist.id}">
      <label class="artist__name" for="${artist.id}">
        <img class="artist__picture" src="${artist.img}" alt="${artist.name}">
        ${artist.name}
      </label>
    </div>`)
  .join(``);
};

const gameArtistTemplate = (taskItem) => `<section class="game game--artist">
  ${headerTemplate(initialState)}

  <section class="game__screen">
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio></audio>
    </div>

    <form class="game__artist">
      ${getArtistsTemplate(taskItem.artists)}
    </form>
  </section>
</section>`;
const screenEl = getElementFromTemplate(gameArtistTemplate(task));

const formEl = screenEl.querySelector(`.game__artist`);
const toMainScreenEl = screenEl.querySelector(`.game__logo`);

formEl.onchange = () => {
  game.addAnswer({
    right: formEl.answer.value === task.answer,
    time: 40
  });
  formEl.reset();
};

toMainScreenEl.onclick = (evt) => {
  evt.preventDefault();
  setPage(`welcome`);
};

export default screenEl;
