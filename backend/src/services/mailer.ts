import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: process.env.MAILTRAP_HOST,
	port: process.env.MAILTRAP_PORT,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PASS,
	},
});

export const sendMail = async (mailOptions: any) => {
	try {
		// Send Mail Logic
		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		throw new Error("Error sending email");
	}
};
