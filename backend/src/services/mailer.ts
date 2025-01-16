export const emailVerificationTemplate = `
    <span>hello</span>
  `;

export const resetPasswordTemplate = `
  <span>tesda</span>
`;

export const sendMail = async (to: string, template: string) => {
	try {
		// Send Mail Logic
		return true;
	} catch (error) {
		throw new Error("Error sending email");
	}
};
