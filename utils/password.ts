import bcrypt from 'bcryptjs'


export const comparePassword = async (sendBody: string, passDb: string) => {
	return await bcrypt.compare(sendBody, passDb)
}
export const compareEncryptedPasswords = (encryptedPass1: string, encryptedPass2: string) => {
	return encryptedPass1 === encryptedPass2;
}
export const generatePassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}
