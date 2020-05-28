export class CardList {
  constructor(name, link, container, api, popup, form, createCard) {
    this.name = name;
    this.link = link;
    this.form = form;
    this.popup = popup;
    this.createCard = createCard;
    this.api = api;
    this.container = container;
  }
  addCard() {
    this.api
      .addNewCard(this.name.value, this.link.value)
      .then(() => {
        const card = this.createCard(this.name.value, this.link.value);
        this.container.insertAdjacentHTML("beforeend", card.create());
        card.addListener();
        this.popup.close();
        this.form.reset();
      })
      .catch((err) =>
        console.log("ошибочка при добавлении новой карточки" + err)
      );
  }

  render() {
    this.api
      .getCards()
      .then((res) => {
        res
          .filter((data) => data.name && data.link)
          .forEach((data) => {
            const card = this.createCard(data.name, data.link);
            this.container.insertAdjacentHTML("beforeend", card.create());
            card.addListener();
          });
      })
      .catch((err) => console.log("ошибочка в кардлисте" + err));
  }
}
