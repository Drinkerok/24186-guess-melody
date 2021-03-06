import {InitialGame} from './../constants';
import getScore from './../score';

export default class GameModel {
  constructor(questions) {
    this._questions = questions;
    this._state = {
      answers: [],
      lives: InitialGame.LIVES,
      time: InitialGame.TIME,
    };
  }

  setAnswer(answer) {
    this._state.answers.push(answer);

    if (!answer.correct) {
      this._state.lives--;
    }
  }

  isDead() {
    return this._state.lives === 0;
  }

  getQuestion() {
    return this._questions.pop();
  }

  setScore() {
    this._state.score = getScore(this._state.answers);
  }


  get state() {
    return this._state;
  }
  get time() {
    return this._state.time;
  }

  set time(newTime) {
    this._state.time = newTime;
  }
}
