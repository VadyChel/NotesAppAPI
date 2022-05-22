import PagesService from '../services/pages.js'

class PagesController {
  async getUserPages(req, rep) {
    return await PagesService.getUserPages(req.currentUser.userId)
  }

  async createPage(req, rep) {
    return await PagesService.createPage({
      name: req.body.name, author: req.currentUser.userId
    })
  }

  async getTrash(req, rep) {
    return await PagesService.getTrash(req.currentUser.userId)
  }

  async deleteAllFromTrash(req, rep) {
    return await PagesService.deleteAllFromTrash(req.currentUser.userId)
  }

  async restorePageFromTrash(req, rep) {
    return await PagesService.restorePageFromTrash(req.params.pageId, req.currentUser.userId)
  }

  async movePageToTrash(req, rep) {
    return await PagesService.moveToTrash(req.params.pageId, req.currentUser.userId)
  }

  async deletePage(req, rep) {
    return await PagesService.deletePage(req.params.pageId, req.currentUser.userId)
  }

  async updatePage(req, rep) {
    return await PagesService.updatePage(req.params.pageId, req.currentUser.userId, req.body.newPage)
  }
}

export default new PagesController()