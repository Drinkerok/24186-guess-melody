'use strict';

const KEY_CODE = {
  arrowLeft: 37,
  arrowRight: 39
};
const app = document.querySelector(`.app`);
const appContainer = app.querySelector(`section.main`);
const screens = Array.from(document.querySelectorAll(`template`)).map((item) => item.content);

const setScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;

  screenCurrent = index;

  appContainer.innerHTML = ``;
  appContainer.appendChild(screens[screenCurrent].cloneNode(true));
};

let screenCurrent = 0;
setScreen(screenCurrent);

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KEY_CODE.arrowLeft:
      setScreen(screenCurrent - 1);
      break;
    case KEY_CODE.arrowRight:
      setScreen(screenCurrent + 1);
      break;
  }
});


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
  <button class="arrows__btn arrows__btn--prev" type="button"><-</button>
  <button class="arrows__btn arrows__btn--next" type="button">-></button>`;

  arrowsDiv.addEventListener(`click`, (evt) => {
    const targetClass = evt.target.classList;
    if (targetClass.contains(`arrows__btn--prev`)) {
      setScreen(screenCurrent - 1);
      return;
    }
    if (targetClass.contains(`arrows__btn--next`)) {
      setScreen(screenCurrent + 1);
      return;
    }
  });

  app.appendChild(arrowsDiv);
}
renderArrows();
