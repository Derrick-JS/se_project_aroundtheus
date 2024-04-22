export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }
}