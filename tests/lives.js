import {assert} from 'chai';
import {setLives} from './../js/lives';

const playerResult = {
  score: 1,
  lives: 3,
  time: 10
};


describe(`Lives`, () => {
  it(`set correct lives count`, () => {
    assert.equal(setLives(playerResult, 1).lives, 1);
    assert.equal(setLives(playerResult, 0).lives, 0);
    assert.equal(setLives(playerResult, 3).lives, 3);
  });
  it(`set incorrect lives count`, () => {
    assert.equal(setLives(playerResult, -1).lives, 0);
    assert.equal(setLives(playerResult, -100).lives, 0);
    assert.equal(setLives(playerResult, 340).lives, 3);
  });
  it(`set incorrect data`, () => {
    assert.equal(setLives(null, -1), -1);
    assert.equal(setLives(`строка`, -100), -1);
    assert.equal(setLives({score: 1}, 2).lives, 2);
    assert.equal(setLives(playerResult).lives, 3);
  });
});
