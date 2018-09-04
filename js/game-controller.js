import {InitialGame} from './constants';
import {changeScreen} from './utils';
import questions from './data/questions';
import getTimer from './timer';

import screenGameGenre from './pages/game-genre';
import screenGameArtist from './pages/game-artist';
import screenFail from './pages/result-fail';
import screenSuccess from './pages/result-success';

const LooseType = {
  TIME: `TIME`,
  TRIES: `TRIES`,
};

export default {
  state: {},
  start() {
    this.state = {
      answers: [],
      lives: InitialGame.LIVES,
      time: InitialGame.TIME,
      timer: getTimer(InitialGame.TIME)
    };
    this.questions = [];
    this.questions = questions.slice();

    this.timerId = setInterval(() => {
      const {done} = this.state.timer.tick();
      this.state.time = this.state.timer.time;
      if (done) {
        clearInterval(this.timerId);
        changeScreen(screenFail({
          type: LooseType.TIME,
          state: this.state
        }));
      }
    }, 1000);

    this.nextQuestion();
  },
  stop() {
    clearInterval(this.timerId);
  },
  setAnswer(answer) {
    this.state.answers.push(answer);

    if (!answer.correct) {
      this.state.lives--;
    }
    if (this.state.lives === 0) {
      changeScreen(screenFail({
        type: LooseType.TRIES,
        state: this.state
      }));
      this.stop();
      return;
    }

    this.nextQuestion();
  },
  nextQuestion() {
    const question = this.questions.pop();
    let nextScreen;

    if (question) {
      nextScreen = question.type === `genre` ? screenGameGenre : screenGameArtist;
      changeScreen(nextScreen(question));
    } else {
      changeScreen(screenSuccess(this.state));
      this.stop();
    }
  }
};
