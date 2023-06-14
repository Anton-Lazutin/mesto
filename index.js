import { initialCards, validationConfig, configInfo, openButtonEditForm, openButtonAddForm, formEditPopup, formAddPopup } from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Popup from './scripts/components/Popup.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/userInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';

const userInfo = new UserInfo(configInfo);
const popup = new Popup ('.popup');
const popupWithImage = new PopupWithImage('.popup_photo');

const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, '#basic-cards', popupWithImage.open);
    return card.generateCard();
  }
}, '.photo-cards');
section.render();

const popupEditForm = new PopupWithForm('.popup_edit-form', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupEditForm.getInputValue());
  popupEditForm.close();
  editFormValidator.toggleButtonState();
})

const popupAddCardForm = new PopupWithForm('.popup_add-form', (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCardForm.getInputValue()));
  popupAddCardForm.close();
  addFormValidator.toggleButtonState();
});

openButtonEditForm.addEventListener('click', () => {
  popupEditForm.setInputValue(userInfo.getUserInfo())
  popupEditForm.open();
});

openButtonAddForm.addEventListener('click',  () => {
  popupAddCardForm.open();
}); 

popup.setEventListeners();
popupWithImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddCardForm.setEventListeners();

const addFormValidator = new FormValidator( validationConfig, formAddPopup);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator( validationConfig, formEditPopup);
editFormValidator.enableValidation();