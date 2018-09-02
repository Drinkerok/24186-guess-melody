// Результат игры: проигрыш

import FailView from './../views/fail-view';
import screenWelcome from './welcome';
import {changeScreen} from './../utils';
import getStatistic from './../statistic';


export default ({type, state}) => {
  const failPage = new FailView({
    type,
    message: getStatistic(state)
  });

  failPage.onAgainButtonClick = () => changeScreen(screenWelcome());

  return failPage.element;
};
