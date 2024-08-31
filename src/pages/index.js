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

const profilePopup = new PopupWithForm({
  popupSelector: "#profile__edit-modal",
  handleFormSubmit: (data) => {
    userProfileInfo.setUserInfo(data);
    profilePopup.close();
  },
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    cardGeneration.addItem(createCard(data));
    cardPopup.close();
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
/************************/

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

function createCard(cardData) {
  const card = new Card(cardData, ".card-template", handleCardImageClick);
  return card.getView();
}

// Add cards to the page
const cardGeneration = new Section(
  {
    items: constants.initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardGeneration.addItem(cardElement);
    },
  },
  constants.cardsList // passing the already selected DOM element
);

// Render initial items
cardGeneration.renderItems();
