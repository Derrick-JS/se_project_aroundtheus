export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popup.querySelector(".modal__close-button");
  }

  _handleEscClose = (e) => {
    console.log("checking if key is escape");
    if (e.key === "Escape") {
      console.log("executing esc close");
      this.close();
    }
  };

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__button-close")
      ) {
        console.log("executing close");
        this.close();
      }
    });
    // the other event listener (_handleEscClose) is added in the open method
  }
}
