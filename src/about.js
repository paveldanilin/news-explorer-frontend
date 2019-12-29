import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './theme.css';
import './styles.css';
import './components/components';
import Glide from '@glidejs/glide';
import Dialog from './components/dialog/dialog';
import Header from './components/header/header';
import register from './user/register';
import login from './user/login';

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

const glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
}).mount();

window.onresize = (event) => {
  if (event.target.innerWidth < 768) {
    glide.update({ perView: 1 });
  } else {
    glide.update({ perView: 3 });
  }
};

export {
  Header, Dialog, login, register,
};
