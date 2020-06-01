export class Popup {
  constructor(popup) {
    this.popup = popup;
    this.open = this.open.bind(this);
  }

  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }
}

// Можно лучше: Каждый отдельный класс лучше хранить в отдельном файле,
// так улучшится навигация по коду, будет проще его найти.
export class Photo extends Popup {
  constructor(popup, card) {
    super(popup);
    this.card = card;
    this.magic = this.magic.bind(this);
  }

  // Можно лучше: Стоит давать более осмысленные названия методам, чтобы взглянув на название можно было понять, что он делает.
  magic(event) {
    // ++ Можно лучше: event не передан в функцию.
    // Использование window.event считается нежелательным, так как может привести к трудноотлавливаемым багам.
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/event
    if (event.target.classList.contains("place-card__image")) {
      //REVIEW3.
      this.bigPicture = this.popup.querySelector("#popup-image-big");
      this.image = this.card.querySelector(".place-card__image");
      let style =
        this.image.currentStyle || window.getComputedStyle(this.image, false);
      let newUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
      this.open();
      this.bigPicture.setAttribute("src", `${newUrl}`);
    }
  }
}
