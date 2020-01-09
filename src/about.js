import './images/favicon.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './theme.css';
import './styles.css';
import './components/components';
import resetForms from './components/form/form';
import Dialog from './components/dialog/dialog';
import { showSigninDialog, onSigninHandler, toggleMobileMenu } from './components/header/header';
import register from './user/register';
import login from './user/login';
import GhCommits from './components/gh-commits/gh-commits';

const ghCommits = new GhCommits();

setTimeout(() => ghCommits.loadCommits(), 0);

export {
  resetForms, showSigninDialog, onSigninHandler, toggleMobileMenu, Dialog, login, register,
};
