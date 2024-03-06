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

/* Consider converting HTML classes to JS variables
Alternatively, we could use new JS classes for each element
Example:
let modal = document.querySelector(".JS__modal");
*/
let modal = document.querySelector(".modal");
/* should future-proof by changing from modal in cases where we have multiple modals */
let profileEditButton = document.querySelector(".profile__edit-button");
let modalCloseButton = document.querySelector(".modal__button-close");
let profileTitle = document.querySelector(".profile__title"); 
let profileDescription = document.querySelector(".profile__description");
let profileTitleInput = document.querySelector("#profile-title-input");
let profileDescriptionInput = document.querySelector("#profile-description-input");
let modalForm = document.querySelector(".modal__form");
let cardTemplate = document.querySelector(".card__template").content.firstChildElement
let cardsList = document.querySelector(".cards__list");

function closePopup() {
  modal.classList.remove("modal__open");
}

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImage = document.querySelector(".card__image");
  cardImage.src = data.link;
  let cardTitle = document.querySelector(".card__title");
  cardTitle.textContent = data.name;
  return cardElement;
  
}

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  modal.classList.add("modal__open");
});

modalCloseButton.addEventListener("click", function () {
  closePopup();
});

modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
});
//We're listening for a submit event on the form, not a click because there are other ways to submit a form
//therefore, we should use the submit event to ensure we capture all cases (failsafe)

for (let i = 0; i < initialCards.length; i++) 
{
  let cardElement = getCardElement(data[i]);
  cardsList.prepend(cardElement);
}
//.forEach would be more efficient than a for loop, but we haven't learned about .forEach yet
// i<initialCards.length is more efficient than i<6 because it will work for any number of cards