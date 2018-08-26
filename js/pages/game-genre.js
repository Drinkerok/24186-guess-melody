// Игра на выбор жанра

import {getElementFromTemplate, changeScreen} from './../utils';
import renderHeader from './header';
import screenGameArtist from './game-artist';
import screenWelcome from './welcome';
import {questionGenre} from './../data/questions';

const renderTracks = (tracks) => {
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
};

const screenTemplate = (data) => getElementFromTemplate(`
  <section class="game game--genre">
    ${renderHeader({lives: 2})}

    <section class="game__screen">
      <h2 class="game__title">Выберите ${data.genre} треки</h2>
      <form class="game__tracks">
        ${renderTracks(data.tracks)}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>
`);

const screenEl = screenTemplate(questionGenre);


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
