import {changeScreen} from './utils';

import WelcomePresenter from './presenters/welcome-presenter';
import GamePresenter from './presenters/game-presenter';
import ResultPresenter from './presenters/result-presenter';

const welcome = new WelcomePresenter();
const game = new GamePresenter();

export default class Application {
  static showWelcome() {
    changeScreen(welcome.element);
    game.stop();
  }

  static startGame() {
    game.start();
  }

  static showResult(state) {
    const result = new ResultPresenter(state);
    changeScreen(result.show());
  }
}
