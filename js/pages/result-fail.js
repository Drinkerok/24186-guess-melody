// Результат игры: проигрыш

import FailView from './../views/fail-view';
import screenWelcome from './welcome';
import {changeScreen} from './../utils';


export default (data) => {
  const failPage = new FailView(data);

  failPage.onAgainButtonClick = () => changeScreen(screenWelcome());

  return failPage.element;
};
