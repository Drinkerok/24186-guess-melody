// Результат игры: выигрыш

import SuccessView from './../views/success-view';
import {InitialGame, ANSWER_FAST_TIME} from './../constants';
import screenWelcome from './welcome';
import getStatistic from './../statistic';
import getScore from './../score';
import {changeScreen} from './../utils';


export default (state) => {
  state.score = getScore(state.answers);

  const successPage = new SuccessView({
    timeSpent: InitialGame.TIME - state.time,
    score: state.score,
    fastAnswers: state.answers.filter((answer) => answer.time < ANSWER_FAST_TIME).length,
    fails: InitialGame.LIVES - state.lives,
    text: getStatistic(state)
  });
  successPage.onAgainButtonClick = () => changeScreen(screenWelcome());

  return successPage.element;
};
