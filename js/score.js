import {ANSWER_FAST_TIME} from './constants';

const Score = {
  PENALTY: 2,
  RIGHT: 1,
  FAST: 2,
};

const ERROR_CODE = -1;
const ANSWERS_LENGTH = 10;


export default(answers) => {
  if (answers.length < ANSWERS_LENGTH) {
    return ERROR_CODE;
  }


  let score = 0;
  let fails = 0;

  answers.forEach((answer) => {
    if (answer.correct) {
      score += answer.time < ANSWER_FAST_TIME ? Score.FAST : Score.RIGHT;
    } else {
      fails++;
      score -= Score.PENALTY;
    }
  });

  if (fails >= 3) {
    return ERROR_CODE;
  }

  return score;
};
