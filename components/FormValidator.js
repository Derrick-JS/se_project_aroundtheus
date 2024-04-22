export default class FormValidator {
  constructor(validationSettings, formSelector) {
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;

    this._formSelector = formSelector;
  }

  _setEventListeners() {
    const inputElements = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _enableSubmitButton() {
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  _disableSubmitButton() {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  enableValidation() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  //   enableValidation() {
  //     this._formElement = document.querySelector(this._formSelector);
  //     this._inputList = Array.from(
  //       this._formElement.querySelectorAll(this._inputSelector)
  //     );
  //     this._submitButtonSelector = this._formElement.querySelector(
  //       this._submitButtonSelector
  //     );

  //     this._inputList.forEach((inputElement) => {
  //       inputElement.addEventListener("input", () => {
  //         this._checkInputValidity(inputElement);
  //         this._toggleButtonState();
  //       });
  //     });

  //     this._toggleButtonState();
  //   }
  // }
}
