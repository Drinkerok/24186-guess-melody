// Заголовок с жизнями и таймером

import headerView from './../views/header-view';
import controller from './../game-controller';
import {InitialGame} from './../constants';
import screenWelcome from './welcome';


export default () => {
  const header = new headerView(controller.state.time, controller.state.lives);

  header.onToMainScreenElClick = (evt) => {
    evt.preventDefault();
    controller.renderScreen(screenWelcome);
    resetForm();
  }

  return header.element;
}
