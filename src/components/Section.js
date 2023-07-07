export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render(dataCard) {
      dataCard.reverse()
      dataCard.forEach (element => {
          this.addItem(element);
  });
}

  addItem(data) {
    this._container.prepend(this._renderer(data));
  }
}
