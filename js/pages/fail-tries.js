// Результат игры: проигрыш, закончились попытки

import controller from './../game-controller';
import {getElementFromTemplate} from './../utils';
import getStatistic from './../statistic';
import screenWelcome from './welcome';

const getScreenTemplate = (state) => getElementFromTemplate(`
  <section class="result">
    <div class="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <h2 class="result__title">Какая жалость!</h2>
    <p class="result__total result__total--fail">${getStatistic(state)}</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>
`);


export default () => {
  const screenEl = getScreenTemplate(controller.state);

  const againButtonEl = screenEl.querySelector(`.result__replay`);
  againButtonEl.onclick = () => {
    controller.renderScreen(screenWelcome);
  };

  return screenEl;
};
