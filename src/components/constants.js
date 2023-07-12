const validationConfig = {
  formSelector: ".popup__input-form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-message",
};

const configInfo = {
  profileNameSelector: ".profile__name",
  profileHobbySelector: ".profile__hobby",
  profileAvatarSelector: ".profile__photo",
};

const openButtonEditForm = document.querySelector(".profile__edit-btn");
const openButtonAddForm = document.querySelector(".profile__add-btn");
const openButtonAvatarForm = document.querySelector(".profile__avatar-overlay");

const formEditPopup = document.forms["edit-form"];
const formAddPopup = document.forms["add-form"];
const formAvatarPopup = document.forms["avatar-form"];

export {
  validationConfig,
  configInfo,
  openButtonEditForm,
  openButtonAddForm,
  formEditPopup,
  formAddPopup,
  formAvatarPopup,
  openButtonAvatarForm,
}
