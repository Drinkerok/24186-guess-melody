// Результат игры: проигрыш

import game from './../game-controller';
import setPage from './../page-controller';
import {getElementFromTemplate} from './../utils';
import {getPlayerStatistic} from './../statistic';

const statistics = [4, 5, 8, 10, 11];

function getHeaderText() {
  const gameData = game.data;

  if (gameData.time === 0) {
    return `Увы и ах!`;
  }
  if (gameData.lives === 0) {
    return `Какая жалость!`;
  }

  return `Вы настоящий меломан!`;
}
function getTemplate() {
  return `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">${getHeaderText()}</h2>
    <p class="result__total result__total--fail">${getPlayerStatistic(statistics, game.data)}</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>`;
}

const screenEl = getElementFromTemplate(getTemplate());

const againButtonEl = screenEl.querySelector(`.result__replay`);
againButtonEl.onclick = () => {
  setPage(`welcome`);
};

export default screenEl;
