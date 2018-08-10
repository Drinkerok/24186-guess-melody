// Результат игры: проигрыш, закончились попытки

import {getElementFromTemplate, changePage} from './utils.js';
import showModalConfirm from './modal-confirm.js';

const page = getElementFromTemplate(`<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Какая жалость!</h2>
    <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>`);

const againButton = page.querySelector(`.result__replay`);
againButton.onclick = showModalConfirm;

export default () => changePage(page);
