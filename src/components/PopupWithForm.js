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

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    console.log("PopupWithForm setEventListeners");
    this._form.addEventListener("submit", (evt) => {
      debugger;
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      console.log("PopupWithForm setEventListeners submit");
    });
  }
}
