import {InitialGame} from './variables.js';
import questions from './data/questions.js';

import screenWelcome from './pages/welcome.js';
import screenGameGenre from './pages/game-genre';
import screenGameArtist from './pages/game-artist';
import screenFailTries from './pages/fail-tries';
import screenSuccess from './pages/result-success';
import {changeScreen} from './utils.js';

const INITIAL_STATE = {
  answers: [],
  lives: InitialGame.lives,
  time: InitialGame.time,
};

const Screens = {
  welcome: screenWelcome,
  genre: screenGameGenre,
  artist: screenGameArtist,
  fail: screenFailTries,
  success: screenSuccess,
};


export default {
  state: {},
  reset() {
    this.game = Object.assign({}, INITIAL_STATE);
    this.questions = [];
    this.questions = questions.slice();
  },
  setAnswer(answer) {
    this.game.answers.push(answer);

    if (!answer.correct) {
      this.game.lives--;
    }
    if (this.game.lives === 0) {
      this.renderScreen(`fail`);
      return;
    }

    this.nextQuestion();
  },
  renderScreen(screen, question) {
    changeScreen(Screens[screen](this, question));
  },
  nextQuestion() {
    const question = this.questions.pop();
    if (question) {
      this.renderScreen(question.type, question);
    } else {
      this.renderScreen(`success`);
    }
  }
};
