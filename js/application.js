import {changeScreen} from './utils';

import WelcomePresenter from './presenters/welcome-presenter';
import GamePresenter from './presenters/game-presenter';
import GameModel from './models/game-model';
import ResultPresenter from './presenters/result-presenter';

import Loader from './loader';

let questions = [];

export default class Application {
  static showWelcome() {
    const welcome = new WelcomePresenter();
    changeScreen(welcome.element);
    Loader.loadTasks()
      .then((data) => {
        questions = data;
      })
      .then(() => welcome.onLoad());
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
