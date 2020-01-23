import './dropdown.css';

const DROPDOWN_SELECTOR = '.dropdown';
const DROPDOWN_BTN_SELECTOR = '.dropdown__button';
const DROPDOWN_CONTENT_SELECTOR = '.dropdown__content';
const DROPDOWN_CONTENT_VISIBLE_CLS = 'dropdown__content_visible';

const dropdowns = document.querySelectorAll(DROPDOWN_SELECTOR);

Array.from(dropdowns).forEach((el) => {
  const btn = el.querySelector(DROPDOWN_BTN_SELECTOR);
  const content = el.querySelector(DROPDOWN_CONTENT_SELECTOR);

  btn.addEventListener('click', () => {
    content.classList.toggle(DROPDOWN_CONTENT_VISIBLE_CLS);
  });
});

window.addEventListener('click', (e) => {
  if (!e.target.matches(DROPDOWN_BTN_SELECTOR)) {
    dropdowns.forEach((el) => {
      const content = el.querySelector(DROPDOWN_CONTENT_SELECTOR);
      if (content.classList.contains(DROPDOWN_CONTENT_VISIBLE_CLS)) {
        content.classList.remove(DROPDOWN_CONTENT_VISIBLE_CLS);
      }
    });
  }
});
