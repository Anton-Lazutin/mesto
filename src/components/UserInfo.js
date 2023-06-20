export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileHobby = document.querySelector(configInfo.profileHobbySelector);
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      hobby: this._profileHobby.textContent
    };
  }

  setUserInfo(dataUser) {
    this._profileName.textContent = dataUser.username;
    this._profileHobby.textContent = dataUser.hobby;
  }
}
