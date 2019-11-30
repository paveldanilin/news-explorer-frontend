import './dialog.css';

export default class Dialog {
  static init() {
    setTimeout(() => {
      const dialogCloseButtons = document.getElementsByClassName("dialog__close");
      for (let closeButton of dialogCloseButtons) {
        const dialog = closeButton.closest('.dialog');
        if (dialog) {
          closeButton.onclick = () => {
            dialog.style.display = 'none';
          };
        }
      }
    }, 0);
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
}

Dialog.init();
