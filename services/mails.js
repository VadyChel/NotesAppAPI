import { createTransport } from 'nodemailer'
import fs from 'fs/promises'
import path from 'path'
import * as util from 'util'

class MailsService {
  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST, port: process.env.MAIL_PORT, secure: false, auth: {
        user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD
      }
    })
  }

  async sendMessage(toMail, subject, html) {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM, to: toMail, subject: subject, html
    })
  }

  async sendActivationMail(toMail, activationLink, username) {
    const mailTemplate = await fs.readFile(path.resolve(path.resolve(), './templates/activationMail.html'), {
      encoding: 'utf8'
    })
    await this.sendMessage(toMail, `Activate your account ${process.env.APP_NAME}`, util.format(mailTemplate, username, username, process.env.CLIENT_URL, activationLink))
  }
}

export default new MailsService()