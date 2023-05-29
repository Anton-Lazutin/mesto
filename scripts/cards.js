class Card {
    constructor(data, templateSelector) {
      this._data = data;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const templateElement = document.querySelector(this._templateSelector);
      return templateElement.content.querySelector('.card').cloneNode(true);
    }
  
    _setEventListeners(cardElement) {
      const cardPic = cardElement.querySelector('.card__pic');
      const cardDeleteButton = cardElement.querySelector('.card__dlt-btn');
      const cardLikeButton = cardElement.querySelector('.card__like-btn');
  
      cardPic.addEventListener('click', () => {
        this._handleCardClick();
      });
  
      cardDeleteButton.addEventListener('click', () => {
        this._handleDeleteClick();
      });
  
      cardLikeButton.addEventListener('click', () => {
        this._handleLikeClick();
      });
    }
  
    _handleCardClick() {
      openPhotoPopup(this._data);
    }
  
    _handleDeleteClick() {
      this._element.remove();
    }
  
    _handleLikeClick() {
      const cardLikeButton = this._element.querySelector('.card__like-btn');
      cardLikeButton.classList.toggle('card__like-btn_active');
    }
  
    generateCard() {
      this._element = this._getTemplate();
  
      const cardPic = this._element.querySelector('.card__pic');
      const cardTitle = this._element.querySelector('.card__title');
  
      cardPic.src = this._data.link;
      cardPic.alt = this._data.name;
      cardTitle.textContent = this._data.name;
  
      this._setEventListeners(this._element);
  
      return this._element;
    }
  }

  export default Card;