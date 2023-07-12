import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._submitButton = this._form.querySelector(".popup__submit-btn");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `Удаление...`
      this._submitFunction({card: this._element, cardId: this._cardId});
    });
  }

  open = ({card, cardId}) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  };
}
