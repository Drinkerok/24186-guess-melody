function getElementFromTemplate(template = ``) {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;

  return elem.firstElementChild;
}


const wrapper = document.querySelector(`section.main`);
function changePage(page) {
  wrapper.innerHTML = ``;
  wrapper.appendChild(page);
}


export {getElementFromTemplate, changePage};
