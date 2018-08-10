import showWelcomePage from './welcome.js';


function getElementFromTemplate(template = ``) {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;

  return elem;
}


const wrapper = document.querySelector(`section.main`);
function changePage(page) {
  wrapper.innerHTML = ``;
  wrapper.appendChild(page);
}


function initBackLink(block) {
  const link = block.querySelector(`.game__back`);
  if (!link) {
    return;
  }

  link.onclick = (evt) => {
    evt.preventDefault();
    showWelcomePage();
  };
}


export {getElementFromTemplate, changePage, initBackLink};
