export default class Card {
  constructor({ name, link }, cardSelector, handleCardImageClick) {
    this._data = { name, link };
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._cardElement
      .querySelector(`.card__delete-button`)
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._cardImage.addEventListener("click", () => {
      this._handleCardImageClick(this._data);
    });
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    // get card template
    this._cardElement = this._getTemplate();

    // get card view
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    // set event listeners
    this._setEventListeners();

    // return the card
    return this._cardElement;
  }
}
