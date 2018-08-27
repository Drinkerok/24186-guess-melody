// Результат игры: выигрыш

import {getElementFromTemplate, wordsDeclension} from './../utils';
import {InitialGame, statistics, ANSWER_FAST_TIME} from './../variables';
import getStatistic from './../statistic';
import getScore from './../score';


const screenTemplate = (data) => getElementFromTemplate(`
  <section class="result">
    <div class="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${getTimeString(data.time)} вы набрали ${data.score} ${wordsDeclension(data.score, [`балл`, `балла`, `баллов`])} (${getFastAnswersString(data.answers)}), совершив ${InitialGame.lives - data.lives} ${wordsDeclension(InitialGame.lives - data.lives, [`ошибку`, `ошибки`, `ошибок`])}</p>
    <p class="result__text">${getStatistic(data, statistics)}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
  </section>
`);

const getTimeString = (playerTimeLeft) => {
  const timeRemains = InitialGame.time - playerTimeLeft;
  const timeRemainsMinutes = ~~(timeRemains / 60);
  const timeRemainsSeconds = timeRemains - timeRemainsMinutes * 60;

  return `${timeRemainsMinutes} ${wordsDeclension(timeRemainsMinutes, [`минуту`, `минуты`, `минут`])} и ${timeRemainsSeconds} ${wordsDeclension(timeRemainsSeconds, [`секунду`, `секунды`, `секунд`])}`;
};

const getFastAnswersString = (answers) => {
  let count = 0;
  for (const answer of answers) {
    if (answer.time < ANSWER_FAST_TIME) {
      count++;
    }
  }
  return `${count} ${wordsDeclension(count, [`быстрый`, `быстрых`, `быстрых`])}`;
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
