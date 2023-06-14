const initialCards = [
    {
      place: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      place: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      place: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      place: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      place: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      place: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

const validationConfig = {
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message'
};

const configInfo = {
  profileNameSelector: '.profile__name',
  profileHobbySelector: '.profile__hobby'
};

const openButtonEditForm = document.querySelector('.profile__edit-btn');
const openButtonAddForm = document.querySelector('.profile__add-btn');

const formEditPopup = document.forms['edit-form'];
const formAddPopup = document.forms['add-form'];

export {initialCards, validationConfig, configInfo, openButtonEditForm, openButtonAddForm, formEditPopup, formAddPopup};