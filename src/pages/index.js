import './index.css';
import { 
  initialCards,
  validationConfig,
  configInfo,
  openButtonEditForm,
  openButtonAddForm,
  formEditPopup,
  formAddPopup,
  formAvatar,
  openAvatarChanging
 } from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import Api from '../components/Api.js';
let userId;
const userInfo = new UserInfo(configInfo);
const popupWithImage = new PopupWithImage('.popup_photo');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'd6ad4e70-bf86-454e-9e8a-e2958c4059f4',
    'Content-Type': 'application/json'
  }
});

// Здравствуйте, я где то тут ошибок наделал, помогите, пожалуйста, найти, если это возможно =)

const popupWithDelete = new PopupWithDelete('.popup_confirm', ({card, cardId}) => {
  api.deleteCard(cardId)
  .then (res => {
    console.log('res', res)
    card.removeCard()
    popupWithDelete.close()
  })
  .catch (error => console.log(`Ошибка: ${error}`))
});

const createCard = (element) => {
  const card = new Card('.basic-cards', element,  popupWithImage.open, popupWithDelete.open, (cardId) => {
    const isLiked = card.isMyLike ();
    if(isLiked) {
      api.deleteLike(cardId) 
      .then(res => {
        card.toggleLike(res.likes)
      })
      .catch (error => console.log(`Ошибка: ${error}`))
    } else {
      api.addLike(cardId)
      .then (res => {
        card.toggleLike(res.likes) 
      })
      .catch (error => console.log(`Ошибка: ${error}`))
    }
  });
  return card.generateCard();
};

const section = new Section({
  items: initialCards,
  renderer: createCard
}, '.photo-cards');

const popupEditForm = new PopupWithForm(formEditPopup,'.popup_edit-form', (data) => {
  api.setUserInfo(data)
  .then (dataUser => {
    userInfo.setUserInfo(dataUser);
    popupEditForm.close();
  })
  .catch (error => console.log(`Ошибка: ${error}`))
})

const popupAddCardForm = new PopupWithForm(formAddPopup, '.popup_add-form', (data) => {
  api.addCard(data)
  .then (dataCard => {
    dataCard.myId = userInfo.getUserId();
    section.addItem(dataCard);
    popupAddCardForm.close();
  })
  .catch (error => console.log(`Ошибка: ${error}`))
})

const popupChangeAvatar = new PopupWithForm(formAvatar, '.popup_change-avatar', (data) => {
  api.setUserAvatar(data)
  .then (dataUser => {
    userInfo.setUserInfo(dataUser)
    // document.querySelector('.profile__photo').src = data.avatar;
    popupChangeAvatar.close();
  })
  .catch (error => console.log(`Ошибка: ${error}`))
})

openAvatarChanging.addEventListener('click', () => {
  avatarFormVallidator.toggleButtonState();
  popupChangeAvatar.open();
})

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
popupChangeAvatar.setEventListeners();
popupWithDelete.setEventListeners();

const addFormValidator = new FormValidator( validationConfig, formAddPopup);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator( validationConfig, formEditPopup);
editFormValidator.enableValidation();

const avatarFormVallidator = new FormValidator(validationConfig, formAvatar);
avatarFormVallidator.enableValidation();

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => { 
    userId = dataUser._id;
    dataCard.forEach(element => element.myId = dataUser._id);
    userInfo.setUserInfo({ username: dataUser.name, hobby: dataUser.about, avatar: dataUser.avatar });
    userInfo.setUserId(userId);
    section.render(dataCard);
  })

