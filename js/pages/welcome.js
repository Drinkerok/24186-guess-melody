// Приветствие

import {getElementFromTemplate, wordsDeclension} from './../utils';

const getScreenTemplate = (data) => getElementFromTemplate(`
  <section class="welcome">
    <div class="welcome__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <button class="welcome__button">
      <span class="visually-hidden">Начать игру</span>
    </button>
    <h2 class="welcome__rules-title">Правила игры</h2>
    <p class="welcome__text">Правила просты:</p>
    <ul class="welcome__rules-list">
      <li>За ${~~(data.time / 60)} ${wordsDeclension(~~(data.time / 60), [`минуту`, `минуты`, `минут`])} нужно ответить на все вопросы.</li>
      <li>Можно допустить ${data.lives} ${wordsDeclension(data.lives, [`ошибку`, `ошибки`, `ошибок`])}.</li>
    </ul>
    <p class="welcome__text">Удачи!</p>
  </section>
`);

export default (game) => {
  game.reset();

  const screenEl = getScreenTemplate(game.state);

  const buttonStart = screenEl.querySelector(`.welcome__button`);
  buttonStart.onclick = () => {
    game.nextQuestion();
  };

  return screenEl;
};
