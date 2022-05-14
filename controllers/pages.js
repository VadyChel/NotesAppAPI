import Page from '../database/models/pages.js'

class PagesController {
  async getUserPages(req, rep) {
    return await Page.find({ author: req.currentUser.userId })
  }

  async createPage(req, rep) {
    return await Page.create({ name: req.body.name, author: req.currentUser.userId })
  }

  async deletePage(req, rep) {
    const foundPage = await Page.findOne({ _id: req.params.pageId })
    if(!foundPage) throw new Error('Unknown page')
    if(foundPage.author !== req.currentUser.userId) throw new Error('You don\'t have permission')

    await Page.deleteOne({ _id: req.params.pageId })
    return { success: true }
  }

  async updatePage(req, rep) {
    const foundPage = await Page.findOne({ _id: req.params.pageId })
    if(!foundPage) throw new Error('Unknown page')
    if(foundPage.author !== req.currentUser.userId) throw new Error('You don\'t have permission')

    return await Page.updateOne({ _id: req.params.pageId }, req.body.page)
  }
}

export default new PagesController()