// Модальное окно: ошибка

import {getElementFromTemplate, changePage} from './utils.js';

const page = getElementFromTemplate(`<section class="modal">
    <h2 class="modal__title">Произошла ошибка!</h2>
    <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
  </section>`);

export default () => changePage(page);
