// Результат игры: проигрыш, закончились попытки

import {getElementFromTemplate} from './../utils';
import {statistics} from './../variables';
import getStatistic from './../statistic';

const screenTemplate = (data) => getElementFromTemplate(`
  <section class="result">
    <div class="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <h2 class="result__title">Какая жалость!</h2>
    <p class="result__total result__total--fail">${getStatistic(data.game, statistics)}</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>
`);


export default (state) => {
  const screenEl = screenTemplate(state);

  const againButtonEl = screenEl.querySelector(`.result__replay`);
  againButtonEl.onclick = () => {
    state.renderScreen(`welcome`);
  };

  return screenEl;
};
