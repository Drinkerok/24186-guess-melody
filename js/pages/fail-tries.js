// Результат игры: проигрыш, закончились попытки

import {getElementFromTemplate} from './../utils';
import getStatistic from './../statistic';
import screenWelcome from './welcome';

const getScreenTemplate = (data) => getElementFromTemplate(`
  <section class="result">
    <div class="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <h2 class="result__title">Какая жалость!</h2>
    <p class="result__total result__total--fail">${getStatistic(data.state)}</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>
`);


export default (game) => {
  const screenEl = getScreenTemplate(game);

  const againButtonEl = screenEl.querySelector(`.result__replay`);
  againButtonEl.onclick = () => {
    game.renderScreen(screenWelcome);
  };

  return screenEl;
};
