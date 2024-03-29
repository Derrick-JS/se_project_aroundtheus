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

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardsList);
  event.target.reset();
  closeModal(addCardModal);
}

// Generate Elements of the Cards
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = "Picture of " + data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", (e) => {
    handleCardImageClick(e);
  });

  return cardElement;
}

// Uses Card Elements to Render Cards
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleCardImageClick(event) {
  if (event.target.classList.contains("card__image")) {
    const cardImage = event.target;
    const cardTitle = cardImage.closest(".card").querySelector(".card__title");
    imagePreviewImage.src = cardImage.src;
    imagePreviewImage.alt = cardTitle.textContent;
    imageName.textContent = cardTitle.textContent;
    openModal(imagePreviewModal);
  }
}

// Profile Listeners
profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
// Add Card Listeners
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
// Image Preview Listeners
imagePreviewCloseButton.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);

// Generation of Cards from RenderCard Function that uses Card Elements
initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});
