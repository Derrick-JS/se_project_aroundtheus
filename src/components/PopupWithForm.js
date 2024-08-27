import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".modal__input");
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  _handleProfileFormSubmit() {
    const data = this._getInputValues();
    this._handleFormSubmit(data);
    this.close();
  }

  _handleAddCardFormSubmit(data) {
    const { name, link } = data;
    if (name && link) {
    } else {
      console.error("Card name or link is missing");
    }
    this.close();
  }

  open() {
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleProfileFormSubmit();
    });
  }
}
