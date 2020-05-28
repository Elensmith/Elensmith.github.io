export class FormValidatorCard {
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
    this.buttonSave.classList.remove("popup__button_edit");
    this.buttonSave.disabled = true;
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
      if (input.value.length === 0) {
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
