import './images/favicon.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './theme.css';
import './styles.css';
import './components/components';
import Glide from '@glidejs/glide';
import resetForms from './components/form/form';
import Dialog from './components/dialog/dialog';
import { showSigninDialog, onSigninHandler, toggleMobileMenu } from './components/header/header';
import register from './user/register';
import login from './user/login';

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

const glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
}).mount();

const onResize = (innerWidth) => {
  if (innerWidth < 768) {
    glide.update({ perView: 1 });
  } else {
    glide.update({ perView: 3 });
  }
};

window.onresize = (event) => {
  onResize(event.target.innerWidth);
};

onResize(window.innerWidth);

export {
  resetForms, showSigninDialog, onSigninHandler, toggleMobileMenu, Dialog, login, register,
};
