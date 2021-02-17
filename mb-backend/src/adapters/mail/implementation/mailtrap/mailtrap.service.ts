import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IMailInterface } from 'src/interfaces/IMailInterface';
import nodemailer from "nodemailer";

@Injectable()
export class MailtrapService implements IMailInterface {
	constructor(
		private readonly transporter = nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER, // generated ethereal user
				pass: process.env.MAILTRAP_PASSWORD, // generated ethereal password
			},
		})
	) { }

	async sendMail(): Promise<void> {
		return null
	}

	async sendWelcomeMessage(user: Prisma.UserCreateInput): Promise<void> {
		return await this.transporter.sendMail({
			to: {
				name: user.name,
				address: user.email
			},
			from: {
				name: "Equipe message board",
				address: "noreply@mb.com"
			},
			subject: "[ REGISTRO ] - Boas vindas!",
			html: "<h1> Seja bem vindo(a)</h1>"
		})
	}
}
