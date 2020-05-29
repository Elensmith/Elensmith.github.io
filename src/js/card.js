export class Card {
  constructor(name, link, toBigPicture, finderForCard, api) {
    this.api = api;
    this.finderForCard = finderForCard;
    this.toBigPicture = toBigPicture;
    this.name = name.replace("'", "");
    this.link = link;
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
    this.likes = this.api
      .getCards()
      .then((data) => {
        //console.log(data);
        this.likes = data.likes;
      })
      .catch((err) => {
        console.log("Ошибка лайка" + err);
      });
  }
  like() {
    this.cardElement
      .querySelector(".place-card__like-icon")
      .classList.toggle("place-card__like-icon_liked");
  }

  remove(event) {
    //event.stopPropagation(); //REVIEW3
    this.cardElement
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);

    this.cardElement
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this.remove);

    this.cardElement.parentNode.removeChild(this.cardElement);
  }

  create() {
    return `<div class="place-card" id='${this.name}'>
          <div class="place-card__image" style="background-image: url(${this.controlText(
            this.link
          )}">
          <button class="place-card__delete-icon" id='delete-icon'></button>
          </div>
          <div class="place-card__description">
          <h3 class="place-card__name">${this.controlText(
            this.name
          )}</h3><div class="place-card__like"> 
          <button class="place-card__like-icon"></button></div>
          </div>
          </div>`;
  }
  controlText(string) {
    const text = document.createElement("div");
    text.textContent = string;
    return text.innerHTML;
  }

  addListener() {
    const cardElement = this.finderForCard(this.name);
    this.cardElement = cardElement;
    cardElement
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    cardElement
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
    cardElement
      .querySelector(".place-card__image")
      .addEventListener("click", this.toBigPicture(cardElement));
  }
}

// create() { // тут попытка показать количество лайков
//   return `<div class="place-card" id='${this.name}'>
//         <div class="place-card__image" style="background-image: url(${this.controlText(
//           this.link
//         )}">
//         <button class="place-card__delete-icon" id='delete-icon'></button>
//         </div>
//         <div class="place-card__description">
//         <h3 class="place-card__name">${this.controlText(
//           this.name
//         )}</h3><div class="place-card__like">
//         <button class="place-card__like-icon"></button><div class="place-card__likes-amount">${
//           this.name
//         }</div></div>
//         </div>
//         </div>`;
// }
