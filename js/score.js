const ANSWER_FAST_TIME = 30;
const SCORE_PENALTY = 2;
const SCORE_RIGHT = 1;
const SCORE_FAST_RIGHT = 2;

const ERROR_CODE = -1;


export function getScore(answers) {
  if (answers.length < 10) {
    return ERROR_CODE;
  }

  let score = 0;
  let fails = 0;

  answers.forEach((answer) => {
    if (answer.result) {
      score += answer.time < ANSWER_FAST_TIME ? SCORE_FAST_RIGHT : SCORE_RIGHT;
    } else {
      fails++;
      score -= SCORE_PENALTY;
    }
  });

  if (fails >= 3) {
    return ERROR_CODE;
  }

  return score;
}
