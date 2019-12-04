import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/components';

import Dialog from './components/dialog/dialog';

function signinHandler(el) {
  Dialog.close('dialog_signin');
}

export { Dialog, signinHandler };
