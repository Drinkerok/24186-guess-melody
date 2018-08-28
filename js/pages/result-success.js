// Результат игры: выигрыш

import {getElementFromTemplate, wordsDeclension} from './../utils';
import {InitialGame, ANSWER_FAST_TIME} from './../constants';
import screenWelcome from './welcome';
import getStatistic from './../statistic';
import getScore from './../score';


const statistics = [4, 5, 8, 10, 11];


const getScreenTemplate = (data) => {
  const timeRemains = InitialGame.TIME - data.timer.time;
  const timeRemainsMinutes = ~~(timeRemains / 60);
  const timeRemainsSeconds = timeRemains - timeRemainsMinutes * 60;

  const fastAnswers = data.answers.filter((answer) => answer.time < ANSWER_FAST_TIME).length;

  return getElementFromTemplate(`
    <section class="result">
      <div class="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
      </div>
      <h2 class="result__title">Вы настоящий меломан!</h2>
      <p class="result__total">За ${timeRemainsMinutes} ${wordsDeclension(timeRemainsMinutes, [`минуту`, `минуты`, `минут`])} и ${timeRemainsSeconds} ${wordsDeclension(timeRemainsSeconds, [`секунду`, `секунды`, `секунд`])} вы набрали ${data.score} ${wordsDeclension(data.score, [`балл`, `балла`, `баллов`])} (${fastAnswers} ${wordsDeclension(fastAnswers, [`быстрый`, `быстрых`, `быстрых`])}), совершив ${InitialGame.LIVES - data.lives} ${wordsDeclension(InitialGame.LIVES - data.lives, [`ошибку`, `ошибки`, `ошибок`])}</p>
      <p class="result__text">${getStatistic(data, statistics)}</p>
      <button class="result__replay" type="button">Сыграть ещё раз</button>
    </section>
  `);
};


export default (game) => {
  game.state.score = getScore(game.state.answers);
  const screenEl = getScreenTemplate(game.state);

  const againButtonEl = screenEl.querySelector(`.result__replay`);
  againButtonEl.onclick = () => {
    game.renderScreen(screenWelcome);
  };

  return screenEl;
};
