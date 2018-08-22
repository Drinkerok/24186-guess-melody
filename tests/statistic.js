import {assert} from 'chai';
import {getPlayerStatistic} from './../js/statistic';
import {wordsDeclension} from './../js/utils';

const statistics = [4, 5, 8, 10, 11];
const phraseLoseTime = `Время вышло! Вы не успели отгадать все мелодии`;
const phraseLoseTries = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

function getPhraseWin(place, players) {
  const percents = 100 - Math.round((place / players * 100) * 100) / 100;
  return `Вы заняли ${place} место из ${players} ${wordsDeclension(statistics.length + 1, [`игрок`, `игрока`, `игроков`])}. Это лучше, чем у ${percents}% игроков`;
}


describe(`Statistic`, () => {
  it(`game complete`, () => {
    assert.equal(getPlayerStatistic(statistics, {
      score: 16,
      lives: 2,
      time: 10
    }), getPhraseWin(1, statistics.length + 1));
    assert.equal(getPlayerStatistic(statistics, {
      score: 1,
      lives: 2,
      time: 10
    }), getPhraseWin(6, statistics.length + 1));
    assert.equal(getPlayerStatistic(statistics, {
      score: 9,
      lives: 2,
      time: 10
    }), getPhraseWin(3, statistics.length + 1));
  });
  it(`game lose time`, () => {
    assert.equal(getPlayerStatistic(statistics, {
      score: 9,
      lives: 2,
      time: 0
    }), phraseLoseTime);
    assert.equal(getPlayerStatistic(statistics, {
      score: 11,
      lives: 1,
      time: -10
    }), phraseLoseTime);
  });
  it(`game lose tries`, () => {
    assert.equal(getPlayerStatistic(statistics, {
      score: 9,
      lives: 0,
      time: 11
    }), phraseLoseTries);
    assert.equal(getPlayerStatistic(statistics, {
      score: 11,
      lives: -20,
      time: 55
    }), phraseLoseTries);
  });
  it(`incorrect data`, () => {
    assert.equal(getPlayerStatistic(statistics), -1);
    assert.equal(getPlayerStatistic(), -1);
    assert.equal(getPlayerStatistic(null, {
      score: 9,
      lives: 2,
      time: 10
    }), -1);
    assert.equal(getPlayerStatistic({
      score: 9,
      lives: 2,
      time: 10
    }), -1);
    assert.equal(getPlayerStatistic(statistics, {
      lives: 2,
      time: 10
    }), -1);
  });
});
