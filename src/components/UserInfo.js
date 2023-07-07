export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileHobby = document.querySelector(configInfo.profileHobbySelector);
    this._profileAvatar = document.querySelector(configInfo.profileAvatarSelector);
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      hobby: this._profileHobby.textContent
    };
  }

  getUserAvatar() {
    return {
      avatar: this._link.src
    };
  }

  setUserInfo({username, hobby, avatar}) {
    this._profileName.textContent = username;
    this._profileHobby.textContent = hobby;
    this._profileAvatar.src = avatar;
  }

  setUserId(_id) {
    this._id = _id
  }

  getUserId(){
    return this._id 
  } 
}
