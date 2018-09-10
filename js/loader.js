const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = `olololololololololo`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();


export default class Loader {
  static loadTasks() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON);
  }

  static loadStatistics() {
    return fetch(`${SERVER_URL}/stats/${APP_ID}`).then(checkStatus).then(toJSON);
  }

  static saveResult(score) {
    const requestSettings = {
      body: JSON.stringify(score),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${SERVER_URL}/stats/${APP_ID}`, requestSettings).then(checkStatus);
  }
}
