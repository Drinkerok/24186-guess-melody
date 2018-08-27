import {wordsDeclension} from './../js/utils';


const ERROR_CODE = -1;


export default(playerResult, statistics) => {
  const newStatistics = statistics.slice();

  if (playerResult.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (playerResult.lives === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  if (!playerResult.score || playerResult.score < 0) {
    return ERROR_CODE;
  }

  newStatistics.push(playerResult.score);
  newStatistics.sort((a, b) => b - a);

  const statisticPosition = newStatistics.indexOf(playerResult.score) + 1;
  const statisticPercents = 100 - Math.round((statisticPosition / newStatistics.length * 100) * 100) / 100;
  const playersWord = wordsDeclension(newStatistics.length, [`игрок`, `игрока`, `игроков`]);

  return `Вы заняли ${statisticPosition} место из ${newStatistics.length} ${playersWord}. Это лучше, чем у ${statisticPercents}% игроков`;
};
