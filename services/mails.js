import { createTransport } from 'nodemailer'
import { APP_NAME, CLIENT_URL, MAIL_FROM, MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER } from '../config.js'
import fs from 'fs/promises'
import path from 'path'
import * as util from 'util'

class MailsService {
  constructor() {
    this.transporter = createTransport({
      host: MAIL_HOST, port: MAIL_PORT, secure: false, auth: {
        user: MAIL_USER, pass: MAIL_PASSWORD
      }
    })
  }

  async sendMessage(toMail, subject, html) {
    await this.transporter.sendMail({
      from: MAIL_FROM, to: toMail, subject: subject, html
    })
  }

  async sendActivationMail(toMail, activationLink, username) {
    const mailTemplate = await fs.readFile(path.resolve(path.resolve(), './templates/activationMail.html'), {
      encoding: 'utf8'
    })
    await this.sendMessage(toMail, `Activate your account ${APP_NAME}`, util.format(mailTemplate, username, username, CLIENT_URL, activationLink))
  }
}

export default new MailsService()