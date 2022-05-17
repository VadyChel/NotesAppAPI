import Page from '../database/models/pages.js'
import ForbiddenError from '../exceptions/forbiddenError.js'
import NotFoundError from '../exceptions/notFoundError.js'

class PagesController {
  async getUserPages(req, rep) {
    return await Page.find({ author: req.currentUser.userId })
  }

  async createPage(req, rep) {
    return await Page.create({ name: req.body.name, author: req.currentUser.userId })
  }

  async deletePage(req, rep) {
    const foundPage = await Page.findOne({ _id: req.params.pageId })
    if(!foundPage) throw new NotFoundError('Page not found')
    if(foundPage.author !== req.currentUser.userId) throw new ForbiddenError()

    await Page.deleteOne({ _id: req.params.pageId })
    return { success: true }
  }

  async updatePage(req, rep) {
    const foundPage = await Page.findOne({ _id: req.params.pageId })
    if(!foundPage) throw new NotFoundError('Page not found')
    if(foundPage.author !== req.currentUser.userId) throw new ForbiddenError()

    return await Page.updateOne({ _id: req.params.pageId }, req.body.page)
  }
}

export default new PagesController()