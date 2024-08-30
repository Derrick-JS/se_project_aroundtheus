/*********************
 * IMPORT STATEMENTS *
 *********************/
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import * as constants from "../utils/constants.js";

import "../pages/index.css";

/*************
 * USERINFO; *
 *************/

const userProfileInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

/******************
 * POPUPWITHFORM; *
 ******************/

// There are 3 modals with different buttons and forms in the project.
// You need to name variables and functions the way all could understand what they are.

// Please, delete the close icons handling from index.js because they should be handled by Popup from now on

// there are three close modal functions that are used to close the modals

// do we correctly call the close functions in the close buttons according to the abive specificatioms?

function closeProfileModal() {
  profilePopup.close();
}

function closeCardModal() {
  cardPopup.close();
}

function closeImageModal() {
  imagePopup.close();
}

const profilePopup = new PopupWithForm({
  popupSelector: "#profile__edit-modal",
  handleFormSubmit: (data) => {
    userProfileInfo.setUserInfo(data);
    closeProfileModal();
  },
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    renderCard(data, constants.cardsList);
    closeCardModal();
  },
});

cardPopup.setEventListeners();

/**********************
 * EDIT PROFILE MODAL *
 *  POPUP WITH FORM   *
 **********************/

constants.profileEditButton.addEventListener("click", function () {
  const { name, job } = userProfileInfo.getUserInfo();
  constants.profileTitleInput.value = name;
  constants.profileDescriptionInput.value = job;

  profilePopup.open(constants.editProfileModal);
  profileFormValidator.toggleButtonState();
});

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

const imagePopup = new PopupWithImage({
  popupSelector: "#image__preview-modal",
});

imagePopup.setEventListeners();

/***********************
 * IMAGE PREVIEW MODAL *
 *  POPUP WITH MODAL   *
 ***********************/

constants.imagePreviewCloseButton.addEventListener("click", () =>
  closeImageModal()
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

// Render new card
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, ".card-template", handleCardImageClick);
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}
