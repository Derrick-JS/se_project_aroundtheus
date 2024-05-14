export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;

    this._formElement = formElement;
    this._submitButtonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    // Uncaught TypeError: this._formElement is null
  }

  _setEventListeners() {
    const inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
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
    const inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    return inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _enableSubmitButton() {
    this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    this._submitButtonElement.disabled = false;
  }

  _disableSubmitButton() {
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
