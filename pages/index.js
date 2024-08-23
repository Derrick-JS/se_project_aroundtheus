/*********************
 * IMPORT STATEMENTS *
 *********************/
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
// import PopupWithImage from "../components/PopupWithImage.js";

/*********************
 * INITIAL CARD DATA *
 *********************/
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Profile Set Up
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
// Profile Edit Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#profile__edit-modal");
const editProfileForm = document.forms["profile-form"];
const profileModalCloseButton = editProfileModal.querySelector(
  ".modal__button-close"
);

// Add Card Modal
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__button-close"
);
// Card Template
const cardTemplate = document.querySelector(".card-template");
const cardsList = document.querySelector(".cards__list");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardURLInput = addCardForm.querySelector("#card-image-input");
// Card Element
const nameInput = editProfileForm.querySelector("#profile-title-input");
const jobInput = editProfileForm.querySelector("#profile-description-input");
// Card Image Preview Modal
const imagePreviewModal = document.querySelector("#image__preview-modal");
const imagePreviewImage = imagePreviewModal.querySelector(".modal__image");
const imageName = imagePreviewModal.querySelector(".modal__caption");
const imagePreviewCloseButton = imagePreviewModal.querySelector(
  ".modal__button-close"
);

/*********************
 * PROFILE LISTENERS *
 *********************/
profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
  profileFormValidator.toggleButtonState();
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
profileModalCloseButton.addEventListener("click", () => closeModal());

/**********************
 * ADD CARD LISTENERS *
 **********************/
addNewCardButton.addEventListener("click", function () {
  openModal(addCardModal);
  cardFormValidator.toggleButtonState();
});
addCardModalCloseButton.addEventListener("click", () => closeModal());
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

/******************
 * POPUPWITHFORM; *
 ******************/

const profilePopup = new PopupWithForm(editProfileModal, {
  handleFormSubmit: (data) => {
    profileTitle.textContent = data["profile-title"];
    profileDescription.textContent = data["profile-description"];
  },
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(addCardModal, {
  handleFormSubmit: (data) => {
    renderCard(data, cardsList);
  },
});

cardPopup.setEventListeners();

/*******************
 * POPUPWITHIMAGE; *
 *******************/

const imagePopup = new PopupWithImage(imagePreviewModal);
imagePopup.setEventListeners();

/*******************
 * FORM VALIDATOR; *
 *******************/

const validationSettings = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const validate = (form) => {
  if (form) {
    const formValidator = new FormValidator(validationSettings, form);
    formValidator.enableValidation();
    return formValidator;
  }
};

const profileFormValidator = validate(editProfileForm);
const cardFormValidator = validate(addCardForm);

/************************************************************************
 * GENERATION OF CARDS FROM RENDERCARD FUNCTION THAT USES CARD ELEMENTS *
 ************************************************************************/
initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});

function createCard(cardData) {
  const card = new Card(cardData, ".card-template", handleCardImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

/*************************************
 // ! FOLLOWING CODE IS DEPRECATED 
 *************************************/

/***************************
 * IMAGE PREVIEW LISTENERS *
 ***************************/
// ! Depricated - PopupWithImage class
imagePreviewCloseButton.addEventListener("click", () => closeModal());

/*************************
 * IMAGE PREVIEW HANDLER *
 *************************/
// ! Depricated - PopupWithImage class
function handleCardImageClick(data) {
  imagePreviewImage.src = data.link;
  imagePreviewImage.alt = data.name;
  imageName.textContent = data.name;
  openModal(imagePreviewModal);
}

/*************************
 * FORM SUBMIT FUNCTIONS *
 *************************/
// ! Depricated - PopupWithForm class
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardsList);
  event.target.reset();
  closeModal();
}
