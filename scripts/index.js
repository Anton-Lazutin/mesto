let openButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
}
openButton.addEventListener('click', openPopup);

let closeButton = document.querySelector('.popup__close-btn');

function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

let profileName = document.querySelector('.profile__name');
let profileHobby = document.querySelector('.profile__hobby');
let inputName = document.querySelector('.popup__input_name');
let inputHobby = document.querySelector('.popup__input_hobby');

inputName.value = profileName.textContent;
inputHobby.value = profileHobby.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    inputName = document.querySelector('popup__input_name');
    inputHobby = document.querySelector('.popup__input_hobby');
    profileName.textContent = inputName.value;
    profileHobby.textContent = inputHobby.value;
}
formElement.addEventListener('submit', handleFormSubmit);