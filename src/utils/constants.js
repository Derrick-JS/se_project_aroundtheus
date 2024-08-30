/*********************
 * INITIAL CARD DATA *
 *********************/
export const initialCards = [
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

// Form Validation Settings
export const validationSettings = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Profile Set Up
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
// Profile Edit Modal
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const editProfileModal = document.querySelector("#profile__edit-modal");
export const editProfileForm = document.forms["profile-form"];
export const profileModalCloseButton = editProfileModal.querySelector(
  ".modal__button-close"
);

// Add Card Modal
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardForm = document.forms["add-card-form"];
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__button-close"
);
// Card Template
export const cardsList = document.querySelector(".cards__list");
// Card Image Preview Modal
export const imagePreviewModal = document.querySelector(
  "#image__preview-modal"
);
export const imagePreviewCloseButton = imagePreviewModal.querySelector(
  ".modal__button-close"
);