// Игра на выбор исполнителя

import ArtistView from './../views/artist-view';
import controller from './../game-controller';


export default (question) => {
  const artistPage = new ArtistView({
    state: controller.state,
    question
  });

  const timeStart = new Date();

  artistPage.onFormSubmit = (answer) => {
    controller.setAnswer({
      correct: question.artists[answer].name === question.track.artist,
      time: Math.round((new Date() - timeStart) / 1000)
    });
  };

  return artistPage.element;
};
