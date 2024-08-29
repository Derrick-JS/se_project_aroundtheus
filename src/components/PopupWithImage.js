import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageElement = this._popup.querySelector(".modal__image");
    this._captionElement = this._popup.querySelector(".modal__caption");
  }

  open(data) {
    // Set the image's src and alt
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;

    // Set the caption's textContent
    this._captionElement.textContent = data.name;

    super.open();
  }

  close() {
    // Reset the image's src and alt
    this._imageElement.src = "";
    this._imageElement.alt = "";

    // Reset the caption's textContent
    this._captionElement.textContent = "";

    super.close();
  }
}
