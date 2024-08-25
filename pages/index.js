/*********************
 * IMPORT STATEMENTS *
 *********************/
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

/******************
 * POPUPWITHFORM; *
 ******************/

// const profilePopup = new PopupWithForm({
//   popupSelector: "#profile__edit-modal",
//   handleFormSubmit: handleFormSubmit,
// });

const closeModal = () => {
  profilePopup.close();
};

const profilePopup = new PopupWithForm({
  popupSelector: "#profile__edit-modal",
  handleFormSubmit: function (data) {
    if (
      document.querySelector("#profile__edit-modal .modal__form").id ===
      "profile-form"
    ) {
      // Profile form submission logic
      profileTitle.textContent = data.title;
      profileDescription.textContent = data.description;
      // how do i close the modal here without referencing the class im referencing tresulting in a loop
      // closeModal();
      this.close();
    } else if (
      document.querySelector("#profile__edit-modal .modal__form").id ===
      "add-card-form"
    ) {
      // Add card form submission logic
      const name = data.name;
      const link = data.link;
      renderCard({ name, link }, cardsList);
      // closeModal();
      this.close();
    } else {
      console.log("Error: Unknown form type");
    }
  },
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: function (data) {
    if (
      document.querySelector("#add-card-modal .modal__form").id ===
      "profile-form"
    ) {
      // Profile form submission logic
      profileTitle.textContent = data.title;
      profileDescription.textContent = data.description;
      closeModal();
    } else if (
      document.querySelector("#add-card-modal .modal__form").id ===
      "add-card-form"
    ) {
      // Add card form submission logic
      const name = data.name;
      const link = data.link;
      renderCard({ name, link }, cardsList);
      closeModal();
    } else {
      console.log("Unknown form type");
    }
  },
});

cardPopup.setEventListeners();

/**********************
 * EDIT PROFILE MODAL *
 *  POPUP WITH FORM   *
 **********************/

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profilePopup.open(editProfileModal);
  profileFormValidator.toggleButtonState();
});
editProfileForm.addEventListener("submit", profilePopup.handleFormSubmit());
profileModalCloseButton.addEventListener("click", () => profilePopup.close());

/*******************
 * ADD CARD MODAL  *
 * POPUP WITH FORM *
 *******************/

addNewCardButton.addEventListener("click", function () {
  cardPopup.open(addCardModal);
  cardFormValidator.toggleButtonState();
});
addCardModalCloseButton.addEventListener("click", () => cardPopup.close());
// addCardForm.addEventListener("submit", cardPopup.handleFormSubmit());

/*******************
 * POPUPWITHIMAGE; *
 *******************/

// create a new instance of the PopupWithImage class
const imagePopup = new PopupWithImage({
  popupSelector: "#image__preview-modal",
});

// setting event listeners
imagePopup.setEventListeners();

/***********************
 * IMAGE PREVIEW MODAL *
 *  POPUP WITH MODAL   *
 ***********************/

imagePreviewCloseButton.addEventListener("click", () => imagePopup.close());

function handleCardImageClick(data) {
  imagePopup.open(data);
}

/************************
  // ! HERE BE DRAGONS 
 ************************/

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
