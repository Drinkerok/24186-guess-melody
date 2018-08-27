// Игра на выбор жанра

import {getElementFromTemplate} from './../utils';
import renderHeader from './header';

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
    ${renderHeader(data.game)}

    <section class="game__screen">
      <h2 class="game__title">Выберите ${data.question.genre} треки</h2>
      <form class="game__tracks">
        ${renderTracks(data.question.tracks)}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>
`);


export default (state, question) => {
  const screenEl = screenTemplate({
    game: state.game,
    question,
  });
  const timeStart = new Date();

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
    const selectedInputs = inputsEl.filter((input) => input.checked).map((input) => question.tracks[input.value]);
    state.setAnswer({
      correct: selectedInputs.every((input) => input.genre === question.genre),
      time: Math.round((new Date() - timeStart) / 1000)
    });
    resetForm();
  };

  toMainScreenEl.onclick = (evt) => {
    evt.preventDefault();
    state.renderScreen(`welcome`);
    resetForm();
  };

  return screenEl;
};
