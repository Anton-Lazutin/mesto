//open popup and changing name
const openButton = document.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");

function openPopup() {
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;

  popup.classList.add("popup_opened");
}
openButton.addEventListener("click", openPopup);

const closeButton = document.querySelector(".popup__close-btn");

function closePopup() {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

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
