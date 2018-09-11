import {assert} from 'chai';
import getScore from './../score';

function getRandomInteger(min = 0, max = 1) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}


function getAnswers(length, rightAnswers, fastAnswers) {
  const answers = [];

  for (let i = 0; i < length; i++) {
    if (rightAnswers > 0) {
      if (fastAnswers > 0) {
        answers.push({
          correct: true,
          time: getRandomInteger(1, 29)
        });
        fastAnswers--;
      } else {
        answers.push({
          correct: true,
          time: getRandomInteger(30, 60)
        });
      }
      rightAnswers--;
    } else {
      answers.push({
        correct: false,
        time: getRandomInteger(1, 60)
      });
    }
  }

  return answers;
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
