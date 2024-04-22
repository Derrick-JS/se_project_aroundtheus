export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _setEventListeners() {}

  _showInputError(inputElement, errorMessage) {}

  _hideInputError(inputElement) {}

  _checkInputValidity(inputElement) {}

  _hasInvalidInput() {}

  _enableSubmitButton() {}

  _disableSubmitButton() {}

  _toggleButtonState() {}

  enableValidation() {}
}
