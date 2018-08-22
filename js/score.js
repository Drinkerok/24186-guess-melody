const scorePenalty = 2;
const answerFastTime = 30;
const scoreFastRight = 2;


export function getScore(answers) {
  let score = 0;

  if (answers.length < 10 || !Array.isArray(answers)) {
    return -1;
  }

  answers.forEach((answer) => {
    if (answer.result) {
      score = answer.time < answerFastTime ? score + scoreFastRight : score + 1;
    } else {
      score -= scorePenalty;
    }
  });

  return score;
}
