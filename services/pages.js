import Page from '../database/models/pages.js'

class PagesService {
  async editPage(pageId, newPage) {
    await Page.updateOne({ _id: pageId }, newPage)
  }

  async createPage(page) {
    return await Page.create(page)
  }

  async deletePage(pageId) {
    await Page.deleteOne({ _id: pageId })
  }

  async getUserPages(userId) {
    return await Page.find({ author: userId })
  }
}

export default new PagesService()