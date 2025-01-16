import { hashSync } from "bcrypt-ts";

export const generateHash = (str?: string) => {
	const verificationCode = Math.floor(100000 + Math.random() * 900000);
	const hashedCode = hashSync(str || verificationCode.toString(), 10);

	return {
		code: verificationCode,
		hash: hashedCode,
	};
};
