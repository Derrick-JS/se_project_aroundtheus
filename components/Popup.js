export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this.removeEventListeners();
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleCloseButton = (e) => {
    if (e.target.classList.contains("modal__close-button")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleCloseButton);
    document.addEventListener("keydown", this._handleEscClose);
  }

  removeEventListeners() {
    this._popup.removeEventListener("click", this._handleCloseButton);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
