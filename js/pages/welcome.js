// Приветствие

import WelcomeView from './../views/welcome-view';
import controller from './../game-controller';
import {InitialGame} from './../constants';


export default () => {
  const welcomePage = new WelcomeView({
    time: InitialGame.TIME,
    lives: InitialGame.LIVES
  });
  welcomePage.onButtonStartClick = () => {
    controller.reset();
    controller.nextQuestion();
  };

  return welcomePage.element;
};
