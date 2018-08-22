import {assert} from 'chai';
import {getScore} from './../js/score';
import {getRandomInteger} from './../js/utils';


function getAnswerArray(length, rightAnswers, fastAnswers) {
  let arr = [];

  for (let i = 0; i < length; i++) {
    if (rightAnswers > 0) {
      if (fastAnswers > 0) {
        arr.push({
          result: true,
          time: getRandomInteger(1, 29)
        });
        fastAnswers--;
      } else {
        arr.push({
          result: true,
          time: getRandomInteger(30, 60)
        });
      }
      rightAnswers--;
    } else {
      arr.push({
        result: false,
        time: getRandomInteger(1, 60)
      });
    }
  }

  return arr;
}


describe(`Score`, () => {
  it(`full game finished`, () => {
    assert.equal(getScore(getAnswerArray(10, 10, 5)), 15);
    assert.equal(getScore(getAnswerArray(10, 10, 0)), 10);
    assert.equal(getScore(getAnswerArray(10, 9, 0)), 7);
    assert.equal(getScore(getAnswerArray(10, 0, 0)), -20);
    assert.equal(getScore(getAnswerArray(10, 1, 1)), -16);
  });
  it(`less 10 answers`, () => {
    assert.equal(getScore(getAnswerArray(8, 8, 5)), -1);
    assert.equal(getScore(getAnswerArray(0, 0, 0)), -1);
    assert.equal(getScore(getAnswerArray(9, 9, 9)), -1);
  });
  it(`incorrect data`, () => {
    assert.equal(getScore(`Массив`), -1);
    assert.equal(getScore({name: `Привет`}), -1);
    assert.equal(getScore(1337), -1);
  });
});
