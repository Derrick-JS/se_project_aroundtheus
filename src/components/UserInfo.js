export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    if (title) {
      this._nameElement.textContent = title;
    }
    if (description) {
      this._jobElement.textContent = description;
    }
  }
}
