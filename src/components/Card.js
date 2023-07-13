export default class Card {
  constructor(data, templateSelector, openPhotoPopup, openPopupWithDelete, changeLike) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._openPhotoPopup = openPhotoPopup;
    this._openPopupWithDelete = openPopupWithDelete;
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._changeLike = changeLike;
    this._cardId = data._id;
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);
    return templateElement.content.querySelector(".card").cloneNode(true);
  }

  _setEventListeners() {
    this._cardPic.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
  }

  _handleCardClick() {
    this._openPhotoPopup(this._data);
  }

  _handleDeleteClick() {
    this._openPopupWithDelete({card: this, cardId: this._cardId});
  }

  _handleLikeClick() {
    this._changeLike(this._cardLikeButton, this._cardId);
  }

  toggleLikes(likes) {
    this._cardLikeButton.classList.toggle("card__like-btn_active");
    this._counter.textContent = likes.length;
  }

  isMyLike() {
    return this._cardLikeButton.classList.contains('card__like-btn_active');
  }

  removeCard() {
    this._element.remove();
  }

  _changeVisibilityDltBtn() {
    this._myId === this._ownerId ? this._cardDeleteButton.classList.remove('card__dlt-btn_disable') : this._cardDeleteButton.classList.add('card__dlt-btn_disable')
  }

  _checkLikeStatus() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._cardLikeButton.classList.add("card__like-btn_active");
        return 
      }
    }) 
    this._counter.textContent = this._likesLength;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPic = this._element.querySelector(".card__pic");
    this._cardLikeButton = this._element.querySelector(".card__like-btn");
    this._counter = this._element.querySelector(".card__like-nmbr");
    this._cardDeleteButton = this._element.querySelector(".card__dlt-btn");
    const cardTitle = this._element.querySelector(".card__title");
    this._cardPic.src = this._data.link;
    this._cardPic.alt = this._data.name;
    cardTitle.textContent = this._data.name;
    this._checkLikeStatus();
    this._changeVisibilityDltBtn();
    this._setEventListeners(this._element);
    return this._element;
  }
}
