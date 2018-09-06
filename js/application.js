import {changeScreen} from './utils';

import WelcomePresenter from './presenters/welcome-presenter';
import GamePresenter from './presenters/game-presenter';
import GameModel from './models/game-model';
import ResultPresenter from './presenters/result-presenter';
import questions from './data/questions';

const welcome = new WelcomePresenter();

export default class Application {
  static showWelcome() {
    changeScreen(welcome.element);
  }

  static startGame() {
    const model = new GameModel(questions);
    const game = new GamePresenter(model);
    game.start();
  }

  static showResult(state) {
    const result = new ResultPresenter(state);
    changeScreen(result.element);
  }
}
