const openButtonEditForm = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup_edit-form');
const closeButtonEditForm = document.querySelector('.popup__close-btn_edit-form');
const inputName = document.querySelector(".popup__input_type_name");
const inputHobby = document.querySelector(".popup__input_type_hobby");

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

openButtonEditForm.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__name');
  const profileHobby = document.querySelector('.profile__hobby');
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;
  openPopup(popup);
});

closeButtonEditForm.addEventListener('click', () => closePopup(popup));

//escape closing
function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
}

//overlay closing
function closePopupOverlay(popup, overlayClass, closeButtonClass, evt) {
  const isOverlay = evt.target.classList.contains(overlayClass);
  const isButtonClose = evt.target.classList.contains(closeButtonClass);
  const isElement = evt.target instanceof Element;
  if (isOverlay || isButtonClose || !isElement) {
    closePopup(popup);
  }
}

popup.addEventListener('click', function(evt) {
  closePopupOverlay(popup, 'popup_edit-form', 'popup__close-btn_edit-form', evt);
});

const popupAddForm = document.querySelector('.popup_add-form');
popupAddForm.addEventListener('click', function(evt) {
  closePopupOverlay(popupAddForm, 'popup_add-form', 'popup_close-btn_add-form', evt);
});

const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");
const formEditProfile = document.querySelector(".popup__input-form");

//changing name
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileHobby.textContent = inputHobby.value;
  closePopup(popup);
}
formEditProfile.addEventListener("submit", submitEditProfileForm);

//open cards
const openButtonAddForm = document.querySelector('.profile__add-btn');
const closeButtonAddForm = document.querySelector('.popup__close-btn_add-form');

openButtonAddForm.addEventListener('click',  (event) => {
  openPopup(popupAddForm)
  
});
closeButtonAddForm.addEventListener('click', () => closePopup(popupAddForm));

//add to array
const formAddCard = document.querySelector(".popup__input-add-form");
const inputPlaceElement = document.querySelector(".popup__input_type_place");
const inputLinkElement = document.querySelector(".popup__input_type_link");

function submitAddCardForm(event) {
  event.preventDefault();

  const inputPlace = inputPlaceElement.value;
  const inputLink = inputLinkElement.value;

  const element = createCardsElement({name: inputPlace, link: inputLink});
  photoCardsContainer.insertAdjacentElement('afterbegin', element);
  event.target.reset();
  event.submitter.classList.add('popup__submit-btn_invalid');
  event.submitter.disabled = true;

  closePopup(popupAddForm);
}

formAddCard.addEventListener("submit", submitAddCardForm);

//array of 6 cards
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const basicCards = document.getElementById('basic-cards');
const photoCardsContainer = document.querySelector('.photo-cards');

const createCardsElement = (initialCardsObj) => {
  const cardElement = basicCards.content.querySelector('.card').cloneNode(true);
  
  const cardPic = cardElement.querySelector('.card__pic');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__dlt-btn');
  const cardLikeButton = cardElement.querySelector('.card__like-btn');
  
  //set cards data
  cardTitle.textContent = initialCardsObj.name;
  cardPic.src = initialCardsObj.link;
  cardPic.alt = initialCardsObj.name;  
  
  //delete button
  const handleDelete = () => {
    cardElement.remove();
  }

  //like button
  const handleLike = () => {
    cardLikeButton.classList.toggle('card__like-btn_active');
  }

  cardPic.addEventListener('click', () => {
    openPhotoPopup(initialCardsObj);
  });

  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);

  return cardElement;
}

initialCards.forEach((cardData) => {
  const element = createCardsElement(cardData);
  photoCardsContainer.appendChild(element);
});

//popup big photo
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close-btn_photo');
const popupBigPhoto = popupPhoto.querySelector('.popup__big-photo');
const popupSubtitle = popupPhoto.querySelector('.popup__subtitle');

function openPhotoPopup(el) {
  // Set photo and title
  popupSubtitle.textContent = el.name;
  popupBigPhoto.src = el.link;
  popupBigPhoto.alt = el.name;

  openPopup(popupPhoto);
}

buttonClosePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));

popupPhoto.addEventListener('click', function(evt) {
  closePopupOverlay(popupPhoto, 'popup_photo', 'popup_close-btn_photo', evt);
});