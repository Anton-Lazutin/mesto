export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
    this._form = this._popup.querySelector(".popup__input-form");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleCloseBtn = () => {
    this.close();
  };

  _handleCloseOverlay = (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close-btn")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleCloseOverlay);
  }
}
