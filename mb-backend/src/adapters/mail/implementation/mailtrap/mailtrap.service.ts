import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IMailInterface } from 'src/interfaces/IMailInterface';
import nodemailer from "nodemailer";
import { InjectMailer, Mailer, template } from 'nestjs-mailer';

@Injectable()
export class MailtrapService implements IMailInterface {
	constructor(
		@InjectMailer() private readonly mailtrap: Mailer
	) { }

	async sendMail(): Promise<void> {
		return null
	}

	async sendWelcomeMessage(user: Prisma.UserCreateInput): Promise<void> {
		return await this.mailtrap.sendMail({
			to: `"${user.name}" <${user.email}>'`,
			subject: "[ REGISTRO ✔ ] - Boas vindas!",
			text: 'Hello John',
			// html: template('src/mailer/hello.hbs', { name: 'John' })
			html: "<h1> Seja bem vindo(a)</h1>"
		  }).catch(e => console.log(e));
	}
}
