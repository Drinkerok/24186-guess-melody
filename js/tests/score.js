import {assert} from 'chai';
import getScore from './../score';
import {getRandomInteger} from './../utils';


function getAnswers(length, rightAnswers, fastAnswers) {
  let arr = [];

  for (let i = 0; i < length; i++) {
    if (rightAnswers > 0) {
      if (fastAnswers > 0) {
        arr.push({
          correct: true,
          time: getRandomInteger(1, 29)
        });
        fastAnswers--;
      } else {
        arr.push({
          correct: true,
          time: getRandomInteger(30, 60)
        });
      }
      rightAnswers--;
    } else {
      arr.push({
        correct: false,
        time: getRandomInteger(1, 60)
      });
    }
  }

  return arr;
}


describe(`Score`, () => {
  it(`correct data`, () => {
    assert.strictEqual(getScore(getAnswers(10, 10, 5)), 15);
    assert.strictEqual(getScore(getAnswers(10, 10, 0)), 10);
    assert.strictEqual(getScore(getAnswers(10, 9, 0)), 7);
  });
  it(`incorrect data`, () => {
    assert.strictEqual(getScore(getAnswers(0, 0, 0)), -1);
    assert.strictEqual(getScore(getAnswers(9, 9, 9)), -1);
    assert.strictEqual(getScore(getAnswers(10, 3, 3)), -1);
    assert.strictEqual(getScore(getAnswers(5, 1, 0)), -1);
  });
});
