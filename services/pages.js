import Page from '../database/models/pages.js'
import NotFoundError from '../exceptions/notFoundError.js'
import BadRequestError from '../exceptions/badRequestError.js'
import ForbiddenError from '../exceptions/forbiddenError.js'
import { convertToDTOs } from '../helpers/other.js'
import PageDTO from '../dto/page.js'

class PagesService {
  async updatePage(pageId, userId, newPage, foundPage = null) {
    if(!newPage) throw BadRequestError('You don\'t specify `newPage` field')
    if(!foundPage) {
      foundPage = await this.getPage(pageId)
    }
    if(foundPage.author !== userId) throw new ForbiddenError()
    await Page.updateOne({ _id: pageId }, newPage)

    return { success: true }
  }

  async moveToTrash(pageId, userId) {
    const foundPage = await this.getPage(pageId)
    if(foundPage.deleted) throw new BadRequestError('Page is already deleted')

    return await this.updatePage(pageId, userId, { deleted: true }, foundPage)
  }

  async getTrash(userId) {
    return convertToDTOs(await Page.find({ author: userId, deleted: true }), PageDTO)
  }

  async deleteAllFromTrash(userId) {
    await Page.deleteMany({ author: userId, deleted: true })
    return { success: true }
  }

  async restorePageFromTrash(pageId, userId) {
    const foundPage = await this.getPage(pageId)
    if(!foundPage.deleted) throw new BadRequestError('Page isn\'t deleted')

    return await this.updatePage(pageId, userId, { deleted: false }, foundPage)
  }

  async createPage(page) {
    return new PageDTO(await Page.create(page))
  }

  async deletePage(pageId, userId) {
    const foundPage = await this.getPage(pageId)
    if(!foundPage.deleted) throw new BadRequestError('Page isn\'t deleted')
    if(foundPage.author !== userId) throw new ForbiddenError()
    await Page.deleteOne({ pageId })

    return { success: true }
  }

  async getUserPages(userId) {
    return convertToDTOs(await Page.find({ author: userId, deleted: false }), PageDTO)
  }

  async getPage(pageId) {
    let foundPage
    try {
      foundPage = await Page.findOne({ _id: pageId })
    } catch(e) {
      throw new BadRequestError('Invalid page id')
    }

    if(!foundPage) throw new NotFoundError('Page not found')
    return new PageDTO(foundPage)
  }
}

export default new PagesService()