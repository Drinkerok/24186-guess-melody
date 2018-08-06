'use strict';

const KEY_CODES = {
  arrowLeft: 37,
  arrowRight: 39
};
const app = document.querySelector(`.app`);
const screens = Array.from(document.querySelectorAll(`template`)).map((item) => item.content);

const setScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;

  screenCurrent = index;

  app.innerHTML = ``;
  app.appendChild(screens[screenCurrent].cloneNode(true));
};

let screenCurrent = 0;
setScreen(screenCurrent);

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KEY_CODES.arrowLeft:
      setScreen(screenCurrent - 1);
      break;
    case KEY_CODES.arrowRight:
      setScreen(screenCurrent + 1);
      break;
  }
});


// вставка стрелок навигации
{
  function renderArrows() {
    const arrowsDiv = document.createElement(`div`);
    arrowsDiv.classList.add(`arrows__wrap`);
    arrowsDiv.innerHTML = `<style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>`;

    let arrows = arrowsDiv.querySelectorAll(`.arrows__btn`);
    arrows[0].addEventListener(`click`, (evt) => {
      evt.preventDefault();
      setScreen(screenCurrent - 1);
    });
    arrows[1].addEventListener(`click`, (evt) => {
      evt.preventDefault();
      setScreen(screenCurrent + 1);
    });

    app.appendChild(arrowsDiv);
  }
  renderArrows();
}
