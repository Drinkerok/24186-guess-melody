import WelcomeView from './../views/welcome-view';
import {InitialGame} from './../constants';
import App from './../application';

export default class WelcomePresenter {
  constructor() {
    this._page = new WelcomeView({
      time: InitialGame.TIME,
      lives: InitialGame.LIVES
    });

    this._page.onButtonStartClick = () => {
      App.startGame();
    };
  }

  get element() {
    return this._page.element;
  }
}
