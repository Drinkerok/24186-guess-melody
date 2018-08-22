const maxLivesCount = 3;
const errorCode = -1;


export function setLives(playerResult, newLives) {
  if (typeof newLives !== `number`) {
    return playerResult;
  }
  if (!playerResult || (playerResult && typeof playerResult !== `object`)) {
    return errorCode;
  }

  let currentLives = Math.round(newLives);
  if (currentLives < 0) {
    currentLives = 0;
  }
  if (currentLives > maxLivesCount) {
    currentLives = maxLivesCount;
  }

  const newplayerResult = Object.assign({}, playerResult, {
    lives: currentLives
  });

  return newplayerResult;
}
