import {assert} from 'chai';
import {getPlayerStatistic} from './../statistic';

const statistics = [4, 5, 8, 10, 11];
const PHRASE_LOSE_TIME = `Время вышло! Вы не успели отгадать все мелодии`;
const PHRASE_LOSE_TRIES = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

describe(`Statistic`, () => {
  it(`game complete`, () => {
    assert.equal(getPlayerStatistic(statistics, {
      score: 16,
      lives: 2,
      time: 10
    }), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83.33% игроков`);
    assert.equal(getPlayerStatistic(statistics, {
      score: 1,
      lives: 2,
      time: 10
    }), `Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`);
    assert.equal(getPlayerStatistic(statistics, {
      score: 9,
      lives: 2,
      time: 10
    }), `Вы заняли 3 место из 6 игроков. Это лучше, чем у 50% игроков`);
  });
  it(`game lose time`, () => {
    assert.equal(getPlayerStatistic(statistics, {
      score: 9,
      lives: 2,
      time: 0
    }), PHRASE_LOSE_TIME);
    assert.equal(getPlayerStatistic(statistics, {
      score: 11,
      lives: 1,
      time: 0
    }), PHRASE_LOSE_TIME);
  });
  it(`game lose tries`, () => {
    assert.equal(getPlayerStatistic(statistics, {
      score: 9,
      lives: 0,
      time: 11
    }), PHRASE_LOSE_TRIES);
    assert.equal(getPlayerStatistic(statistics, {
      score: 11,
      lives: 0,
      time: 55
    }), PHRASE_LOSE_TRIES);
  });
  it(`incorrect data`, () => {
    assert.equal(getPlayerStatistic(statistics, {
      score: -9,
      lives: 2,
      time: 10
    }), -1);
  });
});
