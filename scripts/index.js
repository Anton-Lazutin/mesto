//changing name
const openButtonEditForm = document.querySelector('.profile__edit-btn');
const popupEditForm = document.querySelector('.popup_edit-form');
const closeButtonEditForm = document.querySelector('.popup__close-btn_edit-form');

function openPopup(popupEditForm) {
  popupEditForm.classList.add('popup_opened');
}

function closePopup(popupEditForm) {
  popupEditForm.classList.remove('popup_opened');
}

openButtonEditForm.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;
  openPopup(popupEditForm);
});

closeButtonEditForm.addEventListener('click', () => closePopup(popupEditForm));

const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");
const inputName = document.querySelector(".popup__input_type_name");
const inputHobby = document.querySelector(".popup__input_type_hobby");
const formElement = document.querySelector(".popup__input-form");

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileHobby.textContent = inputHobby.value;
  closePopup(popupEditForm);
}
formElement.addEventListener("submit", handleFormSubmit);

//add cards
const openButtonAddForm = document.querySelector('.profile__add-btn');
const popupAddForm = document.querySelector('.popup_add-form');
const closeButtonAddForm = document.querySelector('.popup__close-btn_add-form');

openButtonAddForm.addEventListener('click',  () => openPopup(popupAddForm));
closeButtonAddForm.addEventListener('click', () => closePopup(popupAddForm));

//add to array
const addFormElement = document.querySelector(".popup__input-add-form");
const inputPlaceElement = document.querySelector(".popup__input_type_place");
const inputLinkElement = document.querySelector(".popup__input_type_link");

function addToArray(event) {
  event.preventDefault();

  const inputPlace = inputPlaceElement.value;
  const inputLink = inputLinkElement.value;

  inputPlaceElement.value = '';
  inputLinkElement.value = '';

  const element = createCardsElement({name: inputPlace, link: inputLink});
  photoCardsContainer.insertAdjacentElement('afterbegin', element);

  closePopup(popupAddForm);
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
  
  //set cards data
  cardTitle.textContent = initialCardsObj.name;
  cardPic.src = initialCardsObj.link;
  cardPic.alt = initialCardsObj.name;  
  
  //delete button
  const handleDelete = () => {
    cardElement.remove();
  }

  //like button
  const handleLike = () => {
    cardLikeButton.classList.toggle('card__like-btn_active');
  }

  cardPic.addEventListener('click', () => {
    openPhotoPopup(initialCardsObj);
  });

  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);

  return cardElement;
}

initialCards.forEach((obj) => {
  const element = createCardsElement(obj);
  photoCardsContainer.appendChild(element);
});

//popup big photo
const popupPhoto = document.querySelector('.popup_photo');
const closeButtonPhoto = document.querySelector('.popup__close-btn_photo');
const popupBigPhoto = document.querySelector('.popup__big-photo');
const popupSubtitle = document.querySelector('.popup__subtitle');

function openPhotoPopup(el) {
  // Set photo and title
  popupSubtitle.textContent = el.name;
  popupBigPhoto.src = el.link;
  popupBigPhoto.alt = el.name;

  openPopup(popupPhoto);
}

closeButtonPhoto.addEventListener('click', () => closePopup(popupPhoto));
