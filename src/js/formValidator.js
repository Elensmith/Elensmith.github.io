export class FormValidator {
  constructor(element) {
    this.element = element;
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
    this.buttonSave = this.element.querySelector(".popup__button");
    this.element.parentElement
      .querySelector(".popup__close")
      .addEventListener("click", this.reset.bind(this));
  }
  reset() {
    this.buttonSave.classList.add("popup__button_edit");
    this.buttonSave.disabled = false;
    const element = this.element;
    this.element.querySelectorAll("input").forEach((input) => {
      const error = element.querySelector("#popup__form_error-" + input.name);
      error.textContent = "";
    });
  }
  checkInputValidity() {
    const element = this.element;
    let valid = true;
    this.element.querySelectorAll("input").forEach((input) => {
      const error = element.querySelector("#popup__form_error-" + input.name);
      const textNecessary = "Это обязательное поле";
      const textDifferentNumber = "Должно быть от 2 до 30 символов";

      if (input.value.length === 0) {
        error.textContent = textNecessary;
        valid = false;
      } else if (input.value.length > 30 || input.value.length === 1) {
        error.textContent = textDifferentNumber;
        valid = false;
      } else {
        error.textContent = "";
      }
    });

    return valid;
  }
  setSubmitButtonState() {
    if (this.checkInputValidity()) {
      this.buttonSave.classList.add("popup__button_edit");
      this.buttonSave.disabled = false;
    } else {
      this.buttonSave.classList.remove("popup__button_edit");
      this.buttonSave.disabled = true;
    }
  }
  setEventListeners() {
    this.element.addEventListener("input", this.setSubmitButtonState);
  }
}
