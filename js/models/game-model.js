import {InitialGame} from './../constants';

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


  get state() {
    return this._state;
  }
  get time() {
    return this._state.time;
  }

  get question() {
    return this._questions.pop();
  }

  set time(newTime) {
    this._state.time = newTime;
  }
}