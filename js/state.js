import {InitialGame} from './variables.js';
import questions from './data/questions.js';

const INITIAL_STATE = {
  answers: [],
  lives: InitialGame.lives,
  time: InitialGame.time,
};


export default {
  new() {
    this.game = Object.assign({}, INITIAL_STATE);
    this.questions = Object.assign({}, questions);
  },
  addAnswer(answer) {
    this.game.answers.push(answer);

    if (!answer.right) {
      this.game.lives--;
    }
    if (this.game.lives === 0) {
      return;
    }
  },
  get data() {
    return this.game;
  }
};
