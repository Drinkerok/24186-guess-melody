// Игра на выбор исполнителя

import {getElementFromTemplate, changeScreen, getRandomInteger} from './../utils.js';
import {initialState} from './../data/game-data';
import task from './../data/artist-data.js';
import {headerTemplate} from './header';
import screenSuccess from './result-success.js';
import screenFailTime from './fail-time.js';
import screenFailTries from './fail-tries.js';
import screenWelcome from './welcome.js';

const getArtistsTemplate = (artists) => {
  return artists.map((artist, i) => `
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${i}" id="answer-${i}">
      <label class="artist__name" for="answer-${i}">
        <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
        Пелагея
      </label>
    </div>`)
  .join(``);
}

const gameArtistTemplate = (task) => `<section class="game game--artist">
  ${headerTemplate(initialState)}

  <section class="game__screen">
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio></audio>
    </div>

    <form class="game__artist">
      ${getArtistsTemplate(task.artists)}
    </form>
  </section>
</section>`;
const screenEl = getElementFromTemplate(gameArtistTemplate(task));

const formEl = screenEl.querySelector(`.game__artist`);
const nextPages = [screenSuccess, screenFailTime, screenFailTries];
const toMainScreenEl = screenEl.querySelector(`.game__logo`);

formEl.onchange = () => {
  formEl.reset();
  changeScreen(nextPages[getRandomInteger(0, nextPages.length - 1)]);
};

toMainScreenEl.onclick = (evt) => {
  evt.preventDefault();
  changeScreen(screenWelcome);
};

export default screenEl;
