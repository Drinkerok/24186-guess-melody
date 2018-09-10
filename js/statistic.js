import {wordsDeclension} from './../js/utils';


const ERROR_CODE = -1;


export default({time, lives, score}, statistics) => {
  if (time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (lives === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  if (!score || score < 0) {
    return ERROR_CODE;
  }

  const newStatistics = statistics.slice();
  newStatistics.push(score);
  newStatistics.sort((a, b) => b - a);

  const statisticPosition = newStatistics.indexOf(score) + 1;
  const statisticPercents = 100 - Math.round((statisticPosition / newStatistics.length * 100) * 100) / 100;
  const playersWord = wordsDeclension(newStatistics.length, [`игрок`, `игрока`, `игроков`]);

  return `Вы заняли ${statisticPosition} место из ${newStatistics.length} ${playersWord}. Это лучше, чем у ${statisticPercents}% игроков`;
};
