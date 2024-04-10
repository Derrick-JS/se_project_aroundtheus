// look for all the input elements in the form
// loop through each input element to see if it is valid
// if it is not valid
// get validation message
// add error class to input element
// display error message
// disable submit button
// if it is valid
// enable button
// reset error message

const showInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(options.errorClass);
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableButton = (buttonElement, options) => {
  buttonElement.classList.remove(options.inactiveButtonClass);
  buttonElement.disabled = false;
};

const disableButton = (buttonElement, options) => {
  buttonElement.classList.add(options.inactiveButtonClass);
  buttonElement.disabled = true;
};

const toggleButtonState = (inputElements, submitButton, options) => {
  let foundInvalid = false;
  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      foundInvalid = true;
    }
  });
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, options);
  } else {
    enableButton(submitButton, options);
  }
};

const setEventListeners = (formElement, options) => {
  const { inputSelector } = options;
  const inputElements = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  toggleButtonState(inputElements, submitButton, options);
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
