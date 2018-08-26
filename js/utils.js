function getElementFromTemplate(template = ``) {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;

  return elem.firstElementChild;
}


function getRandomInteger(min = 0, max = 1) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}


function wordsDeclension(num, expressions) {
  let count = num % 100;

  if (count >= 5 && count <= 20) {
    return expressions[2];
  } else {
    count = count % 10;
    if (count === 1) {
      return expressions[0];
    } else if (count >= 2 && count <= 4) {
      return expressions[1];
    } else {
      return expressions[2];
    }
  }
}


export {getElementFromTemplate, getRandomInteger, wordsDeclension};
