// Результат игры: проигрыш, закончились попытки

import {getElementFromTemplate, changeScreen} from './../utils';
import screenWelcome from './welcome';

const screenTemplate = (data) => `
  <section class="result">
    <div class="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <h2 class="result__title">${data.header}</h2>
    <p class="result__total result__total--fail">${data.text}</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>`;

const screenEl = getElementFromTemplate(screenTemplate({
  header: `Какая жалость!`,
  text: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
}));

const againButtonEl = screenEl.querySelector(`.result__replay`);
againButtonEl.onclick = () => {
  changeScreen(screenWelcome);
};

export default screenEl;
