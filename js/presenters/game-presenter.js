import App from './../application';
import GenreView from './../views/genre-view';
import ArtistView from './../views/artist-view';
import getTimer from './../timer';
import {changeScreen} from './../utils';

export default class GamePresenter {
  constructor(model) {
    this._model = model;
  }

  start() {
    this._timer = getTimer(this._model.time);

    this._timerId = setInterval(() => {
      const {done} = this._timer.tick();
      this._model.time = this._timer.time;
      if (done) {
        this.stop();
        App.showResult(this._model.state);
      }
    }, 1000);

    this.showQuestion();
  }

  stop() {
    if (this._timerId) {
      clearInterval(this._timerId);
    }
  }

  showQuestion() {
    if (this._model.isDead()) {
      this.stop();
      App.showResult(this._model.state);
      return;
    }
    const question = this._model.getQuestion();

    if (question) {
      this._questionTime = new Date();
      if (question.type === `genre`) {
        this.showGenreQuestion(question);
      } else {
        this.showArtistQuestion(question);
      }
    } else {
      this.stop();
      App.showResult(this._model.state);
    }
  }

  showGenreQuestion(question) {
    const genrePage = new GenreView({
      state: this._model.state,
      task: question,
      timer: this._timer
    });

    genrePage.onFormSubmit = (answers) => {
      this._model.setAnswer({
        correct: answers.map((value) => question.answers[value]).every((input) => input.genre === question.genre),
        time: this.getQuestionTime(),
      });

      this.showQuestion();
    };

    changeScreen(genrePage.element);
  }

  showArtistQuestion(question) {
    const artistPage = new ArtistView({
      state: this._model.state,
      task: question,
      timer: this._timer
    });

    artistPage.onFormSubmit = (answer) => {
      this._model.setAnswer({
        correct: question.answers[answer].isCorrect,
        time: this.getQuestionTime(),
      });

      this.showQuestion();
    };

    changeScreen(artistPage.element);
  }

  getQuestionTime() {
    return (new Date() - this._questionTime) / 1000;
  }
}
