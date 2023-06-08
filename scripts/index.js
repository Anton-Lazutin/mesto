import { initialCards, validationConfig } from './constants.js';
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
const openButtonAddForm = document.querySelector('.profile__add-btn');
const closeButtonAddForm = document.querySelector('.popup__close-btn_add-form');

const photoCardsContainer = document.querySelector('.photo-cards');
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close-btn_photo');
const popupBigPhoto = popupPhoto.querySelector('.popup__big-photo');
const popupSubtitle = popupPhoto.querySelector('.popup__subtitle');
const inputPlaceElement = document.querySelector('.popup__input_type_place');
const inputLinkElement = document.querySelector('.popup__input_type_link');

const formEditPopup = document.forms['edit-form'];
const formAddPopup = document.forms['add-form'];

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
  editFormValidator.toggleButtonState();
  closePopup(popupEditForm);
}

function createCardsElement(data) {
  const card = new Card(data, '#basic-cards', openPhotoPopup);
  return card.generateCard();;
}

//add to array
function submitAddCardForm(event) {
  event.preventDefault();
  const inputPlace = inputPlaceElement.value;
  const inputLink = inputLinkElement.value;

  const element = createCardsElement({name: inputPlace, link: inputLink});
  photoCardsContainer.prepend(element);
  event.target.reset();
  addFormValidator.toggleButtonState();

  closePopup(popupAddForm);
}

initialCards.forEach((data) => {
  const cardElement = createCardsElement(data);
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

formEditPopup.addEventListener("submit", submitEditProfileForm);
formAddPopup.addEventListener("submit", submitAddCardForm);

openButtonAddForm.addEventListener('click',  () => openPopup(popupAddForm));
closeButtonAddForm.addEventListener('click', () => closePopup(popupAddForm));

buttonClosePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));

  const addFormValidator = new FormValidator( validationConfig, formAddPopup);
  addFormValidator.enableValidation();

  const editFormValidator = new FormValidator( validationConfig, formEditPopup);
  editFormValidator.enableValidation();