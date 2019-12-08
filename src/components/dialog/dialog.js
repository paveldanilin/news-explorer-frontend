import './dialog.css';
import { loadHTML } from '../../loader';

function resolveDialogElement(id) {
  const htmlEl = document.getElementById(id);
  if (!htmlEl) {
    return null;
  }
  if (htmlEl.classList.contains('dialog')) {
    return htmlEl;
  }
  // It is supposed to be a container element, and the dialog element is a first child element
  return htmlEl.firstElementChild || null;
}

export default class Dialog {
  static show(el) {
    let dialogEl = el;
    if (typeof dialogEl === 'string' || typeof dialogEl === 'number') {
      dialogEl = resolveDialogElement(dialogEl);
    }
    if (dialogEl) {
      dialogEl.style.display = 'block';
    }
  }

  static close(el) {
    let dialogEl = el;
    if (typeof dialogEl === 'string' || typeof dialogEl === 'number') {
      dialogEl = resolveDialogElement(dialogEl);
    }
    if (dialogEl) {
      dialogEl.style.display = 'none';
      // Clear all inputs
      dialogEl.querySelectorAll('input').forEach((inputEl) => {
        inputEl.value = '';
      });
    }
  }

  static toggle(targetId) {
    const currentDialogEl = Dialog.getActiveHTMLElement();
    if (!currentDialogEl) {
      return;
    }
    Dialog.close(currentDialogEl);
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

// Register 'Escape' handler
window.addEventListener('keydown', (event) => {
  if (event.code !== 'Escape') {
    return;
  }
  const dialog = Dialog.getActiveHTMLElement();
  if (dialog && dialog.parentNode) {
    Dialog.close(dialog.parentNode.id);
  }
});

// Load dialog templates
setTimeout(() => {
  document.querySelectorAll('[data-dialog]').forEach((el) => {
    loadHTML(el.getAttribute('data-dialog'), el, null, (container) => {
      const closeButtons = container.getElementsByClassName('dialog__close');
      for (let closeButton of closeButtons) {
        const dialog = closeButton.closest('.dialog');
        if (dialog) {
          closeButton.onclick = () => {
            dialog.style.display = 'none';
          };
        }
      }
    });
  });
}, 0);
