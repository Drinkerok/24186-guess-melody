// Заголовок с жизнями и таймером

import App from './../application';
import HeaderView from './../views/header-view';
import {InitialGame} from './../constants';


export default ({state, timer}) => {
  const header = new HeaderView({
    timeRemains: state.time,
    livesSpent: InitialGame.LIVES - state.lives,
    timer
  });

  header.onToMainScreenElClick = () => {
    App.showWelcome();
  };

  return header.element;
};
