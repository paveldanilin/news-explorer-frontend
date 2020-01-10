import './images/favicon.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/theme.css';
import './components/styles.css';
import './components/components';
import resetForms from './components/form/form';
import Dialog from './components/dialog/dialog';
import { showSigninDialog, onSigninHandler, toggleMobileMenu } from './components/header/header';
import register from './js/user/register';
import login from './js/user/login';
import Config from './js/config';
import GhCommits from './components/gh-commits/gh-commits';

const ghCommits = new GhCommits(
  Config.GH_COMMITS_OWNER,
  Config.GH_COMMITS_REPO,
  Config.GH_COMMITS_PREVIEW_COUNT,
);

setTimeout(() => ghCommits.loadCommits(), 0);

export {
  resetForms, showSigninDialog, onSigninHandler, toggleMobileMenu, Dialog, login, register,
};
