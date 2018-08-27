const QUESTIONS_COUNT = 10;


const questionGenre = {
  type: `genre`,
  genre: `Jazz`,
  tracks: [
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    },
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
      genre: `Country`
    },
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
      genre: `Pop`
    }
  ],
};

const questionArtist = {
  type: `artist`,
  track: {
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    artist: `Kevin MacLeod`,
  },
  artists: [
    {
      name: `Kevin MacLeod`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    },
    {
      name: `Level Plane`,
      image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    },
    {
      name: `Quincas Moreira`,
      image: `http://www.atribuna.com.br/fileadmin/_processed_/csm_Quincas-Moreira-Foto-Divulgacao_76d1a8b00e.jpg`,
    },
  ]
};


const questions = [];

for (let i = 0; i < QUESTIONS_COUNT / 2; i++) {
  questions.push(questionArtist);
  questions.push(questionGenre);
}

export default questions;
