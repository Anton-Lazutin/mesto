const validationConfig = {
    formSelector: '.popup__input-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message'
  }; 

const enableValidation = ({formSelector, ...rest}) => {
    const inputForms = Array.from(document.querySelectorAll(formSelector));
    inputForms.forEach(popupInputForm => {
        popupInputForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        setEventListeners(popupInputForm, rest);
    })
};

const setEventListeners = (popupInputForm, {inputSelector, submitButtonSelector, ...rest}) => {
  const popupInputs = Array.from(popupInputForm.querySelectorAll(inputSelector));
  const submitButton = popupInputForm.querySelector(submitButtonSelector);
  popupInputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      if (hasInvalidInput(popupInputs)) {
        disableButton(submitButton, rest);
      } else {
        enableButton(submitButton, rest);
      }
    });
  });
};

const checkInputValidity = (input) => {
  const inputErrorContainer = document.querySelector(`#error-${input.id}`);
  if (input.validity.valid) {
    inputErrorContainer.textContent = '';
  } else {
    inputErrorContainer.textContent = input.validationMessage;
  }
};

const hasInvalidInput = (popupInputs) => {
  return popupInputs.some((item) => !item.validity.valid);
};

const enableButton = (button, {submitButtonSelector, inactiveButtonClass}) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(submitButtonSelector);
  button.removeAttribute('disabled');
};

const disableButton = (button, {submitButtonSelector, inactiveButtonClass}) => {
  button.classList.add(inactiveButtonClass);
  button.classList.remove(submitButtonSelector);
  button.setAttribute('disabled', true);
};

enableValidation(validationConfig);
