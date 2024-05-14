import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

// Form Validation Settings
const validationSettings = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

// Open and Close Modal Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleCloseModalOnEsc);
  modal.addEventListener("click", handleCloseModalOnClick);
}

function closeModal() {
  const openedModal = document.querySelector(".modal_opened");
  openedModal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleCloseModalOnEsc);
  openedModal.removeEventListener("click", handleCloseModalOnClick);
}

// Close Modal Listeners
const handleCloseModalOnEsc = (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
};

const handleCloseModalOnClick = (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal();
  }
};

// Form Submit Functions
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  // profileFormValidator.resetValidation();
  closeModal();
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardsList);
  event.target.reset();
  // cardFormValidator.resetValidation();
  closeModal();
}

// Uses Card Class to Render Card Elements

function createCard(cardData) {
  const card = new Card(cardData, ".card-template", handleCardImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

// Image Preview Handler
function handleCardImageClick(data) {
  imagePreviewImage.src = data.link;
  imagePreviewImage.alt = data.name;
  imageName.textContent = data.name;
  openModal(imagePreviewModal);
}

// define an object for storing validators
const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    // here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
    const formName = formElement.getAttribute("name");

    // here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

// TODO: Reset Validation
// formValidators[editProfileForm.getAttribute("name")].resetValidation();

// or you can use a string – the name of the form (you know it from `index.html`)

// formValidators["profile-form"].resetValidation();

const validate = (form) => {
  if (form) {
    const formValidator = new FormValidator(validationSettings, form);
    formValidator.enableValidation();
    return formValidator;
  }
};

const profileFormValidator = validate(editProfileForm);
const cardFormValidator = validate(addCardForm);

// Profile Listeners
profileEditButton.addEventListener("click", function () {
  // Setting Up Profile Modal Inputs
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);

  // Once open, we need to validate the form
  const modal = document.querySelector(".modal_opened");
  const formElement = modal.querySelector(".modal__form");
  if (formElement) {
    const formValidator = new FormValidator(
      validationSettings,
      modal.querySelector(".modal__form")
    );
    formValidator.toggleButtonState();
  }
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
profileModalCloseButton.addEventListener("click", () => closeModal());
// Add Card Listeners
addNewCardButton.addEventListener("click", function () {
  // We dont need to set anything up here so we can just open the modal
  openModal(addCardModal);
  // Once open, we need to validate the form
  const formElement = addCardModal.querySelector(".modal__form");
  if (formElement) {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.toggleButtonState();
  }
});
addCardModalCloseButton.addEventListener("click", () => closeModal());
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
// Image Preview Listeners
imagePreviewCloseButton.addEventListener("click", () => closeModal());

// Generation of Cards from RenderCard Function that uses Card Elements
initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});
