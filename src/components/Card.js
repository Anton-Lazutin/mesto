export default class Card {
  constructor(data, cardData, templateSelector, openPhotoPopup, openDeleteForm) {
    this._data = data;
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._like = cardData.like; 
    this._likesLength = cardData.likes.length;
    this._changeLike = changeLike;
    this._cardId = cardData._id; 
    this._myId = cardData.myId;
    this._ownerId = cardData.owner._id;
    this._templateSelector = templateSelector;
    this._openPhotoPopup = openPhotoPopup;
    this._openDeleteForm = openDeleteForm;
    this._likeActiveCard = this._likeActiveCard.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);
    return templateElement.content.querySelector('.card').cloneNode(true);
  }

  _handleDeleteClick = () => {
    this._openDeleteForm({card: this, cardId: this._cardId});
  }

  _handleCardClick = () => {
    this._openPhotoPopup(this._data);
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

  removeCard() {
     this._element.remove();
     this._element = null;
  }

  _likeActiveCard = () => {
    this._changeLike(this._cardId, this._like); 
  }

  _checkLikeStatus() { 
    this._likes.forEach (element => {
        if (element._id === this._myId) {
            this._like.classList.add('card__like_active');
            return
        }
    })
    this._likesCounter.textContent = this._likesLength;
  }

  toggleLike (likes) {
  this._like.classList.toggle('card__like_active');
  this._likesCounter.textContent = likes.length;
  }

  isMyLike() {
    return this._like.classList.contains('card__like_active')
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPic = this._element.querySelector('.card__pic');
    this._cardLikeButton = this._element.querySelector('.card__like-btn');
    this._likesCounter = this._element.querySelector('.card__like-nmbr');
    const cardTitle = this._element.querySelector('.card__title');
    this._cardPic.src = this._data.link;
    this._cardPic.alt = this._data.place;
    cardTitle.textContent = this._data.place;
    if (this._myId === this._ownerId) {
      this._element.querySelector('.card__dlt-btn').style.display = 'block';
    } else {
      this._element.querySelector('.card__dlt-btn').style.display = 'none';
    };
    this._checkLikeStatus();
    this._setEventListeners(this._element);
    return this._element;
  }
}
