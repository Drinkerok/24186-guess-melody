// Результат игры: выигрыш

import {getElementFromTemplate, wordsDeclension} from './../utils';
import {InitialGame, statistics} from './../variables';
import getStatistic from './../statistic';
import getScore from './../score';


const screenTemplate = (data) => getElementFromTemplate(`
  <section class="result">
    <div class="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${getTime(data.time)} вы набрали ${data.score} ${wordsDeclension(data.score, [`балл`, `балла`, `баллов`])} (8 быстрых), совершив ${InitialGame.lives - data.lives} ${wordsDeclension(InitialGame.lives - data.lives, [`ошибку`, `ошибки`, `ошибок`])}</p>
    <p class="result__text">${getStatistic(data, statistics)}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
  </section>
`);

const getTime = (playerTimeLeft) => {
  const timeRemains = InitialGame.time - playerTimeLeft;
  const timeRemainsMinutes = ~~(timeRemains / 60);
  const timeRemainsSeconds = timeRemains - timeRemainsMinutes * 60;

  return `${timeRemainsMinutes} ${wordsDeclension(timeRemainsMinutes, [`минуту`, `минуты`, `минут`])} и ${timeRemainsSeconds} ${wordsDeclension(timeRemainsSeconds, [`секунду`, `секунды`, `секунд`])}`;
};


export default (state) => {
  state.game.score = getScore(state.game.answers);
  const screenEl = screenTemplate(state.game);

  const againButtonEl = screenEl.querySelector(`.result__replay`);
  againButtonEl.onclick = () => {
    state.renderScreen(`welcome`);
  };

  return screenEl;
};
