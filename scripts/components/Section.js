export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._items.forEach(item => {
      this.addItem(this.renderer(item))
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}