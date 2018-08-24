// Приветствие

import {getElementFromTemplate, changeScreen, wordsDeclension} from './../utils';
import screenGameGenre from './game-genre';
import {initialState} from './../data/game-data';


const screenTemplate = (state) => `<section class="welcome">
  <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
  <h2 class="welcome__rules-title">Правила игры</h2>
  <p class="welcome__text">Правила просты:</p>
  <ul class="welcome__rules-list">
    <li>За ${~~(state.time / 60)} ${wordsDeclension(~~(state.time / 60), [`минуту`, `минуты`, `минут`])} нужно ответить на все вопросы.</li>
    <li>Можно допустить ${state.lives} ${wordsDeclension(state.lives, [`ошибку`, `ошибки`, `ошибок`])}.</li>
  </ul>
  <p class="welcome__text">Удачи!</p>
</section>`;
const screenEl = getElementFromTemplate(screenTemplate(initialState));

const buttonStart = screenEl.querySelector(`.welcome__button`);
buttonStart.onclick = () => {
  changeScreen(screenGameGenre);
};


export default screenEl;
