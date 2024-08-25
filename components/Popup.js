export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened"); // Show the modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.close();
      }
    });
  }

  close() {
    this._popup.classList.remove("modal_opened"); // Hide the modal
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    this._popup.removeEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.close();
      }
    });
  }

  setEventListeners() {
    // does this class need event listeners
  }
}
