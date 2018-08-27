import {InitialGame} from './constants';
import questions from './data/questions';

import screenGameGenre from './pages/game-genre';
import screenGameArtist from './pages/game-artist';
import screenFailTries from './pages/fail-tries';
import screenSuccess from './pages/result-success';


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
  },
  setAnswer(answer) {
    this.state.answers.push(answer);

    if (!answer.correct) {
      this.state.lives--;
    }
    if (this.state.lives === 0) {
      changeScreen(screenFailTries(this));
      return;
    }

    this.nextQuestion();
  },
  renderScreen(screen) {
    changeScreen(screen(this));
  },
  nextQuestion() {
    const question = this.questions.pop();
    let nextScreen;

    if (question) {
      nextScreen = question.type === `genre` ? screenGameGenre : screenGameArtist;
    } else {
      nextScreen = screenSuccess;
    }

    changeScreen(nextScreen(this, question));
  }
};
