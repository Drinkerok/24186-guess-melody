const ANSWER_FAST_TIME = 30;

const Score = {
  penalty: 2,
  right: 1,
  fast: 2,
};

const ERROR_CODE = -1;


export function getScore(answers) {
  if (answers.length < 10) {
    return ERROR_CODE;
  }

  let score = 0;
  let fails = 0;

  answers.forEach((answer) => {
    if (answer.result) {
      score += answer.time < ANSWER_FAST_TIME ? Score.fast : Score.right;
    } else {
      fails++;
      score -= Score.penalty;
    }
  });

  if (fails >= 3) {
    return ERROR_CODE;
  }

  return score;
}
