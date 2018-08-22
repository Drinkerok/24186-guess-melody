import {wordsDeclension} from './../js/utils';


const errorCode = -1;


export function getPlayerStatistic(statistics, playerResult) {
  if (!statistics || !Array.isArray(statistics)) {
    return errorCode;
  }
  if (!playerResult || (playerResult && typeof playerResult !== `object`)) {
    return errorCode;
  }

  const newStatistics = statistics.slice();

  if (playerResult.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (playerResult.lives <= 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  if (!playerResult.score) {
    return errorCode;
  }

  newStatistics.push(playerResult.score);
  function numericDecreasingSorting(a, b) {
    return b - a;
  }
  newStatistics.sort(numericDecreasingSorting);

  const statisticPosition = newStatistics.indexOf(playerResult.score) + 1;
  const statisticPercents = 100 - Math.round((statisticPosition / newStatistics.length * 100) * 100) / 100;
  const playersWord = wordsDeclension(newStatistics.length, [`игрок`, `игрока`, `игроков`]);

  return `Вы заняли ${statisticPosition} место из ${newStatistics.length} ${playersWord}. Это лучше, чем у ${statisticPercents}% игроков`;
}
