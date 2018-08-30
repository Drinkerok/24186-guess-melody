import {InitialGame} from './constants';
import questions from './data/questions';
import getTimer from './timer';

import screenGameGenre from './pages/game-genre';
import screenGameArtist from './pages/game-artist';
import screenFail from './pages/result-fail';
import screenSuccess from './pages/result-success';

const LooseHeader = {
  TIME: `Увы и ах!`,
  TRIES: `Какая жалость!`,
};


function changeScreen(page) {
  const wrapper = document.querySelector(`section.main`);
  wrapper.innerHTML = ``;
  wrapper.appendChild(page);
}


export default {
  state: {},
  reset() {
    this.state = {
      answers: [],
      lives: InitialGame.LIVES,
      time: InitialGame.TIME,
    };
    this.questions = [];
    this.questions = questions.slice();

    const timer = getTimer(InitialGame.TIME);
    const timerId = setInterval(() => {
      const {done} = timer.tick();
      this.state.time = timer.time;
      if (done) {
        clearInterval(timerId);
        changeScreen(screenFail(LooseHeader.TIME));
      }
    }, 1000);
  },
  setAnswer(answer) {
    this.state.answers.push(answer);

    if (!answer.correct) {
      this.state.lives--;
    }
    if (this.state.lives === 0) {
      changeScreen(screenFail(LooseHeader.TRIES));
      return;
    }

    this.nextQuestion();
  },
  renderScreen(screen) {
    changeScreen(screen());
  },
  nextQuestion() {
    const question = this.questions.pop();
    let nextScreen;

    if (question) {
      nextScreen = question.type === `genre` ? screenGameGenre : screenGameArtist;
    } else {
      nextScreen = screenSuccess;
    }

    changeScreen(nextScreen(question));
  }
};
