import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/components';

import Dialog from './components/dialog/dialog';

export function signDialogToggle(current, target) {
  Dialog.close(current);
  Dialog.show(target);
}

export { Dialog };
