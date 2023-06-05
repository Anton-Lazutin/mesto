import { initialCards } from './constants.js';
import validationConfig from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const openButtonEditForm = document.querySelector('.profile__edit-btn');
const closeButtonEditForm = document.querySelector('.popup__close-btn_edit-form');
const popupEditForm = document.querySelector('.popup_edit-form');
const popupAddForm = document.querySelector('.popup_add-form');
const inputName = document.querySelector('.popup__input_type_name');
const inputHobby = document.querySelector('.popup__input_type_hobby');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const formEditProfile = document.querySelector('.popup__input-form');
const openButtonAddForm = document.querySelector('.profile__add-btn');
const closeButtonAddForm = document.querySelector('.popup__close-btn_add-form');

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
    closePopup(popupOpened);
  }
}

//overlay closing
function closePopupOverlay(evt) {
  const isOverlay = evt.target.classList.contains('popup'); 
  const isButtonClose = evt.target.classList.contains('popup__close-btn'); 
  const isElement = evt.target instanceof Element; 
  if (isOverlay || isButtonClose || !isElement) { 
    closePopup(evt.currentTarget);
  } 
}

//changing name
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileHobby.textContent = inputHobby.value;
  closePopup(popupEditForm);
}

function createCardsElement(data) {
  const card = new Card(data, selectorTemplate, openPhotoPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

//add to array
function submitAddCardForm(event) {
  event.preventDefault();
  const inputPlace = inputPlaceElement.value;
  const inputLink = inputLinkElement.value;

  const element = createCardsElement({name: inputPlace, link: inputLink});
  photoCardsContainer.prepend(element);
  event.target.reset();
  validators['popup__submit-btn_invalid'].toggleButtonState();

  closePopup(popupAddForm);
}

initialCards.forEach((data) => {
  createCardsElement(data);
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
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;
  openPopup(popupEditForm);
});
closeButtonEditForm.addEventListener('click', () => closePopup(popupEditForm));

popupEditForm.addEventListener('click', closePopupOverlay);
popupAddForm.addEventListener('click', closePopupOverlay);
popupPhoto.addEventListener('click', closePopupOverlay);

formEditProfile.addEventListener("submit", submitEditProfileForm);
formAddCard.addEventListener("submit", submitAddCardForm);

openButtonAddForm.addEventListener('click',  () => openPopup(popupAddForm));
closeButtonAddForm.addEventListener('click', () => closePopup(popupAddForm));

buttonClosePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));

const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
forms.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

export default forms;