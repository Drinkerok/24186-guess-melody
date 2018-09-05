import App from './../application';
import GameModel from './../models/game-model';
import GenreView from './../views/genre-view';
import ArtistView from './../views/artist-view';
import getTimer from './../timer';
import {changeScreen} from './../utils';

export default class GamePresenter {
  constructor() {
    this._model = new GameModel();
  }

  start() {
    this._model.reset();
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
    const question = this._model.question;

    if (question) {
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
      question,
      timer: this._timer
    });

    genrePage.onFormSubmit = (answers) => {
      this._model.setAnswer({
        correct: answers.map((value) => question.tracks[value]).every((input) => input.genre === question.genre),
        time: 40
      });

      this.showQuestion();
    };

    changeScreen(genrePage.element);
  }

  showArtistQuestion(question) {
    const artistPage = new ArtistView({
      state: this._model.state,
      question,
      timer: this._timer
    });

    artistPage.onFormSubmit = (answer) => {
      this._model.setAnswer({
        correct: question.artists[answer].name === question.track.artist,
        time: 40
      });

      this.showQuestion();
    };

    changeScreen(artistPage.element);
  }
}
