import './dialog.css';
import { loadHTML } from '../../js/loader';

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

function bindCloseHandler(container) {
  const closeButtons = container.getElementsByClassName('dialog__close');

  for (let i = 0; i < closeButtons.length; i += 1) {
    const closeButton = closeButtons[i];
    const dialog = closeButton.closest('.dialog');
    if (dialog) {
      closeButton.onclick = () => {
        dialog.style.display = 'none';
      };
    }
  }
}

export default class Dialog {
  static show(el, content) {
    let dialogEl = el;
    if (typeof dialogEl === 'string' || typeof dialogEl === 'number') {
      dialogEl = resolveDialogElement(dialogEl);
    }
    if (dialogEl) {
      dialogEl.style.display = 'block';
      if (typeof content === 'string') {
        const bodyEl = dialogEl.querySelector('.dialog__body');
        if (bodyEl) {
          bodyEl.textContent = content;
        }
      }
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
        const input = inputEl;
        input.value = '';
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

    for (let i = 0; i < dialogs.length; i += 1) {
      const dialog = dialogs[i];
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
    if (el.getAttribute('data-dialog').length > 0) {
      loadHTML(el.getAttribute('data-dialog'), el, null, (container) => {
        bindCloseHandler(container);
      });
    } else {
      bindCloseHandler(el);
    }
  });
}, 0);
