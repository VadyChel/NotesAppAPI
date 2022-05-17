import Page from '../database/models/pages.js'
import NotFoundError from '../exceptions/notFoundError.js'
import BadRequestError from '../exceptions/badRequestError.js'
import ForbiddenError from '../exceptions/forbiddenError.js'

class PagesService {
  async updatePage(pageId, newPage, userId) {
    const foundPage = await this.getPage(pageId)
    if(foundPage.author !== userId) throw new ForbiddenError()
    await Page.updateOne({ _id: pageId }, newPage)

    return { success: true }
  }

  async createPage(page) {
    return await Page.create(page)
  }

  async deletePage(pageId, userId) {
    const foundPage = await this.getPage(pageId)
    if(foundPage.author !== userId) throw new ForbiddenError()
    await Page.deleteOne({ pageId })

    return { success: true }
  }

  async getUserPages(userId) {
    return await Page.find({ author: userId })
  }

  async getPage(pageId) {
    let foundPage
    try {
      foundPage = await Page.findOne({ _id: pageId })
    } catch(e) {
      throw new BadRequestError('Invalid page id')
    }

    if(!foundPage) throw new NotFoundError('Page not found')
    return foundPage
  }
}

export default new PagesService()