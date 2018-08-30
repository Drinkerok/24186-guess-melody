// Результат игры: проигрыш

import FailView from './../views/fail-view';
import controller from './../game-controller';
import getStatistic from './../statistic';
import screenWelcome from './welcome';


export default (header) => {
  const failPage = new FailView(header, getStatistic(controller.state));

  failPage.onAgainButtonClick = () => {
    controller.renderScreen(screenWelcome);
  };

  return failPage.element;
};
