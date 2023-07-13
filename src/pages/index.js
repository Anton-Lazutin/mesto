import "./index.css";
import {
  validationConfig,
  configInfo,
  openButtonEditForm,
  openButtonAddForm,
  formEditPopup,
  formAddPopup,
  formAvatarPopup,
  openButtonAvatarForm,
} from "../components/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import Api from "../components/Api.js";

const userInfo = new UserInfo(configInfo);
const popupWithImage = new PopupWithImage(".popup_photo");

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'd6ad4e70-bf86-454e-9e8a-e2958c4059f4',
    'Content-Type': 'application/json'
  }
})

const popupWithDelete = new PopupWithDelete(".popup_delete", ({card, cardId}) => {
  api.deleteCard(cardId)
  .then((res) => {
    console.log(res);
    card.removeCard();  
    popupWithDelete.close();
  })
  .catch((error) => console.error(`Ошибка: ${error}`))
  .finally(()=> popupWithDelete.resetDefaultText())
})
// да, получилось, спасибо большое за помощь =)
const createCard = (element) => {
  const card = new Card(element, "#basic-cards", popupWithImage.open, popupWithDelete.open, cardId => {
    if (card.isMyLike()) {
      api.deleteLike(cardId)
      .then(res => {
        card.toggleLikes(res.likes);
      })
      .catch((error) => console.error(`Ошибка: ${error}`))
    } else {
      api.addLike(cardId)
      .then(res => {
        card.toggleLikes(res.likes);
      })
      .catch((error) => console.error(`Ошибка: ${error}`))
    }
  });
  return card.generateCard();
}

const section = new Section({
    renderer: (element) => {
      section.addItem(createCard(element));
    },
  }, ".photo-cards")

const popupEditForm = new PopupWithForm(".popup_edit-form", (data) => {
  api.setUserInfo(data)
  .then(res => {
    userInfo.setUserInfo({username: res.name, hobby: res.about, avatar: res.avatar});
    popupEditForm.close();
  })
  .catch((error) => console.error(`Ошибка: ${error}`))
  .finally(() => popupEditForm.resetDefaultText())
})

const popupAddCardForm = new PopupWithForm(".popup_add-form", (data) => {
  api.addCard(data)
  .then((dataCard) => {
    dataCard.myId = dataCard.owner._id;
    section.addItem(createCard(dataCard));
    popupAddCardForm.close();
  })
  .catch((error) => console.error(`Ошибка: ${error}`))
  .finally(() => popupAddCardForm.resetDefaultText())
})

const popupEditAvatar = new PopupWithForm(".popup_edit-avatar", (data) => {
  api.setUserAvatar(data)
  .then(res => {
    userInfo.setUserInfo({username: res.name, hobby: res.about, avatar: res.avatar});
    popupEditAvatar.close();
  })
  .catch((error) => console.error(`Ошибка: ${error}`))
  .finally(() => popupEditAvatar.resetDefaultText())
})

openButtonEditForm.addEventListener("click", () => {
  editFormValidator.toggleButtonState();
  popupEditForm.setInputValue(userInfo.getUserInfo());
  popupEditForm.open();
})

openButtonAddForm.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  popupAddCardForm.open();
})

openButtonAvatarForm.addEventListener('click', () => {
  avatarFormValidator.toggleButtonState();
  popupEditAvatar.open();
})

popupWithImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithDelete.setEventListeners();

const addFormValidator = new FormValidator(validationConfig, formAddPopup);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(validationConfig, formEditPopup);
editFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, formAvatarPopup);
avatarFormValidator.enableValidation();

Promise.all([api.getInfo(), api.getCards()])
.then(([dataUser, dataCard]) => {
  userInfo.setUserInfo({username: dataUser.name, hobby: dataUser.about, avatar: dataUser.avatar});
  dataCard.forEach(element => element.myId = dataUser._id) 
  section.render(dataCard.reverse());
})
.catch((error) => console.error(`Ошибка: ${error}`))