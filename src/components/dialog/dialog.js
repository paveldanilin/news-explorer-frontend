import './dialog.css';

export default class Dialog {
  static init() {
    setTimeout(() => {
      const dialogCloseButtons = document.getElementsByClassName('dialog__close');
      for (let closeButton of dialogCloseButtons) {
        const dialog = closeButton.closest('.dialog');
        if (dialog) {
          closeButton.onclick = () => {
            dialog.style.display = 'none';
          };
        }
      }
    }, 0);

    window.addEventListener('keydown', (event) => {
      if (event.code !== 'Escape') {
        return;
      }
      const dialog = Dialog.getActiveHTMLElement();
      if (dialog) {
        Dialog.close(dialog.id);
      }
    });
  }

  static show(id) {
    const dialog = document.getElementById(id);
    if (dialog && dialog.classList.contains('dialog')) {
      dialog.style.display = 'block';
    }
  }

  static close(id) {
    const dialog = document.getElementById(id);
    if (dialog && dialog.classList.contains('dialog')) {
      dialog.style.display = 'none';
    }
  }

  static toggle(targetId) {
    const currentDialog = Dialog.getActiveHTMLElement();
    if (!currentDialog) {
      return;
    }
    Dialog.close(currentDialog.id);
    Dialog.show(targetId);
  }

  static getActiveHTMLElement() {
    const dialogs = document.getElementsByClassName('dialog');
    for (let dialog of dialogs) {
      if (dialog.style.display === 'block') {
        return dialog;
      }
    }
    return null;
  }
}

Dialog.init();
