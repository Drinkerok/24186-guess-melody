import FailView from './../views/fail-view';
import SuccessView from './../views/success-view';
import getStatistic from './../statistic';
import getScore from './../score';
import {InitialGame, ANSWER_FAST_TIME} from './../constants';
import App from './../application';


const LooseType = {
  TIME: `TIME`,
  TRIES: `TRIES`,
};


export default class ResultPresenter {
  constructor({lives, time, answers}) {
    const gameIsLoosed = (lives === 0 || time === 0);

    if (gameIsLoosed) {

      this._page = new FailView({
        type: lives === 0 ? LooseType.TRIES : LooseType.TIME,
        message: getStatistic({time, lives})
      });
    } else {
      const score = getScore(answers);

      this._page = new SuccessView({
        timeSpent: InitialGame.TIME - time,
        score,
        fastAnswers: answers.filter((answer) => answer.time < ANSWER_FAST_TIME).length,
        fails: InitialGame.LIVES - lives,
        text: getStatistic({time, lives, score})
      });
    }

    this._page.onAgainButtonClick = () => App.showWelcome();
  }

  get element() {
    return this._page.element;
  }
}
