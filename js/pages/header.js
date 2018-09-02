// Заголовок с жизнями и таймером

import HeaderView from './../views/header-view';
import screenWelcome from './welcome';
import {InitialGame} from './../constants';
import {changeScreen} from './../utils';


export default (state) => {
  const header = new HeaderView({
    timeRemains: state.time,
    livesSpent: InitialGame.LIVES - state.lives,
    timer: state.timer
  });

  header.onToMainScreenElClick = () => changeScreen(screenWelcome);

  return header.element;
};
