class Card {
  constructor(data, templateSelector,openPhotoPopup) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._openPhotoPopup = openPhotoPopup;
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);
    return templateElement.content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners(cardElement) {
    this._cardPic.addEventListener('click', () => {
      this._handleCardClick();
    });

    cardElement.querySelector('.card__dlt-btn').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  _handleCardClick() {
    this._openPhotoPopup(this._data);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._cardLikeButton.classList.toggle('card__like-btn_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPic = this._element.querySelector('.card__pic');
    this._cardLikeButton = this._element.querySelector('.card__like-btn');
    const cardTitle = this._element.querySelector('.card__title');
    this._cardPic.src = this._data.link;
    this._cardPic.alt = this._data.name;
    cardTitle.textContent = this._data.name;
    this._setEventListeners(this._element);
    return this._element;
  }
}

export default Card;
