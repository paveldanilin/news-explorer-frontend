import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './theme.css';
import './styles.css';
import './components/components';
import Dialog from './components/dialog/dialog';

function signinHandler(el) {
  //Dialog.close('dialog_signin');
  console.log(arguments);
}

export { Dialog, signinHandler };
