import "./style.css";
import { UserInfo } from "./js/userInfo.js";
import { Popup, Photo } from "./js/popup.js";
import { FormValidatorCard } from "./js/formValidatorCard.js";
import { FormValidator } from "./js/FormValidator.js";
import { CardList } from "./js/cardList.js";
import { Card } from "./js/card.js";
import { Api } from "./js/api.js";

(function () {
  const newCard = document.querySelector(".places-list");
  const button = document.querySelector(".user-info__button");
  const buttonOpen = document.querySelector(".popup");
  const buttonClose = document.querySelector(".popup__close");
  const form = document.querySelector(".popup__form");
  const formEdit = document.querySelector("#popup__form-edit");
  const buttonEdit = document.querySelector("#popup-edit");
  const buttonEditOpen = document.querySelector(".user-info__edit-button");
  const userName = document.querySelector(".user-info__name");
  const userJob = document.querySelector(".user-info__job");
  const closeButtonPopupEdit = document.querySelector("#popup__close-edit");
  const imageOpen = document.querySelector("#popup-image");
  const buttonCloseImage = document.querySelector("#popup__close_image");
  const userNewName = formEdit.elements.yourname;
  const userInfo = formEdit.elements.about;
  const name = form.elements.name;
  const link = form.elements.link;
  const avatar = document.querySelector(".user-info__photo");
  const toBigPicture = (card) => new Photo(imageOpen, card).magic;
  const mainUrl = {
    baseUrl: "https://praktikum.tk/cohort10",
  };
  const api = new Api(mainUrl);
  const finderForCard = (id) => document.getElementById(id);
  const popup = new Popup(buttonOpen);
  const popup1 = new Popup(buttonEdit);
  const bigImagePopup = new Popup(imageOpen);
  const saveUserInfo = new UserInfo(
    userNewName,
    userInfo,
    userName,
    userJob,
    api,
    avatar,
    popup1,
    form
  );
  const formValidator = new FormValidator(formEdit); //REVIEW3.
  const formValidatorCard = new FormValidatorCard(form); //REVIEW3.
  saveUserInfo.loadData();

  formValidator.setEventListeners(); //REVIEW3.
  formValidatorCard.setEventListeners(); //REVIEW3.

  button.addEventListener("click", () => {
    formValidatorCard.setSubmitButtonState();
    popup.open();
  }); //открыть добавить новое место

  buttonClose.addEventListener("click", () => {
    // клик по крестику закрыть новое место
    popup.close();
    form.reset();
  });

  form.addEventListener("submit", function (event) {
    // закрыть по плюсу добавить новое место
    event.preventDefault();
    const addNewCard = new CardList(
      name,
      link,
      newCard,
      api,
      popup,
      form,
      (name, link) => new Card(name, link, toBigPicture, finderForCard, api)
    );
    addNewCard.addCard();
  });

  formEdit.addEventListener("submit", function (event) {
    // закрыть по сохранить редиктирование профиля
    event.preventDefault();
    saveUserInfo.updateUserInfo();
  });

  buttonEditOpen.addEventListener("click", function () {
    // открыть попап редавтировать профиль
    popup1.open();
    saveUserInfo.setUserInfo();
  });

  closeButtonPopupEdit.addEventListener("click", () => {
    // закрыть по крестику редактировать профиль
    popup1.close();
  });

  buttonCloseImage.addEventListener("click", () => {
    bigImagePopup.close();
  }); // закрыть по крестику большую картинку

  const cardList = new CardList(
    "",
    "",
    newCard,
    api,
    popup,
    form,
    (name, link) => new Card(name, link, toBigPicture, finderForCard, api)
  );
  cardList.render();
})();

// Что можно улучшить:
// - передавать параметры Api в конструкторе;
// - каждый класс хранить в отдельном файле;
// - использовать данные из ответа при редактировании профиля.
