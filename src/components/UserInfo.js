export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileHobby = document.querySelector(configInfo.profileHobbySelector);
    this._profileAvatar = document.querySelector(configInfo.profileAvatarSelector);
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      hobby: this._profileHobby.textContent,
    };
  }

  setUserInfo({username, hobby, avatar}) {
    this._profileName.textContent = username;
    this._profileHobby.textContent = hobby;
    this._profileAvatar.src = avatar;
  }
}
