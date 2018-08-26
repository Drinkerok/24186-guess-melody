import screenWelcome from './pages/welcome';
import screenGameGenre from './pages/game-genre';
import screenGameArtist from './pages/game-artist';
import screenGameEnd from './pages/game-end';


function changeScreen(page) {
  const wrapper = document.querySelector(`section.main`);
  wrapper.innerHTML = ``;
  wrapper.appendChild(page);
}


const Pages = {
  'welcome': () => changeScreen(screenWelcome),
  'game-genre': () => changeScreen(screenGameGenre),
  'game-artist': () => changeScreen(screenGameArtist),
  'success': () => changeScreen(screenGameEnd),
  'fail': () => changeScreen(screenGameEnd),
};


export default (pageName) => Pages[pageName]();
