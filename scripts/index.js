import initialCards from './constants.js';
import Card from './cards.js';

const openButtonEditForm = document.querySelector('.profile__edit-btn');
const closeButtonEditForm = document.querySelector('.popup__close-btn_edit-form');
const popup = document.querySelector('.popup_edit-form');
const popupAddForm = document.querySelector('.popup_add-form');
const inputName = document.querySelector('.popup__input_type_name');
const inputHobby = document.querySelector('.popup__input_type_hobby');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const formEditProfile = document.querySelector('.popup__input-form');
const openButtonAddForm = document.querySelector('.profile__add-btn');
const closeButtonAddForm = document.querySelector('.popup__close-btn_add-form');
const basicCards = document.getElementById('basic-cards');
const photoCardsContainer = document.querySelector('.photo-cards');
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close-btn_photo');
const popupBigPhoto = popupPhoto.querySelector('.popup__big-photo');
const popupSubtitle = popupPhoto.querySelector('.popup__subtitle');
const formAddCard = document.querySelector('.popup__input-add-form');
const inputPlaceElement = document.querySelector('.popup__input_type_place');
const inputLinkElement = document.querySelector('.popup__input_type_link');

const selectorTemplate = '#basic-cards';

//opening by button
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

//closing by button
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

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

//changing name
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileHobby.textContent = inputHobby.value;
  closePopup(popup);
}

//add to array
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

initialCards.forEach((cardData) => {
  const card = new Card(cardData, selectorTemplate);
  const cardElement = card.generateCard();
  photoCardsContainer.appendChild(cardElement);
});

// //popup big photo
function openPhotoPopup(data) {
  popupSubtitle.textContent = data.name;
  popupBigPhoto.src = data.link;
  popupBigPhoto.alt = data.name;

  openPopup(popupPhoto);
}

openButtonEditForm.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__name');
  const profileHobby = document.querySelector('.profile__hobby');
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;
  openPopup(popup);
});
closeButtonEditForm.addEventListener('click', () => closePopup(popup));

popup.addEventListener('click', function(evt) {
  closePopupOverlay(popup, 'popup_edit-form', 'popup__close-btn_edit-form', evt);
});
popupAddForm.addEventListener('click', function(evt) {
  closePopupOverlay(popupAddForm, 'popup_add-form', 'popup_close-btn_add-form', evt);
});

formEditProfile.addEventListener("submit", submitEditProfileForm);
formAddCard.addEventListener("submit", submitAddCardForm);

openButtonAddForm.addEventListener('click',  () => openPopup(popupAddForm));
closeButtonAddForm.addEventListener('click', () => closePopup(popupAddForm));

buttonClosePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));
popupPhoto.addEventListener('click', function(evt) {
  closePopupOverlay(popupPhoto, 'popup_photo', 'popup_close-btn_photo', evt);
});