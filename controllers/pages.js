import PagesService from '../services/pages.js'

class PagesController {
  async getUserPages(req, rep) {
    return await PagesService.getUserPages(req.currentUser.userId)
  }

  async createPage(req, rep) {
    return await PagesService.createPage({ name: req.body.name, author: req.currentUser.userId })
  }

  async deletePage(req, rep) {
    return await PagesService.deletePage(req.params.pageId, req.currentUser.userId)
  }

  async updatePage(req, rep) {
    return await PagesService.updatePage(req.params.pageId, req.body.newPage, req.currentUser.userId)
  }
}

export default new PagesController()