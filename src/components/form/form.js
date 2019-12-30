import './form.css';

const forms = [];

const collectForms = () => {
  const formElements = document.querySelectorAll('form');

  formElements.forEach((formElement) => {
    forms.push({
      htmlElement: formElement,
      inputElements: [],
    });
  });
};

const enableFormSubmitButton = (form) => {
  const submitBtn = form.htmlElement.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
  }
};

const disableFormSubmitButton = (form) => {
  const submitBtn = form.htmlElement.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
  }
};

const isAllInputsFilled = (form) => {
  let result = true;
  form.inputElements.forEach((el) => {
    if (el.value.trim().length === 0) {
      result = false;
    }
  });
  return result;
};

const bindFormElementValidation = () => {
  forms.forEach((form) => {
    const invalidMessageElements = form.htmlElement.querySelectorAll('[data-invalid-message]');

    invalidMessageElements.forEach((msgElement) => {
      const inputId = msgElement.getAttribute('data-invalid-message');
      const inputElement = document.getElementById(inputId);

      if (inputElement) {
        form.inputElements.push(inputElement);

        inputElement.addEventListener('invalid', (event) => {
          event.preventDefault();
          msgElement.classList.remove('form__invalid-message_visibility_hidden');
          msgElement.classList.add('form__invalid-message_visibility_shown');
        });

        inputElement.addEventListener('input', () => {
          msgElement.classList.add('form__invalid-message_visibility_hidden');
          msgElement.classList.remove('form__invalid-message_visibility_shown');

          if (isAllInputsFilled(form)) {
            enableFormSubmitButton(form);
          } else {
            disableFormSubmitButton(form);
          }
        });
      }
    });
  });
};

setTimeout(() => {
  collectForms();
  bindFormElementValidation();
}, 0);

export default function resetForms() {
  forms.forEach((form) => {
    form.htmlElement.reset();
    disableFormSubmitButton(form);
    const invalidMessageElements = form.htmlElement.querySelectorAll('[data-invalid-message]');
    invalidMessageElements.forEach((msgElement) => {
      msgElement.classList.add('form__invalid-message_visibility_hidden');
      msgElement.classList.remove('form__invalid-message_visibility_shown');
    });
  });
}
