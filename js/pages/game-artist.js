// Игра на выбор исполнителя

import {getElementFromTemplate} from './../utils';
import renderHeader from './header';

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

const screenTemplate = (data) => getElementFromTemplate(`
  <section class="game game--artist">
    ${renderHeader(data.game)}

    <section class="game__screen">
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${data.question.track.src}"></audio>
      </div>

      <form class="game__artist">
        ${renderArtists(data.question.artists)}
      </form>
    </section>
  </section>
`);


export default (state, question) => {
  const timeStart = new Date();
  const screenEl = screenTemplate({
    game: state.game,
    question,
  });


  const formEl = screenEl.querySelector(`.game__artist`);
  const toMainScreenEl = screenEl.querySelector(`.game__logo`);

  formEl.onchange = () => {
    state.setAnswer({
      correct: question.artists[formEl.answer.value].name === question.track.artist,
      time: Math.round((new Date() - timeStart) / 1000)
    });
    formEl.reset();
  };

  toMainScreenEl.onclick = (evt) => {
    evt.preventDefault();
    state.renderScreen(`welcome`);
  };

  return screenEl;
};
