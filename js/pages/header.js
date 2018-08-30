// Заголовок с жизнями и таймером

import HeaderView from './../views/header-view';
import controller from './../game-controller';
import screenWelcome from './welcome';
import {InitialGame} from './../constants';


export default () => {
  const header = new HeaderView(controller.state.time, InitialGame.LIVES - controller.state.lives);

  header.onToMainScreenElClick = (evt) => {
    evt.preventDefault();
    controller.renderScreen(screenWelcome);
  };

  return header.element;
};
