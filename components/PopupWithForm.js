import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
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

  open() {
    super.open();
    // this._button.textContent = "Save";
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;

// The PopupWithForm class extends the
// Popup class and adds the following
// functionality:
// A constructor that takes two arguments:
// popupSelector — the CSS selector of the
// popup element.
// handleFormSubmit — a function that
// should handle the form submission.
// A private method _getInputValues that
// collects data from all the input fields.
// A method setEventListeners that adds an
// event listener to the form submission.
// A method close that resets the form and
// closes the popup.
// A method open that opens the popup.
// The PopupWithForm class is used to create
// popups that contain forms. The
// handleFormSubmit function passed to the
// constructor should handle the form
// submission. The _getInputValues method
// collects the data from the input fields
// and returns it as an object. The
// setEventListeners method adds an event
// listener to the form submission. The close
// method resets the form and closes the
// popup. The open method opens the popup.
// The PopupWithForm class is used in the
// following way:
// const popupWithForm = new PopupWithForm(
//   ".modal_type_edit-profile",
//   {
//     handleFormSubmit: (data) => {
//       console.log(data);
//     },
//   }
// );
// popupWithForm.setEventListeners();
// popupWithForm.open();
// The code above creates a new instance of
// the PopupWithForm class and sets the event
// listeners. The open method opens the
// popup. The handleFormSubmit function logs
// the form data to the console. The
// PopupWithForm class is used to create
// popups that contain forms. The
// handleFormSubmit function passed to the
// constructor should handle the form
// submission.
