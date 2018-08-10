// Модальное окно: подтверждение

import {getElementFromTemplate, changePage} from './utils.js';
import showWelcomePage from './welcome.js';
import showFailTries from './fail-tries.js';

const page = getElementFromTemplate(`<section class="modal">
    <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
    <h2 class="modal__title">Подтверждение</h2>
    <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal__buttons">
      <button class="modal__button modal__button--confirm button">Ок</button>
      <button class="modal__button modal__button--cancel button">Отмена</button>
    </div>
  </section>`);

const buttonsBlock = page.querySelector(`.modal__buttons`);
buttonsBlock.addEventListener(`click`, (evt) => {
  const targetClassList = evt.target.classList;

  if (targetClassList.contains(`modal__button--confirm`)) {
    showWelcomePage();
    return;
  }
  if (targetClassList.contains(`modal__button--cancel`)) {
    showFailTries();
    return;
  }
});


export default () => changePage(page);
