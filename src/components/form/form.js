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

const isFormValid = (form) => {
  let result = true;
  form.inputElements.forEach((input) => {
    if (input.willValidate === true && input.validity.valid === false) {
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
      const inputElement = document.querySelector(`#${inputId}`);

      if (inputElement) {
        form.inputElements.push(inputElement);

        inputElement.addEventListener('input', () => {
          if (inputElement.validity.valid === false) {
            // shows invalid message
            msgElement.classList.remove('form__invalid-message_visibility_hidden');
            msgElement.classList.add('form__invalid-message_visibility_shown');
          } else {
            // hides invalid message
            msgElement.classList.add('form__invalid-message_visibility_hidden');
            msgElement.classList.remove('form__invalid-message_visibility_shown');
          }

          if (isFormValid(form)) {
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
