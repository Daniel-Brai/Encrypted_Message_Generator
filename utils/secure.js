/**
 *@params {String} s - The message to encrypt that is double quoted or the encrypted message to decrypt that is double quoted
 *@params {Number} n - The shift number for the message encryption or decryption 
*/

const caesarEncoded = (s, n) => {
	let alphabet = 'abcdefghijklmnopqrstuvwxyz'
	let lc = alphabet.replace(/\s/g, '').toLowerCase().split('')
	let uc = alphabet.replace(/\s/g, '').toUpperCase().split('')

	return Array.from(s)
		.map((v) => {
			if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) {
				return v
			}

			const lcEncryptIndex = (lc.indexOf(v.toLowerCase()) + n) % alphabet.length
			const lcEncryptedChar = lc[lcEncryptIndex]

			const ucEncryptIndex = (uc.indexOf(v.toUpperCase()) + n) % alphabet.length
			const ucEncryptedChar = uc[ucEncryptIndex]

			return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
		})
		.join('')
}

const caesarDecoded = (s, n) => {
	let alphabet = 'abcdefghijklmnopqrstuvwxyz'
	let lc = alphabet.replace(/\s/g, '').toLowerCase().split('')
	let uc = alphabet.replace(/\s/g, '').toUpperCase().split('')

	return Array.from(s)
		.map((v) => {
			if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) {
				return v
			}

			let lcEncryptIndex = (lc.indexOf(v.toLowerCase()) - n) % alphabet.length
			lcEncryptIndex = lcEncryptIndex < 0 ? lcEncryptIndex + alphabet.length : lcEncryptIndex
			const lcEncryptedChar = lc[lcEncryptIndex]

			let ucEncryptIndex = (uc.indexOf(v.toUpperCase()) - n) % alphabet.length
			ucEncryptIndex = ucEncryptIndex < 0 ? ucEncryptIndex + alphabet.length : ucEncryptIndex
			const ucEncryptedChar = uc[ucEncryptIndex]

			return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
		})
		.join('')
}

module.exports = {  caesarEncoded, caesarDecoded }
