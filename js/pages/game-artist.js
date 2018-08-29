// Игра на выбор исполнителя

import controller from './../game-controller';
import {getElementFromTemplate} from './../utils';
import renderHeader from './header';
import screenWelcome from './welcome';


const getScreenTemplate = (data) => getElementFromTemplate(`
  <section class="game game--artist">
    ${renderHeader(data.game)}

    <section class="game__screen">
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${data.question.track.src}"></audio>
      </div>

      <form class="game__artist">
        ${((artists) =>  artists.map((artist, i) => `
          <div class="artist">
            <input class="artist__input visually-hidden" type="radio" name="answer" value="${i}" id="answer-${i}">
            <label class="artist__name" for="answer-${i}">
              <img class="artist__picture" src="${artist.image}" alt="${artist.name}">
              ${artist.name}
            </label>
          </div>`)
          .join(``))(data.question.artists)}
      </form>
    </section>
  </section>
`);


export default (question) => {
  const timeStart = new Date();
  const screenEl = getScreenTemplate({
    game: controller.state,
    question,
  });


  const formEl = screenEl.querySelector(`.game__artist`);
  const toMainScreenEl = screenEl.querySelector(`.game__logo`);

  formEl.onchange = () => {
    controller.setAnswer({
      correct: question.artists[formEl.answer.value].name === question.track.artist,
      time: Math.round((new Date() - timeStart) / 1000)
    });
    formEl.reset();
  };

  toMainScreenEl.onclick = (evt) => {
    evt.preventDefault();
    controller.renderScreen(screenWelcome);
  };

  return screenEl;
};
