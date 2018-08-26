// Игра на выбор исполнителя

import {getElementFromTemplate, changeScreen, getRandomInteger} from './../utils';
import renderHeader from './header';
import screenSuccess from './result-success';
import screenFailTime from './fail-time';
import screenFailTries from './fail-tries';
import screenWelcome from './welcome';
import {questionArtist} from './../data/questions';

const renderArtists = (artists) => {
  return artists.map((artist, i) => `
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value="${i}" id="answer-${i}">
      <label class="artist__name" for="answer-${i}">
        <img class="artist__picture" src="${artist.image}" alt="${artist.name}">
        ${artist.name}
      </label>
    </div>`)
    .join(``);
};

const screenTemplate = (data) => `
  <section class="game game--artist">
    ${renderHeader({lives: 2})}

    <section class="game__screen">
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${data.track.src}"></audio>
      </div>

      <form class="game__artist">
        ${renderArtists(data.artists)}
      </form>
    </section>
  </section>
`;
const screenEl = getElementFromTemplate(screenTemplate(questionArtist));

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
