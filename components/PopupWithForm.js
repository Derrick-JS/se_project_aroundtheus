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
    // const profileTitle = document.querySelector("#profile-title-input");
    // const profileDescription = document.querySelector(
    //   "#profile-description-input"
    // );
    // if (data.profileTitle) profileTitle.textContent = data.profileTitle;
    // if (data.profileDescription)
    //   profileDescription.textContent = data.profileDescription;

    this._handleFormSubmit(data);

    this.close();
  }

  _handleAddCardFormSubmit(data) {
    const { name, link } = data;
    if (name && link) {
      // renderCard({ name, link }, cardsList);
    } else {
      console.error("Card name or link is missing");
    }
    this.close();
  }

  // handleFormSubmit() {
  //   const data = this._getInputValues();
  //   if (this._form.id === "profile-form") {
  //     this._handleProfileFormSubmit(data);
  //   } else if (this._form.id === "add-card-form") {
  //     this._handleAddCardFormSubmit(data);
  //   } else {
  //     console.error("Unknown form type");
  //   }
  // }

  open() {
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      console.log("Form submit event triggered"); // Debugging log
      evt.preventDefault();
      this._handleProfileFormSubmit();
    });
  }
}
