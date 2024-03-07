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
const modal = document.querySelector(".modal");
/* should future-proof by changing from modal in cases where we have multiple modals */
const profileEditButton = document.querySelector(".profile__edit-button");
const modalCloseButton = document.querySelector(".modal__button-close");
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const modalForm = document.querySelector(".modal__form");
const cardTemplate = document.querySelector(".card-template");
const cardsList = document.querySelector(".cards__list");


function handleClosePopup() {
  modal.classList.remove("modal_opened");
}

function handleModalFormSubmit(event){
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup();
}

function getCardElement(data) {
  let cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  //we need to work with the content property of the template itself and not the variable
  //So we use querySelector to find the card element within the template content
  //We then use the cloneNode method to create a copy of the card element
  let cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  //links the image to the data link
  cardImage.alt = "Picture of " + data.name;
  //links the alt to the data name (which is the same as the title)
  //you link it to cardImage.alt and not data.alt because data.alt doesn't exist
  // you can only link [array]
  let cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  // links the title to the data name
  //links the alt to the data name (which is the same as the title)
  return cardElement;
}

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  modal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", handleClosePopup);
// We're listening for modalCloseButton being clicked and then we're calling closePopup()

modalForm.addEventListener("submit", handleModalFormSubmit);
//We're listening for a submit event on the form, not a click because there are other ways to submit a form
//therefore, we should use the submit event to ensure we capture all cases (failsafe)

initialCards.forEach(data => {
  let cardElement = getCardElement(data);
  cardsList.prepend(cardElement);
})
//We're using forEach to iterate over the initialCards array and for each element, we're calling getCardElement to create a new card element and then we're prepending it to the cardsList
