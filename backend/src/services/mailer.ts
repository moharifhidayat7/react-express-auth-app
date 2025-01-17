import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.MAILTRAP_HOST,
	port: process.env.MAILTRAP_PORT,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PASS,
	},
} as nodemailer.SendMailOptions);

export const sendMail = async (mailOptions: any) => {
	try {
		console.log(mailOptions);
		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		console.error(error);
		console.log("test");
		throw new Error("Error sending email");
	}
};
