import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__input-form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit-btn");
    this._defaultSubmitButtonText = this._submitButton.textContent;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `Сохранение...`;
      this._submitFunction(this._getInputValue());
    });
  }

  _getInputValue() {
    this._value = {};
    this._inputList.forEach((input) => {
      this._value[input.name] = input.value;
    });
    return this._value;
  }

  resetDefaultText() {
    this._submitButton.textContent = this._defaultSubmitButtonText;
  }

  setInputValue(dataUser) {
    this._inputList.forEach((input) => {
      input.value = dataUser[input.name];
    });
  }
}
