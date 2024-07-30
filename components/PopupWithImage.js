import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageElement = this._popup.querySelector(".modal__image");
    this._captionElement = this._popup.querySelector(".modal__caption");
  }
  // Uncaught TypeError: this._popup is null

  open(data) {
    // Set the image's src and alt
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;

    // Set the caption's textContent
    this._captionElement.textContent = data.name;

    super.open();
  }
}

export default PopupWithImage;
