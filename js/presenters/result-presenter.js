import FailView from './../views/fail-view';
import SuccessView from './../views/success-view';
import getStatistic from './../statistic';
import {InitialGame, ANSWER_FAST_TIME} from './../constants';
import App from './../application';
import Loader from './../loader';


const LooseType = {
  TIME: `TIME`,
  TRIES: `TRIES`,
};


export default class ResultPresenter {
  constructor({lives, time, answers, score}) {
    this.lives = lives;
    this.time = time;
    this.answers = answers;
    this.score = score;

    const gameIsLoosed = (lives === 0 || time === 0);

    if (gameIsLoosed) {

      this._page = new FailView({
        type: lives === 0 ? LooseType.TRIES : LooseType.TIME,
        message: getStatistic({time, lives})
      });
    } else {
      this._page = new SuccessView({
        timeSpent: InitialGame.TIME - time,
        score,
        fastAnswers: answers.filter((answer) => answer.time < ANSWER_FAST_TIME).length,
        fails: InitialGame.LIVES - lives,
        // text: getStatistic({time, lives, score})
        text: `Статистика загружается...`
      });

      Loader.saveResult({
        lives: this.lives,
        time: this.time,
        answers: this.answers,
        score: this.score,
      }).then(() => Loader.loadStatistics())
        .then((statistics) => statistics.map((item) => item.score))
        .then((statistics) => this.renderStatistic(statistics));
    }

    this._page.onAgainButtonClick = () => App.showWelcome();
  }

  renderStatistic(statistics) {
    this._page.changeResultText(getStatistic({
      time: this.time,
      lives: this.lives,
      score: this.score
    }, statistics));
  }

  get element() {
    return this._page.element;
  }
}
