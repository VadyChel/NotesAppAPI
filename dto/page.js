export default class PageDTO {
  constructor(model) {
    this._id = model._id
    this.root = model.root
    this.parent = model.parent
    this.nestedPages = model.nestedPages
    this.position = model.position
    this.author = model.author
    this.name = model.name
    this.favourite = model.favourite
    this.deleted = model.deleted
  }
}