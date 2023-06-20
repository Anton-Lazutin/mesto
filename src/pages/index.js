import { initialCards, validationConfig, configInfo, openButtonEditForm, openButtonAddForm, formEditPopup, formAddPopup } from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

//не совсем понял некоторые замечания, распишите чуть подробнее, пожалуйста

const userInfo = new UserInfo(configInfo);
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
  userInfo.setUserInfo(popupEditForm._getInputValue());
  popupEditForm.close();

})

const popupAddCardForm = new PopupWithForm('.popup_add-form', (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCardForm._getInputValue()));
  popupAddCardForm.close();

});

openButtonEditForm.addEventListener('click', () => {
  editFormValidator.toggleButtonState();
  popupEditForm.setInputValue(userInfo.getUserInfo())
  popupEditForm.open();
});

openButtonAddForm.addEventListener('click',  () => {
  addFormValidator.toggleButtonState();
  popupAddCardForm.open();
}); 

popupWithImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddCardForm.setEventListeners();

const addFormValidator = new FormValidator( validationConfig, formAddPopup);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator( validationConfig, formEditPopup);
editFormValidator.enableValidation();

import './index.css';
