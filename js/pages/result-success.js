// Результат игры: выигрыш

import controller from './../game-controller';
import SuccessView from './../views/success-view';
import {InitialGame, ANSWER_FAST_TIME} from './../constants';
import screenWelcome from './welcome';
import getStatistic from './../statistic';
import getScore from './../score';


const statistics = [4, 5, 8, 10, 11];


export default () => {
  controller.state.score = getScore(controller.state.answers);

  const successPage = new SuccessView(
      InitialGame.TIME - controller.state.time,
      controller.state.score,
      controller.state.answers.filter((answer) => answer.time < ANSWER_FAST_TIME).length,
      InitialGame.LIVES - controller.state.lives,
      getStatistic(controller.state, statistics)
  );
  successPage.onAgainButtonClick = () => {
    controller.renderScreen(screenWelcome);
  };

  return successPage.element;
};
