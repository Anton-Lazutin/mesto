const submitBtn = document.querySelector('.popup__submit-btn');
const isValid = inputEl => inputEl.validity.valid;

const activateError = (errorElement, message) => {
    const inputForm = errorElement.closest('.popup__input-form');
    inputForm.classList.add('popup__input_invalid');
    errorElement.textContent = message;
};

const resetError = (errorElement) => {
    const inputForm = errorElement.closest('.popup__input-form');
    inputForm.classList.remove('popup__input_invalid');
    errorElement.textContent = '';
};

submitBtn.addEventListener('click', () => {
    const inputList = Array.from(document.querySelectorAll('input'));

    inputList.forEach(inputEl => {
        const errorElement = document.querySelector(`#error-${inputEl.id}`); 

        if (!isValid(inputEl)) {
            activateError(errorElement, inputEl.validationMessage);
        } else {
            resetError(errorElement);
        }
    });
});