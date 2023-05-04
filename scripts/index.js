//changing name
const openButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup_edit-form');
const closeButton = document.querySelector('.close-btn_edit-form');

function openPopup() {
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;

  popup.classList.add('popup_opened');
}
openButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");
const inputName = document.querySelector(".popup__input_type_name");
const inputHobby = document.querySelector(".popup__input_type_hobby");
const formElement = document.querySelector(".popup__input-form");

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileHobby.textContent = inputHobby.value;
  closePopup();
}
formElement.addEventListener("submit", handleFormSubmit);

//add cards
const addButton = document.querySelector('.profile__add-btn');
const popupAdd = document.querySelector('.popup_add-form');
const closeButton2 = document.querySelector('.close-btn_add-form');

function openAddPopup() {
  
  popupAdd.classList.add('popup_opened');
}
addButton.addEventListener('click', openAddPopup);

function closeAddPopup() {
  popupAdd.classList.remove('popup_opened');
}
closeButton2.addEventListener('click', closeAddPopup);

//add to array
const addFormElement = document.querySelector(".popup__input-add-form");

function addToArray(event) {
  event.preventDefault();

  const inputPlace = document.querySelector(".popup_add-form__input_type_place").value;
  const inputLink = document.querySelector(".popup_add-form__input_type_link").value;

  initialCards.push({name: inputPlace, link: inputLink});
  document.querySelector(".popup_add-form__input_type_place").value = '';
  document.querySelector(".popup_add-form__input_type_link").value = '';

  const element = createCardsElement({name: inputPlace, link: inputLink});
  photoCardsContainer.appendChild(element);

  closeAddPopup();
}

addFormElement.addEventListener("submit", addToArray);

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
  
  //add cards
  cardTitle.textContent = initialCardsObj.name;
  cardPic.src = initialCardsObj.link; 
  
  //delete button
  const handleDelete = () => {
    cardElement.remove();
  }

  //like button
  const handleLike = () => {
    cardLikeButton.classList.toggle('card__like-btn_active');
  }

  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);

  return cardElement;
}

initialCards.forEach((obj) => {
  const element = createCardsElement(obj);
  photoCardsContainer.appendChild(element);
})

