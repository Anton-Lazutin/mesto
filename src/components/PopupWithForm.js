import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__input-form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValue());
    });
  }

  _getInputValue() {
    this._value = {};
    this._inputList.forEach(input => {
        this._value[input.name] = input.value;
    })
    return this._value;
  }

  setInputValue(dataUser) {
    this._inputList.forEach(input => {
        input.value = dataUser[input.name];
    })
  }
}
