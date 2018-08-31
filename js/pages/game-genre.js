// Игра на выбор жанра

import GenreView from './../views/genre-view';
import controller from './../game-controller';


export default (question) => {
  const genrePage = new GenreView({
    state: controller.state,
    question
  });

  const timeStart = new Date();

  genrePage.onFormSubmit = (answers) => {
    controller.setAnswer({
      correct: answers.map((value) => question.tracks[value]).every((input) => input.genre === question.genre),
      time: Math.round((new Date() - timeStart) / 1000)
    });
  };

  return genrePage.element;
};
