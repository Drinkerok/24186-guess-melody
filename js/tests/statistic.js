import {assert} from 'chai';
import getPlayerStatistic from './../statistic';

const statistics = [4, 5, 8, 10, 11];
const PhraseLose = {
  TIME: `Время вышло! Вы не успели отгадать все мелодии`,
  TRIES: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
};

describe(`Statistic`, () => {
  it(`game complete`, () => {
    assert.equal(getPlayerStatistic({
      score: 16,
      lives: 2,
      time: 10
    }, statistics), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83.33% игроков`);
    assert.equal(getPlayerStatistic({
      score: 1,
      lives: 2,
      time: 10
    }, statistics), `Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`);
    assert.equal(getPlayerStatistic({
      score: 9,
      lives: 2,
      time: 10
    }, statistics), `Вы заняли 3 место из 6 игроков. Это лучше, чем у 50% игроков`);
  });
  it(`game lose time`, () => {
    assert.equal(getPlayerStatistic({
      score: 9,
      lives: 2,
      time: 0
    }, statistics), PhraseLose.TIME);
    assert.equal(getPlayerStatistic({
      score: 11,
      lives: 1,
      time: 0
    }, statistics), PhraseLose.TIME);
  });
  it(`game lose tries`, () => {
    assert.equal(getPlayerStatistic({
      score: 9,
      lives: 0,
      time: 11
    }, statistics), PhraseLose.TRIES);
    assert.equal(getPlayerStatistic({
      score: 11,
      lives: 0,
      time: 55
    }, statistics), PhraseLose.TRIES);
  });
  it(`incorrect data`, () => {
    assert.equal(getPlayerStatistic({
      score: -9,
      lives: 2,
      time: 10
    }, statistics), -1);
  });
});
