class Api {
  constructor(mainURL) {
    this.mainURL = mainURL;
  }

  getUserInfo() {
    return fetch(`${this.mainURL.baseUrl}/users/me`, {
      headers: {
        authorization: "20aa37b8-af35-4444-8adb-a17a8be26cc2",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });
  }

  editUserInfo(name, info) {
    return fetch(`${this.mainURL.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "20aa37b8-af35-4444-8adb-a17a8be26cc2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: info,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // return Promise.reject(res)
      })

      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });
  }

  getCards() {
    return fetch(`${this.mainURL.baseUrl}/cards`, {
      headers: {
        authorization: "20aa37b8-af35-4444-8adb-a17a8be26cc2",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });
  }

  addNewCard(nameNew, linkNew) {
    return fetch(`${this.mainURL.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "20aa37b8-af35-4444-8adb-a17a8be26cc2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameNew,
        link: linkNew,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });
  }
}
