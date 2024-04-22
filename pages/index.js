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
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Profile Set Up
const modal = document.querySelector(".modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
// Profile Edit Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#profile__edit-modal");
const editProfileForm = document.querySelector("#profile-form");
const profileModalCloseButton = editProfileModal.querySelector(
  ".modal__button-close"
);
// Add Card Modal
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
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
  document.querySelector(".modal_opened").classList.remove("modal_opened");
  document.removeEventListener("keydown", handleCloseModalOnEsc);
  modal.removeEventListener("click", handleCloseModalOnClick);
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

// Uses Card Class to Render Card Elements
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, ".card-template", handleCardImageClick);
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}

// Image Preview Modal
function handleCardImageClick(data) {
  imagePreviewImage.src = data.link;
  imagePreviewImage.alt = data.name;
  imageName.textContent = data.name;
  openModal(imagePreviewModal);
}

(function validateForm(editProfileForm, addCardForm) {
  const validate = (form) => {
    if (form) {
      const formValidator = new FormValidator(validationSettings, form);
      formValidator.enableValidation();
    }
  };

  validate(editProfileForm);
  validate(addCardForm);
})();

// Profile Listeners
profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
profileModalCloseButton.addEventListener("click", () => closeModal());
// Add Card Listeners
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closeModal());
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
// Image Preview Listeners
imagePreviewCloseButton.addEventListener("click", () => closeModal());

// Generation of Cards from RenderCard Function that uses Card Elements
initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});
