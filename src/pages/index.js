/*********************
 * IMPORT STATEMENTS *
 *********************/
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import * as constants from "../utils/constants.js";

import "../pages/index.css";

/******************
 * POPUPWITHFORM; *
 ******************/

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
      constants.profileTitle.textContent = data.title;
      constants.profileDescription.textContent = data.description;
      this.close();
    } else if (
      document.querySelector("#profile__edit-modal .modal__form").id ===
      "add-card-form"
    ) {
      const name = data.name;
      const link = data.link;
      renderCard({ name, link }, constants.cardsList);
      this.close();
    } else {
      console.log("Error: Unknown form type");
    }
  },
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    console.log("PRESSED");
    if (
      document.querySelector("#add-card-modal .modal__form").id ===
      "profile-form"
    ) {
      // Profile form submission logic
      constants.profileTitle.textContent = data.title;
      constants.profileDescription.textContent = data.description;
      closeModal();
    } else if (
      document.querySelector("#add-card-modal .modal__form").id ===
      "add-card-form"
    ) {
      // Add card form submission logic
      const name = data.name;
      const link = data.link;
      renderCard({ name, link }, constants.cardsList);
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

constants.profileEditButton.addEventListener("click", function () {
  constants.profileTitleInput.value = constants.profileTitle.textContent;
  constants.profileDescriptionInput.value =
    constants.profileDescription.textContent;
  profilePopup.open(constants.editProfileModal);
  profileFormValidator.toggleButtonState();
});
//editProfileForm.addEventListener("submit", profilePopup.handleFormSubmit());
constants.profileModalCloseButton.addEventListener("click", () =>
  profilePopup.close()
);

/*******************
 * ADD CARD MODAL  *
 * POPUP WITH FORM *
 *******************/

constants.addNewCardButton.addEventListener("click", function () {
  cardPopup.open(constants.addCardModal);
  cardFormValidator.toggleButtonState();
});
constants.addCardModalCloseButton.addEventListener("click", () =>
  cardPopup.close()
);

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

constants.imagePreviewCloseButton.addEventListener("click", () =>
  imagePopup.close()
);

function handleCardImageClick(data) {
  imagePopup.open(data);
}

/************************
  // ! HERE BE DRAGONS 
 ************************/

/*******************
 * FORM VALIDATOR; *
 *******************/

const validate = (form) => {
  if (form) {
    const formValidator = new FormValidator(constants.validationSettings, form);
    formValidator.enableValidation();
    return formValidator;
  }
};

const profileFormValidator = validate(constants.editProfileForm);
const cardFormValidator = validate(constants.addCardForm);

/************************************************************************
 * GENERATION OF CARDS FROM RENDERCARD FUNCTION THAT USES CARD ELEMENTS *
 ************************************************************************/

// Assuming Card class and handleCardImageClick are defined elsewhere

const cardGeneration = new Section(
  {
    items: constants.initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card-template", handleCardImageClick);
      const cardElement = card.getView();
      cardGeneration.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Render initial items
cardGeneration.renderItems();

// Function to render and prepend a new card
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, ".card-template", handleCardImageClick);
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}

/*********************
 * NEW GENERATION *
 *********************/

// const cardGeneration = new Section(
//   {
//     items: constants.initialCards,
//     renderer: (item) => {
//       const card = new Card(item, ".card-template", handleCardImageClick);
//       const cardElement = card.getView();
//       cardGeneration.addItem(cardElement);
//     },
//   },
//   ".cards__list"
// );

// cardGeneration.renderItems();

// function renderCard(cardData, wrapper) {
//   const cardElement = cardGeneration.addItem(cardData);
//   wrapper.prepend(cardElement);
// }

/*************************
 * DEPRICATED GENERATION *
 *************************/

// constants.initialCards.forEach((cardData) => {
//   renderCard(cardData, constants.cardsList);
// });

// function createCard(cardData) {
//   const card = new Card(cardData, ".card-template", handleCardImageClick);
//   const cardElement = card.getView();
//   return cardElement;
// }

// function renderCard(cardData, wrapper) {
//   const cardElement = createCard(cardData);
//   wrapper.prepend(cardElement);
// }
