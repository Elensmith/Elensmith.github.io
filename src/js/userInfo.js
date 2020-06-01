export class UserInfo {
  constructor(nameBox, infoBox, name, job, api, avatar, popup1, form) {
    this.form = form;
    this.popup1 = popup1;
    this.nameBox = nameBox;
    this.infoBox = infoBox;
    this.name = name;
    this.job = job;
    this.api = api;
    this.avatar = avatar;
  }

  loadData() {
    this.api
      .getUserInfo()
      .then((data) => {
        this.name.textContent = data.name;
        this.job.textContent = data.about;
        this.avatar.style.backgroundImage = "url(" + data.avatar + ")";
      })
      .catch((err) => console.log("ошибочка" + err));
  }

  setUserInfo() {
    this.nameBox.value = this.name.textContent;
    this.infoBox.value = this.job.textContent;
  }

  updateUserInfo() {
    this.api
      .editUserInfo(this.nameBox.value, this.infoBox.value)
      .then(() => {
        // Можно лучше: В ответе приходят данные пользователя, лучше использовать их,
        // так как на сервере передаваемые значения могут дополнительно обрабатываться (например, убираться лишние пробелы).
        this.name.textContent = this.nameBox.value;
        this.job.textContent = this.infoBox.value;
        this.popup1.close();
        this.form.reset();
      })

      .catch((err) => {
        console.log("ошибочка" + err);
      });
  }
}
