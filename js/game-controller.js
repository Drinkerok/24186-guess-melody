import setPage from './page-controller';
import {getRandomInteger} from './utils.js';

const INITIAL_STATE = {
  lives: 3,
  time: 5 * 60,
  answers: [],
  tries: 10,
};


const nextGamePages = [`game-genre`, `game-artist`];


export default {
  game: Object.assign({}, INITIAL_STATE),
  new() {
    this.game = Object.assign({}, INITIAL_STATE);
  },
  addAnswer(answer) {
    this.game.answers.push(answer);

    if (!answer.right) {
      this.game.lives--;
    }
    if (this.game.lives === 0) {
      setPage(`fail`);
      return;
    }


    this.tries--;

    if (this.tries === 0) {
      setPage(`success`);
    } else {
      setPage(nextGamePages[getRandomInteger(0, nextGamePages.length - 1)]);
    }
  },
  get data() {
    return this.game;
  }
};
