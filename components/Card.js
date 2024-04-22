export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // setting like button event listener
    this._cardElement
      .querySelector(`card__like-button`)
      .addEventListener("click", () => {
        this._handleLike();
      });

    // setting delete button event listener
    this._cardElement
      .querySelector(`card__delete-button`)
      .addEventListener("click", () => {
        this._handleDelete();
      });

    // setting image preview event listener
    this._cardElement
      .querySelector(`card__image`)
      .addEventListener("click", () => {
        this._handleImageClick(this._data);
      });
  }
}
